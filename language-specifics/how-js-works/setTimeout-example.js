/* FML.
This will print 11000
as the for loop executes almost immediately, 
and i refers to the last value in the loop.

IF LET is used, the value gets assigned to each block of i individually.

        */
for (var i = 1000; i <= 10000; i += 1000) {
    setTimeout(function() {
        console.log(i);
    }, i);

}