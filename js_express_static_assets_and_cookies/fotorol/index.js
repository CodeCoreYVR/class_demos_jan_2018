const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('colors'); // Adds methods to the String prototype


console.log(__dirname);

// When we require 'expres', we get a function
// that generates an instance of an express app.
// This object will be used build a web server.
const app = express();
app.set('view engine', 'ejs');

app.use(logger('dev'));
// Use path.join to combine strings into directory paths.
// Example: path.join('fotorol', 'public') -> 'fotorol/public'

// __dirname is a global variable available only in Node. It
// gives the full beginning the root of the computer to
// the file using __dirname.
app.use(express.static(path.join(__dirname, 'public')));
// app.use is similar to app.get, but it works for all
// HTTP verbs (e.g. POST, GET, UPDATE, DELETE, etc)

// urlencoded is data format that
// looks like -> fullName=Steve+Godin&message=+Hello%21
app.use(bodyParser.urlencoded({extended: true}));

// When a path is not specified for app.use,
// the route will match for all paths.
// In other words, the middleware function will run regardless
// of the URL the client asked for.
/*
app.use((request, response, next) => {
  console.log(
    `${request.method.bold.blue} – ${request.path.underline} –  ${new Date().toString()}`
  );
  // `next` (3rd argument in a middleware function) is a function
  // that tells Express to move on to the next middleware function
  // in line when it is called. If you forget to call `next`, the
  // will never get a response back which means it will keep waiting
  // until it timeouts.
  next();
});
*/
// URL http://www.example.com/home/index
//          | Domain        | Path     |

const home = (request, response) => {
  // The `request` argument is an object that contains information
  // from the client. It's composed of an HTTP header and, possibly,
  // a body that holds data. It represents what a client asks of
  // a server.

  // The `response` argument is an object that will hold the servers
  // reply to the client. It will contain an HTTP header and, possibly,
  // a body which would hold data such an HTML page.
  // response.send('Welcome home, Bob!!!');

  // Use response.render to send a template as the body of a response.
  // response.render will, by default, look for templates inside of
  // the /views directory. As its first argument, you must provide
  // a string that is a path to the template beginning from the
  // /views directory.
  response.render('home');
};

// To respond to a request for URL from a client,
// use app.get which takes two arguments:
// - A path to match.
// - A callback that gets a request and a response argument
//   in that order.
app.get('/', home);
app.get('/home', home);

// HTTP VERB: GET, PATH: /contact_us
app.get('/contact_us', (request, response) => {
  // To get form data from a form using the GET method, use
  // request.query. All the form data will be available as a
  // JavaScript object where each property corresponds
  // to an input from the form with a name equivalent to the
  // name attribute of the input and each value
  // corresponds to what the user typed in the relevant input.
  console.log(request.query)
  response.render('contact_us');
});

// HTTP VERB: POST, PATH: /contact_us
app.post('/contact_us', (request, response) => {
  // Data coming from a form using the method POST will be
  // available on the property "body" of request.
  // It will only be set if bodyParser is installed and configured
  // correctly.
  console.log(request.body);
  const body = request.body;
  const fullName = body.fullName;
  const message = body.message;
  // All properties of the object passed as a second argument to
  // response.render will be available inside the rendered template
  // as local variables.

  const numbers = [1,2,3,4,5];
  response.render(
    'thank_you',
    {fullName: fullName, message: message, numbers: numbers}
  );
});

const DOMAIN = 'localhost';
const PORT = 3002;
// Use the app.listen to start a server. Until listen is called, the
// is merely declared and not running.
app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listenning on http://${DOMAIN}:${PORT}`);
});




// bump
