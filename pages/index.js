import Layout from "@/components/layout/Layout";
import TrendingSlider from "@/components/slider/TrendingSlider";
import data from "@/util/blogData";
import Link from "next/link";
import { useEffect, useState, useContext } from 'react'
import Marquee from "react-fast-marquee";
import ModalVideo from "react-modal-video";
import {createClient} from 'contentful';
import { CoinGeckoClient } from 'coingecko-api-v3';
import { context } from "@/components/context";
import { NextSeo } from 'next-seo';
import axios from 'axios';
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
// import { AES, enc } from 'crypto-js';
import CryptoJS from 'crypto-js';
export default function Home1() {
  const [isOpen, setOpen] = useState(false);
  const [Herodata, setHerodata] = useState([])
  const [featured, setfeatured] = useState([])
  const [popular, setPopular] = useState([])
  const [cyptocoin, setcyptocoin] = useState([])
  const [lastpopular, setlastpopular] = useState([])
  const client =  createClient({
    space:'t0pszie0jiqu',
    accessToken:'bm2qgxL1ruXxTPkEQT0KgtAuHOwVxlOzOuj-AoNo-AM',
  });
  const created = useContext(context);
  const {selectedx, setSelectedx} = created
  const coin = new CoinGeckoClient({
    timeout: 10000,
    autoRetry: true,
  });
const arrxz = ['Editor'];
let son = JSON.stringify(arrxz)
// console.log(son)
//https://dabarmedia.com
// http://127.0.0.1:8000
  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });

const [dataall, Setdataall] = useState([])

