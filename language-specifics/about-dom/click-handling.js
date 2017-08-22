window.onload = init;

function ClickData(x, y) {
    this.x = x;
    this.y = y;
}

function init() {
    document.addEventListener('click', clickInfo)
}


function clickInfo(e) {
    console.log(e.clientX, e.clientY)
    console.log(e.pageX, e.pageY)
    console.log(e.screenX, e.screenY)

}