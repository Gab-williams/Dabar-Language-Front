import BlogSidebar from "@/components/elements/BlogSidebar";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useEffect, useState, useContext, useRef  } from "react";
import data from "../../util/blogData";
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ReactGA from "react-ga4";
import { Markup } from 'interweave';
// import { AES, enc } from 'crypto-js';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { context } from "../../components/context";
export default function BlogDetails() {
  let Router = useRouter();
  const [item, setItem] = useState(null);
  const [fieldsdata, setfielddata] = useState({});
  const [datex, setdatex] = useState("");
  const [writername, setwritername] = useState("");
  const { id } = Router.query;
  const [category, setcategory] = useState("");
  const [dataLocial, setdataLocial] = useState({});
  const [readtime, setreadtime] = useState("");

  const created = useContext(context);
  const {selectedx, setSelectedx} = created

  const client = createClient({
    space: "t0pszie0jiqu",
    accessToken: "bm2qgxL1ruXxTPkEQT0KgtAuHOwVxlOzOuj-AoNo-AM",
  });


  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });
 
  useEffect(() => {
    //setItem(data.find((data) => data.id == id))
  //  singlestory
    const fetchData = async () => {

      let urlz = `/api/singlestory?id=${encodeURIComponent(id)}`;
      await  apiClient.get('/sanctum/csrf-cookie')
            let headers = new Headers();
           headers.append('Content-Type', 'application/json')
            let single =  await  apiClient.get(urlz,headers)

      // let story = await client.getEntry(encodeURIComponent(itemId));
      // //    let writeridx = fieldsdata.writerId?.sys.id

      // try {
      //   if (story?.fields.storyId) {
          setfielddata(single.data.message);
          setreadtime(single.data.message.read_time);
          setcategory(single.data.message.category);
          setwritername(single.data.message.writer)


      //     let cate = await client?.getEntry(fieldsdata.categoryId?.sys.id);
      //     setcategory(cate.fields.category);
      //   } else {
      //     // fieldsdata.categoryId?.fields.category
      //     setcategory(story?.fields.categoryId?.fields.category);
      //     setfielddata(story?.fields);
      //     setwritername(story?.fields.writerId?.fields.name);
      //   }
      // } catch (error) {}

      // try {
      //   if (story?.fields.storyId) {
      //     let writername = await client.getEntry(fieldsdata.writerId.sys.id);
      //     setwritername(writername.fields.name);
      //   }
      // } catch (error) {}

      let timez = new Date(single.created_at);
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ];

      const day = timez.getDate();
      const monthIndex = timez.getMonth();
      const year = timez.getFullYear();
      const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
      setdatex(formattedDate);
    };

    fetchData();
  }, [id]);

  

  const [random, setrandom] = useState([]);
  // useEffect(() => {

  //   const Local = async () => {
  //     let story = await client.getEntries({
  //       content_type: "currentstories",
  //       select: "fields",
  //     });
  //     const newData = await Promise.all(
  //       story?.items.map(async (item) => {
              // console.log(item.fields.storyId)
  //         let timez = new Date(item.fields.storyId.sys.updatedAt);
  //         const monthNames = [
  //           "Jan",
  //           "Feb",
  //           "Mar",
  //           "Apr",
  //           "May",
  //           "Jun",
  //           "Jul",
  //           "Aug",
  //           "Sept",
  //           "Oct",
  //           "Nov",
  //           "Dec",
  //         ];
  //         const day = timez.getDate();
  //         const monthIndex = timez.getMonth();
  //         const year = timez.getFullYear();
  //         const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

  //         let data = await client.getEntry(
  //           item.fields.storyId.fields.categoryId.sys.id
  //         );
  //         let writer = await client.getEntry(
  //           item.fields.storyId.fields.writerId.sys.id
  //         );
  //         let answer = data.fields.category;
  //         let answriter = writer.fields.name;
  //         return {
  //           heading: item.fields.storyId.fields.heading,
  //           summary: item.fields.storyId.fields.summary,
  //           presummary: item.fields.storyId.fields.preSummary,
  //           thumbnail: item.fields.storyId.fields.thumbnail.fields.file.url,
  //           category: answer,
  //           writer: answriter,
  //           id: item.sys.id,
  //           timez: formattedDate,
  //         };
  //       })
  //     );
  //     localStorage.setItem("stories", JSON.stringify(newData));
  //   };
  //   Local();
  // }, []);


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
      return res.data;
  };

    const recentstories = async () => {
      // let newstories = await client.getEntries({
      //   content_type: "currentstories",
      //   select: "fields",
      // });
    //  randomstories

    let urlz = `/api/randomstories?id=${parseInt(id)}`;
    await  apiClient.get('/sanctum/csrf-cookie')
          let headers = new Headers();
         headers.append('Content-Type', 'application/json')
          let randomstory =  await  apiClient.get(urlz,headers)

      const newData = await Promise.all(
        randomstory.data.success.map(async (item) => {
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
      // let filterdata =  newData.filter((item)=>item.id != id)
      // const shuffledArray = [...filterdata];
      // for (let i = shuffledArray.length - 1; i > 0; i--) {
      //     const j = Math.floor(Math.random() * (i + 1));
      //     [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
      // }
      
      // // Randomly select two objects
      // const ans = shuffledArray.slice(0, 2)
    
      // setrandom(newData);

      if (selectedx === 'GB') {
        const translatedData = await Promise.all(newData.map(async (item) => {
          let heading = await changlang("EN", item.heading);
          let presummary = await changlang("EN", item.summary);
          let category = await changlang("EN", item.subcategories);
          let timez = await changlang("EN", item.timez);
    
          return {
              heading: heading.data,
              summary: presummary.data,
              thumbnail: item.thumbnail,
              subcategories: category.data,
              id: item.id,
              writername: item.writername,
              timez: timez.data
          };
      }));
      setrandom(translatedData);
    } else if (selectedx !== "" && selectedx !== 'GB') {
      console.log("here", selectedx)
      const translatedData = await Promise.all(newData.map(async (item) => {
        let heading = await changlang(selectedx, item.heading);
        let presummary = await changlang(selectedx, item.summary);
        let category = await changlang(selectedx, item.subcategories);
        let timez = await changlang(selectedx, item.timez);
  
        return {
            heading: heading.data,
            summary: presummary.data,
            thumbnail: item.thumbnail,
            subcategories: category.data,
            id: item.id,
            writername: item.writername,
            timez: timez.data
        };
    }));
    setrandom(translatedData);

    }else {
      setrandom(newData);

        }
     
    };

    recentstories();
  },[id, selectedx])

  useEffect(()=>{
    ReactGA.initialize("G-J8HLPZVV8W");
    ReactGA.set({ title: 'Story Page' });
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
    ReactGA.event({
      category: fieldsdata.heading,
      action: "Story Page",
      label: `${window.location.origin}/blog/${id}`, // optional
    });
  },[id])

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

  // console.log(fieldsdata)
  let body;

  if (fieldsdata.body) {
    try {
      const converted = JSON.parse(fieldsdata.body);
      
      if (typeof converted !== 'undefined' && Object.keys(converted).length > 0) {
        // console.log('object');
        body = documentToReactComponents(converted);
      } else {
        // console.log('other');
        body = <Markup content={fieldsdata.body} />;
      }
    } catch (error) {
      // Handle the error as needed
    }
  } else {
    console.error('fieldsdata.body is undefined or null.');
    // Handle the absence of fieldsdata.body as needed
  }


  let timez = new Date(fieldsdata.created_at)
  const monthNames = [
   "Jan", "Feb", "Mar",
   "Apr", "May", "Jun", "Jul",
   "Aug", "Sept", "Oct",
   "Nov", "Dec"
 ];
       
 const day = timez.getDate();
 const monthIndex = timez.getMonth();
 const year = timez.getFullYear();
 const formattedDate = `${day?day:""} ${monthNames[monthIndex?monthIndex:0]} ${year?year:""}`;


  const convertdata = ()=>{
    // const converted = JSON.parse(fieldsdata.body);

    const htmlTagRegex = /<[a-z][\s\S]*>/;

if (htmlTagRegex.test(fieldsdata.body) && Object.keys(fieldsdata.body).length == 0) {
  var styleRegex = /style\s*=\s*"([^"]*)"/g;
// Replace the matched style attribute with an empty string
var stringWithoutStyle = fieldsdata.body.replace(styleRegex, '');
  return <Markup content={stringWithoutStyle} />


  
  }else{

    const htmlRegex = /<[^>]*>/;
    const hasHtmlTags = htmlRegex.test(fieldsdata.body);

    if(hasHtmlTags){
      const jsonWithoutPTags = fieldsdata.body.replace(/<\/?p>/g, '');
      try {
        const converted = JSON.parse(jsonWithoutPTags);
        
        if (typeof converted !== 'undefined' && Object.keys(converted).length > 0) {
        
          return documentToReactComponents(converted);
        } 
      } catch (error) {
        // Handle the error as needed
      }

    }else{
      try {
        const converted = JSON.parse(fieldsdata.body);
        
        if (typeof converted !== 'undefined' && Object.keys(converted).length > 0) {
        
          return documentToReactComponents(converted);
        } 
      } catch (error) {
        // Handle the error as needed
      }
    }
    
  
 
  }
