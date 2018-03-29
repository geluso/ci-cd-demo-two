require('dotenv').config();

const express = require('express');
const app = express();

// connect MongoDB to MLabs after simpler proven deployment
// const mongoose = require('mongoose');
// mongoose.connect(process.env.MONGODB_URI);
// const User = require('./models/user');

const USERNAME = 'admin';
const PASSWORD = 'opensesame';

app.get('/', (req, res) => {
  res.send('Welcome! Try to access <a href="/secret">/secret</a> to see a secret recipe!');
});

app.get('/secret', (req, res) => {
  let authHeader = req.get('Authorization');
  console.log('header:', authHeader);
  if (!authHeader) {
    res.status(401);
    res.send('Must provide username/password');
    return;
  } 

  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  console.log('username/password:', username, password);
  // User.findOne({username: username})
  // .then(user => {
  //   console.log('found user:', user);
  //   if (username === user.username && password === user.passwordHash) {
  //     res.send('Secret Recipe.');
  //   } else {
  //     res.send('Incorrect username or password.');
  //   }
  // });
  if (username === USERNAME && password === PASSWORD) {
    res.send('Secret Recipe.');
  } else {
    res.send('Incorrect username or password.');
  }
});

// User.remove()
// .then(() => {
//   let admin = new User({
//     username: USERNAME,
//     email: 'admin@admin.com',
//     passwordHash: PASSWORD
//   });
//   return admin.save();
// })
// .then(() => {
//   const PORT = process.env.PORT;
//   app.listen(PORT, () => {
//     console.log('http://localhost:' + PORT);
//   });
// })
//

const PORT = process.env.PORT || 3000;
const server = module.exports = app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

server.isRunning = true;
