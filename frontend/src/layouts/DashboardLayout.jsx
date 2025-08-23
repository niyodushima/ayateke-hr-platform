import { Flex, Box } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';
import Login from '../pages/Login'; // ❌ unused


const DashboardLayout = () => (
  <Flex h="100vh">
    <Sidebar />
    <Box flex="1" bg="gray.50">
      <Navbar />
      <Box p={6}>
        <Outlet />
      </Box>
    </Box>
  </Flex>
);

export default DashboardLayout;
