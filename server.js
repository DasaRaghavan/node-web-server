const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3030

var app = express();
var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['htm', 'html', 'hbs'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: (res, path, stat) => {
    res.set('x-timestamp', Date.now())
  }
}


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase(); //new Date().getFullYear();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//     pageTitle: 'Maintenance Page',
//     welcomeMessage: 'This page is under construction ...'
//   });
// });

app.use(express.static((__dirname + '/public'), options));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log', log+'\n', (err) => {
    if (err) {
      console.log('Unable to write server.log' + err)
    }
  });
  console.log(log);
  next();
});

app.get('/', (req, res) => {
  //res.send('<h1>Hello! World! This is express!</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Some Website'
  });
});

app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Portfolio Page',
    projectsMessage: 'This is the Portfolio Page'
  });
});


app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
    aboutMessage: 'This is the about Page'

  });
});



app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to complete request'
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
