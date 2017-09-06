const express = require('express')
const app = express()
var port = process.env.PORT || 8080

const handler = require('./index').handler

app.get('/', function (req, res) {
  // match AWS lambda style
  handler(req, {}, function(event, context) {
    res.status(context.statusCode).send(context.body)
  });
})

app.listen(port, function () {
  console.log('App listening on port '+port)
})