import React from 'react'
import {Navigate,Outlet} from 'react-router-dom'

const PrivetComponent = ()=>{
  let auth = localStorage.getItem("scut");
  return auth ? <Outlet/> : <Navigate to="/user-login"/>
};
export default PrivetComponent;