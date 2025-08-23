import { Flex, Spacer, Avatar, Text } from '@chakra-ui/react';
const user = JSON.parse(localStorage.getItem('user'));
const Navbar = () => (
  <Flex bg="white" p={4} shadow="sm" align="center">
    <Text fontWeight="bold">Dashboard</Text>
    <Spacer />
    <Avatar name="Nadine" src="https://bit.ly/broken-link" />
  </Flex>
);

export default Navbar;
