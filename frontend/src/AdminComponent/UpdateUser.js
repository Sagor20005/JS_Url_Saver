import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

const UpdateUser = ()=>{
  const Navigate = useNavigate();
  const api_url = process.env.REACT_APP_API_URL
  const {id} = useParams()
  // STORE ALL INPUT FIELD AND DATA
  const [user,setUser] = useState({
    name:"",
    bio:"",
    email:"",
    password:"",
    img:""
  });
  const [empty,setEmpty] = useState(false);
  //GET USER DATA 
  useEffect(()=>{
    const GetUser = async ()=>{
      try{
        let result = await fetch(`${api_url}/get-user/${id}`);
        result = await result.json()
        if(result.status === true){
          setUser(result.data)
        }else{
          Swal.fire("cann't get")
        }
      }catch(error){
        console.log(error)
        Swal.fire("User Can't get")
      }
    };
    GetUser()
  },[])
  
  //HANDLE UPDATE 
  const HandleUpdate = async (id)=>{
    if(!user.name || !user.bio || !user.email || !user.password || !user.img){
      setEmpty(true);
      return false
    }else{
      try{
        let result = await fetch(`${api_url}/update-user/${id}`,{
          method:"put",
          body:JSON.stringify(user),
          headers:{
            "content-type":"application/json"
          }
        })
        result = await result.json();
        if(result.status===true){
          Swal.fire("Updated");
          Navigate("/admin")
        }else{
          Swal.fire("update faild")
        }
      }catch(error){
        console.log(error);
        Swal.fire("update faild")
      }
    };
  }
  
  return(
    <>
      {
        <div className="form">
          <h1 className="h">Update User</h1>
          <img src={user.img} alt="profile"/>
          
          <input className="input"
          type="text"
          placeholder="Change name"
          value={user.name}
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,name:e.target.value
            }
          })}
          />
          {!user.name && empty && <p className="empty">Please enter value</p>}
          
          <input className="input"
          type="text"
          placeholder="Change bio"
          value={user.bio}
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,bio:e.target.value
            }
          })}
          />
          {!user.bio && empty && <p className="empty">Please enter value</p>}
          
          <input className="input"
          type="text"
          placeholder="Change email"
          value={user.email}
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,email:e.target.value
            }
          })}
          />
          {!user.email && empty && <p className="empty">Please enter value</p>}
          
          <input className="input"
          type="text"
          placeholder="Change password"
          value={user.password}
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,password:e.target.value
            }
          })}
          />
          {!user.password && empty && <p className="empty">Please enter value</p>}
          
          <input className="input"
          type="text"
          placeholder="Change image url"
          value={user.img}
          onChange={(e)=>setUser((previous)=>{
            return{
              ...previous,img:e.target.value
            }
          })}
          />
          {!user.img && empty && <p className="empty">Please enter value</p>}
          
          <button className="button" onClick={()=>HandleUpdate(user._id)}>Update</button>
          
        </div>
      }
    </>
    );
};
export default UpdateUser;