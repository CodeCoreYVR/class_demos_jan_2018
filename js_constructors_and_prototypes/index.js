// CONSTRUCTORS & PROTOTYPES

// Demo: ArrayExtras

const first = function (arr) {
  return arr[0];
}

const ArrayExtras = {
  // `last` is method written in classical style.
  // It is a property of ArrayExtras where its value
  // is a function.
  last: function (arr) {
    return arr[arr.length - 1];
  },
  // To create method, you can also assign a pre-existing
  // function to a property.
  first: first,
  // Methods are such common feature that there's a short-hand
  // syntax to write them. When creating a method, you
  // can omit the `: function` as shown below.
  take (arr, n) {
    return arr.slice(0, n);
  }
  // 👆 short-hand for 👉 take: function (arr, n) {}
};

// usage:
ArrayExtras.first([1, 2, 3]) // returns 1
ArrayExtras.last([1, 2, 3]) // returns 3

// Exercise: Add drop
// Add the method drop to ArrayExtras. It should take an array, arr, and an
// integer, n. Then, it should return a copy of arr where the first n elements
// have been removed

// You can create a method with any code that adds properties
// to object. Simply make the property's value a function.
ArrayExtras.drop = function (arr, n) {
  return arr.slice(n);
};

// Keyword this

console.log('In Script Scope:', this); // global object Window

const can = {
  taloupe: 'Wut?',
  touchThis () { return this }
};

console.log('From can:', can.touchThis()); // returns `can`
can.touchThis() === can; // returns `true`

// What happens when a method is assigned somewhere else?

const cant = {
  erbury: "Carrot!",
  touchThis: can.touchThis
}
// What will the method `touchThis` return in this context?
console.log('From cant:', cant.touchThis()); // returns  `cant`
// `this` is determined at the time a function is called unlike
// `self` in Ruby which is determined at the time the object
// is created.
// This means that for the same function its `this` could
// change during the execution of a program.
// `this` will always be the object calling the function.

cant.touchThis() === cant; // returns true
// `this` of touchThis is now `cant`!

cant.touchThis === can.touchThis; // returns true
// owever, `touchThis` for `can` and `cant` are
// actually the same exact function.

const touchThat = can.touchThis;
console.log(
  'With `touchThis` assigned to a variable:',
  touchThat()
); // logs `Window` object
// functions by themselves in most context behave
// as if they're methods of the window object.
// We rarely want `this` to be `window`. This is often
// the source of errors.

// this is often used to share values

// Demo: Counter
// Exercise: Configurable Steps

const counter = {
  count: 0,
  step: 1,
  setStep (n) {
    return this.step = n;
  },
  set (n) {
    return this.count = n;
  },
  inc () {
    return this.count += this.step;
  },
  dec () {
    return this.count -= this.step;
  },
  now () {
    return this.count;
  },
  reset () {
    this.setStep(1);
    this.set(0);
    // this.count = 0;
    // this.step = 1;
  }
};

// CONSTRUCTORS

/*
function Doggo (name, age) {
  // When a function is called as a constructor, `this`
  // will be initialized to a new and empty object (i.e. {})
  this.name = name;
  this.age = age;
  // When called as constructor, the return statement will be
  // ignored. Instead, `this` will be returned.

  // If called normally, a constructor function can return a value
  return "This string returns when Doggo is called without new";
}
// To call a function as a contructor, use the `new` keyword
// in front of the call. usage:
const moneybagsMichael = new Doggo('Moneybags Michael', 12);

// To add methods that are shared between all
// instances of the Doggo constructor, add them to
// its `prototype` property.
// This is how we implement "instance methods" in JavaScript.
// We call them prototype methods.
Doggo.prototype.bark = function () {
  return `${this.name} says ${['bork', 'bark', 'woof'][Math.floor(Math.random() * 3)]}`;
}
*/

// You can the get prototype of any object with
// the Object.getPrototypeOf() method.

Object.getPrototypeOf([]); // returns the Array prototype
Object.getPrototypeOf({}); // returns the Object prototype
// Object.getPrototypeOf(moneybagsMichael); // returns the Doggo prototype

// The object prototype is the only object without a prototype
Object.getPrototypeOf(Object.getPrototypeOf({})); // returns null

// Demo: Model Doggo Fighter

/*
function Doggo (name, age) {
  this.name = name;
  this.age = age;
}

Doggo.prototype.bark = function () {
  return `${this.name} says ${['bork', 'bark', 'woof'][Math.floor(Math.random() * 3)]}`;
}

function DoggoFighter (name, age, specialAbility) {
  Object.assign(
    this, {name: name, age: age, specialAbility: specialAbility}
  );
  // this.name = name;
  // this.age = age;
  // this.specialAbility = specialAbility;
}

// To do inheritance in JavaScript, we use prototypes.
// prototypes can inherit from other prototype.
// To do this, initialize a constructor's prototype
// prototype to an instance of an object we want to
// inherit from.
DoggoFighter.prototype = new Doggo();
// 👆 Here DoggoFighter prototype is set to
// inherit from the Doggo prototype.

DoggoFighter.prototype.fight = function (doggo) {
  // `doggo` argument should be an instance of doggo.
  return `${[doggo.name, this.name][Math.floor(Math.random() * 2)]} won!`
}
// When calling a method on an object, JavaScript will first
// check if the object instance has that method. If it doesn't
// find it, it will look that object's prototype. If it doesn't
// find it there, it will look in that prototype's prototype.
// It will do this until reaches the Object prototype. If it's
// not there, it will give an error saying the method doesn't exist.

const drillBitDarel = new DoggoFighter('Drill Bit Darel', 10, 'Drill!');
const bobBuilder = new Doggo('Bob Builder', 9);

drillBitDarel.sleep() // function doesn't exist!

// We can modify prototypes at any time and it will affect
// all existing objects that inherit that prototype.
Doggo.prototype.sleep = function () {
  return 'ZZzzzz...'
}

drillBitDarel.sleep() // returns 'ZZzzzz...' It works now!
*/

// CLASS SYNTAX

// Classes are compatible with function constructors.
// They can inherit from them and vice-versa.
class Doggo {
  // constructor is like initialize in Ruby, but
  // works just like a function constructor
  constructor (name, age) {
    this.name = name;
    this.age = age;
  }

  // bark is a prototype method
  bark () {
    return `${this.name} says ${['bork', 'bark', 'woof'][Math.floor(Math.random() * 3)]}`;
  }
}

class DoggoFighter extends Doggo {
  constructor (name, age, specialAbility) {
    super(name, age);
    // You can `super` in the constructor to call
    // the constructor of the inherited `class`.
    // You must all always call super before making
    // any changes to `this`.
    this.specialAbility = specialAbility;
  }

  fight (doggo) {
    // `doggo` argument should be an instance of doggo.
    return `${[doggo.name, this.name][Math.floor(Math.random() * 2)]} won!`
  }
}


// bump
