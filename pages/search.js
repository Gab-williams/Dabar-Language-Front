import BlogSidebar from "@/components/elements/BlogSidebar";
import BlogSidebar2 from "@/components/elements/BlogSidebar2";
import Layout from "@/components/layout/Layout";
import Link from "next/link";
import { useRouter } from "next/router"
import { useEffect, useState } from 'react'
import {createClient} from 'contentful';
import ReactPaginate from 'react-paginate';
export default function Business() {

  const router = useRouter()
//   const { hello } = router.query;
    // console.log(hello)
    const [pageSize, setpageSize] = useState(6)
    const [currentPage, setcurrentPage] = useState(1);
    const [Data, SetData] = useState([])
    const [numberofpage, setnumberofpage] = useState(1)
    const [orignalarr, setorignalarr] = useState([])
  const client =  createClient({
    space:'t0pszie0jiqu',
    accessToken:'bm2qgxL1ruXxTPkEQT0KgtAuHOwVxlOzOuj-AoNo-AM',
  });

  useEffect(()=>{
   //const fetchStories = async()=>{
    //   let story = await client.getEntries({content_type:"currentstories",select:'fields', })

    //   const newData = await Promise.all(
    //     story?.items.map(async (item) => {
    //       let timez = new Date(item.fields.storyId.sys.createdAt)
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
    //         id:item.sys.id,
    //         timez:formattedDate
    //        };
    //      })
    //    );
      
    //     let filterdata = newData.filter((item)=>item.category.toLowerCase() == hello.toLowerCase())
  
    //     let page = Math.ceil(filterdata.length / 6);
    //     const indexofLastPost =  currentPage * pageSize;
    //     const indexofFirstPost = indexofLastPost - pageSize;
    //     let ansdata = filterdata?.slice(indexofFirstPost, indexofLastPost);
    //     SetData(ansdata)
    //     setnumberofpage(page)
    // }

    // fetchStories()

  },[])

  
  const handleNext =(ans)=>{
    let number = ans.selected + 1;  
    const indexofLastPost =  number * pageSize;
    const indexofFirstPost = indexofLastPost - pageSize;
    let ansdata = orignalarr.slice(indexofFirstPost, indexofLastPost);
    console.log(ansdata)
    SetData(ansdata)
  }
  const [search, setsearch] = useState('')
  const handleSearch =(e)=>{
    e.preventDefault();
    console.log(e.target) 
       
  }
console.log(search)

  return (
  
    <>
      {/* <Layout handleSearch={handleSearch} search={search} setsearch={setsearch} >
     
      </Layout> */}

    </>
  );
}
