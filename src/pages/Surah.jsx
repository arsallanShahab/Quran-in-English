import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  default100,
  default200,
  default50,
  default800,
  default900,
  primary100,
  primary200,
  primary50,
  primary800,
  primary900,
} from "../components/colors";
import { searchQuery } from "../utils/SearchQueryHook";

const Surah = () => {
  const query = searchQuery();
  const number = query.get("number");
  const name = query.get("name");
  const pageNumber = query.get("page-number");
  const theme = document.body.dataset.theme;

  useEffect(() => {
    localStorage.setItem(
      "last-read",
      JSON.stringify({ name, number, pageNumber })
    );
  }, [number, name, pageNumber]);

  const fetchSurah = async (number, pageNumber) => {
    const surah = await axios
      .get(
        `https://api.quran.com/api/v4/verses/by_chapter/${number}?language=en&words=true&word_fields=text_indopak&translation_fields=20&page=${pageNumber}&per_page=10`
      )
      .then((res) => res.data);
    return surah;
  };

  const { isLoading, isError, data, error } = useQuery(
    ["surahs", pageNumber],
    () => fetchSurah(number, pageNumber),
    { refetchOnWindowFocus: false }
  );

  // console.log(data)
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

  // const nextPage = () => {
  //     if (data.pagination.next == null) {
  //         return data.pagination.current_page;
  //     } else {
  //         return (data.pagination.next)
  //     }
  // }
  // const prevPage = () => {
  //     // setNum((data.pagination.current_page - 1))
  //     if (data.pagination.current_page - 1 == 0) {
  //         return 1;
  //     } else {
  //         return (data.pagination.current_page - 1)
  //     }
  // }

  return (
    <div>
      <div className="py-5 lg:py-10">
        <Link
          to={"/surahs"}
          className="inline-block align-middle text-xl lg:text-5xl font-sora font-bold py-4 px-4 lg:py-6 lg:px-16 capitalize hover:scale-95 hover:-translate-x-3 lg:hover:-translate-x-6 duration-200"
          style={{ color: theme == "default" ? default900 : primary900 }}
        >
          <span className="font-poppins font-semibold">{"<"}</span>
          {name}
        </Link>
      </div>
      <div
        className="flex flex-row px-3 py-6 sm:pb-0 font-semibold justify-center items-center"
        style={{ borderColor: theme == "default" ? default200 : primary200 }}
      >
        <h3
          style={{
            backgroundColor: theme == "default" ? default100 : primary100,
            color: theme == "default" ? default800 : primary800,
          }}
          className="py-2 px-4 rounded-tl-lg rounded-bl-lg text-sm border border-inherit"
        >
          Total Pages: {data.pagination.total_pages}
        </h3>
        <h3
          style={{
            backgroundColor: theme == "default" ? default100 : primary100,
            color: theme == "default" ? default800 : primary800,
          }}
          className="py-2 px-4 -ml-[1px] rounded-tr-lg rounded-br-lg text-sm border border-inherit"
        >
          Total verses: {data.pagination.total_records}
        </h3>
      </div>
      <div className="py-5 lg:py-10">
        {name == "al-fatihah" ||
        data.pagination.current_page !== 1 ||
        name == "at-tawbah" ? (
          ""
        ) : (
          <h3
            className="text-center text-xl lg:text-3xl font-arabic-text px-3 pb-3 lg:pt-8 lg:pb-3"
            style={{ color: theme == "default" ? default900 : primary900 }}
          >
            <span>بِسۡمِ</span>
            <span>اللهِ</span> <span>الرَّحۡمٰنِ</span> <span>الرَّحِيۡمِ</span>
          </h3>
        )}
        <ul
          className="px-5 lg:px-20 py-12 flex flex-col flex-wrap gap-y-16"
          key="ul"
        >
          {data.verses &&
            data.verses.map((item, index) => {
              const words = item.words;
              return (
                <div
                  key={index}
                  className="border relative flex flex-col w-full px-3 lg:px-10 py-8 lg:py-16 rounded-2xl bg-white"
                  style={{
                    backgroundColor: theme == "default" ? default50 : primary50,
                  }}
                >
                  <div className="absolute top-[-1.5em] left-6 details">
                    <span
                      className="border rounded-xl inline-block text-sm lg:text-base px-3 py-2 lg:px-4 lg:py-3 bg-white"
                      style={{
                        color: theme == "default" ? default800 : primary800,
                      }}
                    >
                      {" "}
                      verse{" "}
                      <span className="font-semibold">
                        {" "}
                        {item.verse_key}
                      </span>{" "}
                    </span>
                    {/* <span className='border rounded-xl inline-block px-4 py-3 bg-white ml-3'
                            style={{color:default800}}> Chapter no: <span className='font-semibold'>
                                {item.juz_number}</span> </span> */}
                  </div>
                  <div className="py-3 lg:py-4 text-right ml-auto">
                    <li
                      key={index}
                      className="flex flex-row-reverse flex-wrap lg:max-w-3xl gap-y-6"
                    >
                      {words.map((words, i) => {
                        return (
                          <span
                            key={i}
                            className="inline-block font-arabic-text text-2xl lg:text-3xl ml-1"
                            style={{
                              color:
                                theme == "default" ? default900 : primary900,
                            }}
                          >
                            {words.text_indopak}
                          </span>
                        );
                      })}
                    </li>
                    <li
                      key={index * "r"}
                      className="flex flex-row flex-wrap justify-end lg:max-w-3xl pt-6"
                    >
                      {words.map((words, i) => {
                        return (
                          <span
                            key={i}
                            className="inline-block font-semibold text-xs ml-1"
                            style={{
                              color:
                                theme == "default" ? default900 : primary900,
                            }}
                          >
                            {words.transliteration.text}
                          </span>
                        );
                      })}
                    </li>
                  </div>
                  <div className="py-3 pb-0 lg:py-4 flex flex-wrap justify-start text-left lg:max-w-3xl">
                    <li key={index}>
                      {words.map((words, i) => {
                        return (
                          <span
                            key={i}
                            className="inline-block font-semibold text-xs lg:text-sm ml-1"
                            style={{
                              color:
                                theme == "default" ? default900 : primary900,
                            }}
                          >
                            {words.translation.text}
                          </span>
                        );
                      })}
                    </li>
                  </div>
                </div>
              );
            })}
        </ul>
      </div>
      {data.pagination ? (
        <div
          className="pagination w-full flex flex-row pb-16 justify-center items-center"
          style={{ borderColor: theme == "default" ? default800 : primary800 }}
        >
          <Link
            to={`/surahs/surah?number=${number}&name=${name}&page-number=${
              data.pagination.current_page - 1
            }`}
            className="py-2 px-4 rounded-tl-lg rounded-bl-lg text-lg border border-inherit"
            style={{
              backgroundColor: theme == "default" ? default100 : primary100,
              color: theme == "default" ? default800 : primary800,
              opacity: data.pagination.current_page - 1 == 0 ? 0.5 : 1,
              pointerEvents:
                data.pagination.current_page - 1 == 0 ? "none" : "",
            }}
          >
            {`<`}
          </Link>
          <p
            style={{
              backgroundColor: theme == "default" ? default100 : primary100,
              color: theme == "default" ? default800 : primary800,
            }}
            className="py-2 px-4 text-lg border-t border-b border-inherit"
          >
            {data.pagination.current_page}
          </p>
          <Link
            to={`/surahs/surah?number=${number}&name=${name}&page-number=${data.pagination.next_page}`}
            className="py-2 px-4 rounded-tr-lg rounded-br-lg text-lg border border-inherit"
            style={{
              backgroundColor: theme == "default" ? default100 : primary100,
              color: theme == "default" ? default800 : primary800,
              opacity: data.pagination.next_page == null ? 0.5 : 1,
              pointerEvents: data.pagination.next_page == null ? "none" : "",
            }}
          >
            {`>`}
          </Link>
        </div>
      ) : null}
    </div>
  );
};

export default Surah;
