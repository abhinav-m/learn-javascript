/* The locked box

Consider the following (rather contrived) object:
const box = {
locked: true,
unlock() { this.locked = false; },
lock() { this.locked = true; },
_content: [],
get content() {
if (this.locked) throw new Error("Locked!");
return this._content;
}
};

It is a box with a lock. There is an array in the box, but you can get at it only
when the box is unlocked. Directly accessing the private _content property is
forbidden.
Write a function called withBoxUnlocked that takes a function value as ar-
gument, unlocks the box, runs the function, and then ensures that the box
is locked again before returning, regardless of whether the argument function
returned normally or threw an exception. */

//An object with initial locked property set to true.
const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  }
};

function withBoxUnlocked(body) {
  //IF box is unlocked run the body function passed above
  let locked = box.locked;
  if (!locked) {
    return body();
  }
  //Unlock box
  box.unlock();

  //Try to run the function , finally ensures box is locked even if an error is thrown.
  try {
    return body();
  } finally {
    box.lock();
  }
}

//Successful run, box is locked after run completes.
withBoxUnlocked(function() {
  box.content.push('Treasure');
  //Can access content here but not outside.
  console.log(box.content);
});
//Throws an error saying box is locked.
console.log(box.content);

//Error is thrown in anonymous function here, error is caught, but box is still locked.(due to finally block.)
try {
  withBoxUnlocked(function() {
    throw new Error('Danger!! abort!');
  });
} catch (e) {
  console.log(e);
}
console.log(box.locked);
