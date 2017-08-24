/*
altERnaTIng cAsE <=> ALTerNAtiNG CaSe

Define to_alternating_case(char*) such that each lowercase letter becomes uppercase and each uppercase letter becomes lowercase. For example:

char source[] = "hello world";
char *upperCase = to_alternating_case(source);
(void)puts(upperCase); // outputs: HELLO WORLD
char source[] = "HELLO WORLD";
char *upperCase = to_alternating_case(source);
(void)puts(upperCase); // outputs: hello world
char source[] = "HeLLo WoRLD";
char *upperCase = to_alternating_case(source);
(void)puts(upperCase); // outputs: hEllO wOrld
FUNDAMENTALS

*/

String.prototype.toAlternatingCase = function() {
    return [...this].map(v => isNaN(v) ?
        /[A-Z]/.test(v) && v.toLowerCase() || v.toUpperCase() :
        v).join('')
}