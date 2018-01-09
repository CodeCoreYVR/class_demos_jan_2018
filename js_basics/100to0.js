
// Use a while loop
let count = 100;
// When using the `while` keyword to loop,
// you must pass it a condition. While this
// condition is true, the while will continue
// to repeat the code inside its {}.
// When it turns false, it will stop.
console.log('while loop version:')
while (count >= 0) {
  console.log(count);
  // count = count - 1;
  // 👇 syntax sugar for 👆
  count -= 1;
}

console.log('for loop version:')
// Using a for loop
// for loop has three different parts inside of its ().
// - first part is a variable assignment
// - second part is a condition
// - third part is a change that will eventually cause the loop to end
// These seperate by ;.
// Each of them are optional.
for (let i = 100; i >= 0; i -= 1) {
  console.log(i);
}

// 100
// 99
// 98
// ...
