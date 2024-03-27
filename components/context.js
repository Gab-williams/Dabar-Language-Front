import React,{createContext, useState, useEffect} from 'react'
 const context = createContext();
export default function Provider({children}) {
    let [selectedx, setSelectedx] = useState('')

    useEffect(()=>{
      const countryCode = localStorage.getItem("countrycode");
let parsedCountryCode = {};
try {
  parsedCountryCode = countryCode ? JSON.parse(countryCode) : {};
  if(Object.keys(parsedCountryCode).length > 0){
    setSelectedx(parsedCountryCode.countrycode)
  }else{
    setSelectedx("GB")  
  }
} catch (error) {
  console.error("Error parsing JSON:", error);
}
    },[selectedx])

    
    return (
       <context.Provider value={{ 
        selectedx:selectedx,
        setSelectedx:setSelectedx,
        }}>
         {children}
       </context.Provider>
    )
}

export {Provider, context}