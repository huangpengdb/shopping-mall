// vue.config.js
module.exports = {
    // 选项...
    devServer: {
        overlay: {
            warnings: false,
            errors: false
        },
        // before(app) {
        //     app.get('/goodsList', (req, res, next) => {
        //         res.json(mockdata);
        //     })
        // }
        proxy: {
            '/goods': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            },
            '/goods/*': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            },
            '/user/*': {
                target: 'http://localhost:3000',
                ws: true,
                changeOrigin: true
            }       
        }

    },
    lintOnSave: false
}