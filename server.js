const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();
var uniqid = require('uniqid');
const data = require('./db/db.json');
const fs = require('fs');
const router = express.Router();

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
  const note = data;
 // add unique identifier to JSON object
  var id = uniqid();
  data.push({ 'id': id, 'title': req.body.title, 'text': req.body.text });
  
  fs.writeFile('./db/db.json', JSON.stringify(note), (err)=> {
    if (err) console.log('did not work');
    
  });
  
  console.log(req.body);
  
});




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });