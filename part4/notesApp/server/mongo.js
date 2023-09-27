import mongoose from 'mongoose';
import config from './utils/envs.js';

const url = config.test_mongodb_uri;

const notesAppSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model('Note', notesAppSchema);

mongoose.set('strictQuery', false);
mongoose.connect(url);

// if (process.argv.length < 3) {
//     console.log('Give password as argument')
//     process.exit(1)
// }

// console.log(process.argv);

if (process.argv.length === 3 || process.argv.length === 4) {
  const note = new Note({
    content: process.argv[2],
    important: process.argv[3] || false,
  });

  note
    .save()
    .then(() => {
      console.log('Note saved!');
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log('Error saving note', error);
      mongoose.connection.close();
    });
} else {
  Note.find({})
    .then((result) => {
      result.forEach((note) => console.log(note));
      mongoose.connection.close();
    })
    .catch((error) => {
      console.log('Error retrieving notes', error);
      mongoose.connection.close();
    });
}
