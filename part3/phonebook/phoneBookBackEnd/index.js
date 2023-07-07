import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './utils/envs.js'
import ContactModel from './models/contact.js'

// let contacts = [
//     {
//         "id": 1,
//         "name": "Arto Hellas",
//         "number": "040-123456"
//     },
//     {
//         "id": 2,
//         "name": "Ada Lovelace",
//         "number": "39-44-5323523"
//     },
//     {
//         "id": 3,
//         "name": "Dan Abramov",
//         "number": "12-43-234345"
//     },
//     {
//         "id": 4,
//         "name": "Mary Poppendieck",
//         "number": "39-23-6423122"
//     },
//     {
//         "id": 5,
//         "name": "Jon Snow",
//         "number": "07705555376"
//     }
// ]

const app = express()
const PORT = config.port
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token("jsonReq", (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsonReq'))

app.get('/info', (request, response) => {
    const contactsLength = contacts.length;
    const date = new Date().toLocaleString('en-GB', {
        dateStyle: "long",
        timeStyle: "full",
    });
    response.send(`<p>The phonebook has ${contactsLength} contacts <p/>
    <p>Last sync: ${date}<p/>`)
})

app.get('/api/contacts', (request, response) => {
    ContactModel.find({}).then(contacts => response.json(contacts))
})

app.get('/api/contacts/:id', (request, response) => {
    ContactModel.findById(request.params.id)
        .then(contact => {
            response.json(contact);
        })

})

app.delete('/api/contacts/:id', (request, response) => {
    const id = Number(request.params.id);
    contacts = contacts.filter(c => c.id !== id);
    response.status(204).end();

})


// const generateId = () => {
//     const maxId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) : 0
//     return maxId + 1;
// }

app.post('/api/contacts/', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(404).json({
            error: 'Name or number missing'
        })
    }

    // ContactModel.find({ name: body.name }).then(result => {
    //     return response.status(400).json({
    //         error: 'Name must be unique'
    //     })
    // })

    const contact = new ContactModel({
        name: body.name,
        number: body.number
    })

    contact.save().then(newContact => response.json(newContact))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))