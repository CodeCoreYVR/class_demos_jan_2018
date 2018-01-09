const secretNumber = 714;
const correctPassword = 'opensesame';

const args = process.argv.slice(2);
const password = args[0];

if (password === undefined) {
  console.log("Password argument is required!")
} else if (password === correctPassword) {
  console.log("The number is", secretNumber);
} else {
  console.log("Incorrect password");
}
