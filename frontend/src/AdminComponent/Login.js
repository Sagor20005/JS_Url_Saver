import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const AdminLogin = ()=>{
  const Navigate = useNavigate()
  const bypas = process.env.REACT_APP_ADMIN_TOCKEN
  const [password,setPass] = useState("");
  
  const HandleLogin = ()=>{
    if(bypas===password){
      localStorage.setItem("scat",JSON.stringify({admin:true}))
      Navigate("/admin")
    }else{
      Swal.fire("incurrect password")
    }
  }
  return(
    <div className="form">
      <h1 className="h">Login</h1>
      <input className="input" type="password" placeholder="enter password"
      onChange={(e)=>setPass(e.target.value)}
      />
      <button className="button" onClick={HandleLogin}>Login</button>
    </div>
    );
};
export default AdminLogin;