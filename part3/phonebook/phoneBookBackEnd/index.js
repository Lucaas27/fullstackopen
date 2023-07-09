import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import config from './utils/envs.js'
import ContactModel from './models/contact.js'

const app = express()
const PORT = config.port
app.use(express.json())
app.use(cors())
app.use(express.static('dist'))
morgan.token("jsonReq", (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :jsonReq'))

app.get('/info', (request, response) => {
    const date = new Date().toLocaleString('en-GB', {
        dateStyle: "long",
        timeStyle: "full",
    });
    ContactModel.estimatedDocumentCount().then(count => {
        response.send(`<p>The phonebook has ${count} contacts <p/>
        <p>Last sync: ${date}<p/>`)
    })
})

app.get('/api/contacts', (request, response) => {
    ContactModel.find({}).then(contacts => response.json(contacts))
})

app.get('/api/contacts/:id', (request, response, next) => {
    ContactModel.findById(request.params.id)
        .then(contact => {
            contact ? response.json(contact) : response.status(404).end();
        })
        .catch(error => next(error))

})

app.delete('/api/contacts/:id', (request, response, next) => {
    // const id = Number(request.params.id);
    ContactModel.findByIdAndDelete(request.params.id)
        .then(result => response.status(204).end())
        .catch(error => next(error))
})

app.put('/api/contacts/:id', (request, response, next) => {
    const contact = {
        name: request.body.name,
        number: request.body.number,
    }

    ContactModel.findByIdAndUpdate(request.params.id, contact, { new: true })
        .then(contactAdded => response.json(contactAdded))
        .catch(error => next(error))
})



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

//Error middleware
app.use(function errorHandler(error, req, res, next) {
    console.log(error.message)
    if (error.name === 'CastError') {

        return res.status(400).send({ error: 'Contact ID does not match the required format' })
    }
    next(error)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))