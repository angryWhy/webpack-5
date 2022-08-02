//ES Module导出，commonJS引入内容
const math = require("./js/math")
//commonJS导出内容，ESmodule引入内容
import format from "./js/format"

console.log(sum(20.30));
console.log(mul(20.30));

console.log(dateFormat("aaa"));
console.log(priceFormat("bbb"));