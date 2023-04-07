import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import {
  Box,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Avatar,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

const Student = () => {
  const location = useLocation();
  const myProps = location.state;
  const isMobile = useBreakpointValue({ base: true, lg: false });

  const [isOpen, setIsOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isMobile ? (
        <>
          <IconButton
            icon={<HamburgerIcon />}
            size="md"
            variant="ghost"
            aria-label="Open sidebar"
            onClick={handleDrawerToggle}
            pos="absolute"
            top={2}
            left={2}
            zIndex={999}
          />
          <Drawer isOpen={isOpen} placement="left" onClose={handleDrawerToggle}>
            <DrawerOverlay>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <DrawerBody>
                  <VStack spacing={4} align="start">
                    <Link to="/">
                      <Text>Home</Text>
                    </Link>
                    <Link to="/student/attendance">
                      <Text>Attendance</Text>
                    </Link>
                    <Link to="/student/timetable">
                      <Text>Timetable</Text>
                    </Link>
                    <Link to="/profile">
                      <Text>Profile</Text>
                    </Link>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerOverlay>
          </Drawer>
        </>
      ) : (
        <Flex bg="gray.200" p={2}>
          <Link to="/">
            <Text mx={4}>Home</Text>
          </Link>
          <Link to="/student/attendance">
            <Text mx={4}>Attendance</Text>
          </Link>
          <Link to="/student/timetable">
            <Text mx={4}>Timetable</Text>
          </Link>
          <Box flex={1} /> {/* Equivalent to Spacer */}
          <Box>
            <Link to="/profile">
              <Text mx={4}>Profile</Text>
            </Link>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default Student;
