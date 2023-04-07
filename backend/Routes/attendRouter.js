const express = require("express");
const attendRouter = express.Router();

const Attendance = require('../model/attendModel');
const User=require('../model/userModel');
const attendModel = require("../model/attendModel");



attendRouter.post('/', async (req, res) => {
  const { date, classId, attendanceRecords } = req.body;
  try {
    const populatedRecords = await Promise.all(attendanceRecords.map(async (record) => {
      // if (!record.studentId) {
      //   return null; // skip records without a student ID
      // }
      const student = await User.findOne({ sid: record.sid, Class: classId });
      if (!student) {
        return null; // skip records with an invalid student ID
      }
      console.log(student.name);
      return {
        // student: {
        //   _id: student._id,
        //   name: student.name,
        //   sid: student.sid
        // },
        name: student.name,
        sid: student.sid,
        attendanceStatus: record.attendanceStatus
      };
    }));
    
    
    const check=await Attendance.find({date:date});
    console.log(check);
    if(check.length>0){
      res.json({
        message:'Attendance Already Marked'})
    }
    else{
      const attendance = new Attendance({
        date,
        classId,
        attendanceRecords: populatedRecords
      });
  
      await attendance.save();
  
      res.status(201).json('Attendance Marked Attendance');
    }
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
});


// GET route for getting attendance record for a particular student on a particular date
// attendRouter.get('/', async (req, res) => {
//   const { date, sid, classId } = req.body;
//   try {
//     const attendance = await Attendance.findOne({ date, classId })
//       .populate({
//         path: 'attendanceRecords',
//         match: { "sid": sid },
//         select: { attendanceStatus: 1 }
//       })
//       .exec();

//     if (!attendance) {
//       return res.status(404).json({ message: 'Attendance record not found' });
//     }

//     res.json(attendance.attendanceRecords);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// GET attendance status of a particular student in a particular class on a particular date
attendRouter.post('/hello', async (req, res) => {
  const { classId, sid, date } = req.body;
  // const normal_date = new Date(date);

  try {
    const attendance = await Attendance.findOne({ classId,
       'attendanceRecords.sid': sid,
        // date : { $gte: normal_date, $lt: new Date(normal_date.getTime() + 24 * 60 * 60 * 1000) }
        date:date,
        
      });

    if (!attendance) {
      return res.status(404).json({ message: 'Attendance not found' });
    }

    const attendanceStatus = attendance.attendanceRecords[0].attendanceStatus;

    res.json( attendanceStatus);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports=attendRouter
