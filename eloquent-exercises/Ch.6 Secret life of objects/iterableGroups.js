/*
Make the Group class from the previous exercise iterable. Refer back to the
section about the iterator interface earlier in the chapter if you aren’t clear on
the exact form of the interface anymore.
If you used an array to represent the group’s members, don’t just return the
iterator created by calling the Symbol.iterator method on the array. That
would work, but defeats the purpose of this exercise.
It is okay if your iterator behaves strangely when the group is modified during
iteration.
*/



class Group {
  constructor() {
    this.values = [];
  }

  add(el) {
    if (!this.has(el)) {
      this.values.push(el)
    }
  }

  delete(el) {
    if (this.has(el)) {
      this.values = this.values.filter(v => v !== el);
    }
  }

  has(el) {
    return this.values.includes(el);
  }

  static from(other) {
    let group = new Group();
    for (let value of other) {
      group.add(value)
    }
    return group;
  }

  //Assign the iterator to the prototype of the group [Symbol.iterator] property to make it iterable.
  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.idx = 0;
    this.group = group;
  }

  next() {
    if (this.idx === this.group.values.length) {
      return {
        done: true
      }
    }
    let value = this.group.values[this.idx];
    this.idx++;
    return {
      value,
      done: false
    }
  }

}

/*
Can also be done here.
Group.prototype[Symbol.iterator] = function() {
  return new GroupIterator(this);
}
*/

let group = new Group();
group.add(3);
group.add(4);
group.add(5);
group.delete(3);

for (let value of group)
  console.log(value)

for (let value of Group.from([1, 2, 3, 4, 5, 'c'])) {
  console.log(value);
}