import './App.css';
import {Route} from "react-router-dom";
import landingPage from "./pages/LandingPage";
import teacher from "./component/dashboard/teacher"
import student from "./component/dashboard/Student"
import attendance from './component/attendance/attendance';
import StudentList from './component/attendance/StudentList'
import studentAttendance from './component/attendance/studentAttendance';
import timetable from './component/timetable'
import teacher_timetable from './component/teacher_timetable'


function App() {
  return (
    <div className="App">
      <Route path = "/" component = {landingPage} exact/>
      <Route path = "/teacher" component = {teacher} exact/>
      <Route path = "/student" component = {student} exact/>
      <Route path = "/teacher/attendance" component = {attendance} exact/>
      <Route path = "/student/attendance" component = {studentAttendance} exact/>
      <Route path = "/teacher/attendance/StudentList/:Class" component = {StudentList} exact/>
      <Route path = "/student/timetable" component = {timetable} exact/>
      <Route path = "/teacher/timetable" component = {teacher_timetable} exact/>
  </div>
  );
}

export default App;
