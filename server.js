const express = require("express")
const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware")
const app = express()

const complier = webpack(require("./webpack.config.js"))
//中间件处理文件,生成express中间件
const middleware = webpackMiddleware(complier)
app.use(middleware)
app.listen(
    3000, () => {
        console.log(`3000端口启动`);
    }
)