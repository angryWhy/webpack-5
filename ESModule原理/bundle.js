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
