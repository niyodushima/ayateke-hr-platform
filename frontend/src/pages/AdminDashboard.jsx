import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';

const AdminDashboard = () => {
  return (
    <Box p={6}>
      <Heading size="lg" mb={4}>Welcome, Admin</Heading>
      <Text>This is your new dashboard. Add widgets, stats, or controls here.</Text>
    </Box>
  );
};

export default AdminDashboard;
