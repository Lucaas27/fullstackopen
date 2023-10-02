import mongoose from 'mongoose';

const password = process.argv[2];

const url = `mongodb+srv://demouser:${encodeURIComponent(password)}@demos.lok2gqx.mongodb.net/phoneBookApp?retryWrites=true&w=majority`;

const phonebookSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
});

const Contact = mongoose.model('Contact', phonebookSchema);

mongoose.set('strictQuery', false);
mongoose.connect(url);

if (process.argv.length < 3) {
  console.log('Give password as argument');
  process.exit(1);
}

if (process.argv.length === 5) {
  const contact = new Contact({
    name: process.argv[3],
    phoneNumber: process.argv[4],
  });

  contact.save().then(() => {
    console.log('contact saved!');
    mongoose.connection.close();
  }).catch((error) => {
    console.log('Error saving contact', error);
    mongoose.connection.close();
  });
} else {
  Contact.find({}).then((result) => {
    result.forEach((contact) => console.log(contact));
    mongoose.connection.close();
  }).catch((error) => {
    console.log('Error retrieving contacts', error);
    mongoose.connection.close();
  });
}
