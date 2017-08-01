const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')

const jsonfile = require('jsonfile')

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
//from package website
let data = jsonfile.readFileSync('./todolist.json')

let todos = data.todos
let done = data.done

app.get('/', function(req, res) {
  res.render('home', { todos, done })
})

app.post('/', function(req, res) {
  todos.push(req.body.addHere)
  jsonfile.writeFile('./todolist.json', { todos, done }) //stores data on the server forever!
  res.redirect('/')
})

app.post('/completed', function(req, res) {
  // trying to push "const done" to the ul
  done.push(req.body.done)
  // want remove from todos

  todos = todos.filter(task => {
    return task !== req.body.done
  })

  jsonfile.writeFile('./todolist.json', { todos, done })
  //const indexOfItem = todos.indexOf(done)

  res.redirect('/')
})

app.listen(3000, () => {
  console.log('Magic is happening on port 3000')
})
