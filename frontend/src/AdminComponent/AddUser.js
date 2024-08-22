import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const AddUser = ()=>{
  const api_url = process.env.REACT_APP_API_URL
  // NAVIGATE 
  const Navigate = useNavigate()
  // USE STATE HUCK FOR STORE ALL INPUT DATA
  const [user,setUser] = useState({
    name:"",
    bio:"",
    email:"",
    password:"",
    img:""
  })
  const [empty,setEmpty] = useState(false)
  
  const HandleSubmit = async ()=>{
    if(!user.name || !user.bio || !user.email || !user.password || !user.img){
      setEmpty(true);
      return false
    }else{
      try{
        let result = await fetch(`${api_url}/add-user`,{
          method:"post",
          body:JSON.stringify(user),
          headers:{
            "content-type":"application/json"
          }
        });
        result = await result.json();
        console.log(result)
        if(result.status === true){
          Navigate("/admin")
        }
      }catch(error){
        Swal.fire("Fetch faild")
        console.log({
          oparetion:"post data in server",
          err:error
        })
      }
    }
  }
  return(
    <>
      {
        <div className="form">
          <h1 className="h">Add User</h1>
          <input className="input" 
          type="text" 
          placeholder="enter Name"
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,name:e.target.value
            }
          })}
          />
          {empty && !user.name && <p className="empty">Please enter name</p>}
          
          <input className="input" type="text" placeholder="enter bio"
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,bio:e.target.value
            }
          })}
          />
          {empty && !user.bio && <p className="empty">Please enter bio</p>}
          
          <input className="input" type="email" placeholder="enter email"
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,email:e.target.value
            }
          })}
          />
          {empty && !user.email && <p className="empty">Please enter email</p>}
          
          <input className="input" type="text" placeholder="enter password"
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,password:e.target.value
            }
          })}
          />
          {empty && !user.password && <p className="empty">Please enter password</p>}
          
          <input className="input" type="text" placeholder="pest Image link"
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,img:e.target.value
            }
          })}
          />
          
          <button className="button" onClick={HandleSubmit}>Submit</button>
        </div>
      }
    </>
    );
};
export default AddUser;