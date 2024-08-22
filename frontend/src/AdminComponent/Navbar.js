import React from 'react'
import {
  NavLink,
  useLocation
} from 'react-router-dom'

const Navbar = ()=> {
  // USE LOCATTION
  const Location = useLocation()
  return(
    <>
      { <div className="navbar">
          <h2>Admin</h2>
          <ul>
            <li>
              <NavLink to="/add-user">Add user</NavLink>
            </li>
            <li onClick={()=>localStorage.removeItem("scat")}>
              Logout
            </li>
          </ul>
      </div>
      }
    </>
  );
};
export default Navbar;