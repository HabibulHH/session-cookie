const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

app.use(cookieParser());

// 1koti users
// 1gb 1mb
const sessionstorage = {};

app.post('/login', (req, res) => {
  const { username } = req.body;
  //res.setHeader('Set-Cookie', `name=${username}; HttpOnly; Max-Age=900`);
  res.cookie('name', username, { maxAge: 900000, httpOnly: true });
  sessionstorage[username] = { loggedIn: true };
  res.send('Cookie is set');
});

app.get('/protected', (req, res) => {
  const { name } = req.cookies;
  if (sessionstorage[name] && sessionstorage[name].loggedIn) {
    res.send(`Hello ${name}, you have access to this protected route!`);
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});