// import React from 'react'
// import Sidebar from '../Miscellenous/SideBar'
// import { Box, Button, Text, Grid } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
// import axios from "axios"

// const attendance = () => {
//   const classNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

//   // axios.get('/api/user/protected-route')
//   axios.get(`/api/user/protected-route`)
//         .then((response) => {
//           console.log(response)
          
//         })
//         .catch((error) => {
//           console.log(error);
//         });

//   return (
//     <>

//       <Sidebar />

//       <Grid templateColumns="repeat(5, 1fr)" height="100%" width="100%" mt="60" >
//         {classNumbers.map((classNumber) => (
//           <Link to={`attendance/StudentList/${classNumber}`} key={classNumber}>
//             <Button colorScheme='teal' size='md' ml="10" mb="20"> Class {classNumber} </Button>
//           </Link>
//         ))}
//       </Grid>


//     </>

//   )
// }

// export default attendance

import React from 'react';
import Sidebar from '../Miscellenous/SideBar';
import { Box, Button, Text, Grid, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

const Attendance = () => {
  const classNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // axios.get('/api/user/protected-route')
  axios.get(`/api/user/protected-route`)
    .then((response) => {
      console.log(response)

    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <Box display="flex" flexDir={{ base: "column", md: "row" }}>

      <Sidebar />

      <Flex flexWrap="wrap" justifyContent={{ base: "center", md: "flex-start" }} mt={{ base: "60", md: "0" }} ml={{ base: "0", md: "60" }}>
        {classNumbers.map((classNumber) => (
          <Link to={`attendance/StudentList/${classNumber}`} key={classNumber}>
            <Button colorScheme='teal' size='md' ml={{ base: "0", md: "10" }} mb={{ base: "2", md: "0" }} mr={{ base: "0", md: "10" }}> Class {classNumber} </Button>
          </Link>
        ))}
      </Flex>

    </Box>
  );
}

export default Attendance;

