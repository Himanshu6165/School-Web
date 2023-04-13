const express = require("express")
const bodyParser = require('body-parser');
const dotenv = require ("dotenv");
const connectDB = require("./config/db")
const app = express();
const userRouter = require("./Routes/userRouter");
const attendRouter = require("./Routes/attendRouter");
const timetableRouter=require("./Routes/timetable")
app.use(express.json());
app.use(bodyParser.json());

const path = __dirname + '/views/';
app.use(express.static(path));


dotenv.config();
const PORT = process.env.PORT || 5000;
connectDB();

app.get('/', (req, res) => {
    res.sendFile(path + "index.html")
    // res.send("App is listening");
})

app.use("/api/user", userRouter)
app.use("/api/timetable",timetableRouter)
app.use("/api/attendance", attendRouter)

app.get('/api/currentUser', (req, res) => {
    if (req.session && req.session.user) {
      res.json(req.session.user);
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  });


app.listen(5000, console.log(`Server started on PORT ${PORT}`));

