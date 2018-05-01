//Setup
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const app = express();
let db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Get
app.get('/', (req, res) => {
   res.send('Welcome to the API!');
});

app.get('/to-do', (req, res) => {
    db.collection('to-do-lists').find().toArray((err, result) => {
        if(err) return console.log(err);
        res.send(result);
    });
});

//Post
app.post('/to-do', (req, res) => {
    db.collection('to-do-lists').save(req.body, (err, result) => {
        if(err) return console.log(err);
        console.log('Saved to database');
        res.redirect('/');
    });
});

//Database connection
MongoClient.connect('mongodb://vineetakandala:password@ds161539.mlab.com:61539/to-do-lists', (err, client) => {
    if(err) return console.log(err);

    db = client.db('to-do-lists');

    app.listen(4200, () => {
        console.log('listening on 4200');
    });
});

