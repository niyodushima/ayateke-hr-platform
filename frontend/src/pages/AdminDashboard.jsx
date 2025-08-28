import { Text, Button, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <VStack spacing={4} align="start" p={6}>
      <Text fontSize="xl">AdminDashboard is rendering</Text>

      <Button colorScheme="red" onClick={handleLogout}>
        Logout
      </Button>

      {user?.role === 'hr' && (
        <>
          <Button colorScheme="blue" onClick={() => navigate('/hr/leave-requests')}>
            View Leave Requests
          </Button>
          <Button colorScheme="green" onClick={() => navigate('/hr/onboarding')}>
            Start Onboarding
          </Button>
        </>
      )}
    </VStack>
  );
};

export default AdminDashboard;
