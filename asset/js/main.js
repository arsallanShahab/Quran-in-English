const startButton = document.querySelector(".btn-learning");
const homeSection = document.getElementById("wrapperOne");
const listSection = document.getElementById("wrapperTwo");
const listContainer = document.querySelector(".listContainer");
const loader = document.querySelector(".loader");
const homeBtn = document.querySelector(".home-link");

startButton.addEventListener("click", () => {
    listSection.classList.add("active");

    axios.get("https://api.quran.com/api/v4/chapters?language=en")
        .then(Response => {
            let data = Response.data.chapters;
            let flexCon = document.createElement("div");
                flexCon.setAttribute("class","flex-container");
                listContainer.append(flexCon);
            for (let i = 0; i < data.length; i++) {
                
                let flexItem = document.createElement("div");
                flexItem.setAttribute("class", "flex-item");
                flexItem.setAttribute("id", `${data[i].id}`)
                flexCon.append(flexItem);

                let surahNameInArabic = document.createElement("p");
                surahNameInArabic.setAttribute("class", "surahNameInArabic");
                surahNameInArabic.textContent = `${data[i].name_arabic}`;
                flexItem.append(surahNameInArabic);

                let surahNameInEnglish = document.createElement("p");
                surahNameInEnglish.setAttribute("class", "surahNameInEnglish");
                // surahNameInEnglish.textContent = `${i + 1}. ${data[i].name_simple}`;
                surahNameInEnglish.textContent = `${data[i].name_simple}`;
                flexItem.append(surahNameInEnglish);


                let meaning = document.createElement("p");
                meaning.setAttribute("class", "meaning");
                meaning.textContent = `${data[i].translated_name.name.toUpperCase()}`;
                flexItem.append(meaning);
            }


        })
        .then(res => {
            const flexItemsList = document.querySelectorAll(".flex-item");

            // const arr;

            // while(res.status =)
            flexItemsList.forEach(e => {
                e.addEventListener("click", () => {
                    loader.classList.add("active");
                    let id = e.getAttribute("id");
                    let surahNameInEnglish = e.children[2].textContent;
                    let surahNameInArabic = e.children[1].textContent;
                    axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en&words=true&per_page=25`)
                        .then(response => {
                            let data = response.data.verses;
                            let dataPagination = response.data.pagination;
                            let backgroundWrapper = document.createElement("div");
                            backgroundWrapper.setAttribute("class", "backgroundWrapper");
                            document.body.append(backgroundWrapper);

                            let wrapper = document.createElement("div");
                            wrapper.setAttribute("class", "wrapper ");
                            backgroundWrapper.append(wrapper);

                            let closeButton = document.createElement("div");
                            closeButton.setAttribute("class", "close-button");
                            closeButton.textContent = "X";
                            wrapper.append(closeButton)

                            //close-function

                            closeButton.addEventListener('click', () => {
                                wrapper.classList.add("slide-bottom");
                                setTimeout(() => {
                                    backgroundWrapper.remove()
                                }, 450)
                            })

                            loader.classList.remove("active")

                            //!--close-function

                            let haedingContainer = document.createElement("div");
                            haedingContainer.setAttribute("class", "heading-container");
                            wrapper.append(haedingContainer);

                            let headingEnglish = document.createElement("p");
                            headingEnglish.setAttribute("class","wrapper-english");
                            headingEnglish.textContent = `${id}. Surah ${surahNameInEnglish}`;         
                            haedingContainer.append(headingEnglish);
                            let headingArabic = document.createElement("p");
                            headingArabic.setAttribute("class","wrapper-arabic");
                            headingArabic.textContent = `${surahNameInArabic}`;
                            haedingContainer.append(headingArabic);


                            ///fully-dynamic-////////////////////////////////////////////////////////////

                            let totalPages = dataPagination.total_pages;
                            let totalRecords = dataPagination.total_records;
                            let currentPage = dataPagination.current_page;
                            let nextPage = dataPagination.next_page;

                            if (currentPage == 1 && totalPages == 1) {
                                let list = document.createElement("div");
                                list.setAttribute("class", "list");
                                wrapper.append(list);

                                for (let i = 0; i < data.length; i++) {
                                    let text = " ";
                                    let wordsArray = data[i].words;
                                    for (let j = 0; j < wordsArray.length; j++) {
                                        text += ` ${data[i].words[j].translation.text}`;
                                        if (wordsArray.length == (j + 1)) {
                                            let ayahSentence = text;
                                            let digit = ayahSentence.match(/(\d+)/)[0];
                                            let changeAyah = ayahSentence.replace(/Ayah (\d+)/gi, `[(${digit})]`)

                                            let li = document.createElement("li");
                                            li.setAttribute("class", "listItem");
                                            li.textContent = `${changeAyah}`;
                                            list.append(li);
                                        }
                                    }
                                }

                            } else {

                                let listContainer = document.createElement("div");
                                listContainer.setAttribute("class", "list-container");
                                wrapper.append(listContainer);

                                let list = document.createElement("div");
                                list.setAttribute("class", "list");
                                listContainer.append(list);

                                for (let i = 0; i < data.length; i++) {
                                    let text = " ";
                                    let wordsArray = data[i].words;
                                    for (let j = 0; j < wordsArray.length; j++) {
                                        text += ` ${data[i].words[j].translation.text}`;
                                        if (wordsArray.length == (j + 1)) {
                                            let ayahSentence = text;
                                            let digit = ayahSentence.match(/(\d+)/)[0];
                                            let changeAyah = ayahSentence.replace(/Ayah (\d+)/gi, `[(${digit})]`)

                                            let li = document.createElement("li");
                                            li.setAttribute("class", "listItem");
                                            li.textContent = `${changeAyah}`;
                                            list.append(li);
                                        }
                                    }
                                }

                                let previousBtn;
                                let one = 1;

                                if (currentPage != 1) {
                                    previousBtn = one - 1;
                                } else {
                                    previousBtn = `0`;
                                }

                                let paginationContainer = document.createElement("div");
                                paginationContainer.setAttribute("class", "pagination-container");
                                wrapper.append(paginationContainer);

                                let pagination = `
                                    <button class="pagination-btn previous-btn" disabled="true">Start</button>
                                    <button class="pagination-btn next-btn">Page ${nextPage} ></button>
                                `;
                                paginationContainer.innerHTML = pagination;
                                let nextBtn = document.querySelector(".next-btn");
                                let prevBtn = document.querySelector(".previous-btn");


                                prevBtn.addEventListener("click", (e) => {
                                    loader.classList.add("active");
                                    let previousStringText = prevBtn.textContent;
                                    let prviousMatch = previousStringText.match(/(\d+)/);
                                    let previousNo = parseInt(prviousMatch[0]);
                                    previousNo -= 1;
                                    // let nextStringText = nextBtn.textContent;

                                    if ((previousNo + 2) == totalPages) {
                                        let nextS = prevBtn.textContent;
                                        let nextM = nextS.match(/(\d+)/);
                                        let nextN = parseInt(nextM[0]);
                                        if (nextN + 1 == totalPages) {
                                            nextBtn.textContent = "End";
                                        }

                                    }

                                    let nextNo = previousNo + 2;
                                    nextBtn.removeAttribute("disabled", "true");
                                    if (nextNo) {
                                        nextBtn.textContent = `Page ${nextNo} >`
                                    }


                                    if (previousStringText == "Start") {
                                        prevBtn.setAttribute("disabled", "true")
                                    } else if ((previousNo + 1) == 1) {
                                        prevBtn.textContent = `< Page 1`
                                    }
                                    if (previousNo != 0) {
                                        prevBtn.textContent = `< page ${previousNo}`
                                    } else if (previousNo == 0) {
                                        prevBtn.setAttribute("disabled", "true");
                                        prevBtn.textContent = `Start`
                                    };
                                    //  else {
                                    //     nextBtn.textContent = `Page ${previousNo + 2}>`;
                                    //     nextBtn.removeAttribute("disabled", "true");
                                    // }


                                    let list = document.querySelector(".list");
                                    list.remove();

                                    axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en&words=true&page=${previousNo + 1}&per_page=25`)
                                        .then(previousResponse => {

                                            let previousData = previousResponse.data.verses;
                                            let previousList = document.createElement("div");
                                            previousList.setAttribute("class", "list");
                                            listContainer.append(previousList);

                                            for (let i = 0; i < previousData.length; i++) {
                                                let text = " ";
                                                let previousArray = previousData[i].words;
                                                for (let j = 0; j < previousArray.length; j++) {
                                                    text += ` ${previousData[i].words[j].translation.text}`;
                                                    if (previousArray.length == (j + 1)) {
                                                        let ayahSentence = text;
                                                        let digit = ayahSentence.match(/(\d+)/)[0];
                                                        let changeAyah = ayahSentence.replace(/Ayah (\d+)/gi, `[(${digit})]`)

                                                        let li = document.createElement("li");
                                                        li.setAttribute("class", "listItem");
                                                        li.textContent = `${changeAyah}`;
                                                        previousList.append(li);
                                                    }
                                                }
                                            }
                                            loader.classList.remove("active")
                                        });

                                })

                                nextBtn.addEventListener("click", () => {
                                    loader.classList.add("active");
                                    let nextStringText = nextBtn.textContent;
                                    let nextMatch = nextStringText.match(/(\d+)/);
                                    let nextNoApi = parseInt(nextMatch[0]);
                                    let list = document.querySelector(".list");
                                    list.remove();
                                    prevBtn.removeAttribute("disabled", "true");

                                    nextNoApi += 1;

                                    if (nextNoApi - 1 == totalPages) {
                                        nextBtn.textContent = "End";
                                        nextBtn.setAttribute("disabled", "true");
                                        prevBtn.textContent = `< page ${nextNoApi - 2}`
                                    } else if (nextNoApi == null) {
                                        nextBtn.textContent = "End";
                                        nextBtn.setAttribute("disabled", "true");
                                        prevBtn.textContent = `< page ${nextNoApi - 2}`
                                    }

                                    if (nextNoApi - 1 != totalPages) {
                                        nextBtn.textContent = `Page ${nextNoApi } >`;
                                        prevBtn.textContent = `< page ${nextNoApi - 2}`

                                    }



                                    axios.get(`https://api.quran.com/api/v4/verses/by_chapter/${id}?language=en&words=true&page=${nextNoApi - 1}&per_page=25`)
                                        .then(anotherResponse => {

                                            let anotherData = anotherResponse.data.verses;
                                            let anotherList = document.createElement("div");
                                            anotherList.setAttribute("class", "list");
                                            listContainer.append(anotherList);

                                            for (let i = 0; i < anotherData.length; i++) {
                                                let text = " ";
                                                let wordsArray = anotherData[i].words;
                                                for (let j = 0; j < wordsArray.length; j++) {
                                                    text += ` ${anotherData[i].words[j].translation.text}`;
                                                    if (wordsArray.length == (j + 1)) {
                                                        let ayahSentence = text;
                                                        let digit = ayahSentence.match(/(\d+)/)[0];
                                                        let changeAyah = ayahSentence.replace(/Ayah (\d+)/gi, `[(${digit})]`)

                                                        let li = document.createElement("li");
                                                        li.setAttribute("class", "listItem");
                                                        li.textContent = `${changeAyah}`;
                                                        anotherList.append(li);
                                                    }
                                                }
                                            }
                                            loader.classList.remove("active")
                                        });
                                });



                            }
                        })

                })
            })
        })
})

homeBtn.addEventListener("click", () => {
    listSection.classList.remove("active");
    let flexContainer = document.querySelector(".flex-container");
    flexContainer.remove()
})