import mongoose from 'mongoose';

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
      const phoneNumberRegex = /^(?:0|\+?44)(?:\d\s?){10}$/;
      return phoneNumberRegex.test(value);
    }, 'The number does not conform to the correct format. i.e. +447704456298 or 07704456298'],
  },
});

mongoose.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.__v;
  },
});

export default mongoose.model('Contact', contactSchema);
