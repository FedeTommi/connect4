var express = require('express')
var app = express()
const path = require('path')

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname, './index.html'))
})

app.get('/miao', function(req, res){
   res.send("<h1>Miaaaaaaoooooo!!!!</h1>")
})

app.listen(1234)