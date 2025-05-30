const express = require('express');
const crypto = require('crypto');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/signin', (req, res) => {
  const { password , username} = req.body;
  const data = {
    username: username,
    password: password
  }
  // check from database
  if (!password) return res.status(400).send('Password required');
  const hash = crypto.createHmac('sha256',"8273asdfb",data).digest('hex');
  // hased  value 
  res.send(`Hashed value: ${hash}`);
});

app.get('/protected', (req, res) => {
  const hash = req.body.hash; 
  const data ={
    username:"hira",
    password:"1234"
  }
  const hash2 = crypto.createHmac('sha256',"8273asdfb",data).digest('hex');
  if (hash === hash2) {
    res.send(`Hello ${data.username}, you have access to this protected route!`);
  } else {
    res.status(401).send('Unauthorized');
  }
});



app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});