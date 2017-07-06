const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const models = require('./models')

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

// GET /api/todos/ - return a JSON array of todo items
app.get('/api/todos/', function(req, res){
models.todo.findAll().then((todos) => {
  res.json(todos);
}).catch((err) => {
  console.log("error " + err.message);
})
})

// POST /api/todos/ - post a JSON representation of a todo and have it saved.
// Returns the saved todo item in JSON.
app.post('/api/todos/', function(req, res){
  models.todo.
})

// GET /api/todos[/id] - get a specific todo item.
app.get('/api/todos/:id', function(req, res){
  const id = req.params.id;
  models.todo.find({
    where: { id: id}
  })
  .then(todos => {
    res.json(todos);
  })
})

// PUT /api/todos[/id] - update a todo item. Returns the modified todo item.

// PATCH /api/todos[/id] - partially update a todo item. Returns the modified todo item.
app.patch('/api/todos/:id', function(req, res){
  const id = req.params.id;
  const updates = req.body.updates;
  models.todo.find({
    where: { id: id }
  })
  .then(todos => {
    return todos.updateAttributes(updates)
  })
  .then(updatedtodos => {
    res.json(updatedtodos);
  })
})
// DELETE /api/todos[/id] - deletes a todo item. Returns the todo item that was deleted.
app.delete('/api/todos/:id', function(req, res){
  const id = req.params.id;
  models.todo.destroy({
    where: { id: id}
  })
  .then(deletedtodos => {
    res.json(deletedtodos)
  })
})
app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
