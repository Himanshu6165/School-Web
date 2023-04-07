const mongoose = require('mongoose');
const { v1: uuidv1 } = require('uuid');

const timetableSchema = new mongoose.Schema({
  Class: {
    type: Number,
    required: true
  },
  subjects: [{
    unique_id: {
      type: String,
      default: uuidv1, 
      unique: true
    },
    subject: {
      type: String,
      required: true
    },
    day: {
      type: String,
      required: true
    },
    time: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    teacher: {
      type: String,
      required: true
    }
  }]
});
const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
