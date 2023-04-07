const express = require("express");
const { registerUser, authUser,allUser } = require("../controllers/userController")
const checkIfTeacher = require('../middleware/teacher');
//const {protect} = require("../middleware/authMiddleware")
const userRouter = express.Router();

userRouter
  .route("/login")
  .post(authUser)
  //.get(protect, allUser)

userRouter
  .route("/")
  .post(registerUser)

userRouter.get('/protected-route', checkIfTeacher, (req, res) => {
    res.send('This is a protected route for teachers only.');
  });
  
  module.exports = userRouter;

userRouter
  .route("/students")
  .get(allUser)



module.exports = userRouter;