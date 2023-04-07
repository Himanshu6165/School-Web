import React from 'react';
import { Container, Box, Text } from '@chakra-ui/react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from "../component/Authorization/Login"

const LandingPage = () => {
    return (
        <Container maxW='2xl' centerContent>
            <Box display="flex" justifyContent="center" p={3} m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" boxShadow='inner' rounded='md' bg='white'>
            <Text fontSize="4xl" fontFamily="Work sans">
          School
        </Text>
            </Box>
            <Box display="flex" justifyContent="center" bg = "white" w = "100%" p={4} boxShadow='inner' rounded='md'>
            <Tabs variant='soft-rounded' colorScheme='green'>
                <TabList mb = '1em'>
                    <Tab width="300px">Login</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <Login/>
                    </TabPanel>
                </TabPanels>
                </Tabs>
            </Box>
        </Container>
    )
}

export default LandingPage