const asyncHandler = require("express-async-handler");
const userModel = require("../model/userModel")
const generateToken = require("../config/generateToken");
const userRouter = require("../Routes/userRouter");

module.exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, isTeacher, sid, Class } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter All The Fields");
    }

    const userExist = await userModel.findOne({ email });

    if (userExist) {
        res.status(400);
        throw new Error("User Already Exist");
    }

    const user = await userModel.create({
        name, email, password, isTeacher, sid, Class
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isTeacher: user.isTeacher,
            sid: user.sid,
            Class: user.Class,
            token: generateToken(user._id),
        })
    }

    else {
        res.status(400);
        throw new Error('User not created');
    }
})

// const session = require('express-session');

// app.use(session({
//   secret: 'mysecret',
//   resave: false,
//   saveUninitialized: true
// }));s
module.exports.authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isTeacher: user.isTeacher,
            token: generateToken(user._id),
        })
    }

    else {
        res.status(400);
        throw new Error('User not created');
    }

    // req.session.user = user;
})

module.exports.allUser = asyncHandler(async (req, res) => {
    const Class = parseInt(req.query.Class); // get the Class query parameter from the request URL
    try {
        const students = await userModel.find({ Class }); // find all students with the matching Class in the database
        res.status(200).json(students); // send the list of students as a JSON response
    } catch (error) {
        console.log("Error retrieving students:", error);
        res.status(500).send("Error retrieving students."); // send an error response if there was an error retrieving the students
    }

})
// module.exports.allUser = asyncHandler(async (req,res) => {
//     const keyWord = req.query.search ?
//     {
//         $or: [
//           { name: { $regex: req.query.search, $options: "i" } },
//           { email: { $regex: req.query.search, $options: "i" } },
//         ],
//     }
//     : {};

//     const users = await userRouter.find(keyWord).find({ _id: { $ne: req.user._id } });
//     res.send(users);
// })


// Import the middleware

// Protect the route using the middleware

