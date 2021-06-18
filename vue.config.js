module.exports = {
    publicPath: './',
    configureWebpack : {
        resolve : {
            alias : {
                'assets' : '@/assets',
                'network' : '@/network',
                'components' : '@/components',
                'views' : '@/views'
            }
        }
    },
    // favicon.ico图标
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    }
}

