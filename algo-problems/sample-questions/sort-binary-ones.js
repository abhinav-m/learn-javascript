// Consider an array of n decimal integers named elements. We want to rearrange elements according to the following rules:
//
// Sort the integers in ascending order by the number of 1's in their binary representations. For example, 710 → 1112 and 810 → 10002, so 8 (which has single 1 in binary) would be ordered before 7 (which has triple 1's in binary).
// Two or more integers having the same number of 1's in their binary representations are ordered by increasing decimal value. For example, 510 → 1012 and 610 → 1102 both contain double 1's in their binary representation, so 5 would be ordered before 6 because it has the smaller decimal value.
// Complete the rearrange function in the editor below. It has one parameter: an array of n integers, elements. The function must sort the elements array according to the rules above and return the sorted array.
//
// Input Format:
//
// The internal test cases read the following input from stdin and passes it to the function:
//
// The first line contains an integer, n, denoting the number of integers in elements.
//
// Each line i of the n subsequent lines (where 0 ≤ i < n) contains an integer describing elementsi.
//
// Constraints:
//
// 1 ≤ n ≤ 105
// 1 ≤ elementsi ≤ 109
// Output Format:
//
// Return an array of n integers denoting the sorted elements.
// Sample Input (0):
//
// 3
// 1
// 2
// 3
// Sample Output (0):
//
// 1
// 2
// 3
// Explanation (0):
//
// Given elements = [1, 2, 3]:
//
// 110 → 12
// 210 → 102
// 310 → 112
// The decimal integers 1 and 2 both have single 1 in their binary representation, so we order them by increasing decimal value (i.e., 1 < 2). The decimal integer 3 has double 1's in its binary representation, so we order it after 1 and 2. We then return elements = [1, 2, 3] as our sorted array.
//
// Sample Input (1):
//
// 5
// 5
// 3
// 7
// 10
// 14
// Sample Output (1):
//
// 3
// 5
// 10
// 7
// 14
// Explanation (1):
//
// Given elements = [5, 3, 7, 10, 14]:
//
// 510 → 1012
// 310 → 112
// 710 → 1112
// 1010 → 10102
// 1410 → 11102
// The decimal integers 5, 3, and 10 have double 1's in their binary representations, so we order them by increasing decimal value (i.e., 3 < 5 < 10). The decimal integers 7 and 14 have tripe 1's in their binary representations, so we place them after 3, 5, and 10 in increasing decimal order (i.e., 7 < 14). We then return elements = [3, 5, 10, 7, 14] as our sorted array.
//
// For example:
//
// Input	Result
// 3
// 1
// 2
// 3
// 1
// 2
// 3

function Rearrange(elements) {
  let results = [];
  results = elements.filter((v, i, a) => a.indexOf(v) === i);

  results.sort((a, b) => {
    let binA = a.toString(2).match(/1/g).length;
    let binB = b.toString(2).match(/1/g).length;

    return binA === binB ? a - b : binA - binB;
  });
  return results;
}
