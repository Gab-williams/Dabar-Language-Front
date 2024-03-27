import dynamic from 'next/dynamic'
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useContext, useEffect, useRef} from "react";
import { context } from "../../../components/context";
import axios from 'axios';
const ThemeSwitch = dynamic(() => import('@/components/elements/ThemeSwitch'), {
    ssr: false
})

export default function Menu({ handleMobileMenuOpen, handleSidebarOpen, offCanvasNav, logoAlt, white }) {
  const created = useContext(context);
  const {selectedx, setSelectedx} = created
    const router = useRouter()
    const {id, hello} = router.query
 
    const [searchToggle, setSearchToggle] = useState(false)
    const searchHandle = () => setSearchToggle(!searchToggle)
    const [categoryMenux, SetcategoryMenux] = useState([])

    const categoryMenu = [
        {
          title: "Business Insights",
          name:"Business Insights",
          subcategories: [
            "Industry Insights",
            "Entrepreneurship",
            "Leadership & Management",
            "Global Economy",
            "Corporate Responsibility",
          ],
        },
        {
          title: "Technology Trends",
          name:"Technology Trends",
          subcategories: [
            "Technology & Innovation",
            "Blockchain & Cryptocurrency",
            "Artificial Intelligence & Machine Learning",
          ],
        },
        {
          title: "Marketing & Finance",
          name: "Marketing & Finance",
          subcategories: ["Marketing & Advertising", "Finance & Investment"],
        },
        {
          title: "Workplace & Culture",
          name:"Workplace & Culture",
          subcategories: [
            "Human Resources",
            "Diversity & Inclusion",
            "Career Development",
          ],
        },
        {
          title: "Productivity & Innovation",
          name:"Productivity & Innovation",
          subcategories: ["Productivity & Tools", "Innovation Implementation"],
        },
        {
          title: "Multimedia & Events",
          name:"Multimedia & Events",
          subcategories: ["Events & Conferences", "Multimedia Content"],
        },
        {
          title: "Opinions & Editorials",
          name: "Opinions & Editorials",
          subcategories: ["Opinion & Editorial"],
        },
      ];
  
    const moretry = useRef(null)
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
          return res?.data
         
        
      };
     
       let morex = document.querySelector(".morex")
        const whole = async()=>{
          if (selectedx === 'GB') {
            let ansmorexs = await changlang("EN", 'More')
            morex.innerHTML = ansmorexs.data
            SetcategoryMenux(categoryMenu);
        } else if (selectedx !== "" && selectedx !== 'GB') {
          console.log("here", selectedx)
          const translatedData = await Promise.all(categoryMenu.map(async (item) => {
                let anstitle = item.name.replace(/&\s*/g, '')
            let title = await changlang(selectedx, anstitle);
            let ansmorexs = await changlang(selectedx, 'More')
             morex.innerHTML = ansmorexs.data
      
            return {
              title: title.code == 200?title.data:"",
              name: item.name,
              img: item.img,
       
            };
        }));
        SetcategoryMenux(translatedData);
        
  
        }else {
          SetcategoryMenux(categoryMenu);
  
            }

        }

        whole()
      

      },[selectedx])
    return (
        <>
            <div className="tgmenu__wrap">
                <nav className="tgmenu__nav">
                    <div className="logo d-block d-lg-none">
                        <Link href="/" className="logo-dark"><img src="/assets/img/logo/logo.png" alt="Logo" /></Link>
                        <Link href="/" className="logo-light"><img src="/assets/img/logo/w_logo.png" alt="Logo" /></Link>
                    </div>
                    {logoAlt &&
                        <div className="d-flex gap-4 align-items-center">
                            <div className="offcanvas-toggle" onClick={handleSidebarOpen}>
                                <Link href="#"><i className="flaticon-menu-bar" /></Link>
                            </div>
                            <div className="logo">
                                <Link href="/"><img src={`assets/img/logo/${white ? "w_logo" : "logo"}.png`} alt="Logo" /></Link>
                            </div>
                        </div>
                    }
                    {offCanvasNav &&
                        <div className="offcanvas-toggle" onClick={handleSidebarOpen}>
                            <a href="#"><i className="flaticon-menu-bar" /></a>
                        </div>
                    }
                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-lg-flex">
                        <ul className="navigation">
                            {categoryMenux?.slice(0,3).map((item, i)=>{
                              if(hello){
                                return <li key={i} className={hello.toLowerCase() == item.name.toLowerCase() ? "active" : ""}><Link href={`/business?hello=${encodeURIComponent(item.name)}`}>{item.title}</Link></li>

                              }else{
                                return <li key={i} className={router.pathname.toLowerCase() == item.name.toLowerCase() ? "active" : ""}><Link href={`/business?hello=${encodeURIComponent(item.name)}`}>{item.title}</Link></li>

                              }
                            })}
                        {/* <li className={router.pathname == "/business" ? "active" : ""}><Link href="/business?hello=stephen">Business Insights</Link></li>
                            <li className={router.pathname == "/technology" ? "active" : ""}><Link href="/technology">Technology Trends</Link></li>
                            <li><Link href="/nft">Marketing & Finance</Link></li> */}

                            <li className="menu-item-has-children"><Link href="#" ref={moretry} className='morex'>More</Link>
                                <ul className="sub-menu">

                                {categoryMenux?.slice(3,7).map((item, i)=>{
                              if(hello){
                                return <li key={i} className={hello.toLowerCase() == item.name.toLowerCase() ? "active" : ""}><Link href={`/business?hello=${encodeURIComponent(item.name)}`}>{item.title}</Link></li>

                              }else{
                                return <li key={i} className={router.pathname.toLowerCase() == item.name.toLowerCase() ? "active" : ""}><Link href={`/business?hello=${encodeURIComponent(item.name)}`}>{item.title}</Link></li>

                              }                            
                                })}
                                   
                                   {/* <li className={router.pathname == "/index-2" ? "active" : ""}><Link href="/">Multimedia & Events</Link></li>
                                     <li className={router.pathname == "/index-3" ? "active" : ""}><Link href="/">Productivity & Innovation</Link></li>
                                    <li className={router.pathname == "/index-4" ? "active" : ""}><Link href="/">Opinions & Editorials</Link></li>
                                    <li className={router.pathname == "/index-5" ? "active" : ""}><Link href="/">Workplace & Culture</Link></li> */}
                                
                                </ul>
                            </li>
                            
                        </ul>
                    </div>
                    <div className="tgmenu__action">
                        <ul className="list-wrap">
                            <li className="mode-switcher">
                                <ThemeSwitch />
                            </li>
                            {/* <li className="user"><Link href="#"><i className="far fa-user" /></Link></li>
                            <li className="header-cart"><Link href="#"><i className="far fa-shopping-basket" /></Link></li>
                            <li className="header-search"><Link href="#"><i className={`${searchToggle ? "far fa-search fa-times" : "far fa-search"} `} onClick={searchHandle} /></Link>
                                <div className="header__style-two">
                                    <div className={`header__top-search ${searchToggle ? "d-block" : "d-none"}`}>
                                        <form action="#">
                                            <input type="text" placeholder="Search here..." />
                                        </form>
                                    </div>
                                </div>
                            </li> */}
                        </ul>
                    </div>
                </nav>
                <div className="mobile-nav-toggler" onClick={handleMobileMenuOpen}><i className="fas fa-bars" /></div>
            </div>
        </>
    )
}
