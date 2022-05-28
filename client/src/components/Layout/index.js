import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Heading,
  Text,
  Icon,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import {AiFillHome} from 'react-icons/ai'
import {Link as RouteLink, Navigate, Route, useNavigate} from 'react-router-dom'
function Layout({title, children}) { 
     const { isOpen, onOpen, onClose } = useDisclosure();
     const navigate = useNavigate();
     
    return ( <>
        <Helmet>
        <meta charset="UTF-8"></meta> 
        <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📕</text></svg>"/>
        <title>{title} - MyBudget</title><link rel="icon" type="image/png" sizes="32x32" href="/_next/static/media/favicon-32x32.b7ef9ede.png"/>
        <meta
      name="description"
      content="MyBudget - Personal budget as part of Alkemy's Full stack challenge"
    />
        </Helmet>




    <>
      <Box bg={'brand.mediumGrey'} px={10} rounded={'full'} mx={ {base: 5, md: '10%'} } my={5} >
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Icon
           
            as={AiFillHome}
            display={{ base: 'flex', md: 'none' }}
            color={'brand.primary'}
            boxSize={6}
            onClick={() => navigate("/")}
          />
          <HStack spacing={8} alignItems={'center'}>
            <Box><Heading fontSize={{ base: '1xl', md: '2xl' }} color={'brand.light'}>My<Text color={'brand.primary'} display={'inline'}>Budget</Text></Heading></Box>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
            <NavLink as={RouteLink} to="/" >Dashboard</NavLink>
           
            </HStack>
          </HStack>
          <Flex alignItems={'center'}>
            <Button
              variant={'solid'}
              colorScheme={'teal'}
              size={'sm'}
              mr={4}
              leftIcon={<AddIcon />}
              as={RouteLink} to="/add">
              New
            </Button>
          <Box display={{ base: 'none', md: 'flex' }}>  <NavLink >Logout</NavLink></Box>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: 'none' }}>
            <Stack as={'nav'} spacing={4}>
            <NavLink  as={RouteLink} to="/dashboard" >Dashboard</NavLink>
            <NavLink to="logout">Logout</NavLink>
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>{children}</Box>
    </>









    </> );
}
const Links = ['Home'];
const NavLink = ({ children, ...conf }) => (
    <Link
    fontFamily={'Manrope'}
    fontWeight={700}
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
      color: 'brand.primary'
      }}
      {...conf}>
      {children}
    </Link>
  );
export default Layout;
