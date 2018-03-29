window.onload = init;

function ClickData(x, y) {
  this.x = x;
  this.y = y;
}

/* addEventListener vs onclick/onblur/onMouseMove etc
  Inside the addEventListener() function, we specify two parameters —
  the name of the event we want to register this handler for,
   and the code that comprises the handler function we want to run in response to it.
   Note that it is perfectly appropriate to put all the code inside the addEventListener() function,
   in an anonymous function.

   This mechanism has some advantages over the older mechanisms discussed earlier.
   For a start, there is a counterpart function, removeEventListener(), which removes a previously added listener.

    This isn't significant for simple, small programs,
    but for larger, more complex programs it can improve efficiency to clean up old unused event handlers.
    Plus, for example, this allows you to have the same button performing different actions in different circumstances —
    all you've got to do is add/remove event handlers as appropriate.

Second, you can also register multiple handlers for the same listener.
 The following two handlers would not be applied:

myElement.onclick = functionA;
myElement.onclick = functionB;
As the second line would overwrite the value of onclick set by the first. This would work, however:

myElement.addEventListener('click', functionA);
myElement.addEventListener('click', functionB);
Both functions would now run when the element is clicked.
*/


function init() {
  document.addEventListener('click', clickInfo)
  //document.onclick = clickInfo;
}


function clickInfo(e) {
  console.log(e.clientX, e.clientY)
  console.log(e.pageX, e.pageY)
  console.log(e.screenX, e.screenY)

}