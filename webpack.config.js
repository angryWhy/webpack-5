const path = require('path')
module.exports = {
    mode: 'development',
    //入口可以使用相对路径
    entry: "./src/js/main.js",
    output: {
        filename: "bundle.js",
        //打包后，必须要绝对路径，取到当前目录的绝对路径，在进行拼接
        path: path.resolve(__dirname, "./build")
    },
    module: {
        rules: [
            {
                //匹配资源
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    {
                        loader: "css-loader", options: {
                            //处理当前css文件，在引入的css文件不会执行以前（postcss-loader）
                            //使用上一层loader
                            importLoaders: 1
                        }
                    },
                    {
                        //postcss-loader，需要其他工具使用
                        loader: "postcss-loader", options: {
                            postcssOptions: {
                                plugins: [
                                    // require("autoprefixer"),
                                    //已经包含了autoprefixer，不用引入了
                                    require("postcss-preset-env")
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.less$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" },
                    { loader: "less-loader" }
                ]
            }
        ]
    }
}; 