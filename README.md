# Webpack   5

## 1--->基础

### 打包方式

#### 命令行

```javascript
 "webpack --entry ./src/demo.js --output-path ./build"
//入口和出口
```

#### webpack.config.js文件

```javascript
const path = require('path')
module.exports = {
    mode: 'development',
    //入口可以使用相对路径
    entry: "./src/demo.js",
    output: {
        filename: "bundle.js",
        //打包后，必须要绝对路径，取到当前目录的绝对路径，在进行拼接
        path: path.resolve(__dirname, "./build")
    }
};
```

### 打包步骤

```
npm run build--->执行webpack打包
找到webpack.config.js，执行
如果不是webpack.config.js名字，则需要--config指定文件
```

```
配置文件默认为 webpack.config.js，还可以指定其它的配置文件。
webpack --config ./webpack.js
```

#### 打包

根据配置找到入口，生成文件依赖关系图，包含应用程序所有依赖模块，

遍历图结构，打包一个个模块，loader解析

未使用文件，没进依赖图不会打包

#### bug

在webpack中，动态创建元素的js文件，要放在body里面，不能放在header里，否则不能直接获取到body元素添加

## 2--->Loader

### 特性

1.loader 支持链式调用。 

2.loader 可以是同步的，也可以是异步的。

3.loader 运行在 Node.js 中，并且能够执行任何操作。

4.loader 能够产生额外的任意文件。 

#### 三种使用方式

1.内联样式 （import "css-loader!../css/index.css" ）

2.CLI样式(5不使用)

3.配置方式

#### Rules数组

rules数组的对象

```javascript
//编写顺序:从上往下，从右往左	
{
		正则式匹配文件资源
		test：/\.css$/
		//方式一：简写
		use: ["style-loader", "css-loader"]
		
		//方式二：use数组
            //options字符串或者对象，传入到loader里面
			{
                //匹配资源
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }
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
```

### 浏览器兼容性

#### browserlist工具

post-css,		babel,	autoprefixer等工具都是通过这个工具查询配置

多个前端工具之间，共享配置信息的工具

查询占有率https://caniuse

```javascript
//编写方式：一
//package.json文件编写
"browserslist": [
    ">1%",
    "last 2 version",
    "not dead"
  ]
//编写方式：二
//根目录创建文件夹
.browserlistrc
 	> 1%
    last 2 version
    not dead
```

#### PostCSS

通过js转换样式的工具

##### css转换和适配，添加前缀

```javascript
//postcss需要依赖其他插件发挥其功能
//npm i postcss，
postcss-loader,目的在webpack中使用postcss
//添加前缀,自动补全前缀
//npm i autoprefixer
//--use，使用postcss插件
npx postcss --use autoprefixer -o -result.css ./src/css/index.css
```

##### webpack使用postcss

```javascript
 				{
                        //postcss-loader，需要其他工具使用
                        	loader: "postcss-loader", 
                            options: {
                            	postcssOptions: {
                                //需要依赖其他插件
                                plugins: [
                                    require("autoprefixer"),
                                    //例如8位颜色，转6为颜色
                                    //一般用env多
                                    require("postcss-preset-env")
                                ]
                            }
                        }
                    }
```

##### postcss抽离

场景，css或者less，都需要，都写会冗余，抽离

css用，less用，scss也用

```javascript
//根目录新建
//postcss.config.js
module.exports = {
    plugins: [
        require("postcss-preset-env")
    ]
}
```

##### CSS-回溯处理

例如：css文件引入less文件  		@import"./a.less" 	import "./b.css"

```javascript
 					  //style-loader  
				{
                        loader: "css-loader", options: {
                            //处理当前css文件，在引入的css文件不会执行以前（postcss-loader）
                            //使用上一层loader
                            importLoaders: 1
                        }
                    },
                        //postcss-loader
```

## webpack加载其他资源

#### 图片资源

file-loader，处理jpg，png等资源

```javascript
file-loader
从5开始
require().default，返回的是一个对象，default为资源
4返回的是资源
//！！！打包后，.default报错，找不到文件
//使用assets/resource，
//去掉后显示

```

```javascript
//file-loader
{
                test: /\.(jpg|png|jpeg|svg|gif)$/,
                use: [
                    {
                        
                        loader: "file-loader",
                        options: {
                            //针对名字进行处理
                            name: "[name].[hash:6].[ext]",
                            //输出到指定目录
                            outputPath: "img"
                        }
                    }
                ]
            }
```

```javascript
//url-loader，转换base64，与js文件融合
         	{
                test: /\.(jpg|png|jpeg|svg|gif)$/,
                use: [
                    {
                        
                        loader: "url-loader",
                        options: {
                            //针对名字进行处理
                            name: "[name].[hash:6].[ext]",
                            //小于100kb，base64转码，大于则直接打包
                            limit:100*1024
                        }
                    }
                ]
            }
```

#### 4与5区别

assetsModule

```javascript
资源模块类型(asset module type)，通过添加 4 种新的模块类型，来替换所有这些 loader：

//	asset/resource 发送一个单独的文件并导出 URL。之前通过使用 file-loader 实现。
//	asset/inline 导出一个资源的 data URI。之前通过使用 url-loader 实现。
//	asset/source 导出资源的源代码。之前通过使用 raw-loader 实现。
//	asset 在导出一个 data URI 和发送一个单独的文件之间自动选择。之前通过使用 url-loader，并且配置资源体积限制	   实现。
```

#### 图片

asset/resource --------------->使用 `file-loader` 实现 

独立文件

