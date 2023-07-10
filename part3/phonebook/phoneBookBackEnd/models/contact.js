import mongoose from 'mongoose';
import config from '../utils/envs.js';

const url = config.mongodb_uri;

mongoose.connect(url)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  }).catch((error) => console.log('Failed to connect to MongoDb Atlas.', error));

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters'],
    required: [true, 'Name is required'],
  },
  number: {
    type: String,
    minLength: [8, 'Number must be at least 8 characters'],
    required: [true, 'Number is required'],
    validate: [(value) => {
      const phoneNumberRegex = /^[0-9]{2,3}-[0-9]+$/;
      return phoneNumberRegex.test(value);
    }, 'The number does not conform to the correct format. i.e. 44-7704456293'],
  },
});

mongoose.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

const ContactModel = mongoose.model('Contact', contactSchema);

export default ContactModel;
