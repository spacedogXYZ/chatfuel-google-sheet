const express = require('express')
const app = express()
const bodyParser = require('body-parser');

var port = process.env.PORT || 8080
app.use(bodyParser.urlencoded({
  extended: true
}))

const chatfuelHandler = require('./index').handler

app.post('/', function (req, res) {
  // match AWS lambda style
  chatfuelHandler(req, {}, function(event, context) {
    res.status(context.statusCode).send(context.body)
  })
})

app.listen(port, function () {
  console.log('App listening on port '+port)
})