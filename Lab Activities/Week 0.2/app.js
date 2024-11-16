const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');

const hostname = 'localhost';
const port = 3000;

// Dummy user data
const users = ["Jude", "Amali", "John", "Henry"];

// Function to read the HTML template and inject the user list
const renderPage = (usersList, page, res) => {
  // Try to read the HTML template file
  fs.readFile(page, 'utf-8', (err, template) => {
    if (err) {
      console.error('Error reading the template file:', err);
      res.statusCode = 500;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>500 Internal Server Error</h1><p>There was an error loading the page.</p>');
      return;
    }

    // Generating the user list HTML
    const userListHTML = usersList.map(user => `<li>${user}</li>`).join('');

    // Replacing the {{userList}} placeholder with the actual user list
    const pageContent = template.replace('{{userList}}', userListHTML);

    // Sending the rendered page content as the response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(pageContent);
  });
};


//server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const method = req.method;

  // Route handling
  if (parsedUrl.pathname === '/') {
    if (method === 'GET') {
      // Generating the HTML page with the user list
      renderPage(users, './index.html', res);
    } else {
      // Handling unsupported methods for this route
      res.statusCode = 405; 
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>405 Method Not Allowed</h1><p>The method you used is not allowed for this route.</p>');
    }
  } else if (parsedUrl.pathname === '/users') {
    if (method === 'GET') {
        //Render users page
        renderPage(users, './users.html', res);
    } else {
      // Handling unsupported methods for '/users' route
      res.statusCode = 405;
      res.setHeader('Content-Type', 'text/html');
      res.end('<h1>405 Method Not Allowed</h1><p>GET method is the only allowed method for /users.</p>');
    }
  } else if (parsedUrl.pathname === '/create-user' && method === 'POST') {
    // Parse POST data (form submission)
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        // Parsing the username from the form data
        const parsedBody = querystring.parse(body);
        const username = parsedBody.username;

        // Checking if the username is empty or invalid
        if (!username || username.trim() === '') {
          res.statusCode = 400; // Bad Request
          res.setHeader('Content-Type', 'text/html');
          res.end('<h1>400 Bad Request</h1><p>Username cannot be empty.</p>');
          return;
        }

        // Log the new username to the console
        console.log('New user created:', username);

        // Add the new user to the users array
        users.push(username);

        // Redirect back to the root page ("/")
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
      } catch (err) {
        // Handle errors in parsing or other issues
        console.error('Error parsing form data:', err);
        res.statusCode = 500;
        res.setHeader('Content-Type', 'text/html');
        res.end('<h1>500 Internal Server Error</h1><p>There was an error processing your request.</p>');
      }
    });
  } else {
    // Handling 404 Not Found
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/html');
    res.end('<h1>404 Not Found</h1><p>The requested resource could not be found on this server.</p>');
  }
});

//Starting the server
server.listen(port, hostname, () => {
  console.log(`Server spinning at http://${hostname}:${port}/`);
});
