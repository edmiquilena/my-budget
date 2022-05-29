import React from 'react';
import {
  ChakraProvider,
} from '@chakra-ui/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import Register from './routes/Register';
import Theme from './Theme';
import WebFont from 'webfontloader';
import Login from './routes/Login';
import { ProvideAuth } from './lib/hooks/useAuth';
import { RequireAuth } from './lib/helpers/RequireAuth';
import Add from './routes/Add';
import { QueryClient, QueryClientProvider} from 'react-query'
import View from './routes/View';

WebFont.load({
  google: {
    families: ['Manrope', 'Rubik']
  }
});

const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
    <ProvideAuth>
    <ChakraProvider theme={Theme}>
     <BrowserRouter>
       <Routes>
         <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/add" element={<RequireAuth><Add /></RequireAuth>} />
         <Route path="/view/:id" element={<RequireAuth><View /></RequireAuth>} />
       </Routes>
     </BrowserRouter>
    </ChakraProvider></ProvideAuth></QueryClientProvider>
  );
}

export default App;
