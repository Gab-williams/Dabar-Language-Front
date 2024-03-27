import type { DefaultSeoProps } from "next-seo";
import img from "./public/assets/img/logo/logo.png";
const config:DefaultSeoProps = {
    title:"The Dabar",
    description:"Dabar Media | Insightful narratives on the crossroads of industries, from tech innovation to the intricacies of corporate culture. Join us for a deep dive into the world of business dynamics and cultural discourse.",
    canonical:"https://thedabar.com",
     additionalLinkTags:[{
        rel:'icon',
        href:img 
     }],
    openGraph:{
        type:'website',
        locale:'en_us',
        url:'https://thedabar.com',
        title:'The Dabar',
        siteName:'The Dabar',
        description:"Dabar Media | Insightful narratives on the crossroads of industries, from tech innovation to the intricacies of corporate culture. Join us for a deep dive into the world of business dynamics and cultural discourse.",
        images:[
            {
                url:img,
                alt:'The Dabar',
                type:'The Dabar',
                secureUrl:img,
            }
        ]
    },
    twitter:{
        handle:'@Dabarnetwork',
        site:'@Dabarnetwork',
        cardType:'@Dabarnetwork'
    }
}