import React,{useState,useEffect} from 'react'
import {useParams,useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import socialAndLink from './Data/socialAndLink.json'


const AddAccount = ()=>{
  const Navigate = useNavigate();
  // EXTRACT SOCIAL NAME AND URL AN ARRAY
  const urls = Object.values(socialAndLink);
  const name = Object.keys(socialAndLink);
  const api_url = process.env.REACT_APP_API_URL
  const {id} = useParams()
  //USE STATE VARUAVLE
  const [account,setAccount] = useState({
    platform:"",
    img:"",
    url:"",
    authorId:""
  })
  const [empty,setEmpty] = useState(false)
  // INITIALIZE ARRAY INDEX  INCRISED BY LOOP
  let count =-1;
  
  useEffect(()=>{
    setAccount((previous)=>{
      return {...previous,authorId:id}
    })
  },[])
  //HANDLE SUBMIT FUNCTION
  const HandleSubmit = async ()=>{
    if(!account.img || !account.url){
      setEmpty(true);
      return false
    }else{
      try{
        let result = await fetch(`${api_url}/add-account`,{
          method:"post",
          body:JSON.stringify(account),
          headers:{
            "content-type":"application/json"
          }
        })
        result = await result.json()
        console.log(result)
        if(result.status === true){
          Swal.fire("Added succese")
          Navigate(`/profile/${id}`)
        }
      }catch(error){
        console.log(error)
        Swal.fire("Fetch Error")
      }
    }
  };
  
  return(
    <>
    {
      <div className="form">
        <h1 className="h">Add Account</h1>
        <select className="select" onChange={(e)=>setAccount((previous)=>{
          return {
            ...previous, platform: e.target.selectedOptions[0].text, img: e.target.value
          }
        })}>
          {
            name.map((e)=>{
            count++
              return(
              <option value={urls[count]}>{e}</option>
              )
            })
          }
        </select>
        {!account.img && empty && <p className="empty">Please select social</p>}
        
        <input
        className="input"
        type="text"
        placeholder="Enter your link"
        onChange={(e)=>setAccount((previous)=>{
          return{
            ...previous, url:e.target.value
          }
        })}
        />
        {!account.url && empty && <p className="empty">Please enter profile Link</p>}
        
        <button className="button" onClick={HandleSubmit}>Add Now</button>
      </div>
    }
    </>
    );
};
export default AddAccount