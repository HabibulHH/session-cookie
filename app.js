const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require('cookie-parser');

const session = require('express-session');
app.use(cookieParser());

app.use(
  session({
    secret: 'signature', // Change this to a strong secret in production
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 900000, httpOnly: true }
  })
);


app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username) return res.status(400).send('Username required');
  req.session.username = username;
  req.session.loggedIn = true;
  res.send('Logged in with session');
});


app.get('/protected', (req, res) => {
  if (req.session.loggedIn) {
    res.send(`Hello ${req.session.username}, you have access to this protected route!`);
  } else {
    res.status(401).send('Unauthorized');
  }
});

app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send('Logged out');
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});