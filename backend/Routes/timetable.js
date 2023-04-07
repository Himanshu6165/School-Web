const express = require('express');
const router = express.Router();
const Timetable = require('../model/timetable');

// POST a new timetable document
router.post('/', async (req, res) => {
  const { Class, subjects } = req.body;
  const timetable = new Timetable({ Class, subjects });

  try {
    const newTimetable = await timetable.save();
    res.status(201).json(newTimetable);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// GET timetable for a specific class
router.get('/:Class/:day', async (req, res) => {
  const { Class, day } = req.params;

  try {
    const timetable = await Timetable.findOne({ Class: parseInt(Class) });

    if (!timetable) {
      return res.status(404).json({ message: `Timetable for class ${Class} not found` });
    }

    const subjectsOnDay = timetable.subjects.filter((subject) => {
      return subject.day === day;
    });

    res.json(subjectsOnDay);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Assuming you have already imported the necessary modules and established a MongoDB connection

// Define the route handler for the PATCH request
router.patch('/:Class/:day', async (req, res) => {
  try {
    const Class = req.params.Class;
    const day = req.params.day;
    const editableTimetable = req.body; // Assuming the array of objects is in req.body.editableTimetable
    console.log(editableTimetable);

    // Loop through each object in editableTimetable and update the corresponding subject in the Timetable model
    for (const updatedSubject of editableTimetable) {
      await Timetable.updateOne(
        {
          Class: Class,
          'subjects.unique_id': updatedSubject.unique_id,
          'subjects.day': day
        },
        {
          $set: {
            'subjects.$.subject': updatedSubject.subject,
            'subjects.$.time': updatedSubject.time,
            'subjects.$.location': updatedSubject.location,
            'subjects.$.teacher': updatedSubject.teacher
          }
        }
      );
    }

    res.status(200).json({ message: 'Subjects updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update subjects' });
  }
});


  

module.exports = router;
