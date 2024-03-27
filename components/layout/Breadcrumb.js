import Link from "next/link"
import { useEffect, useContext } from "react"
import { context } from "../context"
import axios from "axios"
export default function Breadcrumb({ breadcrumbCategory, breadcrumbPostTitle }) {
    const created = useContext(context);
    const {selectedx, setSelectedx} = created
    useEffect(()=>{
      let hometag = document.querySelector(".hometag")
      let categorytag = document.querySelector(".categorytag")
      let titletag = document.querySelector(".titletag")


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

    const tagswhole = async()=>{
        try {
            if(selectedx === 'GB'){
                let anshometag =  await changlang("EN", hometag.innerText)
                hometag.innerHTML = anshometag.data
                let anscategorytag = await changlang("EN", categorytag.innerText)
                categorytag.innerHTML = anscategorytag.data
                 let anstitletag =  await changlang("EN", titletag.innerText)
                 titletag.innerText = anstitletag.data  

            }else{
                let anshometag =  await changlang(selectedx, hometag.innerText)
                hometag.innerHTML = anshometag.data
                let anscategorytag = await changlang(selectedx, categorytag.innerText)
                categorytag.innerHTML = anscategorytag.data
                 let anstitletag =  await changlang(selectedx, titletag.innerText)
                 titletag.innerText = anstitletag.data  
            }
         
        } catch (error) {
            console.log(error)
        }
   
    }
    tagswhole()
    },[selectedx])
    return (
        <>
            <div className="breadcrumb-area">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="breadcrumb-content">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link href="/" className="hometag">Home</Link></li>
                                        {breadcrumbCategory && <li className="breadcrumb-item"><Link href="/blog" className="categorytag">{breadcrumbCategory}</Link></li>}

                                        {breadcrumbPostTitle && <li className="breadcrumb-item active titletag" aria-current="page" >{breadcrumbPostTitle}</li>}
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
