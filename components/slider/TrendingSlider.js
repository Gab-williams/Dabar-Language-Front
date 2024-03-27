import { Swiper, SwiperSlide } from "swiper/react"
import { useEffect, useState } from 'react'
import data from "@/util/blogData"
import Link from "next/link"
import { Autoplay, Navigation, Pagination } from "swiper"
import {createClient} from 'contentful';
import axios from "axios"
import { AES, enc } from 'crypto-js';

export default function TrendingSlider({ showItem, selectedx }) {

    const  [Tendall, setTendall] = useState([])
    const client =  createClient({
        space:'t0pszie0jiqu',
        accessToken:'bm2qgxL1ruXxTPkEQT0KgtAuHOwVxlOzOuj-AoNo-AM',
      });

      const apiClient = axios.create({
        baseURL: "https://dabarmedia.com/",
        withCredentials: true
      });

      useEffect(()=>{
        // Tending News
     
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

    const TendData = async()=>{
        let tending = await client.getEntries({content_type:'tending',  select:'fields'})

        let urlz = '/api/tending';
        await  apiClient.get('/sanctum/csrf-cookie')
              let headers = new Headers();
             headers.append('Content-Type', 'application/json')
              let tendingx =  await  apiClient.get(urlz,headers)

        // setTendall(tending?.items)
        const newData = await Promise.all(
            tendingx.data.success.map(async (item) => {
              // console.log(item)
              // console.log("tending",item.fields)
               //console.log(item.fields.storyId.fields.writerId.sys.id)
               //var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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
    
            //   let data = await client.getEntry(item.fields.storyId.fields.categoryId.sys.id);
            //   let writer = await client.getEntry(item.fields.storyId.fields.writerId.sys.id)
            //   let answer = data.fields.category;
            //    let answriter = writer.fields.name
              return {
                // heading: item.fields.storyId.fields.heading,
                // summary: item.fields.storyId.fields.summary,
                // category: answer,
                // writer:answriter,
                // thumbnail:item.fields.storyId.fields.thumbnail.fields.file.url,
                // id:item.sys.id,
                // timez:formattedDate

                heading: item.heading,
                // summary: item.fields.storyId.fields.summary,
                summary:item.presummary,
                thumbnail: item.main_image,
                subcategories: item.category,
                id:item.id,
                writername:item.writer,
                timez:formattedDate
    
              };
            })
          );
    
        //   setTendall(newData)
         
        if (selectedx === 'GB') {
            setTendall(newData);
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
        setTendall(translatedData);
      
        }else {
            setTendall(newData);
            }


    }
    
    TendData()
    
     
    },[selectedx])


    return (
        <>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                slidesPerView={showItem}
                spaceBetween={30}
                loop={false}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    el: '.block-gallery-pagination'
                }}
                breakpoints={{
                    320: {
                        slidesPerView: 1,
                        spaceBetween: 30,
                    },
                    575: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    767: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    991: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1199: {
                        slidesPerView: showItem,
                        spaceBetween: 30,
                    },
                    1350: {
                        slidesPerView: showItem,
                        spaceBetween: 30,
                    },
                }}
                className="swiper-wrapper"
            >
                {Tendall.slice(0, 8).map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="trending__post">
                            <div className="trending__post-thumb tgImage__hover">
                                
                                <Link href={`/blog/${item.id}`}><img src={item.thumbnail} alt="img" /></Link>
                                {/* {item.trending && <span className="is_trend"><i className="fas fa-bolt" /></span>} */}
                            </div>
                            <div className="trending__post-content">
                                <ul className="tgbanner__content-meta list-wrap">
                                    <li className="category"><Link
                                       href={`/business?hello=${encodeURIComponent(item.subcategories)}`}
                                     >{item.subcategories}</Link></li>
                                     
                                   
                                </ul>
                                <ul className="tgbanner__content-meta list-wrap"><li className="text-black"><Link href={`/blog/${item.id}`}>By {item.writername}</Link></li></ul>
                                <h4 className="title tgcommon__hover"><Link href={`/blog/${item.id}`}>{item.heading}</Link></h4>
                                
                                
                            </div>
                            
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
}
