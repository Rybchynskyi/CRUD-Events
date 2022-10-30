// // date to SQL date
// function sqlToJsDate(sqlDate){
//     let sqlDateArr1 = sqlDate.split("-");
//     let sYear = sqlDateArr1[0];
//     let sMonth = (Number(sqlDateArr1[1]) - 1).toString();
//     let sqlDateArr2 = sqlDateArr1[2].split(" ");
//     let sDay = sqlDateArr2[0];
//     let sqlDateArr3 = sqlDateArr2[1].split(":");
//     let sHour = sqlDateArr3[0];
//     let sMinute = sqlDateArr3[1];
//     let sqlDateArr4 = sqlDateArr3[2].split(".");
//     let sSecond = sqlDateArr4[0];
//     let sMillisecond = sqlDateArr4[1];
//     return new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond,sMillisecond);
// }
// // date to SQL date
// function sqlToJsDate(sqlDate){
//     let sqlDateArr1 = sqlDate.split("-");
//     let sYear = sqlDateArr1[0];
//     let sMonth = (Number(sqlDateArr1[1]) - 1).toString();
//     let sqlDateArr2 = sqlDateArr1[2].split(" ");
//     let sDay = sqlDateArr2[0];
//     let sqlDateArr3 = sqlDateArr2[1].split(":");
//     let sHour = sqlDateArr3[0];
//     let sMinute = sqlDateArr3[1];
//     let sqlDateArr4 = sqlDateArr3[2].split(".");
//     let sSecond = sqlDateArr4[0];
//     let sMillisecond = sqlDateArr4[1];
//     return new Date(sYear,sMonth,sDay,sHour,sMinute,sSecond,sMillisecond);
// }

// add 0 in dateformats
function addLeadZero(val) {
    if (+val < 10) return '0' + val;
    return val;
}

