import React from 'react';
import Layout from '../components/Layout';
import HomeCom from '../components/Home';
import { FiltersProvider } from '../lib/hooks/useFilters';
class Home extends React.Component {
    render() { 
        return (<FiltersProvider> <Layout title={'Overview'}><HomeCom /> </Layout></FiltersProvider>);
    }
}
 
export default Home;