import Link from "next/link";
import InstagramSidebarSlider from "../slider/InstagramSidebarSlider";
import SidePostSlider from "../slider/SidePostSlider";
import Authorside from "@/components/elements/AuthorSidebar";
import { useEffect } from "react";
import axios from "axios";
export default function BlogSidebar(props) {
  const { writer, selectedx } = props;
  useEffect(()=>{
    const changlangx = async (selectedx, word) => {
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
        return res?.data
        
  };
    let categx = document.querySelector(".categx")
    let businessx = document.querySelector(".businessx")
     let technologyx = document.querySelector(".technologyx")
     let financex = document.querySelector(".financex")
     let culture  = document.querySelector(".culture")
     let productivityx = document.querySelector(".productivityx")
     let eventsx = document.querySelector(".eventsx")
     let opinions = document.querySelector(".opinions")
   const changlang = async()=>{
       
      if (selectedx === 'GB') {
        let anscategory = await changlangx("EN", categx.innerText)
        let  ansbusinessx =   await changlangx("EN", businessx.innerText)
         let anstechnologyx =    await changlangx("EN", technologyx.innerText)
       let ansfinancex =  await changlangx("EN", financex.innerText)
        let ansculture =  await changlangx("EN", culture.innerText)
         let ansproductivityx =  await changlangx("EN", productivityx.innerText)
          let anseventsx =   await changlangx("EN", eventsx.innerText)
         let ansopinions = await changlangx("EN", opinions.innerText)
         categx.innerHTML = anscategory.data
         businessx.innerHTML = ansbusinessx.data
         technologyx.innerHTML = anstechnologyx.data
         financex.innerHTML =  ansfinancex.data
         culture.innerHTML = ansculture.data
         productivityx.innerHTML = ansproductivityx.data
         eventsx.innerHTML = anseventsx.data
         opinions.innerHTML = ansopinions.data
      }else if (selectedx !== "" && selectedx !== 'GB') {
        let anscategx = categx.innerText.replace(/&\s*/g, '')
        let ansbusinessxs = businessx.innerText.replace(/&\s*/g, '')
        let anstech = technologyx.innerText.replace(/&\s*/g, '')
        let ansfin = financex.innerText.replace(/&\s*/g, '')
        let anscul = culture.innerText.replace(/&\s*/g, '')
        let anspro = productivityx.innerText.replace(/&\s*/g, '')
        let anseven = eventsx.innerText.replace(/&\s*/g, '')
        let ansopi = opinions.innerText.replace(/&\s*/g, '')

        let anscategory = await changlangx(selectedx, anscategx)
       let  ansbusinessx =   await changlangx(selectedx, ansbusinessxs)
        let anstechnologyx =    await changlangx(selectedx, anstech)
      let ansfinancex =  await changlangx(selectedx, ansfin)
       let ansculture =  await changlangx(selectedx, anscul)
        let ansproductivityx =  await changlangx(selectedx, anspro)
         let anseventsx =   await changlangx(selectedx, anseven)
        let ansopinions = await changlangx(selectedx, ansopi)
        categx.innerHTML = anscategory.data
        businessx.innerHTML = ansbusinessx.data
        technologyx.innerHTML = anstechnologyx.data
        financex.innerHTML =  ansfinancex.data
        culture.innerHTML = ansculture.data
        productivityx.innerHTML = ansproductivityx.data
        eventsx.innerHTML = anseventsx.data
        opinions.innerHTML = ansopinions.data
      }else{
        categx.innerHTML = categx.innerText
        businessx.innerHTML = businessx.innerText
        technologyx.innerHTML = technologyx.innerText
        financex.innerHTML = financex.innerText
        culture.innerHTML = culture.innerText
        productivityx.innerHTML = productivityx.innerText
        eventsx.innerHTML = eventsx.innerText
        opinions.innerHTML = opinions.innerText
      }
    }
    changlang()
  },[selectedx])
  return (
    <>
      <aside className="blog-sidebar">
        <div className="widget sidebar-widget">
          <div className="tgAbout-me">
            <div className="tgAbout-thumb">
              <img src="/assets/img/others/about_me.png" alt="me" />
            </div>
            <div className="tgAbout-info">
              <span className="designation">{writer}</span>
            </div>
            <div className="tgAbout-social">
              <Link
                href="https://www.facebook.com/profile.php?id=61552875998422&mibextid=ZbWKwL"
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </Link>
              <Link
                href="https://twitter.com/Dabarnetwork?t=FdWs0919Lh2CqQxq50VUMg"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </Link>
              <Link
                href="https://www.linkedin.com/company/darbar-media/"
                target="_blank"
              >
                <i className="fab fa-linkedin" />
              </Link>
              <Link
                href="https://www.instagram.com/the.dabar/?igshid=YzAwZjE1ZTI0Zg%3D%3D"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </Link>
            </div>
          </div>
        </div>
        <div className="widget sidebar-widget widget_categories">
          <h4 className="widget-title text-center categx" data-name="Trending Category" >Trending Category</h4>
          <ul className="list-wrap">
            <li>
              <div className="thumb">
                <Link href="/blog">
                  <img
                    src="/assets/img/category/side_category02.jpg"
                    alt="img"
                  />
                </Link>
              </div>
              <Link href="/blog"  data-name="Business Insights" className="businessx">Business Insights</Link>
            </li>
            <li>
              <div className="thumb">
                <Link href="/blog">
                  <img
                    src="/assets/img/category/side_category01.jpg"
                    alt="img"
                  />
                </Link>
              </div>
              <Link href="/blog" data-name="Technology Trends" className="technologyx">Technology Trends</Link>
            </li>
            <li>
              <div className="thumb">
                <Link href="/blog">
                  <img
                    src="/assets/img/category/side_category09.jpg"
                    alt="img"
                  />
                </Link>
              </div>
              <Link href="/blog" data-name="Marketing Finance" className="financex">Marketing & Finance</Link>
            </li>
            <li>
              <div className="thumb">
                <Link href="/blog">
                  <img
                    src="/assets/img/category/side_category04.jpg"
                    alt="img"
                  />
                </Link>
              </div>
              <Link href="/blog" data-name="Workplace Culture" className="culture">Workplace & Culture</Link>
            </li>
            <li>
              <div className="thumb">
                <Link href="/blog">
                  <img
                    src="/assets/img/category/side_category06.png"
                    alt="img"
                  />
                </Link>
              </div>
              <Link href="/blog" data-name="Productivity Innovation" className="productivityx">Productivity & Innovation</Link>
            </li>
            <li>
              <div className="thumb">
                <Link href="/blog">
                  <img
                    src="/assets/img/category/side_category08.png"
                    alt="img"
                  />
                </Link>
              </div>
              <Link href="/blog" data-name="Multimedia Events" className="eventsx">Multimedia & Events</Link>
            </li>
            <li>
              <div className="thumb">
                <Link href="/blog">
                  <img
                    src="/assets/img/category/side_category07.png"
                    alt="img"
                  />
                </Link>
              </div>
              <Link href="/blog" data-name="Opinions Editorials" className="opinions">Opinions & Editorials</Link>
            </li>
          </ul>
        </div>
        <div className="widget sidebar-widget">
          <SidePostSlider />
        </div>
        <div className="widget sidebar-widget">
          <h4 className="widget-title text-center">Instagram Feeds</h4>
          <div className="sidebarInsta__wrap">
            <div className="sidebarInsta__top">
              <div className="sidebarInsta__logo">
                <img src="/assets/img/instagram/insta_logo.png" alt="img" />
              </div>
              <div className="sidebarInsta__info">
                <h6 className="name">
                  <Link href="#">instagram/Dabar</Link>
                </h6>
                <span className="designation">Your lens into ...</span>
              </div>
            </div>
            <div className="sidebarInsta__slider-wrap">
              <div className="swiper-container sidebarInsta-active">
                <InstagramSidebarSlider />
              </div>
              <div className="swiper-container sidebarInsta-active-2" dir="rtl">
                <InstagramSidebarSlider />
              </div>
            </div>
            <div className="sidebarInsta__bottom">
              <Link
                href="https://www.instagram.com/the.dabar/?igshid=YzAwZjE1ZTI0Zg%3D%3D"
                target="_blank"
                className="btn"
              >
                <i className="fab fa-instagram" />
                <span className="text">Follow Me</span>
              </Link>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
