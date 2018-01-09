// Demo: Password Checker
// Create a script that takes a password as argument and
// checks if it's a good password.
const args = process.argv.slice(2);
const password = args[0];

// Pro Tip: When writing if statements with multiple
// branches make sure to always put the more specific
// conditions first.
if (password.length > 12) {
  console.log("Too long!");
} else if (password.length < 8) {
  console.log("Too short");
} else {
  console.log("Just right!");
}
