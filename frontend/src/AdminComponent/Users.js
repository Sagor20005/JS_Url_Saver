import React, { useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import {useNavigate} from 'react-router-dom'

const Users = ()=> {
  const api_url = process.env.REACT_APP_API_URL
  //useNavigate
  const Navigate = useNavigate()
  //STATE DEFINED
  const [users,setUsers] = useState([])
  //ANY CHANGE STATE 
  const [change,setChange] = useState(false);
  // GET ALL USER FUNCTION
  useEffect(()=>{
    //SELF COLLING FUNCTION GET ALL USER
    (async function(){
      try{
        let result = await fetch(`${api_url}/users`);
        result = await result.json();
        console.log(result)
        if(result.status === true){
          setUsers(result.data)
        }
      }catch(error){
        console.log({
          oparetion:"get all user",
          err:error
        })
        Swal.fire("Fetch faild")
      }
    })()
    
  },[change])
  
  //  HANDLE DELETE 
  const Delete = async (id)=>{
    
    try{
      let result = await fetch(`${api_url}/delete-user/${id}`,{method:"delete"})
      result = await result.json();
      console.log(result)
      if(result.status===true){
        if(change===true){
          setChange(false);
        }else{
          setChange(true);
        }
      }
    }catch(error){
      console.log({err:error});
      Swal.fire("Cannt delete")
    };
    
  };
  
  return(
    <>
      {
      
      <div className="admin-social-containar">
        {users.map((user)=> {
          return(
            <div className="admin-social-box">

              <div className="admin-social-info">
                <img
                alt="logo"
                src={user.img}
                />
              <h2>
                {user.name}
              </h2>
              
            </div>

            {/* oparetion section*/}
            <div className="admin-social">
              <button onClick={()=>Delete(user._id)}>
                Delete
              </button>
              
              <button
              onClick={()=>Navigate(`/card/${user._id}`)}
              >Visit</button>
              
              <button onClick={()=>Navigate(`/update-user/${user._id}`)}>
                Update
              </button>
            </div>

          </div>
        )
        })}
    </div>
    }
  </>
);
};
export default Users;