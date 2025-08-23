import {
  Box,
  Input,
  Button,
  Heading,
  useToast,
  Select,
  Image,
  Text,
  VStack,
  Flex,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: '',
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const data = await loginUser(credentials);
      toast({ title: 'Login successful', status: 'success' });

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'admin') {
        navigate('/reports');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast({ title: error.message, status: 'error' });
    }
  };

  return (
    <Box
      minH="100vh"
      bgImage="url('/background.jpeg')" // Replace with your actual image path
      bgSize="cover"
      bgPosition="center"
      bgRepeat="no-repeat"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={4}
    >
      <Box
        bg="whiteAlpha.900"
        p={8}
        rounded="lg"
        shadow="2xl"
        maxW="md"
        w="full"
      >
        <VStack spacing={4}>
          {/* Logo */}
          <Image src="/logo.jpeg" alt="Ayateke Logo" boxSize="90px" />

          {/* Title and Tagline */}
          <Heading size="md" textAlign="center">
            Ayateke Staff Management
          </Heading>
          <Text fontSize="sm" color="gray.600" textAlign="center">
            Delivering Sustainable Water Solutions Across Rwanda
          </Text>

          {/* Form */}
          <Input
            placeholder="Email"
            value={credentials.email}
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
          />
          <Input
            placeholder="Password"
            type="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
         
          <Button colorScheme="teal" w="full" onClick={handleSubmit}>
            Login
          </Button>
        </VStack>

        {/* Footer */}
        <Divider my={6} />
        <Text fontSize="xs" color="gray.500" textAlign="center">
          Ayateke Star © {new Date().getFullYear()} — Empowering Rwanda through clean water.
        </Text>
      </Box>
    </Box>
  );
};

export default Login;
