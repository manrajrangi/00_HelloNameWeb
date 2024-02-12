let template = require('./template')
let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
const port = 3001;
// serve static files



let names = []; // Array to store names

app.get('/', (req, res) => {
  let greeting = `<h1>Hello World!</h1>`;
  let namesList = '';
  if (names.length > 0) {
    namesList = '<ul>';
    for (let name of names) {
      namesList += `<li>${name}</li>`;
    }
    namesList += '</ul>';
  }
// this injects the greeting and namesList into the template
  let page = template(greeting, namesList); 
  res.send(page);
});

app.post('/submit-name', (req, res) => {
  const name = req.body.username;
  names.push(name);
  // Code here to save name
  res.send('<h1>Thank you ${name}!</h1>');
  //res.redirect('/');
});
// New route to list all names
app.get('/names', (req, res) => {
  let namesList = '<ul>';
  for (let name of names) {
    namesList += `<li>${name}</li>`;
  }
  namesList += '</ul>';

  res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Name List</title>
      </head>
      <body>
          <h1>All Names</h1>
          ${namesList}
          <p><a href="/">Back</a></p>
      </body>
      </html>
    `);
});

// New route to list all names - Notice use of template literals ` ` to create string
app.get('/names2', (req, res) => {
  let namesList = '<ul>';
  for (let name of names) {
    namesList += `<li>${name}</li>`;
  }
  namesList += '</ul>';
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Name List</title>
    </head>
    <body>
        <h1>All Names</h1>
        ${namesList}
        <p><a href="/">Back</a></p>
    </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
