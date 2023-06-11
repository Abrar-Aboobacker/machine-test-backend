if(process.env.NODE_ENV !=='production'){
    require('dotenv').config()
}
const cors = require('cors') ;
const express = require('express');
const dbConfig = require('./config/dbConfig');
const bodyParser = require("body-parser");
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({limit: '300kb'}));
app.use(cors({
    origin: '*',
    methods:["GET","POST"],
    credentials:true,
}))

app.use(express.static(__dirname + '/public'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });
const port = process.env.PORT ||3001
const server = app.listen(port,()=>console.log('listening on port ' + port));
