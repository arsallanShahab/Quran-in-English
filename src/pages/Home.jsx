import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center text-[8em] font-sora font-bold">
      <span className='cursor-default duration-300'>Quran</span> 
      <span className="text-gray-500 font-normal text-xl mt-[-2.20em] ml-[7.5em] text-center" >with English translation</span>
      <span className="font-poppins text-5xl mt-[.3em] px-[30px] py-[15px] rounded-full hover:bg-gray-100 focus:scale-90 active:scale-90 duration-300 cursor-pointer" onClick={()=>navigate("/surahs")} > {">"} </span>
    </div>
  )
}

export default Home