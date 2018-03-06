// Write chatr code here!

// Chatr-express supports CRUD for message model
// with the following actions:

// columns for messages are:
// - content:text
// - flagged:bool
// - id:int
// - username:string
// - created_at:datetime
// - update_at:datetime

// messages#index GET /messages
// messages#create POST /messages
// messages#update PATCH /messages
// messages#destroy DELETE /messages/:id

// Using Fetch


// Making a GET request

// fetch is a function that is part of the browser API.
// Like setTimeout, it's asynchronous. Use it to
// make HTTP requests and receive the response
// in a promise it returns.

// By default, fetch will make a GET request to the
// URL given in the first argument. It can optionally
// take an object as a second argument to further configure
// the request.

/*
fetch('/messages')
	.then(response => response.text())
  .then(text => console.log(text))

fetch('/messages')
	.then(response => response.json())
  .then(data => console.log(data))
*/

// Making a POST request
// Unlike  a GET request, we need specify options when
// making a POST request.

// Pass an object as second argument where you
// define headers, the method and the body.
/*
fetch(
	'/messages',
  {
  // When sending JSON, we should specify
  // in headers the type content our request is sending
  // using the header 'Content-Type'.
	headers: {
		'Content-Type' : 'application/json'
  },
	method: 'POST',
  // You can send any JavaScript data type as JSON datatype
  // by calling the method JSON.stringify() on it.
  // This will take the object and turn into a JSON string.
  // Make sure to do this on any data you want to send with
  // a fetch request.
	body: JSON.stringify({
		content: 'My new message'
  })
})
*/

// Making a DELETE request
// To make delete request, you must specify the method
// 'DELETE' in the option object as a second argument to fetch.
// Typically making a DELETE to a REST API requires
// that the id of the resource that must be delete
// is given in the URL.

/*
fetch(
  '/messages/16',
  {
    method: 'DELETE'
  }
)
*/

// AJAX Helpers

function deleteMessage (id) {
  return fetch(
    `/messages/${id}`,
    {
      method: 'DELETE'
    }
  )
}

function createMessage (message) {
  return fetch(
    `/messages`,
    {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify(message)
    }
  )
}


function renderMessages (messages = []) {
  return messages
    .map(message => `
      <li>
        <p>
          <strong>${message.id}</strong>
          ${message.content}
        </p>
        <a data-id="${message.id}" class="delete-button" href>
          Delete
        </a>
      </li>
    `)
    .join('')
}


function refreshMessages (node) {
  fetch('/messages')
  .then(res => res.json())
  .then(messages => {
    node.innerHTML = renderMessages(messages);
  })
}

document.addEventListener('DOMContentLoaded', () => {
  const messagesUl = document.querySelector('#messages');
  const newMessageForm = document.querySelector('#new-message');

  // Every second, re-render the messages inside
  // of the ul#message node
  setInterval(
    () => refreshMessages(messagesUl),
    1000
  )

  newMessageForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    createMessage({
      content: formData.get('content')
    })
      .then(() => refreshMessages(messagesUl))
  })

  // The `.delete-button`s are not on the page initially
  // or event after the dom content is loaded. Once they
  // appear, they're constantly replaced every second.
  // Yet we need to be able to listen to clicks on them.

  // It would be an inefficient strategy to create the
  // event listener on delete-button everytime they're
  // re-created. It would take up a lot of memory.

  // Instead, we'll listen for clicks on an ancestor
  // that is on the page from the beginning and is
  // never removed. When a one of its descendents is
  // clicked, we'll check the target of the event.
  // If the target is the `.delete-button`, we'll
  // do something otherwise we'll do nothing.

  // This is called event delegation.
  messagesUl.addEventListener('click', event => {
    const {target} = event;

    if (target.matches('.delete-button')) {
      event.preventDefault();
      const messageId = target.getAttribute('data-id');
      deleteMessage(messageId)
        .then(() => {
          refreshMessages(messagesUl)
        })
    }
  })
})


// Chat-Battle Solutions

function createMessage (text) {
  return fetch(
    '/messages',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({body: text})
    }
  )
}

function countMessages () {
  return fetch('/messages')
    .then(res => res.json())
    .then(messages => messages.length)
}

function replaceMessage (id, text) {
  return fetch(
    `/messages/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({body: text})
    }
  )
}

function deleteMessage (id) {
  return fetch(
    `/messages/${id}`,
    {
      method: 'DELETE'
    }
  )
}

 function copyMessage (id) {
   return fetch(`/messages`)
    .then(res => res.json())
    .then(messages => {
      const message = messages.find(m => m.id === id);
      return createMessage(message.body);
    })
 }




//
