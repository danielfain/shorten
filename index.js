const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const port = process.env.port || 4200;

app.get('/', (req, res) => {
    res.send('it works');
});

app.listen(port, (req, res) => {
    console.log('Listening on port', port);
});