import "../css/index.css"
import "../css/cpn.less"
function component() {
    const element = document.createElement("div")
    element.innerHTML = "hello webpack"
    element.className = "content"
    return element
}
var p = document.createElement("div");
p.innerHTML = "hello webpack"
document.body.appendChild(component());
