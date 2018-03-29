const { log } = console;

// Implement mergeSorted which takes two sorted arrays and
// merges them in an efficient way making use of a single
// loop into a new array that is sorted.
function mergeSorted (arr1, arr2) {
  let newArr = [];

  for (let i = 0, j = 0; i < arr1.length || j < arr2.length; ) {
    if ((arr1[i] || Infinity) <= (arr2[j] || Infinity)) {
      newArr.push(arr1[i]);
      i += 1;
    } else {
      newArr.push(arr2[j]);
      j += 1;
    }
  }

  return newArr;
}

log("--- Initial Arrays ---")
const arr1 = [1,4,7,9,10]
const arr2 = [5,8,9,12,16]
log({arr1, arr2})
log("--- Merged ---")
log(mergeSorted(arr2, arr1))
// returns [1,4,5,6,8,9,9,10,12,16]
