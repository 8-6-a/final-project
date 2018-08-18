let mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
  description : String,
  prayerstatus : Boolean
});

let Todo = mongoose.model('Todo', TodoSchema);
module.exports = Todo;