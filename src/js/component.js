import "../css/index.css"
function component() {
    const element = document.createElement("div")
    element.innerHTML = "hello webpack"
    element.className = "content"
    return element
}
var p = document.createElement("div");
p.innerHTML = "hello webpack"
document.body.appendChild(component());
