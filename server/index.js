const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const urls = require('./db/urls');

const port = process.env.port || 4200;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.post('/api/urls', async (req, res) => {
    console.log(req.body);
    try {
        const url = await urls.create(req.body);
        res.json(url);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
});

app.listen(port, (req, res) => {
    console.log('Listening on port', port);
});