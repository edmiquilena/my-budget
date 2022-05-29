import React, { useEffect } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useToast,
  } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link as RouteLink  } from "react-router-dom";
import { useAuth } from '../lib/hooks/useAuth';
function LoginForm() {
    const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const {user, Login, isLoading} = useAuth();

  useEffect(() => {
   if(user) { return navigate("/"); }
     
  }, [user]);

  const toast = useToast({
    position: 'bottom',
    status: 'error',
          duration: 1000,
          isClosable: true,
   
  })
  const onSubmit = async({email, password}) => {
      try {
     
     let log = await Login(email, password)
     if(typeof log == 'string')  return toast({ title: log});
} catch(e) {
          toast({
            title: e.message
          });
    }
  
  }
    return ( <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    <Stack align={'center'}>
      <Heading fontSize={'4xl'} color={'brand.light'}>My<Text color={'brand.primary'} display={'inline'}>Budget</Text></Heading>
      <Text fontSize={'md'} color={'brand.primary'} fontFamily={'Manrope'}>
        L O G I N
      </Text>
    </Stack>
    <Box
  
      bg={'brand.mediumGrey'}
      boxShadow={'lg'}
      p={8}>
      <Stack spacing={4}>
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input type="email" {...register("email", { required: true })}/>
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input type="password" {...register("password", { required: true })} />
        </FormControl>
        <Stack spacing={10} >
         
          <Button
        isLoading={isLoading}
        onClick={handleSubmit(onSubmit)}
        >
            Login
          </Button>
         <Box align={'center'}><Text fontSize={'MD'} color={'brand.primary'} fontFamily={'Manrope'}>
        <Text color={'brand.light'}>New here?</Text> <Link as={RouteLink} to={'/register'}>R E G I S T E R</Link>
      </Text></Box> 
        </Stack>
      </Stack>
    </Box>
  </Stack> );
}

export default LoginForm;