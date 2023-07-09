import express from 'express'
import config from './utils/envs.js'
import morgan from 'morgan'
import cors from 'cors'
import NoteModel from './models/note.js'


const app = express()
const PORT = config.port

// Middleware
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())
app.use((function morganToken() {
	morgan.token('requestBody', (req, res) => JSON.stringify(req.body))
	return morgan(
		':method :url :status :res[content-length] - :response-time ms :requestBody'
	)
})())




// Routes
app.get('/', (request, response) => {
	response.send('<h1>Welcome to the notes app api !</h1>')
})

app.get('/api/notes', (request, response) => {
	NoteModel.find({}).then(notes => {
		response.json(notes)
	})
})

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.json({ error: 'content missing' })
	}

	const note = new NoteModel({
		content: body.content,
		important: body.important || false,
	})

	note.save().then(savedNote => response.json(savedNote))

})

app.get('/api/notes/:id', (request, response, next) => {
	// const id = Number(request.params.id)
	// const note = notes.find((note) => note.id === id)
	// note ? response.json(note) : response.status(404).end()

	NoteModel.findById(request.params.id)
		.then(note => {
			note ? response.json(note) : response.status(404).end()
		})
		.catch(error => next(error))
})

app.delete('/api/notes/:id', (request, response, next) => {
	// const id = Number(request.params.id)
	// notes = notes.filter((note) => note.id !== id)
	NoteModel.findByIdAndRemove(request.params.id)
		.then(note => response.status(204).end())
		.catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
	const body = request.body

	const note = {
		content: body.content,
		important: body.important
	}

	NoteModel.findByIdAndUpdate(request.params.id, note, { new: true })
		.then(updatedNote => response.json(updatedNote))
		.catch(error => next(error))
})

// middleware for handling unsupported routes 
app.use(function unknownEndpoint(req, res) {
	res.status(404).send({ error: 'Unknown endpoint' })
})

//Error middleware
app.use(function errorHandler(error, req, res, next) {
	console.log(error.message)
	if (error.name === 'CastError') {
		return res.status(400).send({ error: 'Note ID does not match the required format' })
	}
	next(error)
})


app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
