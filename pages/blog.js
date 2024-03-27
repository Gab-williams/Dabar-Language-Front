import BlogSidebar2 from "@/components/elements/BlogSidebar2"
import Layout from "@/components/layout/Layout"
import Link from "next/link"
import { useRouter } from "next/router";
import {
  
    FacebookShareButton,
   
    LinkedinShareButton,
   
    TwitterShareButton,
    
  } from "react-share";
  import axios from 'axios';
import { useEffect, useState, useContext } from "react";
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import {createClient} from 'contentful';
import ReactPaginate from 'react-paginate';
import { context } from "@/components/context";
export default function Blog() {
  const created = useContext(context);
  const {selectedx, setSelectedx} = created 

    // const {id} = router.query
    // console.log(id)
    const [Data, setData] = useState([])
    const [orignalarr, setorignalarr] = useState([])
    const [numberofpage, setnumberofpage] = useState(1)
    const [pageSize, setpageSize] = useState(6)
    const [currentPage, setcurrentPage] = useState(1);
    const [lastpage, setlastpage] = useState(1)
    // let [selectedx, setSelectedx] = useState('') 

      const apiClient = axios.create({
        baseURL: "https://dabarmedia.com/",
        withCredentials: true
      });
  
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

        const Local = async()=>{
         
      let urlz = `/api/randomcategorystrories`;
      await  apiClient.get('/sanctum/csrf-cookie')
            let headers = new Headers();
           headers.append('Content-Type', 'application/json')
            let single =  await  apiClient.get(urlz,headers)
          
            setlastpage(single.data.success.last_page)
            const newData = await Promise.all(
              single.data.success.data.map(async (item) => {
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
                  summary: item.presummary,
                  presummary:item.presummary,
                  thumbnail:item.main_image,
                  category: item.category,
                  writer:item.writer,
                  id:item.id,
                  timez:formattedDate
                 };
               })
             );
            //  setorignalarr(newData)
            //  setData(newData)


            if (selectedx === 'GB') {
              setorignalarr(newData)
              setData(newData);
          } else if (selectedx !== "" && selectedx !== 'GB') {
            console.log("here", selectedx)
            const translatedData = await Promise.all(newData.map(async (item) => {
              let heading = await changlang(selectedx, item.heading);
              let presummary = await changlang(selectedx, item.presummary);
              let category = await changlang(selectedx, item.category);
              let timez = await changlang(selectedx, item.timez);
        
              return {
                  heading: heading.data,
                  presummary: presummary.data,
                  thumbnail: item.thumbnail,
                  category: category.data,
                  id: item.id,
                  writer: item.writer,
                  timez: timez.data
              };
          }));
          setData(translatedData);
          setorignalarr(translatedData)

          }else {
            setData(newData);
            setorignalarr(newData)

              }
             
          }
          Local()
    },[selectedx])

    const handleNext = async(ans)=>{
      let number = ans.selected + 1;  
      let urlz = `/api/randomcategorystrories?number=${parseInt(number)}`;
      await  apiClient.get('/sanctum/csrf-cookie')
            let headers = new Headers();
           headers.append('Content-Type', 'application/json')
            let single =  await  apiClient.get(urlz,headers)
          
            setlastpage(single.data.success.last_page)
            const newData = await Promise.all(
              single.data.success.data.map(async (item) => {
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
                  summary: item.presummary,
                  presummary:item.presummary,
                  thumbnail:item.main_image,
                  category: item.category,
                  writer:item.writer,
                  id:item.id,
                  timez:formattedDate
                 };
               })
             );

      // setData(newData)
      if (selectedx === 'GB') {
        setData(newData);
    } else if (selectedx !== "" && selectedx !== 'GB') {
      console.log("here", selectedx)
      const translatedData = await Promise.all(newData.map(async (item) => {
        let heading = await changlang(selectedx, item.heading);
        let presummary = await changlang(selectedx, item.presummary);
        let category = await changlang(selectedx, item.category);
        let timez = await changlang(selectedx, item.timez);
  
        return {
            heading: heading.data,
            presummary: presummary.data,
            thumbnail: item.thumbnail,
            category: category.data,
            id: item.id,
            writer: item.writer,
            timez: timez.data
        };
    }));
    setData(translatedData);

    }else {
      setData(newData);

        }


      }

    return (
        <>
            <Layout   selectedx={selectedx} setSelectedx={setSelectedx} breadcrumbCategory="Category">
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
                                <div className="blog-post-wrapper">
                                    {Data.map((item)=>{
                                       return   <div className="latest__post-item">
                                       <div className="latest__post-thumb tgImage__hover">
                                           <Link href={`/blog/${item.id}`}><img src={item.thumbnail} alt="img" /></Link>
                                       </div>
                                       <div className="latest__post-content">
                                           <ul className="tgbanner__content-meta list-wrap">
                                               <li className="category"><Link href="/blog">{item.category}</Link></li>
                                               <li><span className="by">By</span> <Link href="/blog">{item.writer}.</Link></li>
                                               <li>{item.timez}</li>
                                           </ul>
                                           <h3 className="title tgcommon__hover"><Link href={`/blog/${item.id}`}>{item.heading}</Link></h3>
                                           <p>{item.presummary}</p>
                                           <div className="latest__post-read-more">
                                               <Link href={`/blog/${item.id}`}>Read More <i className="far fa-long-arrow-right" /></Link>
                                           </div>
                                       </div>
                                   </div>

                                    })}

                                  
                                  

                                 

                              
                                  

                                    <div className="pagination__wrap">
                                        {/* <ul className="list-wrap">
                                            <li className="active"><Link href="#">01</Link></li>
                                            <li><Link href="#">02</Link></li>
                                            <li><Link href="#">...</Link></li>
                                            <li><Link href="#">06</Link></li>
                                            <li><Link href="#"><i className="fas fa-angle-double-right" /></Link></li>
                                        </ul> */}
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
                            </div>
                            <div className="col-xl-3 col-lg-4 col-md-6">
                                <BlogSidebar2 />
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}
