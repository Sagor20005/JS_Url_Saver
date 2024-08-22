import React, {
  useState,
  useEffect
} from 'react'
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'



const Social = ({uId})=> {
  const Navigate = useNavigate()
  const api_url = process.env.REACT_APP_API_URL
  console.log(uId)
  //USE STATE FOR STORVALL SOCIAL
  const [social,
    setSocial] = useState([{
      platform: "Loding...",
      img: "https://img.icons8.com/?size=100&id=41771&format=png&color=000000",
      url: "#",
      authorId: ""
    }])
  // STORE LOCAL STORAGE UID && CHEAK TO == PROP UID
  const [LsUid,setLsUid] = useState("");
  const [auth,setAuth] = useState(false);
  

  // GET ALL ACCOUNT START THE PAGE
  useEffect(()=> {
    (async function() {
      try {
        let result = await fetch(`${api_url}/accounts/${uId}`);
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
  }, [])
  
   // get uid from local storage and cheak equals
  useEffect(()=>{
    setLsUid(JSON.parse(localStorage.getItem("scut")));
    if(LsUid === uId){
      console.log(LsUid)
      setAuth(true)
      console.log(auth)
    }
  },[social])

  return(
    <>
      {
      <div>
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
            </div>
          )
          })
        }
        {/* PROFILE BUTTON */}
        <img src="https://img.icons8.com/?size=100&id=108634&format=png&color=000000"
        alt="add" 
        className="floting_button"
        onClick={()=>LsUid && auth? Navigate(`/profile/${uId}`):Navigate("/user-login")}
        />
        {/* QR CODE PAGE BUTTON */}
        <img src="https://img.icons8.com/?size=100&id=113575&format=png&color=000000"
        alt="qr_btn"
        className="qr_btn"
        onClick={()=>Navigate(`/qr/${uId}`)}
        />
        
      </div>
    </div>
    }
  </>
);
};
export default Social;