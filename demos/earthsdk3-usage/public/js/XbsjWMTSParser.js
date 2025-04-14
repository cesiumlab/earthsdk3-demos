

class XbsjWMTSParser {
     Layers;
     TileMatrixSets;
     url;
     queryParameters;

    constructor() {
        this.Layers = [];
        this.TileMatrixSets = [];
    }

    addUrlParam(url) {
        let idx = url.lastIndexOf("?");
        let queryParameters = {
            Request: "",
            Service: ""
        };
        if (idx > 0) {
            queryParameters = Cesium.queryToObject(url.substr(idx + 1));
            url = url.substr(0, idx);
        }
        this.url = url;
        queryParameters.Request = 'GetCapabilities';
        queryParameters.Service = 'wmts';
        this.queryParameters = queryParameters;
        return url + '?' + Cesium.objectToQuery(queryParameters);
    }

    makeTemplate(layer) {
        let ret = this.url + '?REQUEST=GetTile&VERSION=1.0.0&SERVICE=wmts';

        ret += '&LAYER=' + layer;
        ret += '&STYLE={style}';
        ret += '&TILEMATRIXSET={TileMatrixSet}';
        ret += '&TILEMATRIX={TileMatrix}';
        ret += '&TILEROW={TileRow}';
        ret += '&TILECOL={TileCol}';

        for (let key in this.queryParameters) {
            let k = key.toLowerCase();
            if (k == 'request' || k == 'service') {
                continue;
            }
            //@ts-ignore
            ret += '&' + k + '=' + this.queryParameters[k];
        }

        return ret;
    }

    parser(url, proxy )  {
        return new Promise((resolve, reject) => {
            //@ts-ignore
            Cesium.Resource.fetchText({ url: url }).then((text) => {
                let x2jsone = new X2JS();
                this.Layers = [];
                this.TileMatrixSets = [];
                //@ts-ignore
                let contents = x2jsone.xml_str2json(text).Capabilities.Contents;

                if (contents.TileMatrixSet instanceof Array) {
                    contents.TileMatrixSet.forEach((t) => {
                        this.addTileMatrixSet(t);
                    });
                } else if (contents.TileMatrixSet) {
                    this.addTileMatrixSet(contents.TileMatrixSet);
                }

                if (contents.Layer instanceof Array) {
                    contents.Layer.forEach((layer) => {
                        this.addLayer(layer);
                    });
                } else if (contents.Layer) {
                    this.addLayer(contents.Layer);
                }
                resolve(this.Layers);
            }).catch((err) => {
                reject(err);
            })
        });
    }

    addLayer(Layer) {
        let l = {
            title: Layer.Title.toString(),
            urls: [],
            styles: [],
            tileMatrixSets: []
        };

        if (Layer.WGS84BoundingBox) {
            let lb = Layer.WGS84BoundingBox.LowerCorner.toString().split(" ");
            let rt = Layer.WGS84BoundingBox.UpperCorner.toString().split(" ");
            let w = parseFloat(lb[0]);
            let s = parseFloat(lb[1]);
            let e = parseFloat(rt[0]);
            let n = parseFloat(rt[1]);

            if (w < -180) w = -180;
            if (e > 180) e = 180;
            if (s < -90) s = -90;
            if (n > 90) n = 90;

            l.rectangle = [w, s, e, n];
        }

        if (Layer.ResourceURL instanceof Array) {
            Layer.ResourceURL.forEach((r ) => {
                if (r._resourceType == "tile") {
                    l.urls.push({
                        format: r._format,
                        template: r._template
                    });
                }
            });
        } else {
            let r = Layer.ResourceURL;
            if (r && r._resourceType == "tile") {
                l.urls.push({
                    format: r._format,
                    template: r._template
                });
            } else if (Layer.Format) {
                l.urls.push({
                    format: Layer.Format,
                    template: this.makeTemplate(l.title)
                });
            }
        }

        function getLegend(s) {
            if (!s.LegendURL) return;
            return {
                format: s.LegendURL['_format'],
                height: parseInt(s.LegendURL['_height']),
                width: parseInt(s.LegendURL['_width']),
                href: s.LegendURL['_xlink:href'],
            };
        }

        if (Layer.Style instanceof Array) {
            Layer.Style.forEach((s) => {
                l.styles.push({
                    id: s.Identifier.toString(),
                    legend: getLegend(s),
                    title: s.Title ? s.Title.toString() : s.Identifier.toString(),
                    default: s._isDefault == "true"
                });
            });
        } else {
            let s = Layer.Style;
            l.styles.push({
                id: s.Identifier.toString(),
                legend: getLegend(s),
                title: s.Title ? s.Title.toString() : s.Identifier.toString(),
                default: s._isDefault == "true"
            });
        }

        if (Layer.TileMatrixSetLink instanceof Array) {
            Layer.TileMatrixSetLink.forEach((tl) => {
                let tileMatrixSet = this.TileMatrixSets.find(t => t.tileMatrixSetID == tl.TileMatrixSet);
                if (tileMatrixSet) {
                    l.tileMatrixSets.push(tileMatrixSet);
                }
            });
        } else {
            let tl = Layer.TileMatrixSetLink;
            let tileMatrixSet = this.TileMatrixSets.find(t => t.tileMatrixSetID == tl.TileMatrixSet);
            if (tileMatrixSet) {
                l.tileMatrixSets.push(tileMatrixSet);
            }
        }

        this.Layers.push(l);
    }

