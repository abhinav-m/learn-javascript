const users = [
  {
    id: 1,
    name: "Andrew",
    schoolId: 101
  },
  {
    id: 2,
    name: "Abhinav",
    schoolId: 234
  }
];
const grades = [
  {
    id: 1,
    schoolId: 101,
    grade: 86
  },
  {
    id: 2,
    schoolId: 234,
    grade: 90
  },
  {
    id: 3,
    schoolId: 101,
    grade: 70
  }
];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);
    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id ${id}`);
    }
  });
};

const getGrades = schoolId => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.schoolId === schoolId));
  });
};

const getStatus = id => {
  let user;
  return getUser(id)
    .then(tempUser => {
      user = tempUser;
      return getGrades(user.schoolId);
    })
    .then(grades => {
      let average = 0;
      if (grades.length > 0) {
        average =
          grades.map(grade => grade.grade).reduce((a, b) => a + b) /
          grades.length;
        console.log(average);
      }
      return `${user.name} has a ${average}% in the class`;
    });
};

//async await -> keywords to mark function async
//By marking  a function it returns a promise which resolves with the value "Abhinav"
const getStatusAlt = async id => {
  // throw new Error("Error!"); //Same as rejecting
  // return "Abhinav"; //After marking this function as async it will now get resolved with "Abhinav" because of it being returned.
  console.log("First await");
  const user = await getUser(id); //Await keyword is used inside an async function(marked as async above.)
  //await is used before a promise , if promise resolves -> stores value in variable if rejects - > throws an error(rejects promise)
  console.log("Second await");

  const grades = await getGrades(user.schoolId);

  if (grades.length > 0) {
    average =
      grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }
  console.log("Resolving");

  return `${user.name} has a ${average}% in the class`;
};

console.log(
  getStatusAlt(1)
    .then(name => console.log(name))
    .catch(e => console.log(e))
);
//
// getStatus(2)
//   .then(user => {
//     console.log(user);
//   })
//   .catch(e => console.log(e));
