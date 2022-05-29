import React, { Component } from 'react';
import Helmet from 'react-helmet';
import RegisterForm from '../components/RegisterForm';

class Register extends Component {
    render() { 
        return ( 
           <> <Helmet>
           <meta charset="UTF-8"></meta> 
           <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📕</text></svg>"/>
           <title>Register - MyBudget</title><link rel="icon" type="image/png" sizes="32x32" href="/_next/static/media/favicon-32x32.b7ef9ede.png"/>
           <meta
         name="description"
         content="MyBudget - Personal budget as part of Alkemy's Full stack challenge"
       />
           </Helmet>
            <RegisterForm />
         </>
        
        
            );
    }
}
 
export default Register;