import Link from "next/link"
import Menu from "./Menu"
import MobileMenu from "./MobileMenu"
import Sidebar from "./Sidebar"
import { useState, useEffect, useContext } from "react"
import ReactFlagsSelect from "react-flags-select";
import { context } from "../../../components/context";
import axios from "axios"
import { useRouter } from "next/router"
export default function Header6({ scroll,
    handleMobileMenuOpen,
    handleMobileMenuClose,
    langToggle,
    handleLangToggle,
    handleSidebarClose,
    handleSidebarOpen,
    // handleSearch,
    // search,
    // setsearch
 
 }) {
    
    const created = useContext(context);
    const {selectedx, setSelectedx} = created
    const router = useRouter();
    const { pathname } = router;
  
    const [search, setsearch] = useState('');
     const [selected, setSelected] = useState(selectedx?selectedx:'GB')
     const handleCountry =(code)=>{
        // if(code  == 'TZ'){
        //     setSelectedx('SWA')
        //     setSelected(code)  
            
        // }else 

        if(pathname == '/blog/[id]'){

            if(code == 'SA'){

                let obj = {countrycode:'SA'}
                let objstringify =  JSON.stringify(obj)
                localStorage.setItem("countrycode", objstringify)
                setSelectedx('AR')
                setSelected(code) 
                //  router.reload();
            }else if(code == "GB"){
                setSelectedx("GB")
              localStorage.removeItem("countrycode")
              router.reload();
            }
            else{
                let obj = {countrycode:code}
                let objstringify =  JSON.stringify(obj)
                localStorage.setItem("countrycode", objstringify)
                setSelectedx(code)
                setSelected(code)  
                router.reload();  
            }
      
        }else{

            if(code == 'SA'){

                let obj = {countrycode:code}
                let objstringify =  JSON.stringify(obj)
                localStorage.setItem("countrycode", objstringify)
                setSelectedx('AR')
                setSelected(code) 
            }else if(code == "GB"){
                setSelectedx("GB")
              localStorage.removeItem("countrycode")
            }
            else{
                let obj = {countrycode:code}
                let objstringify =  JSON.stringify(obj)
                localStorage.setItem("countrycode", objstringify)
                setSelectedx(code)
                setSelected(code)    
            }

        }
        // if(code == 'SA'){

        //     let obj = {countrycode:code}
        //     let objstringify =  JSON.stringify(obj)
        //     localStorage.setItem("countrycode", objstringify)
        //     setSelectedx('AR')
        //     setSelected(code) 
        // }else if(code == "GB"){
        //     setSelectedx("GB")
        //   localStorage.removeItem("countrycode")
        // }
        // else{
        //     let obj = {countrycode:code}
        //     let objstringify =  JSON.stringify(obj)
        //     localStorage.setItem("countrycode", objstringify)
        //     setSelectedx(code)
        //     setSelected(code)    
        // }
     }


     useEffect(()=>{
        let subtag = document.querySelector(".subtag")
        if(selectedx == "" || selectedx == undefined || selectedx == null){
          setSelectedx('GB')
        }else if(selectedx == "GB"){
            setSelected("GB")
        }


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
            return res.data;
        };

        const  changsubtag = async()=>{
           try {
            if(selectedx == 'GB'){
                // let anssubtag = await changlang("EN", subtag.innerText)
                subtag.innerText = "subscribe"
            }else{
                let anssubtag = await changlang(selectedx, subtag.innerText)
                subtag.innerText = anssubtag.data
            }
          
           } catch (error) {
            console.log(error)
           }
         
        }

        changsubtag()
      },[selectedx])

    //   useEffect(() => {
    //   if (window.performance.navigation.type === 1){
    //     setSelectedx("GB")
    //     setSelectedx("GB")
    //   }
     
          
    //   }, []);


    return (
        <>
            <header className="header__style-six">
                <div className="header__top">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-4 col-md-6 col-sm-6 order-2 order-lg-0">
                                <div style={{ width:"150px" }} >
                                    {/*  className="header__top-search" <form action="#">
                                        <input type="text" value={search} onChange={(e) => setsearch(e.target.value)} placeholder="Search here... " />
                                    </form> */}

                                    <ReactFlagsSelect
                                        countries={['GB', 'FR', 'DE',  'SA', 'ES']} // Add 'SWA' for Swahili
                                        customLabels={{ GB: 'EN-GB', FR: 'FR', DE: 'DE',  SA:'SA', ES:'Spanish'}} // Include 'SWA' for Swahili
                                        placeholder="Select Language"
                                        selected={selected}
                                        defaultCountry="US"
                                        onSelect={(code) => handleCountry(code)}
                                        />

                                </div>
                            </div>
                            <div className="col-lg-4 col-md-3 order-0 order-lg-2 d-none d-md-block">
                                <div className="header__top-logo logo text-lg-center">
                                    <Link href="/" className="logo-dark"><img src="/assets/img/logo/logo.png" alt="Logo" /></Link>
                                    <Link href="/" className="logo-light"><img src="/assets/img/logo/w_logo.png" alt="Logo" /></Link>
                                </div>
                            </div>
                            <div className="col-lg-4 col-md-3 col-sm-6 order-3 d-none d-sm-block">
                                <div className="header__top-right">
                                    <ul className="list-wrap">
                                        <li className="news-btn"><Link href="https://share-eu1.hsforms.com/1H9YWJNkyTs2irrw8MuDbNw2dkpzv" target="blank" className="btn"><span className="btn-text subtag">subscribe</span></Link></li>
                                        {/* <li className="lang">
                                        <div className="dropdown">
                                                <button className={`dropdown-toggle ${langToggle ? "show" : ""}`} type="button" onClick={handleLangToggle}>
                                                    ENG
                                                </button>
                                                <ul className={`dropdown-menu ${langToggle ? "show" : ""}`}>
                                                    <li><Link className="dropdown-item" href="#">SPA</Link></li>
                                                    <li><Link className="dropdown-item" href="#">GRE</Link></li>
                                                    <li><Link className="dropdown-item" href="#">CIN</Link></li>
                                                    <li><Link className="dropdown-item" href="#">CIN</Link></li>
                                                </ul>
                                            </div>
                                        </li> */}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="header-fixed-height" className={`${scroll ? "active-height" : ""}`} />
                <div id="sticky-header" className={`tg-header__area ${scroll ? "sticky-menu" : ""}`}>
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <Menu handleMobileMenuOpen={handleMobileMenuOpen} handleSidebarOpen={handleSidebarOpen} offCanvasNav />
                                <MobileMenu handleMobileMenuClose={handleMobileMenuClose} />
                            </div>
                        </div>
                    </div>
                </div>
                <Sidebar selectedx={selectedx} handleSidebarClose={handleSidebarClose} />
            </header>

        </>
    )
}
