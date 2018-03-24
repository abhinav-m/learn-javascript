  const flatten_es6_1 = array => array.reduce((a, b) => Array.isArray(b) ? a.concat(flatten(b)) : [...a, b], [])

  //FCC intermediate solution
  const flatten_es6_2 = function(array) {
    //Uses the fact that concat reduces one level of nesting in arrays; [1,2,3].concat(4,[5,6]) => [1,2,3,4,5,6]
    let flat = [].concat(...array);
    return flat.some(Array.isArray) ? flatten_es6_2(flat) : flat;
  }


  function flatten_es5_1(array) {
    var result = [];
    array.forEach(function(val) {
      if (Array.isArray(val)) {
        result = result.concat(flatten_es5_1(val));
      } else {
        result.push(val);
      }
    })
    return result;
  }

  //FCC solution
  function steamrollArray(arr) {
    var flattenedArray = [];

    // Create function that adds an element if it is not an array.
    // If it is an array, then loops through it and uses recursion on that array.
    var flatten = function(arg) {
      if (!Array.isArray(arg)) {
        flattenedArray.push(arg);
      } else {
        for (var a in arg) {
          flatten(arg[a]);
        }
      }
    };

    // Call the function for each element in the array
    arr.forEach(flatten);
    return flattenedArray;
  }

  const multiDepth = [
    [1, 2, [2, [3, 5, ["abc", "xyz"]]]], 5, [3, 2]
  ];


  console.log(flatten_es5_1(multiDepth));

  console.log(flatten_es5_1([1, {},
    [3, [
      [4]
    ]]
  ]))
  // should return [1, {}, 3, 4].

  console.log(flatten_es5_1([
    [
      ["a"]
    ],
    [
      ["b"]
    ]
  ]))
  //should return ["a", "b"].
  console.log(flatten_es6_2([1, [2],
    [3, [
      [4]
    ]]
  ]))
  //should return [1, 2, 3, 4].

  console.log(flatten_es5_1([1, [],
    [3, [
      [4]
    ]]
  ]))

  //should return [1, 3, 4].