```javascript
//file-loader
//使用type属性
 		   {
                test: /\.(jpg|png|jpeg|svg|gif)$/,
                type: "asset/resource",
                generator: {
                    filename: "img/[name].[hash:6][ext]"
                }
            }
```

asset/inline ---------------->使用 `url-loader` 实现 

打包到js文件

```javascript
		   {
                test: /\.(jpg|png|jpeg|svg|gif)$/,
                type: "asset/inline",
            }
```

asset ----------------> data URI 和发送一个单独的文件之间自动选择 

```javascript
			{
                test: /\.(jpg|png|jpeg|svg|gif)$/,
                type: "asset",
               	generator: {
                    filename: "img/[name].[hash:6][ext]",
                },
                parser: {
                    dataUrlCondition: {
                        maxSize: 100 * 1024
                    }
                }
            }
```

## 3--->Plugin

### clean-webpack-plugin

每次删除打包目录，重新生成 

```javascript
const { CleanWebpackPlugin } = require("clean-webpack-plugin")	

	plugins:[
    	new CleanWebpackPlugin()
    ]
```

### html-webpack-plugin

html模板

```javascript
const HtmlWebpackPlugin = require("html-webpack-plugin")

 new HtmlWebpackPlugin({
     		//document的title
            title: "webpack-5",
     		//模板路径
            template: "./public/index.html"
        })
```

### copy-webpack-plugin

复制文件，不被打包

```javascript
const CopyWebpackPlugin = require("copy-webpack-plugin")

 new CopyWebpackPlugin({
     //patterns:匹配的，数组，ignore过滤文件名，文件名字要加**前缀
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
```

## 4--->模块化

### mode模式

```javascript
//开发模式
mode: 'development'
自动设置->默认值：devtool："eval"
//生产模式---默认值
mode: 'production'
```

### CommonJS原理

```javascript
//定义一个对象
var __webpack_modules__ = ({
  //这个是Key，路径名作为对象的Key
  "./src/js/format.js":

    //值为function
    //这个module
    (function (module) {

      const dateFormat = (date) => {
        return "2020-12-12"
      }
      const priceFormat = (price) => {
        return "100.00"
      }
      //参数module这里使用
      //把函数填进去
      module.exports = {
        dateFormat,
        priceFormat
      }
    })

});
//缓存对象
var __webpack_module_cache__ = {};

//这是一个函数，每当底下立即执行函数加载资源时候，执行这个函数
function __webpack_require__(moduleId) {

  var cachedModule = __webpack_module_cache__[moduleId];
  //先从__webpack_module_cache__取值，如果有值，从里面取值
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  //给module和__webpack_module_cache__[moduleId]赋值为同一个对象{
  //  exports: {}
  //}
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };

  //如最上代码，取到对象的value，value为function，将module传进去
  //此时根据第39行，module={exports:{}}
  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

  return module.exports;
}

var __webpack_exports__ = {};

//立即执行函数，这里会立即执行，具体开始执行代码
!function () {
  const { dateFormat, priceFormat } = __webpack_require__(/*! ./js/format */ "./src/js/format.js")
  console.log(dateFormat("abc"));
  console.log(priceFormat("abc"));
}();
;
```

### ES Module原理

```javascript
//定义一个对象，里面是模块映射，key-value
"use strict";
var __webpack_modules__ = ({

  "./src/js/math.js":

    (function (__unused_webpack_module, __webpack_exports__, __webpack_require__) {
      //r函数打上标记
      __webpack_require__.r(__webpack_exports__);
      //第二个参数为defination
      //exports本身没有对应的，都是从definition里取得，相当于劫持，代理
      __webpack_require__.d(__webpack_exports__, {
        "mul": function () { return mul; },
        "sum": function () { return sum; }
      });
      const sum = (sum1, sum2) => {
        return sum1 + sum2
      }
      const mul = (num1, num2) => {
        return num1 * num2
      }

    })

});

//缓存函数
var __webpack_module_cache__ = {};
function __webpack_require__(moduleId) {
  //如果有则直接导出
  var cachedModule = __webpack_module_cache__[moduleId];
  if (cachedModule !== undefined) {
    return cachedModule.exports;
  }
  //没有就传递赋值
  var module = __webpack_module_cache__[moduleId] = {
    exports: {}
  };

  __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
  return module.exports;
}
//立即执行函数
!function () {
  //对__webpack_require__增加对象，对象key为d，值为function
  __webpack_require__.d = function (exports, definition) {
    //遍历
    for (var key in definition) {
      if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
        //将key定义到exports，重写get方法
        //export["sum"]-->definition["sum"]
        Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
      }
    }
  };
}();

//对__webpack_require__增加对象，对象key为o，值为function
//函数作用判断prop是否是obj的对象
!function () {
  __webpack_require__.o = function (obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
}();


!function () {
  //对__webpack_require__增加对象，对象key为r，值为function
  //exports增加属性，记录一下这个模块为ESModule，做了一个标记
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    //添加esModule，值为true
    Object.defineProperty(exports, '__esModule', { value: true });
  };
}();

var __webpack_exports__ = {};

!function () {
  //调用r记录是ESmodule
  __webpack_require__.r(__webpack_exports__);
  var _js_math__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("./src/js/math.js");

  console.log((0, _js_math__WEBPACK_IMPORTED_MODULE_0__.sum)(20.30));
  console.log((0, _js_math__WEBPACK_IMPORTED_MODULE_0__.mul)(20.30));
}();

```



### CommonJS->ES Module原理

### ES Module->CommonJS原理

## 5--->HMR(模块热替换)

