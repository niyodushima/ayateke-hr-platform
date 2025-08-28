import { Box, Flex, Heading, SimpleGrid } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import LeaveRequestForm from '../components/LeaveRequestForm';

const StaffDashboard = () => {
  return (
    <Flex minH="100vh">
      <Sidebar />

      <Box flex="1" p={6}>
        <Heading mb={6}>Welcome Back</Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <ProfileCard />
          {/* You can add AttendanceSummary here later */}
        </SimpleGrid>

        <Box mt={10}>
          <LeaveRequestForm />
        </Box>
      </Box>
    </Flex>
  );
};

export default StaffDashboard;
