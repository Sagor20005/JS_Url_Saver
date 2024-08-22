import React,{useEffect,useState} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import Navbar from './Navbar'

const Profile = ()=>{
  const api_url = process.env.REACT_APP_API_URL
  const Navigate = useNavigate();
  // STOR ALL ACCOUNT
  const [social,
    setSocial] = useState([{
      platform: "Loding...",
      img: "https://img.icons8.com/?size=100&id=41771&format=png&color=000000",
      url: "#",
      authorId: ""
    }])
    // CHANGE EVENT MANUAL
    const [change,setChange] = useState(false)
  
  // PARAMS
  const {id} = useParams();
  // CHEKING ID VALIDATION AND GET ALL ACCOUNT
  useEffect(()=>{
    // get all account
    (async function() {
      try {
        let result = await fetch(`${api_url}/accounts/${id}`);
        result = await result.json()
        console.log(result)
        if(result.status === true){
          setSocial(result.data)
        }
      }catch(error) {
        console.log(error)
        Swal.fire("Fetch Error")
      }
    })()
  },[change])
  
  // HANDLE DELETE FUNCTION
  const HandleDelete = async (id)=>{
    try{
      let result = await fetch(`${api_url}/delete-account/${id}`,{method:"delete"});
      result = await result.json();
      // refress all account and page
      if(result.status===true){
        if(change){
          setChange(false)
        }else{
          setChange(true)
        }
      }
    }catch(error){
      console.log(error);
      Swal.fire("Can't Delete")
    }
  }
  
  return(
    <>
      {
        <div>
          <Navbar id={id}/>
        <div className="social-containar">
          {
          social.map((e)=> {
            return(
              <div className="social">
                <img src={e.img} alt="logo" />
              <h2>{e.platform}</h2>
              <button
                onClick={()=>window.location.href=`${e.url}`}
                >Visit</button>
              
              <img src="https://img.icons8.com/?size=100&id=102550&format=png&color=000000" 
              alt="delete"
              className="delete_btn"
              onClick={()=>HandleDelete(e._id)}
              />
              
            </div>
          )
          })
        }
        
      </div>
    </div>
      }
    </>
    );
};
export default Profile;