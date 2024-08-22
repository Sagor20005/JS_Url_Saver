import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import Swal from 'sweetalert2'
import Social from './Social'

const Card = ()=> {
  const api_url = process.env.REACT_APP_API_URL
  const {id} = useParams()
  // USE STATE HUCKS
  const [userInfo,setUserInfo] = useState({
    name:"Loding..",
    bio:"Loding..",
    email:"",
    password:"",
    img:""
  })
  
  useEffect(()=>{
    (async function(){
      try{
        let result = await fetch(`${api_url}/get-user/${id}`);
        result = await result.json()
        console.log(result)
        setUserInfo(result.data)
      }catch(error){
        console.log({err:error})
        Swal.fire("Fetch faild")
      }
    })();
    
  },[])
  
  return(
    <>
      {
      <div className="card-containar">
        {/* CARD PROFILE AND NAME */}
        <div className="card">
          <img src={userInfo.img} crossOrigin ="anonymous"  alt={`${userInfo.name} img`} />
        <div className="profile_info">
          <h1>{userInfo.name}</h1>
          <br />
        <p>
          {userInfo.bio}
        </p>
      </div>
    </div>
    {userInfo.name === "Loding.." ? <h4 style={{textAlign:"center"}} >Loding wait..</h4>:null}
    {/* CARD SOCIAL LINK SIDE */}
    {userInfo._id ? <Social uId={userInfo._id}/> : null }
    
</div>
}
</>
);
};
export default Card;