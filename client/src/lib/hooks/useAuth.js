import React, { useState, useEffect, useContext, createContext } from "react";
import API from "../API";

const authContext = createContext();
export  function ProvideAuth({ children }) {
  const auth =  useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
export const useAuth = () => useContext(authContext);

 function useProvideAuth() {
  const [user, setUser] = useState(null);
const [errors, setErrors] = useState(false)
const [isLoading, setIsLoading] = useState(false);


  const Login = async(email, password) => {
    setIsLoading(true); 
  try {
   const res =  await API.post('auth/login', {email, password})
   setUser({user: res.data.user, token: res.data.token});
   localStorage.setItem("AuthToken", res.data.token)
   setIsLoading(false); 
  return {user: res.data.user, token: res.data.token};
  } catch(e) {
    setErrors(e.response.data.message);
    setIsLoading(false); 
  return e.response.data.message;
  }  
  };
  const Register = async(email, password) => {
    setIsLoading(true); 
    try {
     const res =  await API.post('auth/register', {email, password})
    return Login(email, password)
    } catch(e) {
      setErrors(e.response.data.message);
      setIsLoading(false); 
    return e.response.data.message;
    }  
  };
  const logOut = () => {
 localStorage.removeItem("AuthToken");
        setUser(false);
     
  };
  

  useEffect(() => {
    console.log("memememem")
    fetchMe();
  }, []);

const fetchMe = () => {
  setIsLoading(true); 
    if(localStorage.getItem("AuthToken")) {
      
    API.get('auth/me', {
        headers: {
          'Authorization': `JWT ${localStorage.AuthToken}`
        }
      })
      .then(data => { setUser({user: data.data.user, token: localStorage.AuthToken});   setIsLoading(false);  })
      .catch(e => {if(!e.response.data.Auth) { setUser(false); localStorage.removeItem("AuthToken"); }   setIsLoading(false); })
      } else {
        setUser(false);
        setIsLoading(false); 
      }
}

  return {
    user,
    errors,
    isLoading,
    Login,
    Register,
    logOut
  };
}