// console.log(body)
  }


  // const isStringArray = Array.isArray(JSON.parse(fieldsdata.body));
  // console.log(isStringArray)

  // console.log(body)
  const contRef = useRef(null);
  const titleRef = useRef(null)
  useEffect(()=>{
  let oldlang = localStorage.getItem('countrycode')?JSON.parse(localStorage.getItem('countrycode')):{}
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

   const bodylang = async()=>{
    const cont = contRef.current;
     const titler =  titleRef.current
    if (cont && fieldsdata.body && titler) {
     // const nonEmptyNodes = Array.from(cont.childNodes).filter(node =>  node.textContent.trim() !== '');
      // console.log( titler.childNodes)
        let titlexs = document.querySelector(".headingxd")
        let dateandtime = document.querySelector(".dateandtime")
        let readtimexs = document.querySelector(".readtime")
        if (selectedx === 'GB') {
          let anstitlexs =  await changlang("EN", titlexs.textContent)
         let ansdateandtime =  await changlang("EN", dateandtime.textContent)
          let ansreadtimexs =   await changlang("EN", readtimexs.textContent)
          titlexs.textContent = anstitlexs.data
          dateandtime.textContent = ansdateandtime.data
          readtimexs.textContent = ansreadtimexs.data
        }else if (selectedx !== "" && selectedx !== 'GB'){
          let anstitlexs =  await changlang(selectedx, titlexs.innerText)
         let ansdateandtime =  await changlang(selectedx, dateandtime.innerText)
          let ansreadtimexs =   await changlang(selectedx, readtimexs.innerText)
          titlexs.textContent = anstitlexs.data
          dateandtime.textContent = ansdateandtime.data
          readtimexs.textContent = ansreadtimexs.data
        }
        // else{
        //   titlexs.textContent = titlexs.innerText
        //   dateandtime.textContent = dateandtime.innerText
        // }
      for (var i = 0; i < cont.childNodes.length; i++) {
        if (selectedx === 'GB') {
          let anslang = await changlang("EN", cont.childNodes[i].innerText)
          // console.log(anslang.data)
         cont.childNodes[i].innerText =  anslang.data       
         }else if (selectedx !== 'GB' && cont.childNodes[i].innerText.trim() != "" ) {
          // console.log(selectedx, cont.childNodes[i].textContent)
          let anslang = await changlang(selectedx, cont.childNodes[i].textContent)
          // console.log(anslang.data)
       cont.childNodes[i].innerText =  anslang.data

        }
        // else{
        //   cont.childNodes[i].innerText =  cont.childNodes[i].innerText

        // }
      }
    }
   }
   bodylang()
  },[fieldsdata, selectedx])
  return (
    <>
      {fieldsdata && (
        <Layout
          breadcrumbCategory={category?category:''}
          breadcrumbPostTitle={fieldsdata.heading?fieldsdata.heading:""}
        >
          <>
            <section className="blog-details-area pt-80 pb-100">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-1">
                    <div className="blog-details-social">
                      <ul className="list-wrap">
                        <li>
                          <Link href="#">
                            <TwitterShareButton
                              url={`https://${location.hostname}`}
                            >
                              <FaXTwitter />
                            </TwitterShareButton>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <FacebookShareButton
                              url={`https://${location.hostname}`}
                            >
                              <FaFacebookF />
                            </FacebookShareButton>
                          </Link>
                        </li>
                        <li>
                          <Link href="#">
                            <LinkedinShareButton
                              url={`https://${location.hostname}`}
                            >
                              <i className="fab fa-linkedin-in" />
                            </LinkedinShareButton>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-8 col-lg-7">
                    <div className="blog-details-wrap">
                      <ul className="tgbanner__content-meta list-wrap">
                        <li className="category">
                          <Link href={`/blog/${id}`}>
                            {dataLocial?.category?dataLocial?.category:fieldsdata.category}
                          </Link>
                        </li>
                        <li>
                          <Link href="/blog">{fieldsdata.writer?fieldsdata.writer:""}.</Link>
                        </li>
                        <li className="dateandtime">{formattedDate?formattedDate:""}</li>
                        <li className="readtime">{readtime?readtime:""}</li>
                      </ul>
                      <h2 className="title headingxd" ref={titleRef}>{fieldsdata.heading?fieldsdata.heading:""}</h2>
                      <div className="blog-details-thumb">
                        <img
                          src={fieldsdata.main_image?fieldsdata.main_image:""}
                          alt=""
                          style={{ width: "100%" }}
                        />
                      </div>
                      <div className="blog-details-content">
                      
                              <div className="blog-details-inner ">
                                <div className="blog-details-images ">
                                  <div className="row ">
                                    <div className="col-md-12 col-sm-6">
                                      <div className="details-inner-image" id="allbody" ref={contRef}>
                                          {convertdata()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            

                        <div className="details-advertisement">
                          <Link href="#">
                            <img
                              src="/assets/img/others/advertisement02.png"
                              alt="img"
                            />
                          </Link>
                        </div>
   
                      </div>
                      <div className="blog-details-bottom">
                        <div className="row align-items-baseline">
                          <div className="col-xl-6 col-md-7">
                         
                          </div>
                        </div>
                      </div>

                      <div className="blog-prev-next-posts">
                        <div className="row">
                          {random.length > 0
                            ? random.map((item, i) => {
                                return (
                                  <div
                                    className="col-xl-6 col-lg-8 col-md-6"
                                    key={i}
                                  >
                                    <div className="pn-post-item">
                                      <div className="thumb">
                                        <Link href={`/blog/${item.id}`}>
                                          <img src={item.thumbnail} alt="img" />
                                        </Link>
                                      </div>
                                      <div className="content">
                                        {i == 0 ? (
                                          <span>Prev Post</span>
                                        ) : (
                                          <span>Next Post</span>
                                        )}

                                        <h5 className="title tgcommon__hover">
                                          <Link href={`/blog/${item.id}`}>
                                            {item.heading.length > 70
                                              ? item.heading.substr(0, 70) +
                                                ".."
                                              : item.heading}
                                          </Link>
                                        </h5>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            : ""}

                          {/* <div className="col-xl-6 col-lg-8 col-md-6">
                                                        <div className="pn-post-item next-post">
                                                            <div className="thumb">
                                                                <Link href="/blog/1"><img src="/assets/img/lifestyle/life_style07.jpg" alt="img" /></Link>
                                                            </div>
                                                            <div className="content">
                                                                <span>Next Post</span>
                                                                <h5 className="title tgcommon__hover"><Link href="/blog/1">Mood Boards for Product Designers dome...</Link></h5>
                                                            </div>
                                                        </div>
                                                    </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-3 col-lg-4 col-md-6">
                    <BlogSidebar writer={dataLocial?.writer?dataLocial?.writer:fieldsdata.writer} selectedx={selectedx} />
                  </div>
                </div>
              </div>
            </section>
          </>
        </Layout>
      )}
    </>
  );
}
