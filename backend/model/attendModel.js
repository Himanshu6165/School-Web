const mongoose = require('mongoose');
const User = require('./userModel');

// Define attendance schema
const attendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  classId: {
    type: Number,
    required: true
  },
  attendanceRecords: [
    {
      // studentId: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: User
      // },
      attendanceStatus: {
        type: String,
        enum: ['Present', 'Absent'],
        required: true
      },
      name:{
        type:String
      },
      sid:{
        type: Number,
        required:true
      }

      
    }
  ]
});

module.exports = mongoose.model('Attendance', attendanceSchema);
