import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ({id})=>{
  return(
    <>
      {
        <div className="user_nav">
          <ul>
            <li>
              <Link to={`/add-account/${id}`}>Add-New</Link>
            </li>
            <li onClick={()=>localStorage.removeItem("scut")}>
              logout
            </li>
            <li>
              <Link to={`/change-password/${id}`}>Change-Pass</Link>
            </li>
          </ul>
        </div>
      }
    </>
    );
};
export default Navbar;