# Webpack

## 01

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

#### 未使用文件处理

根据配置找到入口，生成文件依赖关系图，包含应用程序所有依赖模块，

遍历图结构，打包一个个模块，loader解析

#### bug

在webpack中，动态创建元素的js文件，要放在body里面，不能放在header里，否则不能直接获取到body元素添加