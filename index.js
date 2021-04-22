const express = require('express')
const morgan = require('morgan')
const app = express()
app.use(express.json())
morgan.token('body',  (request, response) => (JSON.stringify(request.body)))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
//morgan.token('cont', (request, response) => response.content)

//morgan('tiny')
let persons = [
    {
    id: 1,
    name: "Arman Hakobyan",
    number: "6-23-98"
    },
    {
    id: 2,
    name: "Armine Karapetyan",
    number: "6-33-00"
    },
    {
    id: 3,
    name: "Artavazd Manukyan",
    number: "6-00-97",
    },
    {
    id: 4,
    name: "Suren Sargsyan",
    number: "6-23-76"
    },
    {
    id: 5,
    name: "Jani Koskinen",
    number: "040-555-555"
    }
]

app.get('/api/persons/', (request, response) => {

  if(persons){
    response.json(persons)
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons/:id', (request, response) => {

    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    if(person){
      response.json(person)
    } else {
      response.status(404).end()
    }
  })

  app.get('/info', (request, response) => {
    if(persons){
      const content = [
        `Phonebook has info for ${persons.length} people`,
         Date()
        ]
      response.json(content)
    } else {
      response.status(404).end()
    }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    if(id){
    persons = persons.filter(note => note.id !== id)
    }
    response.status(204).end()
  })

  app.post('/api/persons/', (request, response) => {
    const body = request.body
    const uniqueName = (current) => current.name != body.name
    const newName = persons.every(uniqueName)
    const newNumber = persons.every((currentNumber) => currentNumber.number != body.number )
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }
    if (!body.number) {
      return response.status(400).json({ 
        error: 'number missing' 
      })
    }
    if (!newName) {
      return response.status(400).json({ 
        error: 'name must be unique' 
      })
    }
    if (!newNumber) {
      return response.status(400).json({ 
        error: 'number already exists' 
      })
    }
  
    get_rendom_id = (max, min) =>{
      max = Math.floor(max)
      min = Math.ceil(min)
      const rand = Math.floor(Math.random() * (max - min) + min)
      return(rand)
    }
    const person = {
      id : get_rendom_id(1000, 5),
      name: body.name,
      number: body.number
    }
    
    persons = persons.concat(person)
    response.json(persons)
  
  })
  const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)