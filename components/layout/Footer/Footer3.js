import { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import axios from 'axios';
// import { context } from "../../components/context";
import { context } from '../../context';
export default function Footer3({ footerClass, logoWhite }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [message, setMessage] = useState("")

  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });

  const created = useContext(context);
  const {selectedx, setSelectedx} = created
  useEffect(()=>{
    const changlang = async (selectedx, word) => {
      const options = {
          method: 'POST',
          url: 'https://deepl-translator2.p.rapidapi.com/translate',
          headers: {
              'content-type': 'application/json',
              'X-RapidAPI-Key': '7bddd58440msh9a827296af53740p1be7eajsn6674d57991b0',
              'X-RapidAPI-Host': 'deepl-translator2.p.rapidapi.com'
          },
          data: {
              source_lang: 'EN',
              target_lang: selectedx,
              text: word
          }
      };

      let res = await axios.request(options);
      return res?.data;
  };
  let footernew = document.querySelector(".footernew")
  let footerget = document.querySelector(".footerget")
  let footersub = document.querySelector(".footersub")
  let footerp = document.querySelector(".footerp")
  let footerconact = document.querySelector(".footerconact")
  let footerpolicy = document.querySelector(".footerpolicy")
  const footerall = async()=>{
    if (selectedx === 'GB') {
      footernew.textContent = "newsletter"
      footerget.textContent = "Get notified of the best articles on Dabar"
       footersub.textContent = "Subscribe"
    }else if (selectedx !== "" && selectedx !== 'GB') {
      let ansfooternew = await changlang(selectedx, footernew.textContent);
      let ansfooterget = await changlang(selectedx, footerget.textContent);
      let ansfootersub = await changlang(selectedx, footersub.textContent);
      let ansfooterp = await changlang(selectedx, footerp.textContent)
      let ansfooterconact = await changlang(selectedx, footerconact.textContent)
      let ansfooterpolicy = await changlang(selectedx, footerpolicy.textContent)
          // console.log(ansfooternew.data, ansfooterget.data, ansfootersub.data)
      footernew.textContent = ansfooternew.data
     footerget.textContent = ansfooterget.data
      footersub.textContent = ansfootersub.data
      footerp.textContent = ansfooterp.data
      footerconact.textContent = ansfooterconact.data
      footerpolicy.textContent = ansfooterpolicy.data
    }
  }

  footerall()
  },[selectedx])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubscribed(true)
            let formData = new FormData()
            formData.append('email',  email)
              apiClient.get('/sanctum/csrf-cookie').then(()=>{
                  let headers = new Headers();
                  headers.append('Content-Type', 'application/json')
                  let urlxw = '/api/subscribe';
                  apiClient.post(urlxw, formData, headers).then(res=>{
                    console.log(res)
                      if(res.data.success){
                          setMessage(res.data.success) 
                          setEmail("")  
                          setIsSubscribed(false)

                      }
      
                  }).catch(err=>{
                      let error = err.response.data.errors
      
                      if(error.email){
                          setMessage(error.email)
                          setIsSubscribed(false)
                          setEmail("")
                      }
                  })
                   })
  };

  return (
    <>
      <footer className={`footer-area bg-black ${footerClass}`}>
        <div className="newsletter-style-two style-three pt-80 pb-80">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xxl-6 col-xl-7 col-lg-8">
                <div className="newsletter__title text-center mb-35">
                  <div className="newsletter__title-icon">
                    <i className="fas fa-envelope-open-text" />
                  </div>
                  <span className="sub-title text-white footernew">newsletter</span>
                  <h4 className={`title  text-white footerget`}>
                    Get notified of the best articles<br /> on Dabar
                  </h4>

                </div>
                <div className="newsletter__form-wrap text-center">
                  {isSubscribed ? (
                    <div className="success-alert">
                    <p className='text-white '  id="footerthank">Thank you for subscribing!</p>
                  </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="newsletter__form">
                      <div className="newsletter__form-grp col-md-8">
                        <input
                          type="email"
                          placeholder="Email address"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="form-check">
                        {/* <input
                          className="form-check-input text-white"
                          type="checkbox"
                          id="flexCheckDefault"
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexCheckDefault"
                        >
                          I agree to my data is being collected
                          and stored.
                        </label> */}
                        </div>
                      </div>
                      <button className="btn" type="submit">
                        <span className="text footersub">Subscribe</span>
                        <i className="fas fa-paper-plane" />
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="footer__logo-wrap">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-4">
                <div className="footer__logo logo">
                  <Link href="/">
                    <img src="/assets/img/logo/w_logo.png" alt="Logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="footer__social">
                  <ul className="list-wrap">
                    <li>
                      <Link
                        href="https://www.facebook.com/profile.php?id=61552875998422&mibextid=ZbWKwL"
                        target="_blank"
                      >
                        <i className="fab fa-facebook-f" /> Facebook
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.instagram.com/the.dabar/?igshid=YzAwZjE1ZTI0Zg%3D%3D"
                        target="_blank"
                      >
                        <i className="fab fa-instagram" /> Instagram
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://twitter.com/Dabarnetwork?t=FdWs0919Lh2CqQxq50VUMg"
                        target="_blank"
                      >
                        <i className="fab fa-twitter" /> Twitter
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.linkedin.com/company/darbar-media/"
                        target="_blank"
                      >
                        <i className="fab fa-linkedin" /> Linkedin
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__copyright">
            <div className="row">
              <div className="col-lg-6">
                <div className="copyright__text">
                  <p className='footerp'>
                    All Rights Reserved © <a>Dabar</a> -{" "}
                    {new Date().getFullYear()}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="copyright__menu">
                  <ul className="list-wrap">
                    <li>
                      <Link href="/contact" className='footerconact'>Contact Us</Link>
                    </li>
                    <li>
                    <a href="/privacy" target="_blank" className='footerpolicy'>Privacy Policy</a>

                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

