import React, { useState } from 'react';
import axios from 'axios'
import { Box, Button, FormControl, FormLabel, Input, Stack,useToast } from '@chakra-ui/react';

function InputForm() {
  const [date, setDate] = useState('');
  const [sid, setSid] = useState('');
  const [Class, setClass] = useState('');
  const toast=useToast();

  const handleSubmit = (event) => {
    event.preventDefault();
    const selectedDate = new Date(date);
    const formattedDate = selectedDate.toISOString().slice(0, 10);
    // console.log(`Date: ${date}, SID: ${sid}, Class: ${Class}`);
    axios.post('/api/attendance/hello',{
      date:formattedDate,
      classId:Class,
      sid
    })
    .then((response) => {
      console.log(response.data);
      if(response.data==="Present"){
        toast({
          title:response.data,
          status:'success',
          
          duration:5000,
          isClosable: true,
          position:"bottom",
        })
      }
      else{
        toast({
          title:response.data,
          status:'error',
          
          duration:5000,
          isClosable: true,
          position:"bottom",
          
        })
      }
      
      
    })
    .catch((error) => {
      console.log(error);
    });

    


  };

  return (
    <Box p="4" w="50%" mx="auto" border="1px solid black" borderRadius="lg">
      <form onSubmit={handleSubmit}>
        <Stack spacing="6" p="4">
          <FormControl id="date">
            <FormLabel>Date</FormLabel>
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} border="2px solid black" borderRadius="lg" />
          </FormControl>

          <FormControl id="sid">
            <FormLabel>Student ID (SID)</FormLabel>
            <Input type="number" value={sid} onChange={(e) => setSid(e.target.value)} border="2px solid black" borderRadius="lg" />
          </FormControl>

          <FormControl id="class">
            <FormLabel>Class</FormLabel>
            <Input type="number" value={Class} onChange={(e) => setClass(e.target.value)} border="2px solid black" borderRadius="lg" />
          </FormControl>

          <Button type="submit" colorScheme="blue" borderRadius="lg">Check Your Attendance</Button>
        </Stack>
      </form>
    </Box>
  );
}

export default InputForm;
