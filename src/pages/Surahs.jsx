import axios from "axios";
import React from 'react';
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { primary100, primary200, primary300, primary400, primary50, primary500, primary600, primary700, primary800 } from "../components/colors";

const fetchSurahs = async()=>{
  const listOfSurahs = axios.get("https://api.quran.com/api/v4/chapters?language=en").then((res)=>res.data)
  return listOfSurahs;
}



const Surahs = () => {
  const { isLoading,isError,data,error,isSuccess } = useQuery("surahs",fetchSurahs);
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen w-screen text-7xl text-center font-semibold"><h2>Loading...</h2></div>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  const {chapters} = data;
  // console.log(chapters)

  return (
    <div style={{backgroundColor: primary50}} className="pb-20" >
      <div className="header py-6 px-4">
        <Link to={"/"} className="font-semibold" > {"<"} back</Link>
        <h1 className='font-sora font-bold  pt-16 pb-5 text-7xl text-center'>Al Qur'an</h1>
      </div>
      <ul className="m-0 px-[4.5em] py-8 flex gap-x-12 text- gap-y-8 flex-wrap justify-center items-start w-full" >
      {chapters ? chapters.map((item,index)=>{
        return (
          <li className="group list-none text-center flex-grow basis-[300px]" key={index}> 
            <Link to={`${item.id}/surah-${item.name_simple.toLowerCase()}`} style={{borderColor: primary200}} className={`relative flex flex-row gap-3 items-center justify-start  px-4 py-4 rounded-2xl border-[1px] group-hover:-translate-y-2 group-hover:shadow-lg shadow-current duration-200`}>
              <span style={{backgroundColor:primary200,color:primary800}} className={`py-4 px-6 rounded-xl text-xl font-bold duration-200`}>{item.id} </span>
              <div className="flex flex-col justify-center-center text-left z-10">
                <span className={`text-base font-semibold font-sora group-hover:text-800 duration-200`}>{item.name_simple}</span>
                <span className="text-xs font-poppins w-[92px]">{item.translated_name.name}</span>
              </div>
              <span style={{backgroundColor:primary800}} className={`absolute right-[-1em] py-4 px-6 text-white ml-auto font-bold rounded-xl text-base font-arabic z-0`}>{item.name_arabic} </span>
            </Link>
          </li>
        )
      }) : null}
      </ul>
    </div>
  )
}

export default Surahs