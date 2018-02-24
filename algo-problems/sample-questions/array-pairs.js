const arr = ['A','B','C','D'];

var answerArr = [];
for(let i = 0;i<arr.length-1;i++)
 for(let j=i+1;j<arr.length;j++)
    answerArr.push([arr[i],arr[j]]);


    console.log(answerArr);
