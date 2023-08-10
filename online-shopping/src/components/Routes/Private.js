import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/auth';
import axios from 'axios';
import { Outlet } from 'react-router-dom';
import Sppinner from '../Sppinner';
export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const [auth]= useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get('/api/v1/auth/user-auth');
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error);
        setOk(false);
      }
    };
    
    console.log(auth?.token)
    if (auth?.token) authCheck();
    
  }, [auth?.token]);

  return ok ? <Outlet /> : <Sppinner/>;
  
}
