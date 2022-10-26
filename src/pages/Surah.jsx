import axios from 'axios';
import { list } from 'postcss';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link, useParams } from 'react-router-dom';
import { primary200, primary50, primary800, primary900 } from '../components/colors';

const Surah = () => {

    const [num,setNum] = useState(null);
    const {surah,id} = useParams();
    const surahName = surah.slice(6,surah.length);

    const fetchSurah = async (id,num=1)=>{
       const surah = await axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en&words=true&word_fields=text_indopak&translation_fields=20&page=${num}&per_page=10`).then((res)=>res.data);
       return surah;
    }

    const { isLoading,isError,data,error } = useQuery(["surahs",{num}],()=>fetchSurah(id,num));

    console.log(data)
    if (isLoading) {
        return <div className="flex items-center justify-center h-screen w-screen text-7xl text-center font-semibold"><h2>Loading...</h2></div>;
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
        <div className=''>
            <Link to={"/surahs"} className='inline-block align-middle text-5xl font-sora font-bold pt-16 pb-8 px-16 capitalize'><span className='font-poppins font-semibold'>{"<"}</span> {surahName}</Link>
        </div>
        <div>
            { surahName == "al-fatihah" ? "" : <h3 className='text-center text-3xl font-arabic-text px-8 pr-20 pt-8 pb-3'><span>بِسۡمِ</span> <span>اللهِ</span> <span>الرَّحۡمٰنِ</span> <span>الرَّحِيۡمِ</span></h3> }
            <ul className='px-8 lg:px-20 py-12 flex flex-col flex-wrap gap-y-8' key="ul">
                {data.verses && (
                    data.verses.map((item,index)=>{
                        const words = item.words;
                        return (
                            <div key={index} className="relative flex flex-col w-full px-8 lg:px-10 py-16 rounded-2xl" style={{backgroundColor:primary50}}>
                                <div className="details">
                                    <span className=' absolute top-6 left-6 drop-shadow-sm shadow-current rounded-lg inline-block px-4 py-3 bg-white' style={{color:primary800}}> verse <span className='font-semibold'> {item.verse_key}</span> </span>
                                </div>
                                <div className='py-4 text-right ml-auto'>
                                    <li key={index} className="flex flex-row-reverse flex-wrap max-w-3xl gap-y-6">
                                    {words.map((words,i)=>{
                                    return <span key={i} className='inline-block font-arabic-text text-3xl ml-1' style={{color:primary900}} >{words.text_indopak}</span>
                                    })}
                                    </li>
                                    <li key={index*"shxjhwgdwh"} className="flex flex-row flex-wrap justify-end max-w-3xl pt-6">
                                    {words.map((words,i)=>{
                                    return <span key={i} className='inline-block font-semibold text-xs ml-1' style={{color:primary900}} >{words.transliteration.text}</span>
                                    })}
                                    </li>
                                </div>
                                <div className='py-4 flex flex-wrap justify-start text-left max-w-3xl'>
                                    <li key={index}>
                                    {words.map((words,i)=>{
                                    return <span key={i} className='inline-block font-semibold text-sm ml-1' style={{color:primary900}}>{words.translation.text}</span>
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
            <Link onClick={prevPage} className='py-10 px-8 font-semibold basis-6/12 text-right' style={{color:primary800,opacity: (data.pagination.current_page - 1) == 0 ? 0.4 : 1 ,pointerEvents: (data.pagination.current_page - 1) == 0 ? "none": ""}}> {(data.pagination.current_page - 1)== 0 ? "no previous page": `< Previous page ${data.pagination.current_page - 1}`}</Link>
            <Link onClick={nextPage} className='py-10 px-8 font-semibold basis-6/12 text-left' style={{color:primary800,opacity: data.pagination.next_page == null ? 0.4 : 1,pointerEvents: data.pagination.next_page == null? "none": ""}}>{data.pagination.next_page == null ? "no next page": `Next page ${data.pagination.next_page} >`}</Link>
        </div>: null}
    </div>
  )
}

export default Surah