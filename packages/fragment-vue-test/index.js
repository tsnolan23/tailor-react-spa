const express = require('express')();
const { createReadStream } = require('fs')

const renderStream = require('./render-stream.js')
const bundleStream = createReadStream('./dist/bundle.js');


express.all('/', ((req, res) => {
    res.set({
        'Content-Type': 'text/html',
        'Link': '<http://localhost:5666/dist/bundle.js>; rel="fragment-script"' // https://www.w3.org/wiki/LinkHeader
    })
    renderStream().pipe(res);
}));

express.all('/dist/bundle.js', (req, res) => {
	res.set({ 'Content-Type': 'application/javascript' });
	bundleStream.pipe(res);
});


express.listen(5666);
