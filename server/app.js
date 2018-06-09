const morgan = require('morgan');
const express = require('express');
const axios = require('axios');
const app = express();
const cache = {
    url: null,
    data:null
}

app.use(morgan('dev'));

app.get('/', function(req, res) {

if(req.query.t) {

    if(cache.url === req.query.t) {
        res.send(cache.data)
    }

    axios.get('http://www.omdbapi.com/?t=' + encodeURIComponent(req.query.t) +'&apikey=8730e0e')
    .then (response => {
        cache.data = response.data
        cache.url = req.query.t
        res.json(response.data)
        })
        .catch(err => res.json(err.message));

    }
     else if  (req.query.i) {
    
    if(cache.url === req.query.i) {
            res.send(cache.data);
        }
        axios.get('http://www.omdbapi.com/?i=' + req.query.i +'&apikey=8730e0e')
        .then (response => {
            cache.data = response.data;
            cache.url = req.query.i;
            res.json(response.data);
            })
            .catch(err => res.json(err.message));
        }
    else res.json({});
})

module.exports = app;