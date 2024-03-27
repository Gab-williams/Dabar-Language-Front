import BlogSidebar2 from "@/components/elements/BlogSidebar2";
import Lottie from "react-lottie";
import Layout from "@/components/layout/Layout";
import animationData from "public/assets/loading.json";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { createClient } from "contentful";
import ReactPaginate from "react-paginate";
import { FaXTwitter } from "react-icons/fa6";
import { context } from "@/components/context";
import {
  
  FacebookShareButton,
 
  LinkedinShareButton,
 
  TwitterShareButton,
  
} from "react-share";
import ReactGA from "react-ga4";
import axios from 'axios';
// import { AES, enc } from 'crypto-js';
import CryptoJS from 'crypto-js';
export default function Business() {
  const created = useContext(context);
  const {selectedx, setSelectedx} = created
  const router = useRouter();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const apiClient = axios.create({
    baseURL: "https://dabarmedia.com/",
    withCredentials: true
  });
 
  const { hello } = router.query;
   console.log(hello)
  const [pageSize, setpageSize] = useState(6);
  const [currentPage, setcurrentPage] = useState(1);
  const [Data, SetData] = useState([]);
  const [datex, setdatex] = useState("");
  const [numberofpage, setnumberofpage] = useState(1);
  const [orignalarr, setorignalarr] = useState([]);
  const [randomx, setRandomx] = useState([])
  const [lastpage, setlastpage] = useState(1)
  const client = createClient({
    space: "t0pszie0jiqu",
    accessToken: "bm2qgxL1ruXxTPkEQT0KgtAuHOwVxlOzOuj-AoNo-AM",
  });

  useEffect(() => {
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


    ReactGA.initialize("G-J8HLPZVV8W");
    ReactGA.set({ title: 'Business' });
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname + window.location.search });
    const fetchStories = async () => {
      let story = await client.getEntries({
        content_type: "currentstories",
        select: "fields",
      });
      // categoryfilter
      let encodedHello = encodeURIComponent(hello);
      let urlz = `/api/categoryfilter?category=${encodedHello}&number=${1}`;
      await  apiClient.get('/sanctum/csrf-cookie')
            let headers = new Headers();
           headers.append('Content-Type', 'application/json')
            let category =  await  apiClient.get(urlz,headers)
            //  console.log(category.data.success)
             setlastpage(category.data.success.last_page)
      const newData = await Promise.all(
        category.data.success.data.map(async (item) => {
          let timez = new Date(item.created_at);
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
          const originalString = JSON.stringify(item.id);
          const encryptedString = CryptoJS.AES.encrypt(originalString, 'TheDabar').toString();
          const sanitizedEncryptedString = encryptedString.replace(/\//g, '');
          
          return {
            // heading: item.fields.storyId.fields.heading,
            // summary: item.fields.storyId.fields.summary,
            // presummary: item.fields.storyId.fields.preSummary,
            // thumbnail: item.fields.storyId.fields.thumbnail.fields.file.url,
            // category: answer,
            // writer: answriter,
            // id: item.sys.id,
            // timez: formattedDate,

            heading: item.heading,
            // summary: item.fields.storyId.fields.summary,
            summary:item.presummary,
            thumbnail: item.main_image,
            category: item.category,
            id: item.id,
            writer:item.writer,
            timez:formattedDate
          };
        })
      );
      // setorignalarr(n)
      // const shuffledArray = newData.slice().sort(() => Math.random() - 0.5);
      // let arrrandom =  shuffledArray.slice(0, 4); 
     

      // let filterdata = newData.filter(
      //   (item) => item.category.toLowerCase() == hello.toLowerCase()
      // );
   

      ReactGA.event({
        category: hello,
        action: "Category Page",
        label: hello, // optional
      });

      // let page = Math.ceil(filterdata.length / 6);
      // const indexofLastPost = currentPage * pageSize;
      // const indexofFirstPost = indexofLastPost - pageSize;
      // let ansdata = filterdata?.slice(indexofFirstPost, indexofLastPost);
      // SetData(newData);
      
      if (selectedx === 'GB') {
        SetData(newData);
        setRandomx(newData)
        setorignalarr(newData);
    } else if (selectedx !== "" && selectedx !== 'GB') {
      console.log("here", selectedx)
      const translatedData = await Promise.all(newData.map(async (item) => {
        let heading = await changlang(selectedx, item.heading);
        let summary = await changlang(selectedx, item.summary);
        let category = await changlang(selectedx, item.category);
        let timez = await changlang(selectedx, item.timez);

        return {
            heading: heading.data,
            summary: summary.data,
            thumbnail: item.thumbnail,
            category: category.data,
            id: item.id,
            writer: item.writer,
            timez: timez.data
        };
    }));
    SetData(translatedData);
    setRandomx(translatedData)
    setorignalarr(translatedData);

    }else {
      SetData(newData);
      setRandomx(newData)
      setorignalarr(newData)
        }



      setnumberofpage(category.data.success.last_page);
    };

    fetchStories();
    // const Local = async () => {
    //   let story = await client.getEntries({
    //     content_type: "currentstories",
    //     select: "fields",
    //   });
    //   const newData = await Promise.all(
    //     story?.items.map(async (item) => {
    //       let timez = new Date(item.fields.storyId.sys.updatedAt);
    //       const monthNames = [
    //         "Jan",
    //         "Feb",
    //         "Mar",
    //         "Apr",
    //         "May",
    //         "Jun",
    //         "Jul",
    //         "Aug",
    //         "Sept",
    //         "Oct",
    //         "Nov",
    //         "Dec",
    //       ];
    //       const day = timez.getDate();
    //       const monthIndex = timez.getMonth();
    //       const year = timez.getFullYear();
    //       const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;

    //       let data = await client.getEntry(
    //         item.fields.storyId.fields.categoryId.sys.id
    //       );
    //       let writer = await client.getEntry(
    //         item.fields.storyId.fields.writerId.sys.id
    //       );
    //       let answer = data.fields.category;
    //       let answriter = writer.fields.name;
    //       return {
    //         heading: item.fields.storyId.fields.heading,
    //         summary: item.fields.storyId.fields.summary,
    //         presummary: item.fields.storyId.fields.preSummary,
    //         thumbnail: item.fields.storyId.fields.thumbnail.fields.file.url,
    //         category: answer,
    //         writer: answriter,
    //         id: item.sys.id,
    //         timez: formattedDate,
    //       };
    //     })
    //   );
    //   localStorage.setItem("stories", JSON.stringify(newData));
    // };
    // Local();
  }, [hello, selectedx]);

  const handleNext = async(ans) => {
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
    let number = ans.selected + 1;
    let urlz = `/api/categoryfilter?category=${encodeURIComponent(hello)}&number=${parseInt(number)}`;
    await  apiClient.get('/sanctum/csrf-cookie')
          let headers = new Headers();
         headers.append('Content-Type', 'application/json')
          let category =  await  apiClient.get(urlz,headers)
        //  SetData(category.data.success.data);


        const newData = await Promise.all(
          category.data.success.data.map(async (item) => {
            let timez = new Date(item.created_at);
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
            const originalString = JSON.stringify(item.id);
            const encryptedString = CryptoJS.AES.encrypt(originalString, 'TheDabar').toString();
            const sanitizedEncryptedString = encryptedString.replace(/\//g, '');
            
            return {
              // heading: item.fields.storyId.fields.heading,
              // summary: item.fields.storyId.fields.summary,
              // presummary: item.fields.storyId.fields.preSummary,
              // thumbnail: item.fields.storyId.fields.thumbnail.fields.file.url,
              // category: answer,
              // writer: answriter,
              // id: item.sys.id,
              // timez: formattedDate,
  
              heading: item.heading,
              // summary: item.fields.storyId.fields.summary,
              summary:item.presummary,
              thumbnail: item.main_image,
              category: item.category,
              id: item.id,
              writer:item.writer,
              timez:formattedDate
            };
          })
        );
        // SetData(newData)

        if (selectedx === 'GB') {
          SetData(newData);
      } else if (selectedx !== "" && selectedx !== 'GB') {
        console.log("here", selectedx)
        const translatedData = await Promise.all(newData.map(async (item) => {
          let heading = await changlang(selectedx, item.heading);
          let summary = await changlang(selectedx, item.summary);
          let category = await changlang(selectedx, item.category);
          let timez = await changlang(selectedx, item.timez);
  
          return {
              heading: heading.data,
              summary: summary.data,
              thumbnail: item.thumbnail,
              category: category.data,
              id: item.id,
              writer: item.writer,
              timez: timez.data
          };
      }));
      SetData(translatedData);
  
      }else {
        SetData(newData);
  
          }
  };

  return (
    <>
      <Layout breadcrumbCategory="Category" breadcrumbPostTitle={hello}>
        <section className="blog-details-area pt-80 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-1">
                <div className="blog-details-social">
                  <ul className="list-wrap">
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
                  </ul>
                </div>
              </div>
              <div className="col-xl-8 col-lg-7">
                {Data && Data.length > 0 ? (
                  <div className="blog-post-wrapper">
                    {Data && Data.length > 0 ? (
                      <div className="latest__post-item" key={Data[0].id}>
                        <div className="latest__post-thumb tgImage__hover">
                          <Link
                            href={`/blog/${encodeURIComponent(Data[0].id)}`}
                          >
                            <img
                              src={
                                Object.keys(Data[0]).length > 0
                                  ? Data[0].thumbnail
                                  : ""
                              }
                              alt="img"
                            />
                          </Link>
                        </div>
                        <div className="latest__post-content">
                          <ul className="tgbanner__content-meta list-wrap">
                            <li className="category">
                              <Link
                                href={`/blog/${encodeURIComponent(
                                  Object.keys(Data[0]).length > 0
                                    ? Data[0].id
                                    : ""
                                )}`}
                              >
                                {Object.keys(Data[0]).length > 0
                                  ? Data[0].category
                                  : ""}
                              </Link>
                            </li>
                            <li>
                              <span className="by">By</span>{" "}
                              <Link
                                href={`/blog/1?id=${encodeURIComponent(
                                  Object.keys(Data[0]).length > 0
                                    ? Data[0].id
                                    : ""
                                )}`}
                              >
                                {Object.keys(Data[0]).length > 0
                                  ? Data[0].writer
                                  : ""}
                                .
                              </Link>
                            </li>
                            <li>{Data[0].timez}</li>
                          </ul>
                          <h3 className="title tgcommon__hover">
                            <Link
                              href={`/blog/${encodeURIComponent(
                                Object.keys(Data[0]).length > 0
                                  ? Data[0].id
                                  : ""
                              )}`}
                            >
                              {Object.keys(Data[0]).length > 0
                                ? Data[0].heading
                                : ""}
                            </Link>
                          </h3>
                          <p>{Data[0].summary}</p>
                          <div className="latest__post-read-more">
                            <Link
                              href={`/blog/${encodeURIComponent(
                                Object.keys(Data[0]).length > 0
                                  ? Data[0].id
                                  : ""
                              )}`}
                            >
                              Read More{" "}
                              <i className="far fa-long-arrow-right" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}

                    <div className="row row--10">
                      {Data.slice(1, 3).length > 0
                        ? Data.slice(1, 3).map((item, i) => {
                            return (
                              <div
                                className="col-lg-6 col-md-6 col-sm-6 col-12 mt--20"
                                key={i}
                              >
                                <div className="latest__post-item">
                                  <div className="latest__post-thumb tgImage__hover">
                                    <Link
                                      href={`/blog/${encodeURIComponent(
                                        item.id
                                      )}`}
                                    >
                                      <img src={item.thumbnail} alt="img" />
                                    </Link>
                                  </div>
                                  <div className="latest__post-content">
                                    <ul className="tgbanner__content-meta list-wrap">
                                      <li className="category">
                                        <Link href="/blog">
                                          {item.category}
                                        </Link>
                                      </li>
                                      <li>
                                        <span className="by">By</span>{" "}
                                        <Link href="/blog">{item.writer}.</Link>
                                      </li>
                                      <li>
                                        <Link href="/blog">{item.timez}.</Link>
                                      </li>
                                    </ul>
                                    <h3 className="title tgcommon__hover">
                                      <Link
                                        href={`/blog/${encodeURIComponent(
                                          item.id
                                        )}`}
                                      >
                                        {item.heading}
                                      </Link>
                                    </h3>
                                    <p>{item.summary}</p>

                                    <div className="latest__post-read-more">
                                      <Link
                                        href={`/blog/${encodeURIComponent(
                                          item.id
                                        )}`}
                                      >
                                        Read More{" "}
                                        <i className="far fa-long-arrow-right" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : ""}
                    </div>

                    <div className="row row--10">
                      {Data.slice(3, 5).length > 0
                        ? Data.slice(3, 5).map((item, i) => {
                            return (
                              <div
                                className="col-lg-6 col-md-6 col-sm-6 col-12 mt--20"
                                key={i}
                              >
                                <div className="latest__post-item">
                                  <div className="latest__post-thumb tgImage__hover">
                                    <Link
                                      href={`/blog/${encodeURIComponent(
                                        item.id
                                      )}`}
                                    >
                                      <img src={item.thumbnail} alt="img" />
                                    </Link>
                                  </div>
                                  <div className="latest__post-content">
                                    <ul className="tgbanner__content-meta list-wrap">
                                      <li className="category">
                                        <Link href="/blog">
                                          {item.category}
                                        </Link>
                                      </li>
                                      <li>
                                        <span className="by">By</span>{" "}
                                        <Link href="/blog">{item.writer}.</Link>
                                      </li>
                                      <li>
                                        <Link href="/blog">{item.timez}.</Link>
                                      </li>
                                    </ul>
                                    <h3 className="title tgcommon__hover">
                                      <Link
                                        href={`/blog/${encodeURIComponent(
                                          item.id
                                        )}`}
                                      >
                                        {item.heading}
                                      </Link>
                                    </h3>
                                    <p>{item.summary}</p>

                                    <div className="latest__post-read-more">
                                      <Link
                                        href={`/blog/${encodeURIComponent(
                                          item.id
                                        )}`}
                                      >
                                        Read More{" "}
                                        <i className="far fa-long-arrow-right" />
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        : ""}
                    </div>

                    {Data && Data.length >= 6? (
                      <div className="latest__post-item">
                        <div className="latest__post-thumb tgImage__hover">
                          <Link
                            href={`/blog/${encodeURIComponent(
                              Data.length >= 6 &&
                                Object.keys(Data[5]).length > 0
                                ? Data[5].id
                                : ""
                            )}`}
                          >
                            {Data[5] &&
                            Object.keys(Data[5]).length > 0 &&
                            Data[5].thumbnail ? (
                              <img
                                src={
                                  Data[5] &&
                                  Object.keys(Data[5]).length > 0 &&
                                  Data[5].thumbnail
                                    ? Data[5].thumbnail
                                    : ""
                                }
                                alt="img"
                              />
                            ) : (
                              ""
                            )}
                          </Link>
                        </div>
                        <div className="latest__post-content">
                          <ul className="tgbanner__content-meta list-wrap">
                            <li className="category">
                              <Link
                                href={`/blog/${encodeURIComponent(
                                  Data.length >= 6 &&
                                    Object.keys(Data[5]).length > 0
                                    ? Data[5].id
                                    : ""
                                )}`}
                              >
                                {Data[5] && Object.keys(Data[5]).length > 0
                                  ? Data[5].category
                                  : ""}
                              </Link>
                            </li>
                            {Data[5] && Object.keys(Data[5]).length > 0 ? (
                              <li>
                                <span className="by">By </span>{" "}
                                <Link href="/blog">
                                  {Data[5] && Object.keys(Data[5]).length > 0
                                    ? Data[5].writer
                                    : ""}
                                  .
                                </Link>
                              </li>
                            ) : (
                              ""
                            )}

                            <li>
                              {Data[5] && Data[5].timez ? Data[5].timez : ""}
                            </li>
                          </ul>
                          <h3 className="title tgcommon__hover">
                            <Link
                              href={`/blog/${encodeURIComponent(
                                Data.length >= 6 &&
                                  Object.keys(Data[5]).length > 0
                                  ? Data[5].id
                                  : ""
                              )}`}
                            >
                              {Data[5] && Object.keys(Data[5]).length > 0
                                ? Data[5].heading
                                : ""}
                            </Link>
                          </h3>
                          <p>
                            {Data[5] && Data[5].presummary
                              ? Data[5].presummary
                              : ""}
                          </p>
                          {Data.length >= 6 &&
                          Object.keys(Data[5]).length > 0 ? (
                            <div className="latest__post-read-more">
                              <Link
                                href={`/blog/${encodeURIComponent(
                                  Data.length >= 6 &&
                                    Object.keys(Data[5]).length > 0
                                    ? Data[5].id
                                    : ""
                                )}`}
                              >
                                Read More{" "}
                                <i className="far fa-long-arrow-right" />
                              </Link>
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ) : (
                    // four random array
                    <div className="blog-post-wrapper">
                        
                        <section
                      style={{
                        textAlign: "center",
                        fontSize: "xx-large",
                        fontWeight: "bold",
                        padding: "4rem",
                      }}
                    >
                      <Lottie options={defaultOptions} width={300} />
                      <h1>Coming Soon!</h1>
                      <h4>Hold onto your hats</h4>
                      <h4>mind-blowing content is loading!</h4>
                      <h4>Checkout other articles!</h4>
                    </section>

                    {randomx && randomx.length > 0?
                     <div className="latest__post-item" key={randomx[0].id}>
    
                     <div className="latest__post-thumb tgImage__hover">
                       <Link href={`/blog/${encodeURIComponent(randomx[0].id)}`} >
                         <img
                           src={Object.keys(randomx[0]).length > 0?randomx[0].thumbnail:""}
                           alt="img"
                         />
                       </Link>
                     </div>
                     <div className="latest__post-content">
                       <ul className="tgbanner__content-meta list-wrap">
                         <li className="category">
                           <Link href={`/blog/${encodeURIComponent(Object.keys(  randomx[0]).length >0? randomx[0].id:"")}`} >{Object.keys(randomx[0]).length >0?randomx[0].category:""}</Link>
                         </li>
                         <li>
                           <span className="by">By</span>{" "}
                           <Link href={`/blog/1?id=${encodeURIComponent(Object.keys(randomx[0]).length >0?randomx[0].id:"")}`} >{Object.keys(randomx[0]).length >0?randomx[0].writer:""}.</Link>
                         </li>
                         <li>nov 22, 2022</li>
                       </ul>
                       <h3 className="title tgcommon__hover">
                         <Link href={`/blog/${encodeURIComponent(Object.keys(randomx[0]).length >0?randomx[0].id:"")}`} >
                            {Object.keys(randomx[0]).length >0?randomx[0].heading:""}
                         </Link>
                       </h3>
                       <p>
                       {randomx[0].summary}
                       </p>
                       <div className="latest__post-read-more">
                         <Link  href={`/blog/${encodeURIComponent(Object.keys(randomx[0]).length >0?randomx[0].id:"")}`}>
                           Read More <i className="far fa-long-arrow-right" />
                         </Link>
                       </div>
                     </div>
    
    
                   </div>
                    
                    :""}
                 
                  
                  
                  {randomx && randomx.length > 0?
                  <div className="latest__post-item">
                  <div className="latest__post-thumb tgImage__hover">
                    <Link  href={`/blog/${encodeURIComponent(randomx.length >= 4 && Object.keys(randomx[3]).length > 0 ? randomx[3].id : "")}`}>
                    {randomx[3] && Object.keys(randomx[3]).length > 0 && randomx[3].thumbnail ?
                    
                    <img
                    src={randomx[3] && Object.keys(randomx[3]).length > 0 && randomx[3].thumbnail ? randomx[3].thumbnail : ""}
                    alt="img"
                  />
                    : ""}
                     
                    </Link>
                  </div>
                  <div className="latest__post-content">
                    <ul className="tgbanner__content-meta list-wrap">
                      <li className="category">
                        <Link  href={`/blog/${encodeURIComponent(randomx.length >= 4 && Object.keys(randomx[3]).length > 0 ? randomx[3].id : "")}`}>{randomx[3] && Object.keys(randomx[3]).length > 0 ? randomx[3].category : ""}</Link>
                      </li>
                      {randomx[3] && Object.keys(randomx[3]).length > 0 ?
                       <li>
                       <span className="by">By </span>{" "}
                       <Link href="/blog">{randomx[3] && Object.keys(randomx[3]).length > 0 ? randomx[3].writer : ''}.</Link>
                     </li>
                      : ''}
                     
                      <li>{randomx[3] && randomx[3].timez ? randomx[3].timez :''}</li>
                    </ul>
                    <h3 className="title tgcommon__hover">
                      <Link  href={`/blog/${encodeURIComponent(randomx.length >= 4 && Object.keys(randomx[3]).length > 0 ? randomx[3].id : "")}`}>
                      {randomx[3] && Object.keys(randomx[3]).length > 0 ? randomx[3].heading : ""}
                      </Link>
                    </h3>
                    <p>
                        {randomx[3] && randomx[3].presummary ? randomx[3].presummary : ""}
                    </p>
                    {randomx.length >= 4 && Object.keys(randomx[3]).length > 0 ?
                     <div className="latest__post-read-more">
                     <Link  href={`/blog/${encodeURIComponent(randomx.length >= 4 && Object.keys(randomx[3]).length > 0 ? randomx[3].id : "")}`}>
                       Read More <i className="far fa-long-arrow-right" />
                     </Link>
                   </div>
                    
                    : ""}
                   
                  </div>
                </div>
                  :""}
                </div>
                )}

              
                  <div className="pagination__wrap">
                    <ReactPaginate
                      previousLabel={"<"}
                      nextLabel={">"}
                      pageCount={lastpage}
                      breakLabel={"..."}
                      marginPagesDisplayed={1}
                      pageRangeDisplayed={1}
                      onPageChange={handleNext}
                      containerClassName={"list-wrap"}
                      // pageclassNameName={' '}
                      pageLinkClassName={""}
                      // previousClassName={'bg-gray-400 rounded-lg px-2 py-1 text-lg justify-center items-center text-white'}
                      // nextClassName={'bg-gray-400 px-2 py-1 text-lg justify-center items-center text-white rounded-lg '}
                    />
                  </div>
               
              </div>

              <div className="col-xl-3 col-lg-4 col-md-6">
                <BlogSidebar2 selectedx={selectedx} />
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
