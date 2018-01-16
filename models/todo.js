var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  id: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  start: {
    type: Date
  },
  priority: {
    type: String
  },
  backgroundColor: {
    type: String
  },
  borderColor: {
    type: String
  }
});

module.exports = {Todo};
