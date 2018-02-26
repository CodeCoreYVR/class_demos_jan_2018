// PROMISE


// Use a constructor to create a promise
// The constructor requires an argument which
// is a callback usually named "resolver"

new Promise(() => {}); // This creates a valid promise, but useless.

new Promise((resolve, reject) => {
  // The "resolver" callback is called with two arguments in order:
  // - A resolve function that when called transitions the promise's
  //   status from "pending" to "resolved". Also, it sets the promise's
  //   value to the argument of resolve. resolve can only take one
  //   argument.
  // - A reject function that when called transitions the promise's
  //   status from "pending" to "rejected" and it sets the promise's
  //   value to the argument passed to reject.
  resolve("Hello! 👋")
  reject("Something went wrong!  😲")

  // A promise can only transition from the "pending" once.
  // Once it occurs, it will get the value from the resolve/reject
  // argument as its promise value which will become set permanently.
  // In other words, once resolve/reject is called once all other
  // resolve/reject calls are ignored.
})

// DEMO: Flipping Coins

function flipCoin () {
  return new Promise((resolve, reject) => {
    // 👇 imagine this is asynchronous
    const coinFace = ['HEADS', 'TAILS'][Math.floor(Math.random() * 2)];
    resolve(coinFace);
  });
}

function flipCoinWithCb (cbFn) {
  const coinFace = ['HEADS', 'TAILS'][Math.floor(Math.random() * 2)];
  cbFn(coinFace);
}

// Exercise: Roll Die

function rollDie (number) {
  return new Promise((resolve, reject) => {
    resolve(Math.ceil(Math.random() * number));
  });
}

//  DEMO: Throwing the Coin Too Far
function random (n) {
  return Math.floor(Math.random() * n);
}

function throwCoin () {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const coinFace = ['HEADS', 'TAILS'][random(2)];
        resolve(coinFace);
      },
      2000 + random(2000)
    )

    setTimeout(
      () => {
        reject('Coin was thrown too far!')
      },
      3500
    )
  })
}

// Using Promises

// To access the promise value of a promise once it is
// resolved, use the .then method. It takes a callback
// , then-cb, as an argument which is called with the
// promise value.

throwCoin()
  .then(
    promiseValue => console.log(promiseValue)
  );

// `.then()` always returns a Promise. Its value will be
// what the callback of then returned.

throwCoin()
  .then(
    promiseValue => `The coin face was ${promiseValue}`
  )
  .then(
    value => console.log(value)
  );

function thenCatchDemo () {
  throwCoin()
  .then(
    value => {
      console.log('1st coin', value);
      return throwCoin();
    }
  )
  .then(
    value => {
      console.log('2nd coin', value)
      return throwCoin()
    }
  )
  .then(
    value => {
      console.log('3rd coin', value)
      throwCoin();
      return undefined;
    }
  )
  .catch(
    error => {
      console.log(error)
    }
  )
}


// DEMO: A Delay function
// EXERCISE: Upgrade delay

function delay (milliseconds, value) {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        console.log("waited for", milliseconds, "and returned", value);
        resolve(value)
      },
      milliseconds
    );
  })
}

function throwCoinAlt () {
  return  delay(2000 + random(2000))
      .then(() => ['HEADS', 'TAILS'][random(2)]);
}

// Promise Methods

// Promise.resolve(<promise-value>) returns a promise that is
// already resolved with <promise-value>

// usage:
Promise.resolve("My Promise Value")
// 👇 and 👆 are equivalent
new Promise((resolve) => resolve("My Promise Value"))

// Promise.reject(<promise-value>) returns promise that
// is already rejected with <promise-value>

// usage:
Promise.reject("My rejected value")
// 👇 and 👆 are equivalent
new Promise((resolve, reject) => reject("My rejected value"))

// Demo: Sequential vs. Parallel
function sequentialDemo () {
  console.time('sequentialDemo');
  return delay(1000 + random(1000), 10)
    .then(() => delay(1000 + random(1000), 20))
    .then(() => delay(1000 + random(1000), 30))
    .then(() => delay(1000 + random(1000), 40))
    .then(() => delay(1000 + random(1000), 50))
    .then(() => console.timeEnd('sequentialDemo'))
}

function parallelDemo () {
  console.time('parallelDemo');
  return Promise.all([
    delay(1000 + random(1000), 10),
    delay(1000 + random(1000), 20),
    delay(1000 + random(1000), 30),
    delay(1000 + random(1000), 40),
    delay(1000 + random(1000), 50)
  ])
    .then(value => {
      console.log(value);
      console.timeEnd('parallelDemo');
    })
}

// ASYNC FUNCTIONS
// The `async` keyword can be used to declare functions
// where the `await` keyword can be used to wait for
// promises to execute inside of their function body.
// `await` will only ever work inside an `async` function.

// `async` functions return their return values wrapped
// inside a promise.

// This makes asynchronous appear to be synchronous.

// usage examples:
async function myAsyncFunction () {
  const face = await throwCoin();
};

const myAsyncArrow = async () => {};

const myObj = {
  async myAsyncMethod () {
    const face = await throwCoin();
  }
}

class myClass {
  async myAsyncMethod () {
    const face = await throwCoin();
  }
}

async function asyncDemo () {
  console.time('asyncDemo');
  const dA = await delay(1000 + random(1000), 10);
  const dB = await delay(1000 + random(1000), 20);
  const dC = await delay(1000 + random(1000), 30);
  const dD = await delay(1000 + random(1000), 40);
  const dE = await delay(1000 + random(1000), 50);
  console.timeEnd('asyncDemo');

  return [dA, dB, dC, dD, dE];
}



// bump
