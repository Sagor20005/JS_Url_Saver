import React from 'react'
import {} from 'react-router-dom'
import Users from './Users'
import Navbar from './Navbar'

const Admin = ()=>{
  return(
    <>
      {
      <div>
      <Navbar/>
      <Users />
      </div>
      }
    </>
    );
};
export default Admin;