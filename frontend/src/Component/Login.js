import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from 'react-router-dom'
import Swal from 'sweetalert2'

const Login = ()=>{
  const {msg} = useParams();
  // DOT ENV
  const api_url = process.env.REACT_APP_API_URL
  //USE NAVIGATE
  const Navigate = useNavigate()
  // USE STATES  
  // store user info
  const [user,setUser] = useState({
    email:"",
    password:""
  })
  // empty input chaking state
  const [empty,setEmpty] = useState(false)
  //ALERT SHOW
  
  
  // LOGIN FUNCTION
  const HandleLogin = async ()=>{
    // if any input empty set empty true else fetch
    if(!user.email || !user.password){
      setEmpty(true);
      return false
    }else{
      try{
        let result = await fetch(`${api_url}/user-login`,{
          method:"post",
          body:JSON.stringify(user),
          headers:{
            "content-type":"application/json"
          }
        });
        result = await result.json()
        // if all curect , set token in ls and navigate
        if(result.status = true){
          localStorage.setItem("scut",JSON.stringify(result.data._id));
          Navigate(`/profile/${result.data._id}`)
        }else{
          Swal.fire(result.msg)
        }
      }catch(error){
        console.log(error);
        Swal.fire("user not faund");
      }
    }
  }
  return(
    <>
      {<div className="from_body">
        <div className="form">
          <h1 className="h">Login</h1>
          
          <input className="input"
          type="email"
          placeholder="Enter email"
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous, email:e.target.value
            }
          })}
          />
          
          <input className="input"
          type="password"
          placeholder="Enter password"
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous, password:e.target.value
            }
          })}
          />
          <button className="button" onClick={HandleLogin}>Login</button>
        </div>
        </div>
      }
    </>
    );
};
export default Login;