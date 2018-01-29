// JS: Higher-Order Function

// Variadic Function
// A variadic is a function that can
// accept any number of arguments.

// When `...` is used in front of an argument,
// all remaining arguments of the function will
// be gathered as elements of an array assigned
// to the argument.

// This is called gather.

// Example:
// sum(1,2,3) -> numbers == [1,2,3]
// sum(1,2,2,2,2,2,2) -> numbers == [1,2,2,2,2,2,2]
function sum (...numbers) {
  // console.log({numbers: numbers});
  let total = 0;
  for (let number of numbers) {
    total += number
  }
  return total;
}

// Because of gather, sum can accept any number
// of arguments making a variadic function.
sum(1,2) // returns 3
sum(3,3,3,3) // returns 12

const arrOfNums = [5,4,3,2,1];
// `...` can also be used to do the inverse operation.
// When an array argument is passed to a function
// with `...`, all of the array's elements will be
// applied to the function as arguments.

// This is called spread.
sum(...arrOfNums); // returns 15
sum(...[0,4,0,4]); // returns 8

// Arrow Functions

// A new way to write functions without the `function`
// keyword. Instead, use the `=>` symbol to create the
// function.
const bark = (name, sound = "Woof!") => {
  return `${name} barks "${sound}"`
}

// If the function returns a single expression, it
// doesn't any braces. The single expression will
// implicitly returned (without `return` keyword).

const bark2 = (name, sound = "Woof!") =>
  `${name} barks "${sound}"`

// Arrow functions can not be used as constructors,
// because they treat `this` differently.
// They do not have a `.prototype` property.

const DoggoBarker = (name) => {
  this.name = name;
}

// new DoggoBarker("Yi Yeller"); // throws an error

// Exercise: toArrowFunction

// 1. add
// const add = (a, b) => {
//   return a + b;
// }
const add = (a, b) => a + b;

// 2. notNull
const notNull = obj => obj !== null;

// 3. flip
// const flip = fn => function (a, b) {
//   return fn(b, a);
// }
const flip = fn => (a, b) => fn(b, a)

// An arrow function's `this` is not the object that
// owns it. It is the `this` of the scope it was declared
// in. It behaves like a normal variable.

// The `this` of an arrow function can never change.
// It's static. It's set where the function is declared.

const myArrow = () => this // returns Window
const myFunc = function () { return this } // returns Window

const myObject = {
  myProp: 'A property value',
  // It doesn't matter that myArrow was re-assigned.
  // As a arrow function, it's this will be same
  // as the block (or scope) it's declared in.
  myArrow: myArrow, // returns Window
  myFunc: myFunc, // returns myObject
  myInlineArrow: () => this, // returns Window
  myUltFunc () {
    // `myUltFunc` is a method of `myObject` therefore
    // its `this` is `myObject`.

    // `myAnonArrow` keeps the `this` of the scope where
    // it's declared which is the body of
    // `myUltFunc` meaning that they share
    // the same `this`, `myObject`.
    const myAnonArrow = () => this;
    console.log('myAnonArrow:', myAnonArrow())

    // `myAnonFunc` is not a method of any object
    // even though it's declared inside of a method
    // meaning that its `this` will be the `Window`.
    const myAnonFunc = function () { return this }
    console.log('myAnonFunc:', myAnonFunc())

    return this;
  }
}

// Higher-Order Functions

// A higher-order function is a function that
// has a function as an argument and/or returns
// a function.

// A callback is a function that is passed as
// an argument to another function.

// Demo: A Loud Function
// Exercise: A Custom Logger
function loud (logFn, fn, ...args) {
  logFn(`Calling ${fn.name}`);
  const returnedValue = fn(...args);
  logFn(`Calling ${fn.name} & returned ${returnedValue}`);
  return returnedValue;
}

//usage:
/*
loud(console.info, add, 2, 2);
loud(console.log, sum, 0, 1, 2, 3, 4, 5);
loud(console.warn, bark, "Moneybags Michael");
*/

// Demo: Implement Each

/*
function each (fn, arr) {
  for (let value of arr) {
    fn(value);
  }
}
*/
function each (fn, arr) {
  for (let index = 0; index < arr.length; index += 1) {
    // This version supports an index and value.
    // The callback passed to it is called with
    // the value as its first argument and as its second
    // argument.
    // Both arguments are optional. We can pass a callback
    // that uses 0, 1 or both arguments. JavaScript doesn't
    // care.
    fn(arr[index], index);
  }
}

// usage:
each(console.log, [1,2,3,4])
each((value, index) => document.write(value + index), [1,2,3,4])

// Exercise: Implement Map

function map (fn, arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index += 1) {
    newArr.push(fn(arr[index], index));
  }
  return newArr;
}

//usage:
map(add, [1,2,3,4,5])
map(
  (value, index) => value.toString().repeat(index),
  [1,2,3,4,5]
)

// setTimeout

/*
setTimeout(
  () => console.log('1s later!'),
  2000
)
*/

let count = 1;
console.log('Before setTimeout:', count);
// setTimeout is an asynchronous function.
// The callback code will not be run instantly.
// It will be run later after the delay given
// in milliseconds.
// JavaScript will not wait to execute the lines
// following setTimeout. If you have code that
// depends on something that executes inside
// of the callback passed to setTimeout, that code
// must also be written inside it.
setTimeout(
  () => {
    count += 1;
    console.log('Inside setTimeout:', count);
  },
  1000
);
console.log('After setTimeout:', count);

// setInterval

/*
setInterval(
  () => console.log('Running every 2s!'),
  2000
)
*/

// clearTimeout & clearInterval

/*
let counter = 0;
const intervalId = setInterval(
  () => {
    console.log(`Counter at ${counter}`);
    counter += 2;
  },
  500
)

setTimeout(
  () => { clearInterval(intervalId); },
  5000
)
*/

// Closures

// Demo: Looking at scope
function myFn (a, b) {
  let x = "Inside function";
  console.log(
    "a:", a,
    "b:", b,
    "x:", x,
    // "this:", this
  );
}

//Demo: Looking at a Closure

function myParentFn (a, b) {
  let x = "Inside Parent Fn";
  // Whenever myParentFn is called, a myChildFn
  // is created. The myChildFn will get a copy of
  // the scope of myParentFn. This is called the closure.
  // It allows myChildFn to make use of myParentFn's
  // arguments and variables even if myParentFn
  // has already executed.
  function myChildFn (c, d) {
    let y = "Inside Child Fn";
    console.log(
      "a:", a,
      "b:", b,
      "x:", x,
      "c:", c,
      "d:", d,
      "y:", y
    );
  }
  console.dir(myChildFn);
  return myChildFn;
}


// Demo: loudWith

const num5 = () => 5;

function loudWith (logFn, fn) {
  // We're using the closure of loudWith to save
  // the logging function and callback function to
  // be logged.

  // The function that is returned, child function,
  // will have access logFn and fn when it was
  // created by loudWith.
  return (...args) => {
    // When the child function is called, it takes
    // the arguments the function that it's calling.
    // logFn an fn have already assigned by the parent
    // function.
    return loud(logFn, fn, ...args);
  }
}

// usage:
// Creating a loud version of add
const loudAdd = loudWith(console.log, add)
loudAdd(1,4)
loudAdd(6,8)

const loudSum = loudWith(console.log, sum)
loudSum(1,1,1,1,1,1,1,1,1)
loudSum(...[8,7,6])

const loudNum5 = loudWith(console.warn, num5)
loudNum5()






// bump
