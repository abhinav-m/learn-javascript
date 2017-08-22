window.onload = setListener;

var domElements = new Array();

function setListener() {
    document.onclick = clickListener;
}


function clickListener(e) {
    var clicked = (window.event) ?
        window.event.srcElement :
        e.target;
    //get all elements by that tag name.
    var tags = document.getElementsByTagName(clicked.tagName);
    //check and store the one that is ours in our global array

    for (var i = 0; i < tags.length; i++)
        if (tags[i] === clicked)
            domElements.push({ element: clicked.tagName, index: i })
    console.log(domElements)
}