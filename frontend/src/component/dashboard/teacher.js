import React from 'react'
import { useLocation } from 'react-router-dom';
import { HStack, Box, Flex, Button, Text } from '@chakra-ui/react';
import Sidebar from '../Miscellenous/SideBar';


const Teacher = () => {
  const location = useLocation();
  // const myProps = location.state;

  // console.log(myProps.prop1);
  return (
    <Sidebar/>

  )
}

export default Teacher

    // <div>
    //   <HStack>
    //     <Sidebar/>
{/* 
        <Flex align="center" justify="flex-end" p="4" ml="1200px">
      <Box>
        <Text fontSize="md" fontWeight="bold" color="gray.600">{myProps.prop1}</Text>
      </Box>
    </Flex> */}
              {/* <Box display="flex" justifyContent="center" alignItems="center" bg="white" w="1280px" height="50px" p="5px 10px 5px 10px" borderWidth="5px">  */}
                {/* {<Button variant="ghost">
                <i className="fas fa-search"></i>
                <Text display ={{ base: "none", md: "flex" }} px="4">
                    Search User
                </Text>
                </Button> } */}
                 {/* <HStack display="flex">
                <i className="bi bi-person-circle"></i>
                 <p>{myProps.prop1}</p>
                 <p>email: {myProps.prop2}</p>
                </HStack> */}

                {/* </Box>  */}

        {/* </HStack>
    </div> */}