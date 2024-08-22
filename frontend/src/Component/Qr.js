import React, {
  useEffect,
  useState,
  useRef
} from 'react'
import {
  useParams
} from 'react-router-dom'
import Swal from 'sweetalert2'
import htmltoimage from 'html-to-image';
import {
  toPng
} from 'html-to-image'

const Qr = ()=> {
  const qr_url = (window.location.href).replace("qr", "card")
  const qrElement = useRef(null)
  const api_url = process.env.REACT_APP_API_URL
  const {
    id
  } = useParams();
  const [user,
    setUser] = useState( {
      img: "loding"
    })
  useEffect(()=> {
    const GetImg = async ()=> {
      try {
        let result = await fetch(`${api_url}/get-user/${id}`)
        result = await result.json();
        if (result.status === true) {
          setUser(result.data)
        }
      }catch(error) {
        console.log(error)
        Swal.fire("can't get")
      }
    }
    GetImg()
  },
    [])

  const DownloadQr = async ()=> {
    const dataUrl = await toPng(qrElement.current);
    let link = document.createElement("a");
    link.download = `${user.name}-social-card.png`;
    link.href = dataUrl;
    link.click()
  };

  return(
    <>
      {
      <div className="output_containar">
        <div className="qr_body" ref={qrElement}>
          <div className="output">
            <div className="output_profile_box">
              <img
              alt="profile"
              src={user.img}
              />
          </div>
          <div className="qr_box">
            <img
            alt="qr"
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qr_url}`}
            />
        </div>
      </div>
    </div>
    <img src="https://img.icons8.com/?size=100&id=108642&format=png&color=000000"
    alt="download/qr"
    className="qr_btn"
    onClick={()=>DownloadQr()}
    />
</div>
}
</>
);
};
export default Qr;