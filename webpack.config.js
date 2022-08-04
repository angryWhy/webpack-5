const path = require('path')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
module.exports = {
    mode: 'development',
    //入口可以使用相对路径,
    devtool: "source-map",
    entry: "./src/js/math.js",
    output: {
        filename: "bundle.js",
        //打包后，必须要绝对路径，取到当前目录的绝对路径，在进行拼接
        path: path.resolve(__dirname, "./build"),
        // assetModuleFilename: "img/[name].[hash:6][ext]"
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
            },
            //图片方面
            // {
            //     test: /\.(jpg|png|jpeg|svg|gif)$/,
            //     use: [
            //         {
            //             loader: "file-loader",
            //             options: {
            //                 //针对名字进行处理
            //                 name: "img/[name].[hash:6].[ext]",
            //                 //输出到指定目录
            //                 // outputPath: "img"
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.(jpg|png|jpeg|svg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "img/[name].[hash:6][ext]"
                }
            },
            // {
            //     test: /\.(jpg|png|jpeg|svg|gif)$/,
            //     type: "asset/inline",
            // },
            // {
            //     test: /\.(jpg|png|jpeg|svg|gif)$/,
            //     type: "asset",
            //     generator: {
            //         filename: "img/[name].[hash:6][ext]",

            //     },
            //     parser: {
            //         dataUrlCondition: {
            //             maxSize: 100 * 1024
            //         }
            //     }
            // },
            //字体方面
            {
                test: /\.(woff|woff2|ttf|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: "font/[name].[hash:6][ext]",
                },
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        // plugins: [
                        //     "@babel/plugin-transform-arrow-functions"
                        // ],
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    useBuiltIns: 'usage',
                                    corejs: { version: 3 },
                                    targets: {
                                        chrome: '60',
                                        firefox: '60',
                                        ie: '9',
                                        safari: '10',
                                        edge: '17',
                                    },
                                },
                            ]
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "webpack-5",
            template: "./public/index.html"
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "public",
                    // to: "build",
                    globOptions: {
                        ignore: [
                            "**/index.html",
                            "**/a.txt"
                        ]
                    }
                }
            ]
        })
    ]
}; 