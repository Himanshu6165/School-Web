import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Checkbox,
  Button,
  useToast,
  Input,
} from "@chakra-ui/react";
import axios from "axios";

function Attendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [date, setDate] = useState("");

  const { Class } = useParams();
  const toast=useToast();
  useEffect(() => {
    if (Class) {
      axios.get(`http://localhost:3000/api/user/students?Class=${Class}`)
        .then((response) => {
          setStudents(response.data);
          
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [Class]);

  const handleAttendanceChange = (event, studentId) => {
    setAttendance({
      ...attendance,
      [studentId]: event.target.checked
    });
  };

  // const handleSubmit = () => {
  //   axios.post(`/api/attendance`, {
  //     classId:Class,
  //     attendanceRecords:[{
  //       attendanceStatus:attendance,
  //       sid:students.sid,


  //     }]
  //   })
  //     .then((response) => {
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };

  const handleSubmit = () => {
    const attendanceRecords = students.map((student) => ({
      attendanceStatus: attendance[student._id] ? 'Present' : 'Absent',
      name: student.name,
      sid: student.sid,
    }));
    
    axios.post(`/api/attendance`, {
      date: date,
      classId: Class,
      attendanceRecords: attendanceRecords,
    })
      .then((response) => {
        if(response.data==='Attendance Marked Attendance'){
          toast({
            title:"Attendance Marked Successfully",
            status:"success",
            duration:5000,
            isClosable: true,
            position: "bottom"
          })
        }
        else{
          toast({
            title:"Attendance already marked",
            status:"error",
            duration:5000,
            isClosable: true,
            position: "bottom"
          })
        }
      })
      .catch((error) => {
        console.log(error);
      });

      
  };
  

  return (
    <>
    <Table>
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Roll Number</Th>
          <Th>Present</Th>
        </Tr>
      </Thead>
      <Tbody>
        {students.map((student) => (
          <Tr key={student._id}>
            <Td>{student.name}</Td>
            <Td>{student.sid}</Td>
            <Td>
              <Checkbox isChecked={attendance[student._id]} onChange={(event) => handleAttendanceChange(event, student._id)} backgroundColor="black" />
            </Td>
          </Tr>
        ))}
      </Tbody>
      <Input
    type="date"
    value={date}
    onChange={(event) => setDate(event.target.value)}
    mt={4}
    borderColor="black"
    borderWidth="2px"
  />
  <Button onClick={handleSubmit} mt={4}>
    Submit
  </Button>
    </Table>
    
  </>
  );
}

export default Attendance;