import express from 'express'
import morgan from 'morgan'
import cors from 'cors'

let notes = [
	{
		id: 1,
		content: 'HTML is easy',
		important: true,
	},
	{
		id: 2,
		content: 'Browser can execute only JavaScript',
		important: false,
	},
	{
		id: 3,
		content: 'GET and POST are the most important methods of HTTP protocol',
		important: true,
	},
]

const app = express()
const PORT = import.meta.env.PORT || 3001
app.use(express.json())
app.use(cors())
morgan.token('requestBody', (req, res) => JSON.stringify(req.body))
app.use(
	morgan(
		':method :url :status :res[content-length] - :response-time ms :requestBody'
	)
)

app.get('/', (request, response) => {
	response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
	response.json(notes)
})

const generateId = () => {
	const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
	return maxId + 1
}

app.post('/api/notes', (request, response) => {
	const body = request.body

	if (!body.content) {
		return response.json({ error: 'content missing' })
	}

	const note = {
		content: body.content,
		important: body.important || false,
		id: generateId(),
	}

	notes = notes.concat(note)
	response.json(note)
})

app.get('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	const note = notes.find((note) => note.id === id)
	note ? response.json(note) : response.status(404).end()
})

app.delete('/api/notes/:id', (request, response) => {
	const id = Number(request.params.id)
	notes = notes.filter((note) => note.id !== id)
	response.status(204).end()
})

app.listen(PORT, () =>
	console.log(`Server running on http://localhost:${PORT}/api/notes/`)
)
