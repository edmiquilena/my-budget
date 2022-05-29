import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import CreateMovement from '../components/Movement/Create';
class Add extends React.Component {
    render() { 
        return ( <Layout title={'Add'}> <Heading fontFamily={'Manrope'}><Container>Add new Movement</Container></Heading>
        <CreateMovement /></Layout>);
    }
}
 
export default Add;