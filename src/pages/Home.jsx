import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { default400, default50, default900, primary400, primary50, primary800, primary900 } from '../components/colors';

const Home = () => {

    const navigate = useNavigate();
    const [theme,setTheme] = useState({theme:"default"});
    const [read,setRead] = useState({});
    const [active,setActive] = useState(false);

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
    <div
      className="relative  h-screen w-full flex flex-col justify-center items-center text-7xl md:text-8xl lg:text-[8em] font-sora font-bold"
      style={{backgroundColor: theme.theme == "default" ? default50 : primary50}}>
      <span className='cursor-default duration-300'
        style={{color: theme.theme == "default"  ? default900 : primary900}}>Quran</span>
      <span
        className=" font-normal text-xs lg:text-xl mt-[-0.25em] ml-[6.5em] md:ml-[12em] lg:mt-[-.70em] lg:ml-[7.5em] text-center"
        style={{color:default400}}>with English translation</span>
      <span
        className="font-poppins -indent-[8px] text-2xl md:text-4xl font-semibold tracking-[-0.25em] mt-[.3em] px-[30px] py-[15px] rounded-full hover:bg-white focus:scale-75 active:scale-75 duration-300 cursor-pointer"
        style={{color:theme.theme == "default" ? default900 : primary900}} onClick={()=>navigate("/surahs")} > {">>"}
      </span>
      {/* <div className="absolute top-5 right-5 lg:top-10 lg:right-10">
        <div
          className="flex items-center justify-center gap-x-3 gapy-y-2 px-3 py-2 lg:px-6 lg:py-3 rounded-full border border-slate-200 bg-white text-xs lg:text-sm font-normal">
          <h4>theme: </h4>
          <span onClick={handleTheme} data-handler="default"
            className='cursor-pointer inline-block rounded-full text-white px-3 py-1'
            style={{backgroundColor:default900}}>default</span>
          <span onClick={handleTheme} data-handler="monet"
            className='cursor-pointer inline-block rounded-full text-white px-3 py-1'
            style={{backgroundColor:primary900}}>random</span>
        </div>
      </div> */}
    </div>
    <div onClick={()=>setActive((prev)=>!prev)} className={`fixed w-full h-full top-0 bg-gray-900 duration-200 ${active ? "backdrop-active" : "backdrop-hidden"}`}>
    </div>
    <div className="absolute top-5 right-5 lg:top-10 lg:right-10">
        <div className="px-3 py-3 mt-1 text-xs lg:text-sm font-normal bg-white rounded-xl active:scale-75 duration-200 cursor-pointer" onClick={()=>setActive((prev)=>!prev)}>
          <svg width={25} height={25} fill="none"
            stroke={`${theme.theme == "default"? "#000":primary900}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
            <circle cx="12" cy="12" r="3"></circle>
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z">
            </path>
          </svg>
        </div>
      </div>
    <div className={`sidebar fixed top-0 right-0 h-full duration-300 ${active ? "sidebar-active":"sidebar-hidden"}`}>
      <div className='w-[300px] rounded-l-lg px-5 h-full bg-gray-100 top-0 right-0'>
        <h3 className='px-1 py-9 font-semibold text-lg'>Settings</h3>

        <div className='px-5 bg-white border py-6 rounded-xl'>
        <p className='pb-4 text-sm font-semibold text-gray-600'>Theme</p>
        <div className='flex flex-row gap-3 font-semibold text-sm'>
          <div className='basis-1/2 cursor-pointer inline-block border-2 rounded-lg text-center text-white px-3 py-3 duration-200'
            style={{color:theme.theme != "default"?"#000":"#FFF",backgroundColor:theme.theme != "default" ? "#FFF": default900,transform:theme.theme == "default" ? "scale(0.95)": "scale(1)"}} onClick={handleTheme} data-handler="default">{theme.theme == "default"?"active":"Default"}</div>
          <div className='basis-1/2 cursor-pointer inline-block border-2 rounded-lg text-center text-white px-3 py-3 duration-200'
            style={{color:theme.theme != "default"?"#FFF":primary800,backgroundColor:theme.theme != "monet"?"#FFF": primary900,transform:theme.theme == "monet" ? "scale(0.95)": "scale(1)"}} onClick={handleTheme} data-handler="monet">{theme.theme == "monet"?"active":"Random"}</div>
        </div>
        </div>
      </div>
    </div>
    {/* <div className="fixed bottom-10 w-full flex justify-center">
      {!!localStorage.getItem("last-read") ? <Link className='font-semibold underline' to={`surahs/surah?number=${read.number}&name=${read.name}&page-number=${read.pageNumber}`}>Continue where you left {">"}</Link> : null}
    </div> */}
    </>
  )
}

export default Home