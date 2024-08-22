import React from 'react'
import {useNavigate} from 'react-router-dom'

const Home = ()=> {
  const Navigate = useNavigate()
  return(
    <>
      {
      <div className="home_containar">

        <div className="admin_btn_box">
          <button onClick={()=>Navigate("/admin")}>Admin Panel</button>
        </div>

        <div className="home_heading_box">
          <h1>Make Social media card creator</h1>
          <p>
            Introducing URL Saver: Your One-Stop Solution for Quick and Easy Social Media Profile Access

Tired of remembering long and complex social media profile URLs? Look no further! URL Saver is here to simplify your online life. Our innovative website allows you to effortlessly save and organize the profiles of your favorite social media platforms.

How it works:

Save Your URLs: Simply enter the desired social media profile URL into our user-friendly interface.
Generate QR Code: Instantly generate a unique QR code that corresponds to the saved URL.
Scan and Access: Use your smartphone or tablet to scan the QR code. You'll be redirected to the saved profile with a single tap.
Key features:

Intuitive Interface: Our website is designed to be easy to navigate, even for those who are not tech-savvy.
Fast and Efficient: Save and access your URLs in seconds.
Secure and Reliable: We prioritize your privacy and data security.
Versatile Compatibility: Works with all major social media platforms, including Facebook, Instagram, Twitter, LinkedIn, and more.
Customizable QR Codes: Choose from various QR code designs to match your personal style.
Why use URL Saver?

Save Time: No more searching for those lengthy URLs.
Stay Organized: Keep your favorite profiles in one place.
Share Easily: Share QR codes with friends and family for quick access.
Enhance Privacy: Protect your personal information by avoiding direct sharing of URLs.
Experience the convenience of URL Saver today!












Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy & 
          </p>
        </div>

      </div>
      }
    </>
  );
};
export default Home;