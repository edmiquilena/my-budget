import { Container, Heading } from '@chakra-ui/react';
import React from 'react';
import Layout from '../components/Layout';
import ViewMovement from '../components/Movement/View';
class View extends React.Component {
    render() { 
        return ( <Layout title={'View Movement'}> <Heading fontFamily={'Manrope'}><Container>View Movement</Container></Heading>
        <ViewMovement /></Layout>);
    }
}
 
export default View;