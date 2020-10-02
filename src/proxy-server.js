const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const SERVER_PORT = process.env.PORT || 4444;

app.post('/health', cors(), function (_, res) {
   return res.status(200).json({ status: 'OK' })
});

app.get('/*', cors(), function(req, res){
    const url = `https://raw.github.com/${req.params[0].replace('blob/', '')}`;

    request.get({url:url, json:true}, function(err, resp, body) {
        res.jsonp(body);
    });
});

app.listen(SERVER_PORT, () => {
    console.log('app server started on port: ', SERVER_PORT);
});
