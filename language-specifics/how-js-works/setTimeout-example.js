/* FML.
This will print 11000 
as the for loop executes almost immediately, 
and the last value of i is considered for setTimeOut.


        */
for (var i = 1000; i <= 10000; i += 1000) {
    setTimeout(function() {
        console.log(i);
    }, i);

}