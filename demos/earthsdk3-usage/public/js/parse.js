
var makeOptions = function makeOptions(opts) {
    if (opts === void 0) {
        opts = {};
    }

    return {
        arrayFormat: opts.arrayFormat || 'none',
        booleanFormat: opts.booleanFormat || 'none',
        nullFormat: opts.nullFormat || 'default'
    };
};

var getSearch = function getSearch(path) {
    var pos = path.indexOf('?');

    if (pos === -1) {
        return path;
    }

    return path.slice(pos + 1);
};

var parseName = function parseName(name) {
    var bracketPosition = name.indexOf('[');
    var hasBrackets = bracketPosition !== -1;
    return {
        hasBrackets: hasBrackets,
        name: hasBrackets ? name.slice(0, bracketPosition) : name
    };
};

var decodeValue = function decodeValue(value) {
    return decodeURIComponent(value.replace(/\+/g, ' '));
};

var decode = function decode(value, opts) {
    if (value === undefined) {
        return opts.booleanFormat === 'empty-true' ? true : null;
    }

    if (opts.booleanFormat === 'string') {
        if (value === 'true') {
            return true;
        }

        if (value === 'false') {
            return false;
        }
    }

    if (opts.nullFormat === 'string') {
        if (value === 'null') {
            return null;
        }
    }

    var decodedValue = decodeValue(value);

    if (opts.booleanFormat === 'unicode') {
        if (decodedValue === '✓') {
            return true;
        }

        if (decodedValue === '✗') {
            return false;
        }
    }

    return decodedValue;
};

var parse = function parse(path, opts) {
    var options = makeOptions(opts);
    return getSearch(path).split('&').reduce(function (params, param) {
        var _a = param.split('='),
            rawName = _a[0],
            value = _a[1];

        var _b = parseName(rawName),
            hasBrackets = _b.hasBrackets,
            name = _b.name;

        var decodedName = decodeValue(name);
        var currentValue = params[name];
        var decodedValue = decode(value, options);

        if (currentValue === undefined) {
            params[decodedName] = hasBrackets ? [decodedValue] : decodedValue;
        } else {
            params[decodedName] = (Array.isArray(currentValue) ? currentValue : [currentValue]).concat(decodedValue);
        }

        return params;
    }, {});
};
function keysToLowerCase(obj) {
    return Object.keys(obj).reduce((result, key) => {
        const newKey = key.toLowerCase();
        result[newKey] = obj[key]; // 如果值也是对象，可以递归调用keysToLowerCase
        return result;
    }, {});
};

function getWmsParam(url) {
    if (!url) return {};
    let serverURL
    try {
        serverURL = new URL(url);
    } catch (error) {
        return {}
    }
    const queryString = serverURL.search.substring(1);
    let options = keysToLowerCase(parse(queryString));
    if (!options) return {};
    options.rectangle = [-180, -90, 180, 90]
    if (serverURL.origin && serverURL.pathname) {
        options.url = serverURL.origin + serverURL.pathname
    }
    if (options.format === 'application/openlayers') {
        options.format = "image/png"
    }
    if (typeof (options.bbox) == "string" && options.bbox > 0) {
        let rectangle = options.bbox.value.split(",").map(el => { return Number(el) })
        options.rectangle(rectangle.length === 4 ? rectangle : [-180, -90, 180, 90])
    }
    return options
}

window.parse = parse