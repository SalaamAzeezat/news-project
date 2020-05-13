const dotenv = require('dotenv');
dotenv.config();

var path = require('path')
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


var aylien = require('aylien_textapi');
var textapi = new aylien({
    application_id: process.env.API_ID,
    application_key: process.env.API_KEY
});

const app = express()
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// Callback function to complete GET '/sentiment'
app.get('/sentiment', function (req, res) {
    let aylienData = [];
    textapi.sentiment({
        text: formText,
        mode: 'document'
    },
    function (error, response) {
        if (error === null) {
            console.log(response)
            res.send(response);

        } 
    }
    );
})
app.post('/add', addData);

function addData(req, res) {
    aylienData.push({ 'polarity': req.body.polarity, 'polarity_confidence': req.body.polarity_confidence, 'text': req.body.formText })
}

module.exports = app;
