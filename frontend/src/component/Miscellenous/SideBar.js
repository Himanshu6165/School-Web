import { Box, Flex, Text } from '@chakra-ui/react';
import { FaHome, FaUser, FaCog, FaElementor, FaClipboardList } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

function Sidebar() {
  return (
    <Flex direction="column" bg="gray.200" h="100vh" w="200px" px="4" py="8">
      <Box mb="8">
        <Text fontSize="xl" fontWeight="bold" color="gray.600">My App</Text>
      </Box>
      <Box mb="8">
        <NavLink to="/" activeClassName="active">
          <Flex align="center">
            <FaHome size="20" />
            <Text ml="4" mt="4">Home</Text>
          </Flex>
        </NavLink>
      </Box>
      <Box mb="8">
        <NavLink to="/profile" activeClassName="active">
          <Flex align="center">
            <FaUser size="20" />
            <Text ml="4" mt="4">Profile</Text>
          </Flex>
        </NavLink>
      </Box>
      <Box mb="8">
        <NavLink to="/settings" activeClassName="active">
          <Flex align="center">
            <FaCog size="20" />
            <Text ml="4" mt="4">Settings</Text>
          </Flex>
        </NavLink>
      </Box>
      <Box mb="8">
        <NavLink to="/teacher/attendance" activeClassName="active">
          <Flex align="center">
            <FaClipboardList size="20" />
            <Text ml="4" mt="4">Attendance</Text>
          </Flex>
        </NavLink>
      </Box>
      <Box mb="8">
        <NavLink to="/teacher/timetable" activeClassName="active">
          <Flex align="center">
            <FaElementor size="20" />
            <Text ml="4" mt="4">Time Table</Text>
          </Flex>
        </NavLink>
      </Box>
    </Flex>
  );
}

export default Sidebar;
