import "../css/index.css"
import "../css/cpn.less"
import "../css/full.css"
function component() {
    const element = document.createElement("div")
    element.innerHTML = "hello webpack"
    element.className = "content"
    const img = new Image()
    img.src = require("../img/a.jpg")
    element.appendChild(img)
    return element
}
var p = document.createElement("div");
p.innerHTML = "hello webpack"

document.body.appendChild(component());
