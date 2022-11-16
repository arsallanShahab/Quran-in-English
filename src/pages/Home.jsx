import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { default400, default50, default900, primary400, primary50, primary900 } from '../components/colors';

const Home = () => {

    const navigate = useNavigate();
    const [theme,setTheme] = useState({theme:"default"});
    const [read,setRead] = useState({});

    useEffect(()=>{
      if(!!localStorage.getItem("last-read")){
        setRead({
          ...JSON.parse(localStorage.getItem("last-read"))
        })
      }
    },[])

    const handleTheme = (e)=>{
      const {handler} = e.target.dataset;
      if(handler == "default"){
        setTheme({theme:"default"});
        document.body.dataset.theme = "default";
        localStorage.setItem("theme_type","default");

      }else if(handler == "monet"){
        setTheme({theme:"monet"})
        document.body.dataset.theme = "monet";
        localStorage.setItem("theme_type","monet");
      }
    }
    useEffect(()=>{
      const {theme_type} = localStorage;
      if(theme_type == undefined){
        localStorage.setItem("theme_type","default");
        document.body.dataset.theme = "default";
      }
      if(theme_type){
        document.body.dataset.theme = theme_type;
        setTheme({theme:theme_type})
      }
    },[])

  return (
    <>
    <div className="relative  h-screen w-full flex flex-col justify-center items-center text-7xl md:text-8xl lg:text-[8em] font-sora font-bold" style={{backgroundColor: theme.theme == "default" ? default50 : primary50}}>
      <span className='cursor-default duration-300' style={{color: theme.theme == "default"  ? default900 : primary900}}>Quran</span> 
      <span className=" font-normal text-xs lg:text-xl mt-[-0.25em] ml-[6.5em] md:ml-[12em] lg:mt-[-.70em] lg:ml-[7.5em] text-center" style={{color:default400}}>with English translation</span>
      <span className="font-poppins text-2xl md:text-4xl font-semibold tracking-[-0.25em] lg:text-5xl mt-[.3em] px-[30px] py-[15px] rounded-full hover:bg-white focus:scale-90 active:scale-90 duration-300 cursor-pointer" style={{color:theme.theme == "default" ? default900 : primary900}} onClick={()=>navigate("/surahs")} > {">>"} </span>
      <div className="absolute top-5 right-5 lg:top-10 lg:right-10">
        <div className="flex items-center justify-center gap-x-3 gapy-y-2 px-3 py-2 lg:px-6 lg:py-3 rounded-full border border-slate-200 bg-white text-xs lg:text-sm font-normal">
          <h4>theme: </h4>
          <span onClick={handleTheme} data-handler="default" className='cursor-pointer inline-block rounded-full text-white px-3 py-1' style={{backgroundColor:default900}}>default</span>
          <span onClick={handleTheme} data-handler="monet" className='cursor-pointer inline-block rounded-full text-white px-3 py-1' style={{backgroundColor:primary900}}>random</span>
        </div>
      </div>
    </div>
    <div className="fixed bottom-10 w-full flex justify-center">
      {!!localStorage.getItem("last-read") ? <Link className='font-semibold' to={`surahs/surah?number=${read.number}&name=${read.name}&page-number=${read.pageNumber}`}>Go the last surah you read {">"}</Link> : null}
    </div>
    </>
  )
}

export default Home