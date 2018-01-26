// DATA STRUCTURES

// STACK

class Stack {
  constructor () {
    this.data = [];
  }

  push (x) {
    this.data.push(x);
    return this;
  }

  pop () {
    return this.data.pop();
  }
}

// DEMO: Call Stack

function callStackDemo() {
  function a () {
    console.log('This is A!');
  }
  function b () {
    a();
    console.log('This is B!');
  }
  function c () {
    b();
    console.log('This is C!');
  }
  function d () {
    c();
    console.log('This is D!');
  }
  debugger;
  d();
};

// EXERCISE: A Queue Object

class Queue {
  constructor () {
    this.data = [];
  }

  enqueue (x) {
    this.data.push(x);
    return this;
  }

  dequeue () {
    return this.data.shift();
  }
}

// DEMO: A Singly Linked List

// v is value, n is for next
let node = {v: 1, n: null};

let nodeA = {v: 1, n: {v: 2, n: {v: 3, n: {v: 4, n: {v: 5, n: null}}}}}

function first (node) {
  return node.v;
}

function rest (node) {
  return node.n;
}

function lastNode (node) {
  let cursor = node;
  while (cursor.n !== null) {
    cursor = cursor.n;
  }
  return cursor;
}

function last (node) {
  let cursor = node;
  while (cursor.n !== null) {
    cursor = cursor.n;
  }
  return cursor.v;
}

function prepend (node, list) {
  return {v: node.v, n: list};
}

function append (node, list) {
  lastNode(list).n = node;
  return list;
}

// usage:
last(nodeA) // returns 5
append({v: 10, n: null}, nodeA) // returns nodeA with 10 appended
last(nodeA) // returns 10

function toString (node) {
  let outStr = '';
  let cursor = node;
  while (cursor !== null) {
    outStr += cursor.v + ' ';
    cursor = cursor.n;
  }
  return `( ${outStr})`;
}


// Destructuring an array
{
  const arr = [1, 2, 3, 4, 5];

  // destructured values from array happens in
  // order. 👇 first will be assigned 1 because it's
  // the first variable name in the list.
  const [first, second, , ...leftover] = arr;
  console.log('first:', first); // logs 1
  console.log('second:', second); // logs 2
  console.log('leftover:', leftover); // logs [4, 5]
}

// Destructuring an object
{
  const obj = {a: 1, b: 2, c: 3, d: 4};

  const {a, b, e, ...rest} = obj;
  console.log('a:', a); // logs 1
  console.log('b:', b); // logs 2
  console.log('rest:', rest); // logs {c: 3, d: 4}
  console.log('e:', e);
}

// RECURSION

function sum (arr) {
  if (arr.length <= 1) {
    return arr[0];
  } else {
    return arr[0] + sum(arr.slice(1));
  }
}

// Exercise: Recursive Factorial
// 4! = 4 * 3 * 2 * 1
// 7! = 7 * 6 * 5 * (4 * 3 * 2 * 1)

function factorial (n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
// factorial(4)

// return 4 * factorial(4 - 1)
// return 4 * (3 * factorial(3 - 1))
// return 4 * (3 * (2 * factorial(2 - 1)))
// return 4 * (3 * (2 * (1)))

// Exercise: Reverse String

function reverse (str) {
  if (str.length <= 1) return str;
  return str[str.length - 1] + reverse(str.slice(0, -1));
}

function reverseAlt ([first, ...rest]) {
  if (rest.length <= 0) return first;
  return reverseAlt(rest) + first;
}

// BENCHMARK
// Demo: Factorial

function factorialIter (n) {
  let total = 1;
  for (let i = n; i >= 1; i -= 1) {
    total *= i;
  }
  return total;
}

let num = 100000;
console.time('factorial recursive');
for (let i = 0; i < 1000; i += 1) {
  factorial(1000);
}
console.timeEnd('factorial recursive');

console.time('factorial iterative');
for (let i = 0; i < 1000; i += 1) {
  factorialIter(1000);
}
console.timeEnd('factorial iterative');








// bump
