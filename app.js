const express = require('express')
const app = express()

const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const todos = ['Wash the car']
console.log(todos)

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))

app.get('/', function(req, res) {
  res.render('home', { todos: todos })
})

app.post('/', function(req, res) {
  todos.push(req.body.todo)
  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Magic is happening on port 3000')
})
