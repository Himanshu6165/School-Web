import React from "react";
import { VStack } from '@chakra-ui/react';
import { FormControl, FormLabel,} from '@chakra-ui/react'
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useState } from "react";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useToast} from "@chakra-ui/toast";
import {useHistory} from "react-router-dom"


const Login = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState();
    const [password, setpassword] = useState();
    const handleClick = () => setShow(!show)
    const toast = useToast();
    const history = useHistory();

     const submitHandler = async () => {
      if (!email || !password) {
        toast({
          title: "Please Fill all the Feilds",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
       }
  
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
  
        const { data } = await axios.post("/api/user/login",{ email, password },config);
        toast({
          title: "Login Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });

        localStorage.setItem("userInfo", JSON.stringify(data));
        
        const myProps = { prop1: data.name, prop2: data.email, prop3: data.isTeacher};
        console.log(myProps)
        if(data.isTeacher) history.push("/teacher", myProps);

        if(!data.isTeacher) history.push("/student", myProps);
      } 
      catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        return;
      }
    };

    return (
        <VStack >
            <FormControl id = "email" isRequired>
                <FormLabel>Email ID</FormLabel>
                <Input value = {email} type= "email" placeholder='Enter Your Email' 
                onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>

            <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
   
        </VStack >
    )
}

export default Login;