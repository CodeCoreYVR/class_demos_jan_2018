const args = process.argv.slice(2);
const mood = args[0];

if (mood === "happy") {
  console.log("Yay!");
} else if (mood === "angry") {
  console.log("Chill, dude.");
} else {
  console.log("Yo");
}

// When using a conditional, you not need to give
// an expression that evaluates to a boolean.
// If an `if` gets something other than boolean,
// JavaScript will convert it to a boolean. This is called
// type coercion.
// To verify how a value will be converted to a boolean,
// use the not operator `!` twice.

// For example:
!!0 // returns false
!!"False" // returns true
!!"" // returns false
!!5 // returns true
!!NaN // returns false
!!undefined // returns false






//bump
