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
import { useNavigate } from "react-router-dom";
import { useAuth } from '../lib/hooks/useAuth';;
function RegisterForm() {
    const navigate = useNavigate();
  const {register, handleSubmit} = useForm();
  const {user, Register, isLoading} = useAuth();
  const toast = useToast({
    position: 'bottom',
    status: 'error',
          duration: 1000,
          isClosable: true,
   
  })
  useEffect(() => {
    if(user) { return navigate("/"); }
      
   }, [user]);
  const onSubmit = async({email, password}) => {
      try {
   let register = await Register(email, password)
   if(typeof register == 'string')  return toast({ title: register});

} catch(e) {
      
          toast({
            title: e
          });
    }

  }
    return ( <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
    <Stack align={'center'}>
      <Heading fontSize={'4xl'} color={'brand.light'}>My<Text color={'brand.primary'} display={'inline'}>Budget</Text></Heading>
      <Text fontSize={'md'} color={'brand.primary'} fontFamily={'Manrope'}>
        R E G I S T E R
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
            Register
          </Button>
         <Box align={'center'}><Text fontSize={'MD'} color={'brand.primary'} fontFamily={'Manrope'}>
        <Text color={'brand.light'}>Got an account?</Text> <Link>L O G I N</Link>
      </Text></Box> 
        </Stack>
      </Stack>
    </Box>
  </Stack> );
}

export default RegisterForm;