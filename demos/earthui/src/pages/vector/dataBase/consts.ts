const defaultImg = new URL('../../../assets/common/images.png', import.meta.url).href


export const MVTLayerList = [
    {
        "id": "default-mvt",//可用
        "title": "默认矢量瓦片",
        "url": "https://tiles.immich.cloud/v1/style/light.json",
        "thumbnail": defaultImg,
        "tk": ""
    },
    {
        "id": "0-empty-style",//空白
        "title": "Empty Style",
        "url": "https://cdn.jsdelivr.net/gh/maputnik/editor@9cf74ca405d2be0608b57db8109cf3a6af5b9f49/src/config/empty-style.json",
        "thumbnail": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAQAAAAHDYbIAAAAEUlEQVR42mP8/58BDhiJ4wAA974H/U5Xe1oAAAAASUVORK5CYII="
        , "tk": ""
    },
    {
        "id": "americana",//空白,后报错跨域
        "title": "Americana",
        "url": "https://americanamap.org/style.json",
        "thumbnail": "https://github.com/maplibre/maputnik/assets/649392/23fa75ad-63e6-43f5-8837-03cdb0428bac"
        , "tk": ""
    },
    {
        "id": "aws-hybrid",//可用,这里带了key
        "title": "AWS Hybrid",
        "url": "https://maps.geo.eu-west-1.amazonaws.com/v2/styles/Hybrid/descriptor?key=v1.public.eyJqdGkiOiJiOTNkYjBlZi04OWUzLTQxMGUtODFhMC0zYjZjZjVmZWZmMDgifYtukap0NBaJpcrS6Vit9j03GJgK9Bn-RSu5UCe3jkdSql2kKp3IEgLPtyLssbmKUdVO11sXddjK3ZOZy8V6QG0olv0K_1tOxyMIe4DAO3IV6H4VzHWiaXlbSakGiEgFLuHBdcfLDeMotye7N6rSRxuZb0CN9ytH9VjLly6-NEBRZezO_qPQyvdTFdeZsARIpL0f9YVpxPxPVvUcAWYCk5LpaPseRCDPrY5SlCdA1ZKqUA4F9RzxSTxB73Fel_SoNDkCNaux1VposBu791-uUpDzUpr7leKckrPXrpZ2hwnFbafVxFV9vq4fLTpB5KoBksuLfGNIwAx1RLLxWuMhE4c.ZGQzZDY2OGQtMWQxMy00ZTEwLWIyZGUtOGVjYzUzMjU3OGE4&color-scheme=Light",
        "thumbnail": "https://maputnik.s3.eu-west-1.amazonaws.com/thumbnails/aws-hybrid.jpg"
        , "tk": ""
    },
    {
        "id": "aws-standard",//可用,这里带了key
        "title": "AWS Standard",
        "url": "https://maps.geo.eu-west-1.amazonaws.com/v2/styles/Standard/descriptor?key=v1.public.eyJqdGkiOiJiOTNkYjBlZi04OWUzLTQxMGUtODFhMC0zYjZjZjVmZWZmMDgifYtukap0NBaJpcrS6Vit9j03GJgK9Bn-RSu5UCe3jkdSql2kKp3IEgLPtyLssbmKUdVO11sXddjK3ZOZy8V6QG0olv0K_1tOxyMIe4DAO3IV6H4VzHWiaXlbSakGiEgFLuHBdcfLDeMotye7N6rSRxuZb0CN9ytH9VjLly6-NEBRZezO_qPQyvdTFdeZsARIpL0f9YVpxPxPVvUcAWYCk5LpaPseRCDPrY5SlCdA1ZKqUA4F9RzxSTxB73Fel_SoNDkCNaux1VposBu791-uUpDzUpr7leKckrPXrpZ2hwnFbafVxFV9vq4fLTpB5KoBksuLfGNIwAx1RLLxWuMhE4c.ZGQzZDY2OGQtMWQxMy00ZTEwLWIyZGUtOGVjYzUzMjU3OGE4&color-scheme=Light",
        "thumbnail": "https://maputnik.s3.eu-west-1.amazonaws.com/thumbnails/aws-standard.jpg"
        , "tk": ""
    },
    {
        "id": "dark-matter",//不可用 缺key
        "title": "Dark Matter",
        "url": "https://cdn.jsdelivr.net/gh/openmaptiles/dark-matter-gl-style@v1.9/style.json",
        "thumbnail": "https://maputnik.github.io/thumbnails/dark-matter.png"
        , "tk": ""
    },
    {
        "id": "locationiq-streets",//不可用 缺key
        "title": "LocationIQ Streets",
        "url": "https://tiles.locationiq.com/v3/streets/vector.json?key={key}",
        "thumbnail": "https://static-assets.locationiq.com/maputnik/locationiq-streets.png"
    },
    {
        "id": "maptiler-basic-gl-style",//不可用 缺key
        "title": "MapTiler Basic",
        "url": "https://cdn.jsdelivr.net/gh/openmaptiles/klokantech-basic-gl-style@v1.10/style.json",
        "thumbnail": "https://maputnik.github.io/thumbnails/klokantech-basic.png"
    },
    {
        "id": "maptiler-toner-gl-style",//不可用 缺key
        "title": "Toner",
        "url": "https://cdn.jsdelivr.net/gh/openmaptiles/toner-gl-style@v1.0/style.json",
        "thumbnail": "https://maputnik.github.io/thumbnails/toner.png"
    },
    {
        "id": "osm-bright",//不可用 缺key
        "title": "OSM Bright",
        "url": "https://cdn.jsdelivr.net/gh/openmaptiles/osm-bright-gl-style@v1.11/style.json",
        "thumbnail": "https://maputnik.github.io/thumbnails/osm-bright.png"
    },
    {
        "id": "osm-liberty",//不可用 缺key
        "title": "OSM Liberty",
        "url": "https://maputnik.github.io/osm-liberty/style.json",
        "thumbnail": "https://maputnik.github.io/thumbnails/osm-liberty.png"
    },
    {
        "id": "osm-openmaptiles",//不可用 缺key
        "title": "OSM OpenMapTiles",
        "url": "https://api.maptiler.com/maps/openstreetmap/style.json?key=get_your_own_OpIi9ZULNHzrESv6T2vL",
        "thumbnail": "https://openmaptiles.org/img/styles/openmaptiles.png"
    },
    {
        "id": "positron",//不可用 缺key
        "title": "Positron",
        "url": "https://cdn.jsdelivr.net/gh/openmaptiles/positron-gl-style@v1.9/style.json",
        "thumbnail": "https://maputnik.github.io/thumbnails/positron.png"
    },
    {
        "id": "protomaps-light",//可用
        "title": "Protomaps Light",
        "url": "https://api.protomaps.com/styles/v4/light/en.json?key=d828297496b11844",
        "thumbnail": "https://github.com/user-attachments/assets/911f9765-4a7d-4736-9ec0-f2d4c90ae587"
    },
    {
        "id": "stadia-outdoors",//请求过久，请求失败
        "title": "Stadia Outdoors",
        "url": "https://tiles.stadiamaps.com/styles/outdoors.json",
        "thumbnail": "https://tiles.stadiamaps.com/static/outdoors.png?size=480x320&center=47.350259,8.49035&zoom=16"
    },
    {
        "id": "versatiles-colorful",// JSON解析异常
        "title": "Versatiles Colorful",
        "url": "https://tiles.versatiles.org/assets/styles/colorful/style.json",
        "thumbnail": "https://github.com/maplibre/maputnik/assets/649392/6cd69818-c541-46e4-a920-65fb4f654931"
    }
]
