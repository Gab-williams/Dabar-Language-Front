import React, { useState, useEffect } from "react";
import ReactFlagsSelect from "react-flags-select";
import {createClient} from 'contentful';
import axios from "axios";
// import '../../node_modules/react-flags-select/css/react-flags-select.css'; 
export default function Jack() {
    const [selected, setSelected] = useState("GB");

    const client =  createClient({
        space:'t0pszie0jiqu',
        accessToken:'bm2qgxL1ruXxTPkEQT0KgtAuHOwVxlOzOuj-AoNo-AM',
      });

    useEffect(() => {


  
      const HeroAPi = async () => {

      //   let stories = await client.getEntries({content_type:"stories"})
      //   // console.log(stories)
      //   const options = {
      //     renderNode: {
      //       "embedded-asset-block": (node) => {
      //         return (
      //           <img
      //             src={node.data.target.fields.file.url}
      //             alt={node.data.target.fields.description}
      //           />
      //         );
      //       },
      //     },
      //   };
      //   console.log(stories)
      //   const newData = await Promise.all(
            
      //     stories?.items.map(async (item) => {
      //           // console.log(item)
      //       // const contentbody = documentToReactComponents(item.fields.body, options);
      //        let word = JSON.stringify(item.fields.body)      
  
      //           // console.log(item.fields.mainImage?.fields.file.url)   
      //        return {
      //         heading:item.fields.heading,
      //         body:word,
      //         summary:item.fields.summary,
      //          mainImage:item.fields.mainImage?.fields.file.url,
      //         writer:item.fields.writerId.fields.name,
      //         readTime:item.fields.readTime,
      //         category:item.fields.categoryId.fields.category,
      //         date:item.sys.createdAt
  
      //        }
  
            
            
      //     })
      //   )
  



              const apiClient = axios.create({
        baseURL: "http://127.0.0.1:8000/",
        withCredentials: true
      });

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

    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let url = '/api/story_empty_id'
     apiClient.get('/sanctum/csrf-cookie').then(() => {
          apiClient.get(url, headers, {

        })
        })
      };
  
      HeroAPi();
  
  }, []);
  

    return (
        <div>
<div style={{ width:"140px" }}>
<ReactFlagsSelect
  countries={["US", "GB", "FR", "DE", "IT"]}
  customLabels={{ US: "EN-US", GB: "EN-GB", FR: "FR", DE: "DE", IT: "IT" }}
  placeholder="Select Language"
  selected={selected}
  defaultCountry="US"
  onSelect={(code) => setSelected(code)}
/>
</div>

            
        </div>
    )
}
