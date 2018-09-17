const express = require('express')();

const renderStream = require('./render-stream.js')


express.all('/', ((req, res) => {
    res.set({
        'Content-Type': 'text/html',
    })
    renderStream().pipe(res);
}));


express.listen(6666);
