


// import React, { useState } from 'react';
// import { Select, Button, Box, Text, Flex, Spacer, Center } from '@chakra-ui/react';
// import axios from 'axios';

// const Timetable = () => {

//   const [selectedClass, setSelectedClass] = useState('');
//   const [selectedDay, setSelectedDay] = useState('');
//   const [timetable, setTimetable] = useState(null)

//   const handleClassChange = (event) => {
//     setSelectedClass(event.target.value);
//   };

//   const handleDayChange = (event) => {
//     setSelectedDay(event.target.value);
//   };

//   const handleGetTimetable = async () => {
//     try {
//       const response = await axios.get(`/api/timetable/${selectedClass}/${selectedDay}`);
//       setTimetable(response.data);
//       console.log(timetable);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleUpdateClick = (id) => {
//     // Handle update click
//   };

//   return (
//     <Center w='10000000000px'>
//       <Box>
//       <Flex>
//         <Select placeholder="Select Class" onChange={handleClassChange} value={selectedClass}>
//           <option value="1">Class 1</option>
//           <option value="2">Class 2</option>
//           <option value="3">Class 3</option>
//           <option value="4">Class 4</option>
//           <option value="5">Class 5</option>
//           <option value="6">Class 6</option>
//           <option value="7">Class 7</option>
//           <option value="8">Class 8</option>
//           <option value="9">Class 9</option>
//           <option value="10">Class 10</option>
//         </Select>
//         <Spacer mx="2" />
//         <Select placeholder="Select Day" onChange={handleDayChange} value={selectedDay}>
//           <option value="Monday">Monday</option>
//           <option value="Tuesday">Tuesday</option>
//           <option value="Wednesday">Wednesday</option>
//           <option value="Thursday">Thursday</option>
//           <option value="Friday">Friday</option>
//           <option value="Saturday">Saturday</option>
//           <option value="Sunday">Sunday</option>
//         </Select>
//       </Flex>
//       <Button onClick={handleGetTimetable}>Get Timetable</Button>
//       {timetable && (
//         <Box mt="4">
//         <Text fontSize="xl" fontWeight="bold">
//           Timetable for Class {selectedClass}
//         </Text>
//         <Flex direction="column" align="center">
//           {timetable.map((subject, index) => (
//             <Flex
//               key={index}
//               direction={{ base: 'column', md: 'row' }}
//               align="center"
//               justify="space-between"
//               bg="gray.100"
//               p="4"
//               mb="4"
//               borderRadius="md"
//               w="100%"
//             >
//               <Box>
//                 <Text fontWeight="bold">{subject.subject}</Text>
//                 <Text>{subject.time}</Text>
//                 <Text>{subject.location}</Text>
//                 <Text>{subject.teacher}</Text>
//               </Box>
//               <Spacer />
//               <Button onClick={() => handleUpdateClick(subject.id)}>
//                 Update
//               </Button>
//             </Flex>
//           ))}
//         </Flex>
//       </Box>
//       )}
//     </Box>
//   </Center>
// );

// };

// export default Timetable;

import React, { useState } from 'react';
import { Select, Button, Box, Text, Flex, Spacer, Center, Input } from '@chakra-ui/react';
import axios from 'axios';
import { useToast} from "@chakra-ui/toast";

const Timetable = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [timetable, setTimetable] = useState(null);
  const [editedTimetable, setEditedTimetable] = useState(null);
  const toast = useToast();

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
  };

  const handleGetTimetable = async () => {
    try {
      const response = await axios.get(`/api/timetable/${selectedClass}/${selectedDay}`);
      setTimetable(response.data);
      setEditedTimetable(response.data.map(subject => ({...subject})));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTimetable = async () => {
    
    try {
      const response=await axios.patch(`/api/timetable/${selectedClass}/${selectedDay}`, editedTimetable);
      console.log(response);
      setTimetable(editedTimetable);
      toast({
        title: "Time Table Updated",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateSubject = ({index, field, value}) => {
    const newEditedTimetable = [...editedTimetable];
    newEditedTimetable[index][field] = value;
    setEditedTimetable(newEditedTimetable);
  };

  return (
    <Center w='10000000000px'>
      <Box>
        <Flex>
          <Select placeholder="Select Class" onChange={handleClassChange} value={selectedClass}>
            <option value="1">Class 1</option>
            <option value="2">Class 2</option>
            <option value="3">Class 3</option>
            <option value="4">Class 4</option>
            <option value="5">Class 5</option>
            <option value="6">Class 6</option>
            <option value="7">Class 7</option>
            <option value="8">Class 8</option>
            <option value="9">Class 9</option>
            <option value="10">Class 10</option>
          </Select>
          <Spacer mx="2" />
          <Select placeholder="Select Day" onChange={handleDayChange} value={selectedDay}>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday">Sunday</option>
          </Select>
        </Flex>
        <Flex mt="4">
          {timetable && (
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                Timetable for Class {selectedClass}
              </Text>
              <Flex direction="column" align="center">
                {editedTimetable.map((subject, index) => (
                  <Flex
                    key={index}
                    direction={{ base: 'column', md: 'row' }}
                    align="center"
                    justify="space-between"
                    bg="gray.100"
                    p="4"
                    mb={subject.marginBottom ? {[`base`]: subject.marginBottom.base, [`md`]: subject.marginBottom.md} : ""}






                    borderRadius="md"
                    w="100%"
                    >
                    <Input
                      type="text"
                      value={subject.subject}
                      onChange={(e) => handleUpdateSubject({index, field: 'subject', value: e.target.value})}
                      w="100px"
                    />
                    <Spacer mx="1" />
                    <Input
                      type="text"
                      value={subject.location}
                      onChange={(e) => handleUpdateSubject({index, field: 'location', value: e.target.value})}
                      w="125px"
                    />
                    <Spacer mx="1" />
                    <Input
                      type="text"
                      value={subject.teacher}
                      onChange={(e) => handleUpdateSubject({index, field: 'teacher', value: e.target.value})}
                      w="150px"
                    />
                    <Spacer mx="1" />
                    <Flex direction="column" align="center">
                      <Text fontSize="sm" fontWeight="bold" mb="2">
                        Time
                      </Text>
                      <Input
                        type="string"
                        value={subject.time}
                        onChange={(e) => handleUpdateSubject({index, field: 'time', value: e.target.value})}
                        w="150px"
                      />
                    </Flex>
                    <Spacer mx="1" />
                    <Flex direction="column" align="center">
                      {/* <Text fontSize="sm" fontWeight="bold" mb="2">
                        End Time
                      </Text> */}
                      {/* <Input
                        type="time"
                        value={subject.time}
                        onChange={(e) => handleUpdateSubject(index, 'endTime', e.target.value)}
                      /> */}
                    </Flex>
                  </Flex>
                ))}
              </Flex>
              <Button onClick={handleUpdateTimetable} mt="4">
                Update Timetable
              </Button>
            </Box>
          )}
          {!timetable && (
            <Box>
              <Text fontSize="xl" fontWeight="bold">
                No Timetable Found
              </Text>
            </Box>
          )}
        </Flex>
        <Button onClick={handleGetTimetable} mt="4">
          Get Timetable
        </Button>
      </Box>
    </Center>
  );
};

export default Timetable;    

