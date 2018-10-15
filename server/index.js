const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const urls = require('./db/urls');

const port = process.env.port || 8081;

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(express.static('./public'));

app.post('/api/urls', async (req, res) => {
    try {
        const url = await urls.create(req.body);
        res.json(url);
    } catch (error) {
        res.status(500);
        res.json(error);
    }
});

app.get('/:id', async (req, res) => {
    const url = await urls.find(req.params.id);
    if (url) {
        res.redirect(url.url);
    } else {
        res.redirect('/404.html');
    }
});

app.listen(port, (req, res) => {
    console.log('Listening on port', port);
});