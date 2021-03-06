module.exports = {
    devServer: {
        disableHostCheck: true,
        host: '0.0.0.0'
    },
    pwa: {
    "manifest_version": 2,
    "version": "0",
    "name": "jsint",
    "short_name": "jsint",
    "lang": "en-US",
    "start_url": "/",
    "display": "standalone",
    "theme_color": "#4460F1",
    "background_color": "#FFFFFF",
    "icons": [{
        "src": "public/icons/homescreen48.png",
        "sizes": "48x48",
        "type": "image/png"
    }, {
        "src": "/icons/homescreen72.png",
        "sizes": "72x72",
        "type": "image/png"
    }, {
        "src": "/icons/homescreen96.png",
        "sizes": "96x96",
        "type": "image/png"
    }, {
        "src": "/icons/homescreen144.png",
        "sizes": "144x144",
        "type": "image/png"
    }, {
        "src": "/icons/homescreen168.png",
        "sizes": "168x168",
        "type": "image/png"
    }, {
        "src": "/icons/homescreen192.png",
        "sizes": "192x192",
        "type": "image/png"
    },
    {
        "src": "public/icons/homescreen512.png",
        "sizes": "512x512",
        "type": "image/png"
    }
]
    }
}