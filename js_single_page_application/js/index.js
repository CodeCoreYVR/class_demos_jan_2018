

DOMAIN = 'localhost:3000';
API_PREFIX = '/api/v1';
BASE_URL = `http://${DOMAIN}${API_PREFIX}`;
JWT = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MjMsImZpcnN0X25hbWUiOiJKb24iLCJsYXN0X25hbWUiOiJTbm93IiwiZnVsbF9uYW1lIjoiSm9uIFNub3cifQ.wiMp0k9iaILq6aMVxOVc-X218ZPTW4keo2MWIkkTukQ';

// HTTP REQUESTS


const Question = {
  all () {
    return fetch(
      `${BASE_URL}/questions`,
      {
        headers: {
          'Authorization': JWT
        }
      }
    )
      .then(res => res.json());
  },
  one (id) {
    return fetch(
      `${BASE_URL}/questions/${id}`,
      {
        headers: {
          'Authorization': JWT
        }
      }
    )
      .then(res => res.json());
  },
  create (params) {
    return fetch(
      `${BASE_URL}/questions`,
      {
        headers: {
          'Authorization': JWT,
          'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify(params)
      }
    )
      .then(res => res.json())
  }
}



// DOM MANIPULATION

// UTILITY FUNCTIONS
function qS (query, node = document) {
  return node.querySelector(query);
}

function qSA (query, node = document) {
  return node.querySelectorAll(query);
}

function byId (id) {
  // When search the document for nodes,
  // document.getElementById is the fastest method, but
  // it only works for ids.
  return document.getElementById(id);
}

// RENDER FUNCTIONS

function renderQuestionShow (question) {
  const questionHTML = `
    <h1>${question.title}</h2>
    <p>${question.body}</p>
    <p>By ${question.author.full_name}</p>
    <p>Created at: ${question.created_at}</p>
  `
  // With .innerHTML, we can easily generate
  // a bunch HTML in text and put it in the DOM.
  // However, it comes at great risk. If you are using
  // to show content created by users, it will not safely
  // escape the content they write. This means that they could
  // write a script tag for a question title and that
  // will execute.
  byId('question-show').innerHTML = questionHTML;
}

function navigateTo (pageId) {
  // This function will iterate over all nodes
  // with the ".page" class. In the process,
  // it will show the node with id equal to pageId
  // and hide the rest.

  qSA('.page').forEach(pageNode => {
    if (pageNode.id === pageId) {
      pageNode.classList.add('visible')
    } else {
      pageNode.classList.remove('visible')
    }
  })
}

function refreshQuestionIndex () {
  // Initial page fetch to show questions
  Question
    .all()
    .then(questions => {
      const questionNodes = questions.map(
        question => {
          const q = document.createElement('div');

          const qAnchor = document.createElement('a');
          qAnchor.href = '';
          qAnchor.classList.add('question-link');
          // qAnchor.setAttribute('data-id', question.id);
          // Setting HTML prefixed with "data-" is such a
          // common pattern that there's a special property
          // on nodes for accessing and creating such
          // attributes, .dataset.
          // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset

          qAnchor.dataset.id = question.id;
          qAnchor.innerText = question.title;

          q.append(qAnchor);

          return q;
        }
      )
      // .append() is used to add nodes as children of
      // a parent node. It can take any number of arguments.
      // Each must be either a string or a Node. Then, it
      // will append in order to the end of the children
      // of a parent node.

      // Using the `...` (spread) operator, we can apply
      // all nodes from an array as arguments to append.


      const questionIndex = byId('question-index');
      questionIndex.innerHTML = '';
      questionIndex.append(...questionNodes);
    })
}

document.addEventListener('DOMContentLoaded', () => {
  const questionIndex = byId('question-index');

  refreshQuestionIndex();
  // Click listener to display show page for question
  questionIndex.addEventListener('click', event => {
    const {target} = event;

    if (target.matches('.question-link')) {
      event.preventDefault();
      const questionId = target.dataset.id;

      Question
        .one(questionId)
        .then(
          question => {
            renderQuestionShow(question);
            navigateTo('question-show');
          }
        )
    }
  })

  // Navbar click listener
  qS('nav').addEventListener('click', event => {
    const {target} = event;

    if (target.matches('a[href]')) {
      event.preventDefault();

      const pageId = target.dataset.target;
      navigateTo(pageId);
    }
  });

  // Handler for submitting new questions
  byId('question-new-form').addEventListener('submit', event => {
    event.preventDefault();
    const {currentTarget} = event;
    const formData = new FormData(currentTarget);

    Question
      .create({
        title: formData.get('title'),
        body: formData.get('body')
      })
      .then(({id}) => {
        return Question.one(id);
      })
      .then(question => {
        currentTarget.reset();
        refreshQuestionIndex();
        renderQuestionShow(question);
        navigateTo('question-show');
      })
  })
});





//
