import mongoose from 'mongoose'
import config from '../utils/envs.js'

const url = config.mongodb_uri

mongoose.connect(url)
    .then(result => {
        console.log('Connected to MongoDB Atlas')
    }).catch(error => console.log('Failed to connect to MongoDb Atlas.', error))

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

mongoose.set('toJSON', {
    transform(doc, ret) {
        ret.id = ret._id.toString()
        delete ret._id
        delete ret.__v
    },
})

const ContactModel = mongoose.model('Contact', contactSchema)

export default ContactModel