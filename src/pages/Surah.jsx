import axios from 'axios';
import { list } from 'postcss';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { default100, default50, default800, default900, primary100, primary50, primary800, primary900 } from '../components/colors';

const Surah = () => {

    const [num,setNum] = useState(null);
    const {surah,id} = useParams();
    const surahName = surah.slice(6,surah.length);
    const theme = document.body.dataset.theme;

    const fetchSurah = async (id,num=1)=>{
       const surah = await axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en&words=true&word_fields=text_indopak&translation_fields=20&page=${num}&per_page=10`).then((res)=>res.data);
       return surah;
    }

    const { isLoading,isError,data,error } = useQuery(["surahs",num],()=>fetchSurah(id,num));

    console.log(data)
    if (isLoading) {
        return (<div className="flex items-center justify-center h-screen w-screen text-xl text-center font-semibold">
                    <div className="box">
                      <div className="loader-03"></div>
                    </div>
                </div>)
      }
    if (isError) {
    return <span>Error: {error.message}</span>;
    }

    const nextPage = ()=>{
        setNum(data.pagination.next_page) 
    }
    const prevPage = ()=>{
        setNum((data.pagination.current_page - 1))
    }

  return (
    <div>
        <div className='py-5 lg:py-10'>
            <Link to={"/surahs"} className='inline-block align-middle text-xl lg:text-5xl font-sora font-bold py-3 px-8 lg:py-6 lg:px-16 capitalize hover:scale-95 hover:-translate-x-3 lg:hover:-translate-x-6 duration-200' style={{color:theme == "default" ? default900 : primary900}}><span className='font-poppins font-semibold'>{"<"}</span> Surah {surahName}</Link>
        </div>
        <div  className="py-5 lg:py-10">
            { (surahName == "al-fatihah") || (data.pagination.current_page !== 1) || (surahName == "at-tawbah") ? "" : <h3 className='text-center text-xl lg:text-3xl font-arabic-text px-3  lg:pt-8 lg:pb-3' style={{color:theme == "default" ? default900 : primary900}}><span>بِسۡمِ</span> <span>اللهِ</span> <span>الرَّحۡمٰنِ</span> <span>الرَّحِيۡمِ</span></h3> }
            <ul className='px-5 lg:px-20 py-12 flex flex-col flex-wrap gap-y-16' key="ul">
                {data.verses && (
                    data.verses.map((item,index)=>{
                        const words = item.words;
                        return (
                            <div key={index} className="border relative flex flex-col w-full px-3 lg:px-10 py-8 lg:py-16 rounded-2xl bg-white" 
                            style={{backgroundColor:theme == "default" ? default50 : primary50}}
                            >
                                <div className="absolute top-[-1.5em] left-6 details">
                                    <span className='border rounded-xl inline-block text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-3 bg-white' style={{color:theme == "default" ? default800 : primary800}}> verse <span className='font-semibold'> {item.verse_key}</span> </span>
                                    {/* <span className='border rounded-xl inline-block px-4 py-3 bg-white ml-3' style={{color:default800}}> Chapter no: <span className='font-semibold'> {item.juz_number}</span> </span> */}
                                </div>
                                <div className='py-3 lg:py-4 text-right ml-auto'>
                                    <li key={index} className="flex flex-row-reverse flex-wrap lg:max-w-3xl gap-y-6">
                                    {words.map((words,i)=>{
                                    return <span key={i} className='inline-block font-arabic-text text-2xl lg:text-3xl ml-1' style={{color:theme == "default" ? default900 : primary900}} >{words.text_indopak}</span>
                                    })}
                                    </li>
                                    <li key={index*"r"} className="flex flex-row flex-wrap justify-end lg:max-w-3xl pt-6">
                                    {words.map((words,i)=>{
                                    return <span key={i} className='inline-block font-semibold text-xs ml-1' style={{color:theme == "default" ? default900 : primary900}} >{words.transliteration.text}</span>
                                    })}
                                    </li>
                                </div>
                                <div className='py-3 pb-0 lg:py-4 flex flex-wrap justify-start text-left lg:max-w-3xl'>
                                    <li key={index}>
                                    {words.map((words,i)=>{
                                    return <span key={i} className='inline-block font-semibold text-xs lg:text-sm ml-1' style={{color:theme == "default" ? default900 : primary900}}>{words.translation.text}</span>
                                    })}
                                 </li>
                                </div>
                            </div>
                        )
                    })
                )}
            </ul>
        </div>
        {data.pagination ? <div className="pagination w-full flex flex-row flex-grow pb-6">
            <Link onClick={prevPage} className='py-10 px-8 font-semibold basis-6/12 text-right' style={{color:theme == "default" ? default800 : primary800,opacity: (data.pagination.current_page - 1) == 0 ? 0.4 : 1 ,pointerEvents: (data.pagination.current_page - 1) == 0 ? "none": ""}}> {(data.pagination.current_page - 1)== 0 ? "no previous page": `< Previous page ${data.pagination.current_page - 1}`}</Link>
            <Link onClick={nextPage} className='py-10 px-8 font-semibold basis-6/12 text-left' style={{color:theme == "default" ? default800 : primary800,opacity: data.pagination.next_page == null ? 0.4 : 1,pointerEvents: data.pagination.next_page == null? "none": ""}}>{data.pagination.next_page == null ? "no next page": `Next page ${data.pagination.next_page} >`}</Link>
        </div>: null}
    </div>
  )
}

export default Surah