// `process` holds information your running node program.
// Part of that information includes options (or arguments)
// passed to your script.

// console.log(process.argv)

// `process.argv` returns an Array where
// the first value is the path to the node command,
// the second value is the path to the script file you are running,
// and every subsequent value are arguments that you pass to
// the script.

// You can use `.slice()` to cut up an array. That is
// seperate the array into different parts. Here we use
// to remove the first two values of the array which we
// do not need.

const args = process.argv.slice(2);
// To get individual arguments for the args array,
// use [] with the position of the value starting at 0.
console.log('First argument:', args[0]);

// Arguments that we get from `process.argv` are always
// strings. If you want a number, you will to convert
// the string into a number with `parseInt()` or `parseFloat()`
console.log('Second argument:', parseFloat(args[1]));







// bump
