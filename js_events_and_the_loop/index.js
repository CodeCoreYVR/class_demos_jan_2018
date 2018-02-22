// EVENTS & THE LOOP

// Demo: Clicking Tiles
document.querySelectorAll('.doggo > h1').forEach(node => {
  node.addEventListener('click', () => {
    console.log('Doggo name was clicked!');
  });
});


// <node>.addEventListener() is a method used to react to user
// events with callbacks.

// You can use it on a node or the document. When used on a node,
// the event will be restricted to that node. When used with the
// document, it will apply to the entire page.

// It takes at least two arguments:
// - A string named after an event (e.g. 'click', 'mouseenter',
//   'submit', 'mouseleave', 'focus', 'blur', etc)
// - A callback, named the listener, that will be called
//   when the event occurs.


// EVENT OBJECT


// Demo: Clicks, Events & Properties
const toxicTim = document.querySelector('#toxic-tim');
const teams = document.querySelector('.teams')

/*
teams.addEventListener('click', function (event) {
  console.log('===================');
  console.log(event);
  console.log('target:', event.target);
  // original node that triggered the event
  console.log('currentTarget:', event.currentTarget);
  // the node that is listening for the event. In other words,
  // it's node using the .addEventListener method.
  console.log('client x, y:', event.clientX, event.clientY);
  console.log('page x, y:', event.pageX, event.pageY);
  console.log('offset x, y:', event.offsetX, event.offsetY);

  console.log('this:', this);
  // `this` inside the listener callback is usually the
  // event.currentTarget. Avoid using `this` because
  // it doesn't exist when used with an arrow function.
  // Also, depending on the source of the listener `this`
  // may be something else.
});
*/

// Demo: Last in Queue

/*
document.querySelectorAll('.teams .doggo').forEach(node => {
  node.addEventListener('click', event => {
    // const currentTarget = event.currentTarget;
    // 👇 syntax sugar for the 👆
    const {currentTarget} = event;
    // When creating variable in this way, the variable
    // will be initialize with the value of the same named
    // property of the object on the right =.

    currentTarget.parentElement.append(currentTarget);

    console.log(`Doggo, ${currentTarget.id}, was demoted!`);
  });
});
*/

// Mouse Events

// Demo: Mouse & The Doggo

// Invert the color of a doggo when they're double clicked
document.querySelectorAll('.doggo').forEach(node => {
  node.addEventListener('dblclick', event => {
    // console.log(event);
    event.currentTarget.classList.toggle('invert');
  });

  // Rotate a doggo on mouse down and remove rotation on mouse up
  node.addEventListener('mousedown', event => {
    event.currentTarget.classList.add('tilt');
  });

  node.addEventListener('mouseup', event => {
    event.currentTarget.classList.remove('tilt');
  });

  // Exercise: Crouching Mouse Hidden Doggo

  node.addEventListener('mouseenter', event => {
    event.currentTarget.classList.add('monochrome');
  });

  node.addEventListener('mouseleave', event => {
    event.currentTarget.classList.remove('monochrome');
  });
});


// FORM AND INPUT EVENTS

// DEMO: Type Loudly

const random = n => Math.ceil(Math.random() * n);
const keyboardSound = () =>
  new Audio(`sounds/vintage-keyboard-${random(5)}.wav`);

document
  .querySelectorAll('#application-form input')
  .forEach(node => {
    node.addEventListener('input', event => {
      // console.log(event);
      const {currentTarget} = event;

      // When using an input event to get the value
      // of the input at the time the event triggered,
      // use the `.value` property of `currentTarget`.
      // console.log(currentTarget.value)
      keyboardSound().play();
    });
  });


  // DEMO: Applicant's Avatar

  document
    .querySelector('#application-form')
    .addEventListener('submit', event => {
      event.preventDefault();
      // use .preventDefault() method on the event
      // object to prevent from doing its default behaviour.
      // This stop anchor tags from following lings and forms
      // from creating web requests.

      const {currentTarget} = event;
      // 👆 currentTarget is the form node in this case

      // To get input values from a form, use the
      // the FormData constructor with a form node
      // as its argument.

      const fD = new FormData(currentTarget);
      // To access input values, use the .get() method
      // on the FormData instance.
      fD.get('name')
      // returns value of input field with attribute name
      // set to name.
      fD.get('picture-url')
      // returns value of input field with attribute name
      // set to picture-url.

      // Input values are always strings.

      // To get a list of name-value pairs of the input fields
      // do the following.
      const nameValuePairs = Array.from(fD.entries());

      document
        .querySelector('.doggo.blank')
        .style.backgroundImage = `url(${fD.get('picture-url')})`

      console.log('Form submitted!');
    });


// KEYBOARD EVENTS

document.addEventListener('keydown', event => {
  const {
    shiftKey, ctrlKey, altKey, metaKey, keyCode, key
  } = event;
  // console.log(key, keyCode);
  // console.log(event);

  if (ctrlKey && altKey && keyCode === 78) {
    console.log('Going to NyanCat!')

    // To force browser to navigate to a different page
    // or change the history or go back, use the `window.location`
    // object.
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/location

    location.href = 'http://nyan.cat';

    // Also, to open a link in a seperate tab use the
    // window.open(<url>)
  }
});


// Exercise: Shortcuts of The Ninja
// Typing 'panic' in a row sends the user
// to 'http://hackertyper.net'

let keyBuffer = '';
document.addEventListener('keydown', event => {
  const { key } = event;

  if (key.length === 1) {
    keyBuffer = (keyBuffer + key).slice(-5);
  }

  if (keyBuffer === 'panic') {
    window.location.href = 'http://hackertyper.net'
  }
});


// EVENT PROPAGATION


function propagationLogger (event) {
  const { currentTarget, eventPhase } = event;
  const { id, tagName, className } = currentTarget;
  // The event object has a property, eventPhase,
  // that holds an integer which correspond to an event phase
  // as follows:
  // CAPTURING_PHASE : 1
  // AT_TARGET : 2
  // BUBBLING_PHASE : 3
  const phases = {
    '1': 'Capturing',
    '2': 'At Target',
    '3': 'Bubbling'
  }
  if (
    currentTarget.matches('.team.salmon')
    && eventPhase === 3
  ) {
    // Use event.stopPropagation() to
    // prevent an event from continuing to
    // capture or bubble through the DOM.
    // The event stop at the currentTarget where
    // stopPropagation was called.
    event.stopPropagation();
  }
  console.log(
    `${tagName}#${id}.${className}`,
    `Event Phase: ${phases[eventPhase]}`
  );
}

document.querySelectorAll('*').forEach(node => {
  // By default, event listener trigger only
  // on the bubbling phase.
  node.addEventListener('click', propagationLogger);
  // <node>.addEventListener can optionally take a
  // third argument, a boolean, to trigger the listener on
  // the capturing instead of the bubbling phase.
  // Set it to `true` to do so.
  node.addEventListener('click', propagationLogger, true);
});







// bump