// render slider and popup for editing event
let dateCells = document.getElementsByTagName('td');
for (let i=0; i<dateCells.length; i++) {
    dateCells[i].addEventListener('click', e => {
        var clickedDate = e.target.dataset.date;
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"];

        // render full date to popup
        let dateArr = clickedDate.split("-");
        document.getElementById('popupDate').innerText = dateArr[1] + " " + monthNames[dateArr[0]] + " at";
        document.getElementById('eventDate').value = dateArr[0] + "-" + dateArr[1];

        // delete previous list in slider
        let elements = document.getElementById('sliderScroll');
        while (elements.firstChild) {
            elements.removeChild(elements.firstChild);
        }

        // show slider
        document.getElementById("slider").style.display = "block";
        document.getElementById("slider").style.height = "753px";

        // show event-list
        fetch('modules/event_details.php?date=' + clickedDate)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                for (let event in data) {
                    // get date
                    let eventDate = new Date(Date.parse(data[event].date.replace(/-/g, '/')));

                    // get different dates
                    let normalDate = eventDate.getDay() + " " + monthNames[eventDate.getMonth()];
                    let normalHour = addLeadZero(eventDate.getHours());
                    let normalMin = addLeadZero(eventDate.getMinutes());

                    // get date for html datetime format
                    let dateTime = eventDate.getFullYear() + "-"
                        + addLeadZero(eventDate.getMonth()) + "-"
                        + addLeadZero(eventDate.getDay()) + "T"
                        + normalHour + ":"
                        + normalMin;

                    // get event tag
                    if (data[event].category == 1) {
                        eventTag =
                            '<div id="eventTag" class="eventTag red" data-category="'+ data[event].category +'">\n' +
                            'Meeting with an expert\n' +
                            '</div>\n'
                             }
                    else if (data[event].category == 2) {
                        eventTag =
                            '<div id="eventTag" class="eventTag green" data-category="'+ data[event].category +'">\n' +
                            'Question-answer\n' +
                            '</div>\n'
                    }
                    else if (data[event].category == 3) {
                        eventTag =
                            '<div id="eventTag" class="eventTag yellow" data-category="'+ data[event].category +'">\n' +
                            'Conference\n' +
                            '</div>\n'
                    }
                    else if (data[event].category == 4) {
                        eventTag =
                            '<div id="eventTag" class="eventTag blue" data-category="'+ data[event].category +'">\n' +
                            'Webinar\n' +
                            '</div>\n'
                    }

                    // get block for paste to html
                    let newEvent = '<div class="d-flex justify-content-between event">\n' +
                        '                <div id="eventName" class="eventName">\n' +
                                            data[event].name +
                        '                </div>\n' +
                        '                <button class="ms-2 eventEditButton" data-bs-toggle="modal" data-bs-target="#editModal"></button>\n' +
                        '            </div>\n' +
                        '            <div id="eventDescr" class="eventDescr mt-2">\n' +
                                        data[event].descr +
                        '            </div>\n' +
                        '            <div id="eventPlace" class="eventPlace mt-2">\n' +
                                        data[event].place +
                        '            </div>\n' +
                        '            <div class="d-flex justify-content-between  my-2">\n' +
                        '                <div id="eventTime" class="eventTime" data-datetime = "' + dateTime + '">\n' +
                                            normalDate + ", " + normalHour + ":" + normalMin +
                        '                </div>\n' +
                                            eventTag +
                        '            </div>' +
                        '               <hr>'
                    // paste block
                    document.getElementById('sliderScroll').insertAdjacentHTML("afterbegin", newEvent)
                }
                // prepare to edit popup
                let editButton = document.getElementsByClassName("eventEditButton");
                for (let i=0; i<editButton.length; i++) {
                    editButton[i].addEventListener("click", renderEvent);
                    function renderEvent() {
                        let inputs = document.getElementById('editModal').getElementsByTagName('input');
                        let textarea = document.getElementById('editModal').getElementsByTagName('textarea');
                        inputs[0].value = editButton[i].previousSibling.previousSibling.innerText;
                        textarea[0].value = editButton[i].parentNode.nextElementSibling.innerText;
                        inputs[1].value = editButton[i].parentNode.nextElementSibling.nextElementSibling.innerText;
                        inputs[2].value = editButton[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.firstChild.nextElementSibling.dataset.datetime;

                        // get and render category in popup
                        let category = editButton[i].parentNode.nextElementSibling.nextElementSibling.nextElementSibling.lastChild.previousSibling.dataset.category;
                        console.log(category);
                        let categoryArr = document.getElementById('editModal').getElementsByTagName('option');
                        console.log(categoryArr)
                        switch(category) {
                            case '1':
                                categoryArr[0].selected = true;
                                break;
                            case '2':
                                categoryArr[1].selected = true;
                                break;
                            case '3':
                                categoryArr[2].selected = true;
                                break;
                            case '4':
                                categoryArr[3].selected = true;
                                break;
                            default:
                                categoryArr[0].selected = true;
                                break;
                        }
                    }
                }
            });
    })
}

// close slider
document.getElementById("closeEvents").addEventListener("click", closeList)
function closeList(){
    document.getElementById("slider").style.height = "0px";
}

// show event-list
fetch('modules/event_types.php')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        let filter = data;
        document.getElementById('redCategories').addEventListener("click", e => {
            
        });

        console.log(filter)
        // let dateCells = document.getElementsByTagName('td').dataset.date;
        for (let i=0; i<filter.length; i++) {
            let particularTd = document.querySelector('[data-date="'+ filter[i].date +'"]')
                if (filter[i].date == particularTd.dataset.date) {
                    let redDot = '<div class="dot redDot"></div>';
                    let greenDot = '<div class="dot greenDot"></div>';
                    let yellowDot = '<div class="dot yellowDot"></div>';
                    let blueDot = '<div class="dot blueDot"></div>';
                    if (filter[i].category == 1) {
                        particularTd.lastChild.insertAdjacentHTML("beforeend", redDot);
                    }
                    else if (filter[i].category == 2) {
                        particularTd.lastChild.insertAdjacentHTML("beforeend", greenDot);
                    }
                    else if (filter[i].category == 3) {
                        particularTd.lastChild.insertAdjacentHTML("beforeend", yellowDot);
                    }
                    else if (filter[i].category == 4) {
                        particularTd.lastChild.insertAdjacentHTML("beforeend", blueDot);
                    }
                }

            }
    })