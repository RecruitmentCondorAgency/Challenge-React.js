var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const ogs = require('open-graph-scraper');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use('/proxy', (req,res)=>{

    const options = { url: req.query.link, timeout: 10000 };
    ogs(options).then((data) => {
        const { error, result, response } = data;
        if(error){
            console.error(error);
            res.status(500).json(error);
        }
        res.json(result);
    }).catch((error)=>{
        console.error(error);
        res.status(400).json('Try Again Later');
    })
    
});

module.exports = app;
