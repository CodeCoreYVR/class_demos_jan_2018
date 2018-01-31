const express = require('express');

// When we require 'expres', we get a function
// that generates an instance of an express app.
// This object will be used build a web server.
const app = express();

// URL http://www.example.com/home/index
//          | Domain        | Path     |

// To respond to a request for URL from a client,
// use app.get which takes two arguments:
// - A path to match.
// - A callback that gets a request and a response argument
//   in that order.
app.get('/home', (request, response) => {
  // The `request` argument is an object that contains information
  // from the client. It's composed of an HTTP header and, possibly,
  // a body that holds data. It represents what a client asks of
  // a server.

  // The `response` argument is an object that will hold the servers
  // reply to the client. It will contain an HTTP header and, possibly,
  // a body which would hold data such an HTML page.
  response.send('Welcome home, Bob!');
});

const DOMAIN = 'localhost';
const PORT = 3002;
// Use the app.listen to start a server. Until listen is called, the
// is merely declared and not running.
app.listen(PORT, DOMAIN, () => {
  console.log(`💻 Server listenning on http://${DOMAIN}:${PORT}`);
});




// bump
