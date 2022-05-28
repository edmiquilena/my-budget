import React from 'react';
import Layout from '../components/Layout';
import HomeCom from '../components/Home';
import { FiltersProvider } from '../lib/hooks/useFilters';
class Home extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return (<FiltersProvider> <Layout title={'Home'}><HomeCom /> </Layout></FiltersProvider>);
    }
}
 
export default Home;