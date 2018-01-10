// FUNCTIONS

// You can assign any function to any variables. You can use
// to create aliases to functions. Make sure that when do this
// that you do not call the function that your assigning.
// const log = console.log(); // 👈 BAD!
const log = console.log; // 👈 GOOD! 😇

// DEMO: Increment Function
function increment (num) {
  return num + 1;
}

// EXERCISE: Rude Bot
// Write a function, insult, that takes a name, and returns an insult (e.g.
// "Bob, you doofus!")
// Try returning a random insult whenever insult is called (at least 3 different
// insults.)

function insult (name) {
  const randNum = Math.floor(Math.random() * 3);
  // The moment a function encounters a return it will exit and
  // give that value. All the lines that come after will be ignored.
  // Sometimes this is very practical to avoid needless computation
  // if the arguments are not what we want.
  // return 1;
  if (randNum === 0) {
    return `${name}, you doofus!`;
  } else if (randNum === 1) {
    return `Your mother was a hamster, ${name}`;
  } else {
    return `${name}, your father smelt of elderberries`;
  }
}

// EXERCISE: Repeat
// Write a function, repeat, that takes a string and a number then returns the
// taken string repeated a number times joined together as one string. You are
// not allowed to use String#repeat.

function repeat (str, num) {
  let newStr = '';
  for (let i = 0; i < num; i += 1) {
    newStr += str;
    // newStr = newStr + str;
  }
  return newStr;
}

// example:
repeat('ab', 4); // return 'abababab'

log('repeat:', repeat('ab |', 10));


// EXERCISE: Sum
// Create a function, sum, that takes an array of numbers as an argument then
// returns the sum of all numbers in the array.
// It should ignore non-number values.

function sum (arrOfNums) {
  let total = 0;
  // for (let num of arrOfNums) {
  for (let i = 0; i < arrOfNums.length; i += 1) {
    let num = arrOfNums[i];
    if (typeof num === 'number') {
      total += num;
    }
  }
  return total;
}

// example:
log("sum:", sum([1,2,3])) // returns 6
log("sum:", sum([0,1,0,1,0,'a','c'])) // returns 2

// OBJECT

// property names can't normally have special characters.
// (e.g. no spaces, no dashes, only letters, numbers, underscores)

// values can be of any type including other objects and functions.
const daeny = {
  firstName: 'Daenerys',
  lastName: 'Targaryen',
  titles: [
    'Queen of Mereen',
    'Khaleesi',
    'Queen of the Seven Kingdoms'
  ]
};

// DEMO: Word Lengths
// Write a function, wordLengths, that takes a sentence,
// and returns an object of all the words and their lengths.
// wordLengths("Hello world");
// { "Hello": 5, "world": 5 }

function wordLengths (sentence) {
  let allLengths = {};
  for (let word of sentence.split(' ')) {
    allLengths[word.toLowerCase()] = word.length;
  }
  return allLengths;
}

// example:
log(
  "wordLengths:",
  wordLengths("Winter is coming!")
)

// EXERCISE: Character Counts
// Write a function, countChars, that takes a string and returns an object
// containing the count of each character. Ignore case sensitivity.

function countChars (str) {
  let counts = {};

  for (let letter of str.split("")) {
    let lowerLetter = letter.toLowerCase()
    if (counts[lowerLetter] === undefined) {
      counts[letter.toLowerCase()] = 1;
    } else {
      counts[letter.toLowerCase()] += 1;
    }
  }
  return counts;
}

// example:

log(
  "countChars:",
  countChars("aBbcCCc") // returns {a: 1, b: 2, c: 4}
)

// Iterating over Arrays

// DEMO: Keys to Array
// Create a function, keys, that takes an object and returns an array of all its 
// keys.
// Example:
// keys({a: 1, b: 2, c: 3}) // returns ['a', 'b', 'c']

function keys (obj) {
  let arr = [];
  // Unlike for .. of a for .. in loop will iterate over all
  // keys of an object.
  for (let key in obj) {
    // console.log("A key of obj:", key)
    arr.push(key);
  }
  return arr;
}

// example:
log(
  "keys:",
  keys({a: 1, b: 2, c: 3})
);


// bump
