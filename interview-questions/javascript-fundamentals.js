// What happens when we run the following snippet?
// In other words, what happens when we try to 
// log n to the console?

const r = (() => {
    const n = 1;
    const m = 2;
    return n + m;
  })();
  console.log(n);

// Answer:
// r gets the value of 3
// n gets reference error because its defined inside an IIFE and 
// doesnt pollute global scope