    getLevelScales28mm() {
        const scale0 = (((6378137 * 2 * Math.PI) / 256) * 100) / 0.028;
        let scales = [];
        for (let i = 0; i < 25; i++) {
            scales[i] = scale0 / (1 << i);
        }
        return scales;
    }

    getLevelScales96dpi() {
        let dpi = 96;
        let res = 0.0254 / dpi;
        const scale0 = ((6378137 * 2 * Math.PI) / 256) / res;
        let scales = [];
        for (let i = 0; i < 25; i++) {
            scales[i] = scale0 / (1 << i);
        }
        return scales;
    }

    getLevel(tileMatrixs, standerScales) {
        let ret = {
            minimumLevel: 0,
            maximumLevel: 0,
            tileMatrixLabels: []
        };

        let level = -1;
        for (let i = 0; i < tileMatrixs.length; i++) {
            let tm = tileMatrixs[i];
            let tl = standerScales.findIndex(s => {
                let error = s * 0.0001;
                return tm.scale < s + error && tm.scale > s - error;
            });

            if (tl < 0) {
                continue;
            }

            if (level < 0) {
                ret.minimumLevel = level = tl;
                for (let j = 0; j < ret.minimumLevel; j++) {
                    //@ts-ignore
                    ret.tileMatrixLabels.push('0');
                }
                //@ts-ignore
                ret.tileMatrixLabels.push(tm.id);
            } else if (tl == level + 1) {
                ret.maximumLevel = tl;
                //@ts-ignore
                ret.tileMatrixLabels.push(tm.id);
                level += 1;
            } else {
                break;
            }
        }

        if (ret.tileMatrixLabels.length == 0) return undefined;
        return ret;
    }

    getLevel4326(tileMatrixs) {
        let scales = this.getLevelScales28mm();
        scales.splice(0, 1);

        let ret = this.getLevel(tileMatrixs, scales);
        if (!ret) {
            scales = this.getLevelScales96dpi();
            scales.splice(0, 1);
            ret = this.getLevel(tileMatrixs, scales);
        }
        if (!ret) return;

        ret.tilingScheme = "Geographic";
        return ret;
    }

    getLevel3857(tileMatrixs) {
        let scales = this.getLevelScales28mm();
        let ret = this.getLevel(tileMatrixs, scales);
        if (!ret) {
            scales = this.getLevelScales96dpi();
            ret = this.getLevel(tileMatrixs, scales);
        }

        if (!ret) return;

        ret.tilingScheme = "WebMercator";
        return ret;
    }

    addTileMatrixSet(tms) {
        let t = {
            tileMatrixSetID: tms.Identifier.toString(),
            title: tms.Title ? tms.Title.toString() : tms.Identifier.toString(),
            crs: tms.SupportedCRS.toString(),
            params: undefined
        };

        let tileMatrixs = [];
        tms.TileMatrix.forEach((tm) => {
            tileMatrixs.push({
                id: tm.Identifier.toString(),
                scale: parseFloat(tm.ScaleDenominator)
            });
        });

        if (
            t.crs.indexOf(":4490") > 0 ||
            t.crs.indexOf(":4326") > 0 ||
            t.crs.indexOf("OGC:2:84") > 0 ||
            t.crs.indexOf('UNIT["degree",0.0174532925199') > 0
        ) {
            t.params = this.getLevel4326(tileMatrixs);

            if (t.params) {
                this.TileMatrixSets.push(t);
            } else {
                console.log("not support 4326 tilematrixs:", tileMatrixs);
            }
        } else if (t.crs.indexOf("3857") > 0 || t.crs.indexOf("900913") > 0) {
            t.params = this.getLevel3857(tileMatrixs);

            if (t.params) {
                this.TileMatrixSets.push(t);
            } else {
                console.log("not support 4326 tilematrixs:", tileMatrixs);
            }
        } else {
            console.log("not support crs:", t.crs);
        }
    }
}
window.XbsjWMTSParser = XbsjWMTSParser;
