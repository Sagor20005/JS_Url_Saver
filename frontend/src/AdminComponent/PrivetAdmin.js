import React from 'react'
import {Outlet,Navigate} from 'react-router-dom'

const PrivetAdmin = ()=>{
  let admin = localStorage.getItem("scat");
  return admin ? <Outlet/>:<Navigate to="/admin-login"/>
};
export default PrivetAdmin;