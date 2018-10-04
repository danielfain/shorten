const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

const port = process.env.port || 4200;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public'));


app.listen(port, (req, res) => {
    console.log('Listening on port', port);
});