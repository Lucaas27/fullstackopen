import config from '../utils/envs.js'
import mongoose from 'mongoose'

const url = config.mongodb_uri
// console.log('Connecting to', url)

mongoose.connect(url).then(result => {
    console.log('Connected to MongoDB')
}).catch(error => {
    console.log('Error connecting to MongoDB:', error.message)
})

const noteSchema = new mongoose.Schema({
    content: String,
    important: Boolean
})

noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject.__v
        delete returnedObject._id
    }
})

export default mongoose.model('Note', noteSchema)
