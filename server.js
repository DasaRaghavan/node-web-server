const express = require('express');

var app = express();
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: (res, path, stat) => {
    res.set('x-timestamp', Date.now())
  }
}
app.use(express.static((__dirname + '/public'), options));

app.get('/', (req, res) => {
  //res.send('<h1>Hello! World! This is express!</h1>');
  res.send({
    name: 'Dasa',
    likes: [{
      activities: 'running',
      hobbies: 'movies'
    },
    'Marathons']
  });
});

app.get('/about', (req, res) => {
  res.send('<h2>About Page</h2>');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to complete request'
  });
});

app.listen('3030', () => {
  console.log('Server started on port 3000');
});
