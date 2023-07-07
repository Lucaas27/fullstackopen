import express from 'express'
import config from './utils/envs.js'
import morgan from 'morgan'
import cors from 'cors'
import NoteModel from './models/note.js'


const app = express()
const PORT = config.port

app.use(express.json())
app.use(cors())
morgan.token('requestBody', (req, res) => JSON.stringify(req.body))
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :requestBody'
	)
)
app.use(express.static('dist'))

app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
	NoteModel.find({}).then(notes => {
		response.json(notes)
	})
})

// const generateId = () => {
// 	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
// 	return maxId + 1
// }

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

app.get('/api/notes/:id', (request, response) => {
	// const id = Number(request.params.id)
	// const note = notes.find((note) => note.id === id)
	// note ? response.json(note) : response.status(404).end()

	NoteModel.findById(request.params.id).then(note => {
		response.json(note)
	})
})

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter((note) => note.id !== id)
	response.status(204).end()
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
