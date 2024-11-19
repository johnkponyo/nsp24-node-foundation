const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;


// Dummy user data
let users = ["Jude", "Amali", "John", "Henry"];


// Middleware to parse url-encoded form data
app.use(express.urlencoded({ extended: true }));


// Function to read the HTML template and inject the user list
const renderPage = (usersList, page, res) => {
  // Trying to read the HTML template file
  fs.readFile(path.join(__dirname, page), 'utf-8', (err, template) => {
    if (err) {
      console.error('Error reading the template file:', err);
      res.status(500).send('<h1>500 Internal Server Error</h1><p>There was an error loading the page.</p>');
      return;
    }

    // Generating the user list HTML
    const userListHTML = usersList.map(user => `<li>${user}</li>`).join('');

    // Replacing the {{userList}} placeholder with the actual user list
    const pageContent = template.replace('{{userList}}', userListHTML);

    // Sending the rendered page content as the response
    res.status(200).send(pageContent);
  });
};


// Route for the home page
app.get('/', (req, res) => {
  renderPage(users, 'index.html', res);
});


// Route for the /users page
app.get('/users', (req, res) => {
  renderPage(users, 'users.html', res);
});


// Route for creating a new user
app.post('/create-user', (req, res) => {
  const username = req.body.username;

  // Validating the username
  if (!username || username.trim() === '') {
    return res.status(400).send('<h1>400 Bad Request</h1><p>Username cannot be empty.</p>');
  }

  console.log('New user created:', username);
  //adding new user to the array
  users.push(username);

  // Redirecting back to the root page
  res.redirect('/');
});


// Catching all route for 404 errors
app.use((req, res) => {
  res.status(404).send('<h1>404 Not Found</h1><p>The requested resource could not be found on this server.</p>');
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
