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
    const { name, number } = request.body

    ContactModel.findByIdAndUpdate(request.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
        .then(contactAdded => response.json(contactAdded))
        .catch(error => next(error))
})



app.post('/api/contacts/', (request, response, next) => {
    const { name, number } = request.body;

    if (!name) {
        return response
            .status(404)
            .json({
                error: 'Name is missing'
            })
    }
    if (!number) {
        return response
            .status(404)
            .json({
                error: 'Number is missing'
            })
    }

    const contact = new ContactModel({
        name: name,
        number: number
    })

    contact
        .save()
        .then(newContact => response.json(newContact))
        .catch(error => next(error))

})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

//Error middleware
app.use(function errorHandler(error, req, res, next) {
    console.log(error.message)
    if (error.name === 'CastError') {

        return res.status(400)
            .send({ error: 'Contact ID does not match the required format' })
    }
    if (error.name === 'ValidationError') {
        return res.status(400)
            .json({ error: error.name, reason: error.message })
    }
    next(error)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))