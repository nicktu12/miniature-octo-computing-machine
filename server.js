const express = require("express")
const app = express()

app.set('port', process.env.PORT || 3001)
app.locals.title = "Pet Box"

app.locals.pets = [
  {id: "a1", name: "Edgar", type: "cat"},
  {id: "b2", name: "Renton", type: "dog"},
  {id: "c3", name: "Daisy", type: "dog"}
]

app.use(express.json())

app.get('/', (req, res) => {
  res.send("Hello Pet Box People!")
})

app.get("/api/v1/pets", (req, res) => {
  const pets = app.locals.pets

  res.json({ pets })
})

app.get('/api/v1/pets/:id', (request, response) => {
  const { id } = request.params;
  const pet = app.locals.pets.find(pet => pet.id === id);
  if (!pet) {
    return response.sendStatus(404);
  }

  response.status(200).json(pet);
});

//  Lets make a post happen
//  Get the new pet’s name and type from the request body sent by the front end.
//  Create an id for our new pet. We’ll use our super secure method of generating random IDs - Date.now()
//  Put those 3 data points into an object
//  Add that new object to our pet’s array
//  Send a response with the proper status code and the new pet object


app.listen(app.get("port"), () => {
  console.log(`${app.locals.title} is running on port ${app.get('port')}`)
})
