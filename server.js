const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
var uniqid = require('uniqid');
const data = require('./db/db.json');
const fs = require('fs');

// bring in midddleware
app.use(express.json());
app.use(express.urlencoded(true));
app.use(express.static('public'));

// read what's in db.json and write it to the front end
// pull data into a route



app.get('/notes', function (req, res) {
  res.sendFile(__dirname + '/public/notes.html')
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/index.html')
});

app.get('/api/notes', function (req, res) {
  res.json(data)
});

app.post('/api/notes', function (req, res) {
  console.log(req.body.text + " line 31");
  //req.body.title
  const note = data
  data.push({ 'title': req.body.title, 'text': req.body.text });
  
  fs.appendFile('./db/db.json', JSON.stringify(note), (err)=> {
    if (err) console.log('did not work')
  });
  
  console.log(req.body)
});

app.get('/api/notes', function(req, res) {
  res.data
})

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });