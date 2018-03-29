const { log, time, timeEnd } = console;

// Bubble Sort

function bubbleSort (arr) {
  let hasSwapped = true;

  while (hasSwapped) {
    hasSwapped = false;

    for (let i = 1; i < arr.length; i += 1) {
      // If true, swap occurs here!
      if (arr[i - 1] > arr[i]) {
        let tmp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = tmp;
        hasSwapped = true;
      }
    }
  }
}

function bubbleSortImproved (arr) {
  let hasSwapped = true;

  for (let j = arr.length; j > 0 && hasSwapped; j -= 1) {
    hasSwapped = false;

    for (let i = 1; i < j; i += 1) {
      // If true, swap occurs here!
      if (arr[i - 1] > arr[i]) {
        let tmp = arr[i];
        arr[i] = arr[i - 1];
        arr[i - 1] = tmp;
        hasSwapped = true;
      }
    }
  }}

// Merge Sort

function merge (arr1, arr2) {
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

function mergeSort (arr) {
  if (arr.length <= 1) return arr;

  let middleIndex = Math.floor(arr.length / 2);
  let leftArr = arr.slice(0, middleIndex);
  let rightArr = arr.slice(middleIndex);

  return merge(mergeSort(leftArr), mergeSort(rightArr))
}


// Tests
const unsortedArr = Array
  .from({length: 10})
  .map(() => Math.round(Math.random() * 100));

log("--- bubbleSort ---")
let arr1 = Array.from(unsortedArr)
log("unsortedArr:", arr1)
bubbleSort(arr1)
log("sortedArr:", arr1)

log("--- bubbleSortImproved ---")
let arr2 = Array.from(unsortedArr)
log("unsortedArr:", arr2)
bubbleSortImproved(arr2)
log("sortedArr:", arr2)

log("--- mergeSort ---")
let arr3 = Array.from(unsortedArr)
log("unsortedArr:", arr3)
log("sortedArr:", mergeSort(arr3))

log("--- Benchmarks ---")
const benchArr = Array
  .from({length: 50000})
  .map(() => Math.round(Math.random() * 1000000));

let bench1 = Array.from(benchArr)
let bench2 = Array.from(benchArr)
let bench3 = Array.from(benchArr)

time("bubbleSort")
bubbleSort(bench1)
timeEnd("bubbleSort")

time("bubbleSortImproved")
bubbleSortImproved(bench2)
timeEnd("bubbleSortImproved")

time("mergeSort")
mergeSort(bench3)
timeEnd("mergeSort")


//
