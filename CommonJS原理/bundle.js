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
