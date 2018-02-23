// Selecting Nodes

// Use the $ function as you would document.querySelectorAll.
// It takes CSS query as a string.

$('.blue.square') // select all nodes with the classes blue & square
$('div') // select all nodes with div as tag name
$('#orange-container') // selects node with id of orange-container

// The $ function will return a collection of nodes. That we'll
// name the jQuery list.

// DEMO: Attributes
// Get “href” attribute of the first link on the page

$('a').attr('href')
// When using a method that reads, it will only read from the
// first node in the jQuery list

// Don't use [] when trying to get an individual node form jQuery
// list instead use the `.eq()` method which will return that
// inside a jQuery list.
$('a').eq(2).attr('href') // returns href of third anchor node


// Set “href” attribute of all links on the page to “http://www.nyan.cat”.

$('a').attr('href', 'http://www.nyan.cat');
// When using a method that writes, it will apply to ALL NODES in the
// jQuery list.

// Remove the “blue” class from all shapes and replace it with the “red” class.

$('.blue.shape').removeClass('blue').addClass('red')
// jQuery (almost) always return the jQuery list what was operated
// on allowing to chain jQuery after jQuery method.

// EXERCISE: Practice

// Set the “class” attribute of all anchors to “highlight” with attr method.
$('a').attr('class', 'highlight')

// Replace all “circle” classes with the “diamond” class.
$('.circle').removeClass('circle').addClass('diamond')

// Remove all shapes in the green & purple container.
$('#green-container, #purple-container').find('.shape').remove()
// `<jQuery-list>.find()` takes a CSS query as argument and returns
// all descendents nodes of the nodes in the jQuery list that match
// the CSS query.


// Demo: html, ...

// Get "html" of the reset button
$('#reset').html()

// Try to get the "html" of all links

// jQuery's map has the arguments of its callback reversed.
// In the map callback, index is first and value (the node) is the
// second argument.
$('a').map((index, value) => $(value).html())

// Mapping over a jQuery list will return plain JavaScript
// nodes. To use jQuery methods on those nodes, you must
// put them back in a jQuery list. Use the $ function to
// wrap any plain Node in a jQuery list.

// Change the "reset" button to read "Launch Doggos!"
$('#reset').html('Launch Doggos!')


// EXERCISE: Practice

// 1. Replace contents of every "td" with "yass"
$('td').html('yass')

// 2. Select parents of all "td" tags
$('td').parent()


// DEMO: ...

// Create a small blue diamond
// The $ function can take a string of HTML as argument and
// turn it into a node (or a tree of nodes).
$(`
  <div class="small blue diamond shape"></div>
`)

// Append "small blue diamonds" to all containers
$('.container').append(
  $(`
    <div class="small blue diamond shape"></div>
  `)
)

// Prepend a new link of nyan.cat to the list of links
$('ul').prepend(
  $(`<li><a href="http://www.nyan.cat">Nyan Cat</a></li>`)
)


// EXERCISE: Practice

// Create a div with the “container” class.
$(`
  <div class="container"></div>
`)

// Prepend it to the first section tag in the body.
$('body section').eq(0).prepend(
  $(`
    <div class="container"></div>
  `)
)

// Append a “small black circle” to the container.
$('body section').eq(0).prepend(
  $(`<div class="container"></div>`)
    .append(
      $(`<div class="small black circle shape"></div>`)
    )
)

// Listening for Events

// DEMO


// When passing a callback to the $ function, the callback will
// be called only once the entire HTML page has been parsed
// into the DOM. Which means that you should write all JavaScript
// that affects the DOM inside of this callback.
// It's shortcut for the 'DOMContentLoaded' event as
// shown below.

/*
document.addEventListener('DOMContentLoaded', () => {
  // put code that depends on the DOM here
});
*/


$(() => {
  // When your mouse enters any blue circle, log “Blue Circle: Go away!” to the
  // console.
  $('.blue.circle').on('mouseenter', event => {
    console.log('Blue circle: Go away!');
  });

  // When your mouse leaves any blue circle, log “Blue Circle: Goodbye!” to the
  // console.
  $('.blue.circle').on('mouseleave', event => {
    console.log('Blue circle: Come back!');
  });

  // When “button 1” is clicked, remove all shapes.
  $('#button-1').on('click', event => {
    $('.shape').remove()
  })


  // Exercise: Practice
  // When “button 2” is clicked, disable “button 2”. (set the “disabled” attribute to true)
  $('#button-2').on('click', event => {
    $(event.currentTarget).attr("disabled", "disabled")
  })
  // When “button 3” is clicked, set the button message to “Button 3 was clicked”
  $('#button-3').on('click', event => {
    $('#button-message').html('Button 3 was clicked!')
  })

  // When your mouse enters any “tr”, add the “highlight” to it.
  $('tr').on('mouseenter', event => {
    $(event.currentTarget).addClass('highlight');
  })

  // When your mouse leaves any “tr”, remove the “highlight” class from it.
  $('tr').on('mouseleave', event => {
    $(event.currentTarget).removeClass('highlight');
  })
})



















// bump
