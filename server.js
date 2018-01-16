const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send(todos);
  }, (e) => {
    res.status(400).send(e);
  })
});

var date = new Date();
var month = date.getMonth();
var year = date.getFullYear();



var todo1 = new Todo({
  id: 'User1',
  title: 'Complete task 1',
  start: new Date(year,month,16),
  priority: 'high'
});


var todo2 = new Todo({
  id: 'User1',
  title: 'Complete task 2',
  start: new Date(year,month,21),
  priority: 'medium'
});

var todo3 = new Todo({
  id: 'User2',
  title: 'Complete task 3',
  start: new Date(year,month,25),
  priority: 'high'
});

var todo4 = new Todo({
  id: 'User3',
  title: 'Complete task 4',
  start: new Date(year,month,27)
});

todo1.save();
todo2.save();
todo3.save();
todo4.save();

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