useEffect(()=>{

//   const checkupdatex = async()=>{
//     let urlzxs = '/api/updatestories';
//     await  apiClient.get('/sanctum/csrf-cookie')
//       let headers = new Headers();
//      headers.append('Content-Type', 'application/json')
//      let checkupdate =  await  apiClient.get(urlzxs,headers)
// }
// const min = 60 * 1000
// const inteval = setInterval(()=>{
//   checkupdatex()
// },min)
//  return clearInterval(()=>inteval)
},[])



  useEffect( ()=>{
    // updatestories

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
   
    
    const HeroAPi = async()=>{
      // Hero Stories
      // let top = await client.getEntries({content_type:"topstories",
      // select:'fields'})

      let urlz = '/api/randomcategory';
      await  apiClient.get('/sanctum/csrf-cookie')
            let headers = new Headers();
           headers.append('Content-Type', 'application/json')
            let topx =  await  apiClient.get(urlz,headers)
            // console.log(topx.data.success)
     
  

     const newData = await Promise.all(
      topx.data.success.map(async (item) => {
       
        // console.log(item.fields.storyId.fields.preSummary)
        let timez = new Date(item.created_at)
        const monthNames = [
         "Jan", "Feb", "Mar",
         "Apr", "May", "Jun", "Jul",
         "Aug", "Sept", "Oct",
         "Nov", "Dec"
       ];
       const day = timez.getDate();
        const monthIndex = timez.getMonth();
        const year = timez.getFullYear();
        const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
        // let getid = await client.getEntry(item.sys.id)
        // let data = await client.getEntry(item.fields.storyId.fields.categoryId.sys.id);
        // let writer = await client.getEntry(item.fields.storyId.fields.writerId.sys.id);
        // let answer = data.fields.category;

        const originalString = JSON.stringify(item.id);
const encryptedString = CryptoJS.AES.encrypt(originalString, 'TheDabar').toString();
const sanitizedEncryptedString = encryptedString.replace(/\//g, '');
        //  let ansheading =  await changeLang(item.heading);
        //  console.log(ansheading)
        return {
          // heading: item.fields.storyId.fields.heading,
          // // summary: item.fields.storyId.fields.summary,
          // summary:item.fields.storyId.fields.preSummary,
          // thumbnail: item.fields.storyId.fields.thumbnail.fields.file.url,
          // subcategories: answer,
          // id:getid.sys.id,
          // writername:writer.fields.name,
          // timez:formattedDate

          heading:item.heading ,
          // summary: item.fields.storyId.fields.summary,
          summary:item.presummary,
          thumbnail: item.main_image,
          subcategories: item.category,
          id: item.id,
          writername:item.writer,
          timez:formattedDate
        };
      })
    );

    // setHerodata(newData)

    if (selectedx === 'GB') {
      setHerodata(newData);
  } else if (selectedx !== "" && selectedx !== 'GB') {
    console.log("here", selectedx)
    const translatedData = await Promise.all(newData.map(async (item) => {
      let heading = await changlang(selectedx, item.heading);
      let summary = await changlang(selectedx, item.summary);
      let subcategories = await changlang(selectedx, item.subcategories);
      let timez = await changlang(selectedx, item.timez);

      return {
          heading: heading.data,
          summary: summary.data,
          thumbnail: item.thumbnail,
          subcategories: subcategories.data,
          id: item.id,
          writername: item.writername,
          timez: timez.data
      };
  }));
  setHerodata(translatedData);

  }else {
      setHerodata(newData);
      }


    const homePageData = {
      heading:
        "Dabar | Business Insights, Technology trends and conversations across the Globe.",
      summary:
        "Dabar - Your go-to destination for expert insights on Business, Technology, Trends, and Marketing. Dive deep into our enriching content, featuring in-depth analysis, innovative businesses, expert opinions, industry trends that resonate in today's fast-paced landscape.",
      thumbnail: {
        fields: {
          file: {
            url: "public/assets/img/main.jpg", // Replace with the actual URL
          },
        },
      },
    };

    {
      /* SEO Metadata */
    }
    <NextSeo
      title={homePageData.heading}
      description={homePageData.summary}
      openGraph={{
        type: "website",
        locale: "en_us",
        url: "https://thedabar.com",
        title:
          "Dabar | Business Insights, Technology trends and conversations across the Globe.",
        siteName: "Dabar",
        description:
          "Dabar - Your go-to destination for expert insights on Business, Technology, Trends, and Marketing.",
        images: [
          {
            url: homePageData.thumbnail?.fields.file.url,
            alt: "Dabar",
            type: "image/jpeg", // Update with the actual image type
            secureUrl: homePageData.thumbnail?.fields.file.url,
          },
        ],
      }}
    />

    // const shuffledArray = newData.slice().sort(() => Math.random() - 0.5);
    
 
    }

    HeroAPi()



    const Feature = async()=>{
      // let features = await client.getEntries({content_type:"feature", select:'fields'})
    
      let urlz = '/api/editor';
      await  apiClient.get('/sanctum/csrf-cookie')
            let headers = new Headers();
           headers.append('Content-Type', 'application/json')
            let featuresx =  await  apiClient.get(urlz,headers)
          
      const newData = await Promise.all(
        featuresx.data.success.map(async (item) => {

          let timez = new Date(item.created_at)
          const monthNames = [
           "Jan", "Feb", "Mar",
           "Apr", "May", "Jun", "Jul",
           "Aug", "Sept", "Oct",
           "Nov", "Dec"
         ];
         const day = timez.getDate();
          const monthIndex = timez.getMonth();
          const year = timez.getFullYear();
          const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
           // console.log(item.fields.storyId.fields.thumbnail.fields.file.url)
          // console.log(item.fields.storyId.fields.categoryId.sys.id)
        //  let data = await client.getEntry(item.fields.storyId.fields.categoryId.sys.id);
        //  let writer = await client.getEntry(item.fields.storyId.fields.writerId.sys.id);
        //  let getid = await client.getEntry(item.sys.id)
        //  console.log(data)
        //  let answer = data.fields.category;
             const originalString = JSON.stringify(item.id);
const encryptedString = CryptoJS.AES.encrypt(originalString, 'TheDabar').toString();
const sanitizedEncryptedString = encryptedString.replace(/\//g, '');
         return {
          //  heading: item.fields.storyId.fields.heading,
          // //  summary: item.fields.storyId.fields.summary,
          // summary:item.fields.storyId.fields.preSummary,
          //  category: answer,
          //  thumbnail:item.fields.storyId.fields.thumbnail.fields.file.url,
          //  writername:writer.fields.name,
          //  timez:formattedDate,
          //  id:getid.sys.id,

          heading: item.heading,
          // summary: item.fields.storyId.fields.summary,
          summary:item.presummary,
          thumbnail: item.main_image,
          subcategories: item.category,
          id: item.id,
          writername:item.writer,
          timez:formattedDate
         };
       })
     );
    //  setfeatured(newData)
    //  eight slide


    if (selectedx === 'GB') {
      setfeatured(newData);
  } else if (selectedx !== "" && selectedx !== 'GB') {
    console.log("here", selectedx)
    const translatedData = await Promise.all(newData.map(async (item) => {
      let heading = await changlang(selectedx, item.heading);
      let summary = await changlang(selectedx, item.summary);
      let subcategories = await changlang(selectedx, item.subcategories);
      let timez = await changlang(selectedx, item.timez);

      return {
          heading: heading.data,
          summary: summary.data,
          thumbnail: item.thumbnail,
          subcategories: subcategories.data,
          id: item.id,
          writername: item.writername,
          timez: timez.data
      };
  }));
  setfeatured(translatedData);

  }else {
    setfeatured(newData);
      }
             
    }

    Feature()

  


    const Popular = async()=>{
      let popularstories = await client.getEntries({content_type:"popularstories", select:'fields'})

      let urlz = '/api/popular?page='+1;
      await  apiClient.get('/sanctum/csrf-cookie')
            let headers = new Headers();
           headers.append('Content-Type', 'application/json')
            let popularx =  await  apiClient.get(urlz,headers)
            setlastpopular(popularx.data.success.last_page)
      const newData = await Promise.all(
        popularx.data.success.data.map(async (item) => {

          let timez = new Date(item.created_at)
          const monthNames = [
           "Jan", "Feb", "Mar",
           "Apr", "May", "Jun", "Jul",
           "Aug", "Sept", "Oct",
           "Nov", "Dec"
         ];
         const day = timez.getDate();
          const monthIndex = timez.getMonth();
          const year = timez.getFullYear();
          const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
        //    // console.log(item.fields.storyId.fields.thumbnail.fields.file.url)
        //   // console.log(item.fields.storyId.fields.categoryId.sys.id)
        //  let data = await client.getEntry(item.fields.storyId.fields.categoryId.sys.id);
        //  let writer = await client.getEntry(item.fields.storyId.fields.writerId.sys.id);
        //  let getid = await client.getEntry(item.sys.id)
        // //  console.log(data)
        //  let answer = data.fields.category;
//              const originalString = JSON.stringify(item.id);
// const encryptedString = CryptoJS.AES.encrypt(originalString, 'TheDabar').toString();
// const sanitizedEncryptedString = encryptedString.replace(/\//g, '');

         return {
          //  heading: item.fields.storyId.fields.heading,
          // //  summary: item.fields.storyId.fields.summary,
          // summary:item.fields.storyId.fields.preSummary,
          //  category: answer,
          //  thumbnail:item.fields.storyId.fields.thumbnail.fields.file.url,
          //  writername:writer.fields.name,
          //  timez:formattedDate,
          //  id:getid.sys.id,
          heading: item.heading,
          // summary: item.fields.storyId.fields.summary,
          summary:item.presummary,
          thumbnail: item.main_image,
          subcategories: item.category,
          id: item.id,
          writername:item.writer,
          timez:formattedDate
         };
       })
     );

    //  setPopular(newData)


    if (selectedx === 'GB') {
      setPopular(newData);
  } else if (selectedx !== "" && selectedx !== 'GB') {
    console.log("here", selectedx)
    const translatedData = await Promise.all(newData.map(async (item) => {
      let heading = await changlang(selectedx, item.heading);
      let summary = await changlang(selectedx, item.summary);
      let subcategories = await changlang(selectedx, item.subcategories);
      let timez = await changlang(selectedx, item.timez);

      return {
          heading: heading.data,
          summary: summary.data,
          thumbnail: item.thumbnail,
          subcategories: subcategories.data,
          id: item.id,
          writername: item.writername,
          timez: timez.data
      };
  }));
  setPopular(translatedData);

  }else {
    setPopular(newData);
      }

    }

    Popular()

 
    // const Local = async()=>{
    //   let story = await client.getEntries({content_type:"currentstories",select:'fields', })
    //   const newData = await Promise.all(
    //     story?.items.map(async (item) => {
    //       let timez = new Date(item.fields.storyId.sys.updatedAt)
    //         const monthNames = [
    //           "Jan", "Feb", "Mar",
    //           "Apr", "May", "Jun", "Jul",
    //           "Aug", "Sept", "Oct",
    //           "Nov", "Dec"
    //         ];   
    //         const day = timez.getDate();
    //         const monthIndex = timez.getMonth();
    //         const year = timez.getFullYear();
    //         const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
            
           
    //       let data = await client.getEntry(item.fields.storyId.fields.categoryId.sys.id);
    //       let writer = await client.getEntry(item.fields.storyId.fields.writerId.sys.id)
    //       let answer = data.fields.category;
    //        let answriter = writer.fields.name
    //        return {
    //         heading: item.fields.storyId.fields.heading,
    //         summary: item.fields.storyId.fields.summary,
    //         presummary:item.fields.storyId.fields.preSummary,
    //         thumbnail:item.fields.storyId.fields.thumbnail.fields.file.url,
    //         category: answer,
    //         writer:answriter,
    //         id:item.id,
    //         timez:formattedDate
    //        };
    //      })
    //    );
    //  localStorage.setItem("stories", JSON.stringify(newData))
    // }
    // Local()

    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Cookie", "__cf_bm=i9nmscfUnJa3HYnpNFfHx9p5E_dZSH9Xt.gikiporXM-1702413803-1-AfR+pfSKU0ClDff2SKh3SCBVExJTfqw82Oag2ZBY1WPjslTJIt02r58noo7UKDFffru20dEAvEBqxh0/lR+kS4k=");
    
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };
    
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&vs_currency=eur&vs_currency=jpy", requestOptions)
      .then(response => response.json())
      .then(result =>{
      let info =  result.map((item)=>{
          const roundedNumber = parseFloat(item.atl.toFixed(2));
          return {symbol:item.symbol, atl:roundedNumber, current_price:item.current_price}
        }).slice(0,14)

        setcyptocoin(cyptocoin=>info)
      })
      .catch(error => console.log('error', error))
  },[selectedx])
   
  const [testbody, Settestbody] = useState([])

  useEffect(()=>{
    const Feature = async()=>{
      // select:'fields'
      let stories = await client.getEntries({content_type:"stories"})
      // console.log(stories)
      const options = {
        renderNode: {
          "embedded-asset-block": (node) => {
            return (
              <img
                src={node.data.target.fields.file.url}
                alt={node.data.target.fields.description}
              />
            );
          },
        },
      };
      console.log(stories)
      const newData = await Promise.all(
          
        stories?.items.map(async (item) => {
              // console.log(item)
          // const contentbody = documentToReactComponents(item.fields.body, options);
           let word = JSON.stringify(item.fields.body)      

              // console.log(item.fields.mainImage?.fields.file.url)   
           return {
            heading:item.fields.heading,
            body:word,
            summary:item.fields.summary,
             mainImage:item.fields.mainImage?.fields.file.url,
            writer:item.fields.writerId.fields.name,
            readTime:item.fields.readTime,
            category:item.fields.categoryId.fields.category,
            date:item.sys.createdAt

           }

          
          
        })
      )
      // console.log(newData)
      // const apiClient = axios.create({
      //   baseURL: "http://127.0.0.1:8000/",
      //   withCredentials: true
      // });

      // for (let i = 0; i < newData.length; i++) {
      //   let item = newData[i];
      
      //   let formData = new FormData();
      //   formData.append('presummary',  item.summary)
      //   formData.append('read_time',  item.readTime)
      //   formData.append('category',  item.category)
      //   formData.append('writer',  item.writer)
      //   formData.append('main_image', item.mainImage)
      //   formData.append('body', item.body)
      //   formData.append('presummary', item.summary)
      //   formData.append("heading", item.heading)
      //   formData.append("date", item.date)

      //   let url = 'api/stories_from_client';
      
      //   apiClient.get('/sanctum/csrf-cookie').then(() => {
      //     apiClient.post(url, formData, {
      //       // headers: {
      //       //   "Authorization": "Bearer " + local.token,
      //       // }
      //     }).then(res => {
      //       console.log(res);
      //     });
      //   });
      // }
   

    //   const newData = await Promise.all(
    //     features?.items.map(async (item) => {

    //       let timez = new Date(item.fields.storyId.sys.updatedAt)
    //       const monthNames = [
    //        "Jan", "Feb", "Mar",
    //        "Apr", "May", "Jun", "Jul",
    //        "Aug", "Sept", "Oct",
    //        "Nov", "Dec"
    //      ];
    //      const day = timez.getDate();
    //       const monthIndex = timez.getMonth();
    //       const year = timez.getFullYear();
    //       const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
    //        // console.log(item.fields.storyId.fields.thumbnail.fields.file.url)
    //       // console.log(item.fields.storyId.fields.categoryId.sys.id)
    //      let data = await client.getEntry(item.fields.storyId.fields.categoryId.sys.id);
    //      let writer = await client.getEntry(item.fields.storyId.fields.writerId.sys.id);
    //      let getid = await client.getEntry(item.sys.id)
    //     //  console.log(data)
    //      let answer = data.fields.category;

    //      return {
    //        heading: item.fields.storyId.fields.heading,
    //       //  summary: item.fields.storyId.fields.summary,
    //       summary:item.fields.storyId.fields.preSummary,
    //        category: answer,
    //        thumbnail:item.fields.storyId.fields.thumbnail.fields.file.url,
    //        writername:writer.fields.name,
    //        timez:formattedDate,
    //        id:getid.sys.id,
    //      };
    //    })
    //  );
    //  setfeatured(newData)
             
    }

    Feature()

  },[])
const [currentpopular, setcurrentpopular] = useState(1)

  const handleviewmore = async(e)=>{
    e.preventDefault();
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
      try {
        let res = await axios.request(options);
        return res.data;
      } catch (error) {
        console.log(error) 
      }
     
  };
    if(currentpopular <  lastpopular){
      let answerxs =   currentpopular + 1
      setcurrentpopular(answerxs)
       let urlz = '/api/popular?page='+answerxs;
        await  apiClient.get('/sanctum/csrf-cookie')
              let headers = new Headers();
             headers.append('Content-Type', 'application/json')
              let popularx =  await  apiClient.get(urlz,headers)
         console.log(popularx.data.success.data)
        const newData = await Promise.all(
          popularx.data.success.data.map(async (item) => {
    
            let timez = new Date(item.created_at)
            const monthNames = [
             "Jan", "Feb", "Mar",
             "Apr", "May", "Jun", "Jul",
             "Aug", "Sept", "Oct",
             "Nov", "Dec"
           ];
           const day = timez.getDate();
            const monthIndex = timez.getMonth();
            const year = timez.getFullYear();
            const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
    
           return {
            heading: item.heading,
            summary:item.presummary,
            thumbnail: item.main_image,
            subcategories: item.category,
            id: item.id,
            writername:item.writer,
            timez:formattedDate
           };
         })
       );

       let newDataCopy = [...newData];
       let dataz = [...popular, ...newDataCopy];
      //  setPopular(dataz);


      if (selectedx === 'GB') {
        setPopular(dataz);
    } else if (selectedx !== "" && selectedx !== 'GB') {
      console.log("here", selectedx)
      const translatedData = await Promise.all(dataz.map(async (item) => {
        let heading = await changlang(selectedx, item.heading);
        let summary = await changlang(selectedx, item.summary);
        let subcategories = await changlang(selectedx, item.subcategories);
        let timez = await changlang(selectedx, item.timez);
  
        return {
            heading: heading.data,
            summary: summary.data,
            thumbnail:item.thumbnail,
            subcategories: subcategories.data,
            id: item.id,
            writername: item.writername,
            timez: timez.data
        };
    }));
    setPopular(translatedData);
  
    }else {
      setPopular(dataz);
        }



    }else if (currentpopular ==  lastpopular){
      
        setcurrentpopular(1)
        let urlz = '/api/popular?page='+1;
        await  apiClient.get('/sanctum/csrf-cookie')
              let headers = new Headers();
             headers.append('Content-Type', 'application/json')
              let popularx =  await  apiClient.get(urlz,headers)
    
        const newData = await Promise.all(
          popularx.data.success.data.map(async (item) => {
    
            let timez = new Date(item.created_at)
            const monthNames = [
             "Jan", "Feb", "Mar",
             "Apr", "May", "Jun", "Jul",
             "Aug", "Sept", "Oct",
             "Nov", "Dec"
           ];
           const day = timez.getDate();
            const monthIndex = timez.getMonth();
            const year = timez.getFullYear();
            const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
    
           return {
            heading: item.heading,
            summary:item.presummary,
            thumbnail: item.main_image,
            subcategories: item.category,
            id: item.id,
            writername:item.writer,
            timez:formattedDate
           };
         })
       );


        // setPopular(newData);
         
      if (selectedx === 'GB') {
        setPopular(newData);
    } else if (selectedx !== "" && selectedx !== 'GB') {
      console.log("here", selectedx)
      const translatedData = await Promise.all(newData.map(async (item) => {
        let heading = await changlang(selectedx, item.heading);
        let summary = await changlang(selectedx, item.summary);
        let subcategories = await changlang(selectedx, item.subcategories);
        let timez = await changlang(selectedx, item.timez);
  
        return {
            heading: heading.data,
            summary: summary.data,
            thumbnail: item.thumbnail,
            subcategories: subcategories.data,
            id: item.id,
            writername: item.writername,
            timez: timez.data
        };
    }));
    setPopular(translatedData);
  
    }else {
      setPopular(newData);
        }
 

    }
  


    
  }

  // console.log(selectedx)

  useEffect(()=>{
  let popular_post = document.querySelector(".popular_post")
  let trending_news = document.querySelector(".trending_news")  
  let tending_more = document.querySelector(".tending_more")  
  let featured_editor = document.querySelector(".featured_editor")
  let editor_choice = document.querySelector(".editor_choice")
  let editor_more = document.querySelector(".editor_more")
   let stories_popular =document.querySelector(".stories_popular")
   let popular_stories = document.querySelector(".popular_stories")
   let stories_more = document.querySelector(".stories_more")

   const changlang = async (selectedx, word) => {
    const options = {
        method: 'POST',
        url: 'https://deepl-translator2.p.rapidapi.com/translate',
        headers: {
            'Content-Type': 'application/json',
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

const subheader = async()=>{
  let anspopular_post = await changlang(selectedx, popular_post.innerText)
 let anstrending_news = await changlang(selectedx, trending_news.innerText)
 let anstending_more = await changlang(selectedx, tending_more.innerText)
 let ansfeatured_editor = await changlang(selectedx, featured_editor.innerText)
let anseditor_choice =  await changlang(selectedx, editor_choice.innerText)
let anseditor_more =  await changlang(selectedx, editor_more.innerText)
 let ansstories_popular = await changlang(selectedx, stories_popular.innerText)
let anspopular_stories =  await changlang(selectedx, popular_stories.innerText)
 let ansstories_more = await changlang(selectedx, stories_more.innerText)

 if(selectedx == "GB"){
  popular_post.textContent == 'Popular Posts'
  trending_news.textContent = 'Trending News'
  tending_more.textContent = 'More Post'
  featured_editor.textContent = "Featured"
  editor_choice.textContent = "Editor's Choice"
  editor_more.textContent = "More Featured Post"
  stories_popular.textContent = "Stories"
  popular_stories.textContent = "Popular Stories"
  stories_more.textContent = "More Post"
 }
 popular_post.textContent = anspopular_post.data
 trending_news.textContent = anstrending_news.data
 tending_more.innerHTML = anstending_more.data
 featured_editor.innerHTML = ansfeatured_editor.data
 editor_choice.innerHTML = anseditor_choice.data
 editor_more.innerHTML = anseditor_more.data
 stories_popular.innerHTML = ansstories_popular.data
 popular_stories.innerHTML = anspopular_stories.data
 stories_more.innerHTML = ansstories_more.data
}

subheader()
  },[selectedx])



  
  
  // changeLang('my name is stephen okpeku')
//  const [langchan, setlangchan] = useState("")
//   const changeLang = (word)=>{
//     if(selectedx == 'GB'){
//       console.log('first', selectedx)
//       return word
//     }else if(selectedx != "" &&  selectedx != 'GB'){
  
//       const options = {
//         method: 'POST',
//         url: 'https://deepl-translator2.p.rapidapi.com/translate',
//         headers: {
//           'content-type': 'application/json',
//           'X-RapidAPI-Key': '7bddd58440msh9a827296af53740p1be7eajsn6674d57991b0',
//           'X-RapidAPI-Host': 'deepl-translator2.p.rapidapi.com'
//         },
//         data: {
//           source_lang: 'EN',
//           target_lang: selectedx,
//           text: word
//         }
//       };
      
//       try {
//         axios.request(options).then(res=>setlangchan(res.data));
//         console.log(langchan)
//         return langchan.data;
//       }catch(error) {
//         console.error(error);
//       }
     
      
  
  
//     }else{
//       return word
  
//     }
//   }


  return (
    <>
      <Layout headerStyle={6} footerStyle={3}  selectedx={selectedx} setSelectedx={setSelectedx} footerClass="black-bg" logoWhite>
        <div className="slider__marquee clearfix">
          <div className="marquee_mode">
            <Marquee className="js-marquee" pauseOnHover={true}>
              {cyptocoin.map((item, index)=>{
                return   <h6 className="item" key={index}>
                {item.symbol} ${item.current_price} <span>+{item.atl}</span>
              </h6>
              })}
            </Marquee>
          </div>
        </div>
        <section className="tgbanner__area-five pt-20 pb-30">
          <div className="container">
            <div className="row row--10">
              {Herodata && Herodata.length > 0 ? (
                <div className="col-lg-12 col-xl-6 col-md-12 col-12 mt--20 ">
                  <div className="tgbanner__five-item big-post">
                    <div className="tgbanner__five-thumb tgImage__hover   ">
                      <Link href={`/blog/${Herodata[0].id}`}>
                        <img src={Herodata[0].thumbnail} alt="img" />
                      </Link>
                    </div>
                    <div className="tgbanner__five-content">
                      <Link
                        href={`/business?hello=${encodeURIComponent(
                          Herodata[0].subcategories
                        )}`}
                        className="tags text-orange text-uppercase fw-bold"
                      >
                        {Herodata[0].subcategories}
                      </Link>
                      <h2 className="title tgcommon__hover mt-4 mb-4 font-weight-bold">
                        <Link href={`/blog/${Herodata[0].id}`}>
                          {Herodata[0].heading}
                        </Link>
                        <p className="custom-paragraph-style text-white">
                          {Herodata[0].summary == undefined ||
                          Herodata[0].summary == null
                            ? ""
                            : Herodata[0].summary.length > 100
                            ?Herodata[0].summary.substr(0, 120) + "..."
                            : Herodata[0].summary}
                        </p>
                      </h2>

                      <ul className="tgbanner__content-meta list-wrap">
                        <li>
                          <Link href={`/blog/${Herodata[0].id}`}>
                          {Herodata[0].writername}
                          </Link>
                        </li>
                        <li>{Herodata[0].timez}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="col-lg-12 col-xl-6 col-md-12 col-12 mt_lg--20 mt_md--20 mt_sm--20">
                {Herodata && Herodata.length > 0 ? (
                  <div className="tgbanner__five-item small-post">
                    <div className="tgbanner__five-thumb tgImage__hover   ">
                      <Link href={`/blog/${Herodata[1].id}`}>
                        <img src={Herodata[1].thumbnail} alt="img" />
                      </Link>
                    </div>
                    <div className="tgbanner__five-content">
                      <Link
                        href={`/business?hello=${encodeURIComponent(
                          Herodata[1].subcategories
                        )}`}
                        className="tags text-orange text-uppercase fw-bold "
                      >
                        {Herodata[1].subcategories}
                      </Link>
                      <h2 className="title tgcommon__hover mt-2 mb-1">
                        <Link href={`/blog/${Herodata[1].id}`}>
                          {Herodata[1].heading}
                        </Link>
                      </h2>
                      <ul className="tgbanner__content-meta list-wrap">
                        <li>
                          <Link href={`/blog/${Herodata[1].id}`}>
                            {Herodata[1].writername}
                          </Link>
                        </li>
                        <li>{Herodata[1].timez}</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                <div className="row row--10">
                  {Herodata.slice(2, 4)?.map((item) => {
                    return (
                      <div className="col-lg-6 col-md-6 col-sm-6 col-12 mt--20">
                        <div className="tgbanner__five-item small-post">
                          <div className="tgbanner__five-thumb tgImage__hover   ">
                            <Link href="/blog/101">
                              <img src={item.thumbnail} alt="img" />
                            </Link>
                          </div>
                          <div className="tgbanner__five-content">
                            <Link
                              href={`/business?hello=${encodeURIComponent(
                                item.subcategories
                              )}`}
                              className="tags text-orange text-uppercase fw-bold"
                            >
                              {item.subcategories}
                            </Link>
                            <h2 className="title tgcommon__hover mt-2 mb-2">
                              <Link href={`/blog/${item.id}`}>
                                {item.heading}
                              </Link>
                            </h2>
                            <ul className="tgbanner__content-meta list-wrap">
                              <li>
                                <Link href={`/blog/${item.id}`}>
                                  {item.writername}
                                </Link>
                              </li>
                              <li>{item.timez}</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="trending-post-area section__hover-line pt-25">
          <div className="container">
            <div className="section__title-wrap mb-40">
              <div className="row align-items-end">
                <div className="col-sm-6">
                  <div className="section__title">
                    <span className="section__sub-title popular_post">Popular Posts</span>
                    <h3 className="section__main-title trending_news">Trending News</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="section__read-more text-start text-sm-end">
                    <Link href="/blog" className="tending_more">
                      More Post <i className="far fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="trending__slider">
              <div className="swiper-container trending-active">
                <TrendingSlider selectedx={selectedx}  showItem={4} />
              </div>
            </div>
          </div>
        </section>
        <div className="advertisement pt-45 pb-10">
          <div className="container">
            <div className="col-12">
              <div className="advertisement__image text-center">
                <Link href="/#">
                  <img
                    src="/assets/img/others/advertisement.png"
                    alt="advertisement"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <section className="featured-post-area section__hover-line pt-75">
          <div className="container">
            <div className="section__title-wrap mb-40">
              <div className="row align-items-end">
                <div className="col-sm-6">
                  <div className="section__title">
                    <span className="section__sub-title featured_editor">Featured</span>
                    <h3 className="section__main-title editor_choice">Editor's Choice</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="section__read-more text-start text-sm-end">
                    <Link href="/blog" className="editor_more">
                      More Featured Post{" "}
                      <i className="far fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {featured.length > 0
                ? featured.map((item, i) => (
                    <div className="col-lg-4 col-sm-6" key={i}>
                      <div className="featured__post">
                        <div
                          className="featured__thumb"
                          style={{
                            backgroundImage: `url(${item.thumbnail})`,
                          }}
                        >
                        
                        </div>
                        <div className="featured__content">
                          <ul className="tgbanner__content-meta list-wrap">
                            <li className="category">
                              <Link
                                href={`/business?hello=${encodeURIComponent(
                                  item.subcategories
                                )}`}
                              >
                                {item.subcategories}
                              </Link>
                            </li>
                           
                            
                          </ul>
                          <ul className="tgbanner__content-meta list-wrap"><li className="text-black"><Link href={`/blog/${item.id}`}>By {item.writername}</Link></li></ul>
                          <h4 className="title tgcommon__hover">
                            <Link href={`/blog/${item.id}`}>
                              {item.heading}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </div>
                  ))
                : []}
            </div>
          </div>
        </section>
        <div className="advertisement pt-45 pb-10">
          <div className="container">
            <div className="col-12">
              <div className="advertisement__image text-center">
                <Link href="/#">
                  <img
                    src="/assets/img/others/advertisement.png"
                    alt="advertisement"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* <section className="video-post-area section__hover-line white-bg pt-75 pb-80">
          <div className="container">
            <div className="section__title-wrap mb-40">
              <div className="row align-items-end">
                <div className="col-sm-6">
                  <div className="section__title">
                    <span className="section__sub-title">Video</span>
                    <h3 className="section__main-title">Recent Video Post</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="section__read-more text-start text-sm-end">
                    <Link href="/blog">
                      More Video Post <i className="far fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-8 col-lg-7">
                <div className="video__post-item big-post">
                  <div className="video__post-thumb">
                    <Link href="/blog/14">
                      <img src="/assets/img/blog/blog14.jpg" alt="img" />
                    </Link>
                    <a onClick={() => setOpen(true)} className="popup-video">
                      <i className="fas fa-play" />
                    </a>
                  </div>
                  <div className="video__post-content">
                    <ul className="tgbanner__content-meta list-wrap">
                      <li className="category">
                        <Link href="/blog">technology</Link>
                      </li>
                      <li>
                        <span className="by">By</span>{" "}
                        <Link href="/blog">alonso d.</Link>
                      </li>
                      <li>nov 21, 2022</li>
                    </ul>
                    <h3 className="title tgcommon__hover">
                      <Link href="/blog/1">
                        The multiverse is a hypothetical group of multiple
                        universes.
                      </Link>
                    </h3>
                  </div>
                  <ModalVideo
                    channel="youtube"
                    autoplay
                    isOpen={isOpen}
                    videoId="vfhzo499OeA"
                    onClose={() => setOpen(false)}
                  />
                </div>
              </div>
              <div className="col-xl-4 col-lg-5">
                {data.slice(15, 19).map((item, i) => (
                  <div className="video__post-item side-post" key={i}>
                    <div className="video__post-thumb tgImage__hover">
                      <a onClick={() => setOpen(true)} className="popup-video">
                        <img
                          src={`/assets/img/${item.group}/${item.img}`}
                          alt="img"
                        />
                        <i className="fas fa-play" />
                      </a>
                    </div>
                    <div className="video__post-content">
                      <ul className="tgbanner__content-meta list-wrap">
                        <li className="category">
                          <Link href="/blog">{item.category}</Link>
                        </li>
                        <li>
                          <span className="by">By</span>{" "}
                          <Link href="/blog">alonso d.</Link>
                        </li>
                      </ul>
                      <h3 className="title tgcommon__hover">
                        <Link href={`/blog/${item.id}`}>{item.title}</Link>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section> */}

        {/* <section className="hand-picked-area black-bg fix section__hover-line pt-75 pb-80">
          <div className="container">
            <div className="section__title-wrap section__title-white mb-40">
              <div className="row align-items-end">
                <div className="col-sm-6">
                  <div className="section__title">
                    <span className="section__sub-title">hand-picked</span>
                    <h3 className="section__main-title">More to Watch</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="section__read-more text-start text-sm-end">
                    <Link href="/blog">
                      Hand-Picked Post <i className="far fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="trending__slider dark-post-slider">
            <div className="swiper-container handpicked-active">
              <TrendingSlider showItem={6} />
            </div>
          </div>
        </section> */}
        <section className="stories-post-area section__hover-line pt-75 pb-40">
          <div className="container">
            <div className="section__title-wrap mb-40">
              <div className="row align-items-end">
                <div className="col-sm-6">
                  <div className="section__title">
                    <span className="section__sub-title stories_popular">Stories</span>
                    <h3 className="section__main-title popular_stories">Popular Stories</h3>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="section__read-more text-start text-sm-end">
                    <Link href="/blog" className="stories_more">
                      More Post <i className="far fa-long-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row row-gutters-40">
              {popular.slice(0, 2).map((item, i) => (
                <div className="col-md-6" key={i}>
                  <div className="stories-post__item">
                    <div className="stories-post__thumb tgImage__hover">
                      <Link href={`/blog/${item.id}`}>
                        <img src={item.thumbnail} alt="img" />
                      </Link>
                    </div>
                    <div className="stories-post__content video__post-content">
                      <ul className="tgbanner__content-meta list-wrap">
                        <li className="category">
                          <Link href="/blog">{item.subcategories}</Link>
                        </li>
                        <li>
                          <Link href="/blog">{item.writername}</Link>
                        </li>
                        <li>{item.timez}</li>
                      </ul>
                      <h3 className="title tgcommon__hover w-97">
                        <Link href={`/blog/${item.id}`}>{item.heading}</Link>
                      </h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="row">
              {popular.slice(2, 14)?.map((item, i) => (
                <div className="col-xl-3 col-lg-4 col-md-6" key={i}>
                  <div className="trending__post stories-small-post__item">
                    <div className="trending__post-thumb tgImage__hover">
                      <Link href={`/blog/${item.id}`}>
                        <img src={item.thumbnail} alt="img" />
                      </Link>
                    </div>
                    <div className="trending__post-content">
                      <ul className="tgbanner__content-meta list-wrap">
                        <li className="category">
                          <Link
                            href={`/business?hello=${encodeURIComponent(
                              item.subcategories
                            )}`}
                          >
                            {item.subcategories}
                          </Link>
                        </li>
                      </ul>
                     
                      <ul className="tgbanner__content-meta list-wrap"><li className="text-black"><Link href={`/blog/${item.id}`}>By {item.writername}</Link></li></ul>
                      <h4 className="title tgcommon__hover">
                        <Link href={`/blog/${item.id}`}>{item.heading}</Link>
                      </h4>
                    </div>
                  </div>
                </div>
              ))}

              <div style={{ width:'100%', display:"flex", justifyContent:"center", alignItems:'center' }}>
                 
                        <button className="btn"  onClick={(e)=>handleviewmore(e)}>
                          {currentpopular ==  lastpopular?
                           <span className="text">Less</span>
                          :
                          <span className="text">View More</span>
                          }
                       
                      </button>

              </div>
            </div>
          </div>
        </section>

        <section>
          
        </section>
        {/* <section className="newsletter-area pb-80">
          <div className="container">
            <div className="newsletter__wrap">
              <div className="row align-items-center">
                <div className="col-xl-5 col-lg-6">
                  <div className="newsletter__title">
                    <span className="sub-title">newsletter</span>
                    <h4 className="title">
                      Get notified of the best deals on our WordPress Themes
                    </h4>
                  </div>
                </div>
                <div className="col-xl-7 col-lg-6">
                  <div className="newsletter__form-wrap">
                    <form action="#" className="newsletter__form">
                      <div className="newsletter__form-grp">
                        <input
                          type="email"
                          placeholder="Email address"
                          required
                        />
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexCheckDefault"
                          >
                            I agree that my submitted data is being collected
                            and stored.
                          </label>
                        </div>
                      </div>
                      <button className="btn" type="submit">
                        <span className="text">Subscribe</span>{" "}
                        <i className="fas fa-paper-plane" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </Layout>
    </>
  );
}
