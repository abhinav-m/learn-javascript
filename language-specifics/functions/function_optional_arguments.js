function power ( base , exponent ) {
if ( exponent == undefined )
exponent = 2;
var result = 1;
for ( var count = 0; count < exponent ; count ++)
result *= base ;
return result ;
}

//Logs 16
console.log(power(4));
//Logs 8
console.log(power(2,3));