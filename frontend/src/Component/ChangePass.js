import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const ChangePassword = ()=>{
  const api_url = process.env.REACT_APP_API_URL
  const Navigate = useNavigate()
  // EXTRACT ID FROM PARAMS 
  const {id} = useParams();
  // STORE ALL INPUT DATA 
  const [Password,setPassword] = useState({
    previousPass:"",
    newPass:"",
    id:""
  });
  const [empty,setEmpty] = useState(false)
  
  useEffect(()=>{
    const setId = ()=>{
      setPassword((previous)=>{
      return{
        ...previous,id:id
      }
    })
    }
    setId()
  },[])
  
  // HANDLE UPDATE PASSWORD 
  const UpdatePassword = async ()=>{
    if(!Password.previousPass || !Password.newPass){
      setEmpty(true);
      return false
    }else{
      try{
        let result = await fetch(`${api_url}/change-password`,{
        method:"put",
        body:JSON.stringify(Password),
        headers:{
          "content-type":"application/json"
        }
      });
      result = await result.json();
      if(result.status=== true){
        Swal.fire("Updated");
        Navigate(`/profile/${id}`)
      }
      }catch(error){
        console.log(error)
        Swal.fire("update error")
      }
    }
  };
  
  return(
    <>
      {
        <div className="form">
          <h1 className="h">Change password</h1>
          
          <input className="input"
          type="text"
          placeholder="Enter Previous Password"
          onChange={(e)=>setPassword((previous)=>{
            return{
              ...previous,previousPass:e.target.value
            }
          })}
          />
          {empty && !Password.previousPass && <p className="empty">please enter old password</p>}
          
          <input className="input"
          type="text"
          placeholder="Create New Password"
          onChange={(e)=>setPassword((previous)=>{
            return{
              ...previous,newPass:e.target.value
            }
          })}
          />
          {empty && !Password.newPass && <p className="empty">please enter nee password</p>}
          
          <button className="button" onClick={UpdatePassword} >Update</button>
          
        </div>
      }
    </>
    );
};
export default ChangePassword;