const express = require('express');
const app = express();
const Parse = require('Parse/node');
const bodyParser = require('body-parser');
const port = 3000;
const urlPath = 'localhost:3000';


Parse.initialize('WXh6FMIyi8T1oNYks1rbe93kypWJjOilO5YZStC6', 'gjqGO7tI7vGlOgin8jP2GHYn2elgMs9SOE8incRv');
Parse.serverURL = 'https://parseapi.back4app.com/';

app.listen(port, () => console.log(`App listening on port ${port}`));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('../'));


// Routes

app.get('/', (req, res) => {
    res.redirect('../alenaIndex.html'); 
});
app.post('/makeEntry', (req, res) => {
    console.log('Hit');
   var Entry = Parse.Object.extend('Entry');
   var entry = new Entry();
    
    entry.set('msg', res.body.msg);
    entry.set('section', res.body.section);
    entry.set('author', res.body.name);
    entry.set('section', res.body.section);
    
    entry.save()
        .then(e => console.log('Saved')).catch(error => console.log('Error: ', error));
});

//app.get('/basic', (req, res) => {
//    res.send('asdf'); 
//});