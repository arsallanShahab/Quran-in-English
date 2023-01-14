import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  default200,
  default50,
  default800,
  default900,
  primary200,
  primary800,
  primary900,
} from "../components/colors";

const fetchSurahs = async () => {
  const listOfSurahs = axios
    .get("https://api.quran.com/api/v4/chapters?language=en")
    .then((res) => res.data);
  return listOfSurahs;
};

const Surahs = () => {
  const { isLoading, isError, data, error } = useQuery("surahs", fetchSurahs);
  const theme = document.body.dataset.theme;
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen text-xl text-center font-semibold">
        <div className="box">
          <div className="loader-03"></div>
        </div>
      </div>
    );
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  const { chapters } = data;
  // console.log(chapters)

  return (
    <div style={{ backgroundColor: default50 }} className="pb-20">
      <div className="header py-5 lg:py-6 lg:px-6">
        <Link
          to={"/"}
          className="back-btn text-xl text-gray-600 inline-block font-sora font-bold px-4 py-4 pt-8 rounded-md duration-200"
          style={{ color: theme == "default" ? default900 : primary900 }}
        >
          <span className="font-poppins font-semibold">{"<"}</span>Back
        </Link>
        <h1
          className="font-sora font-bold pt-8 lg:pt-16 pb-5 text-4xl lg:text-7xl text-center"
          style={{ color: theme == "default" ? default800 : primary800 }}
        >
          Al Qur'an
        </h1>
      </div>
      <ul className="m-0 px-8 lg:px-[4.5em] py-4 lg:py-8 flex gap-x-12 text- gap-y-8 flex-wrap justify-center items-start w-full">
        {chapters
          ? chapters.map((item, index) => {
              return (
                <li
                  className="group list-none text-center flex-grow basis-[300px]"
                  key={index}
                >
                  {/*
            <Link to={`${item.id}/surah-${item.name_simple.toLowerCase()}`}
              style={{borderColor: theme == "default" ? default200 : primary200}} className={`relative bg-white flex
              flex-row gap-3 items-center justify-start p-3 lg:p-4 rounded-2xl border-[1px] group-hover:-translate-y-2
              group-hover:shadow-lg shadow-current duration-200`}> */}
                  <Link
                    to={`surah?number=${
                      item.id
                    }&name=surah-${item.name_simple.toLowerCase()}&page-number=1`}
                    style={{
                      borderColor: theme == "default" ? default200 : primary200,
                    }}
                    className={`relative bg-white flex
              flex-row gap-3 items-center justify-start p-3 lg:p-4 rounded-2xl border-[1px] 
              group-hover:shadow-lg group-active:scale-90 shadow-current duration-200 origin-center`}
                  >
                    <span
                      style={{
                        backgroundColor:
                          theme == "default" ? default200 : primary200,
                        color: theme == "default" ? default800 : primary800,
                      }}
                      className={`py-3 px-5 lg:py-4 lg:px-6 rounded-xl text-base lg:text-xl font-bold duration-200`}
                    >
                      {item.id}
                    </span>
                    <div className="flex flex-col justify-center-center text-left z-10">
                      <span
                        className={`text-sm font-semibold font-sora group-hover:text-800
                duration-200`}
                      >
                        {item.name_simple}
                      </span>
                      <span className="text-xs font-poppins w-[92px]">
                        {item.translated_name.name}
                      </span>
                    </div>
                    <span
                      style={{
                        backgroundColor:
                          theme == "default" ? default800 : primary800,
                      }}
                      className={`absolute
              right-[-1em] py-3 px-4 lg:py-4 lg:px-6 group-hover:px-6 lg:group-hover:px-8 text-white ml-auto font-bold
              rounded-xl text-sm lg:text-base font-arabic z-0 duration-100 origin-center`}
                    >
                      {item.name_arabic}{" "}
                    </span>
                  </Link>
                </li>
              );
            })
          : null}
      </ul>
    </div>
  );
};

export default Surahs;
