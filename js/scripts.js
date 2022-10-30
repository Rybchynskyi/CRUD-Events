fetch('modules/events_json.php')
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then((data) => {
        // make eventList for working with them
        let eventList = data;

        const dateContainers = document.getElementsByClassName('dotsContainer');
        const dateCells = document.getElementsByTagName('td');

        function renderDots() {
            for (let i=0; i<eventList.length; i++) {
                let particularTd = document.querySelector('[data-date="'+ eventList[i].date +'"]')
                let redDot = '<div class="dot redDot"></div>';
                let greenDot = '<div class="dot greenDot"></div>';
                let yellowDot = '<div class="dot yellowDot"></div>';
                let blueDot = '<div class="dot blueDot"></div>';

                function isRenderedDot (dotClass) {
                    let dots = particularTd.children[0].children;
                    let renderedDots = 0;
                    if (dots.length >= 0) {
                        for (let i=0; i<dots.length; i++) {
                            if (dots[i].classList[1] == dotClass) {
                                renderedDots++;
                            }
                        }
                    }
                    return renderedDots;
                }

                if (eventList[i].category == 1) {
                    if (isRenderedDot('redDot') === 0) {
                        particularTd.lastChild.insertAdjacentHTML("afterbegin", redDot);
                    }
                }
                else if (eventList[i].category == 2) {
                    if (isRenderedDot('greenDot') === 0) {
                        particularTd.lastChild.insertAdjacentHTML("afterbegin", greenDot);
                    }
                }
                else if (eventList[i].category == 3) {
                    if (isRenderedDot('yellowDot') === 0) {
                        particularTd.lastChild.insertAdjacentHTML("afterbegin", yellowDot);
                    }
                }
                else if (eventList[i].category == 4) {
                    if (isRenderedDot('blueDot') === 0) {
                        particularTd.lastChild.insertAdjacentHTML("afterbegin", blueDot);
                    }
                }
            }
        }
        renderDots();

        // show categories
        let filterButtons = document.getElementsByClassName('events');
        for (let fb=1; fb < filterButtons.length; fb++) {
            filterButtons[fb].addEventListener("click", e => {
                // make array emty
                eventList = [];

                // make dotsContainer empty
                for (let i = 0; i < dateContainers.length; i++) {
                    dateContainers[i].innerHTML = "";
                }

                // defind button and set colour
                let colour;
                switch (e.target.classList[1]) {
                    case ("red"):
                        colour = 1;
                        break;
                    case ("green"):
                        colour = 2;
                        break;
                    case ("yellow"):
                        colour = 3;
                        break;
                    case ("blue"):
                        colour = 4;
                        break;
                }

                // fill dotsContainer by particular dots
                for (let i = 0; i < data.length; i++) {
                    if (data[i].category == colour) {
                        eventList.push(data[i])
                    }
                }
                renderDots();
            });
        }

        // show all events by pressing button
        filterButtons[0].addEventListener("click", e => {

            // make dotsContainer empty
            for (let i = 0; i < dateContainers.length; i++) {
                dateContainers[i].innerHTML = "";
            }

            eventList = data;
            renderDots();
        })


        // render slider and popup for editing event
        for (let i=0; i<dateCells.length; i++) {
            dateCells[i].addEventListener('click', e => {

                // delete previous list in slider
                let elements = document.getElementById('sliderScroll');
                while (elements.firstChild) {
                    elements.removeChild(elements.firstChild);
                }

                // render full date to popup
                let clickedDate = e.target.dataset.date;
                const monthNames = ["January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"];

                // render date for add popup
                let dateArr = clickedDate.split("-");
                document.getElementById('popupDate').innerText = dateArr[1] + " " + monthNames[dateArr[0]] + " at";
                document.getElementById('eventDate').value = dateArr[0] + "-" + dateArr[1];

                // show slider
                document.getElementById("slider").style.display = "block";
                document.getElementById("slider").style.height = "753px";

                for (let i=0; i<data.length; i++) {
                    if(eventList[i].date == clickedDate) {

                        // add 0 in dateformats
                        function addLeadZero(val) {
                            if (+val < 10) return '0' + val;
                            return val;
                        }

                        // get date, hour and mins for html datetime format
                        let eventDate = new Date(Date.parse(eventList[i].datetime.replace(/-/g, '/')));
                        let normalHour = addLeadZero(eventDate.getHours());
                        let normalMin = addLeadZero(eventDate.getMinutes());
                        let dateTime = eventDate.getFullYear() + "-"
                            + addLeadZero(eventDate.getMonth()) + "-"
                            + addLeadZero(eventDate.getDay()) + "T"
                            + addLeadZero(eventDate.getHours()) + ":"
                            + addLeadZero(eventDate.getMinutes());

                        // get date with month
                        let normalDate = eventDate.getDay() + " " + monthNames[eventDate.getMonth()];

                        // get event tag
                        if (eventList[i].category == 1) {
                            eventTag =
                                '<div id="eventTag" class="eventTag red" data-category="'+ eventList[i].category +'">\n' +
                                'Meeting with an expert\n' +
                                '</div>\n'
                                 }
                        else if (eventList[i].category == 2) {
                            eventTag =
                                '<div id="eventTag" class="eventTag green" data-category="'+ eventList[i].category +'">\n' +
                                'Question-answer\n' +
                                '</div>\n'
                        }
                        else if (eventList[i].category == 3) {
                            eventTag =
                                '<div id="eventTag" class="eventTag yellow" data-category="'+ eventList[i].category +'">\n' +
                                'Conference\n' +
                                '</div>\n'
                        }
                        else if (eventList[i].category == 4) {
                            eventTag =
                                '<div id="eventTag" class="eventTag blue" data-category="'+ eventList[i].category +'">\n' +
                                'Webinar\n' +
                                '</div>\n'
                        }

                        // render block with event for paste to html
                        let newEvent = '<div class="d-flex justify-content-between event">\n' +
                            '                <div id="eventName" class="eventName">\n' +
                                                eventList[i].name +
                            '                </div>\n' +
                            '                <button class="ms-2 eventEditButton" data-event_id="' + eventList[i].id + '" data-bs-toggle="modal" data-bs-target="#editModal"></button>\n' +
                            '            </div>\n' +
                            '            <div id="eventDescr" class="eventDescr mt-2">\n' +
                                            eventList[i].descr +
                            '            </div>\n' +
                            '            <div id="eventPlace" class="eventPlace mt-2">\n' +
                                            eventList[i].place +
                            '            </div>\n' +
                            '            <div class="d-flex justify-content-between  my-2">\n' +
                            '                <div id="eventTime" class="eventTime" data-datetime = "' + dateTime + '">\n' +
                                                normalDate + ", " + normalHour + ":" + normalMin +
                            '                </div>\n' +
                                                eventTag +
                            '            </div>' +
                            '               <hr>'

                        // paste block
                        document.getElementById('sliderScroll').insertAdjacentHTML("afterbegin", newEvent);

                        // prepare to edit popup
                        let editButton = document.getElementsByClassName("eventEditButton");
                        for (let i=0; i<editButton.length; i++) {
                            editButton[i].addEventListener("click", e => {
                                let clickedEvent;
                                for (let i=0; i<eventList.length; i++) {
                                    if (eventList[i].id == e.target.dataset.event_id) {
                                        clickedEvent = eventList[i];
                                    }
                                }

                                let inputs = document.getElementById('editModal').getElementsByTagName('input');
                                let textarea = document.getElementById('editModal').getElementsByTagName('textarea');
                                inputs[0].value = clickedEvent.name;
                                textarea[0].value = clickedEvent.descr;
                                inputs[1].value = clickedEvent.place;
                                inputs[2].value = clickedEvent.datetime;
                                inputs[3].value = clickedEvent.id;

                                // remove beSure block if it exist
                                let bSureClasslist = document.getElementById('beSureBlock').classList;
                                if (!bSureClasslist.contains('d-none')) {
                                    bSureClasslist.add('d-none');
                                }

                                // get and render category in edit popup
                                let categoryArr = document.getElementById('editModal').getElementsByTagName('option');

                                switch(clickedEvent.category) {
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
                            })
                        }
                    }
                }
            })
        }
    })
// close slider
document.getElementById("closeEvents").addEventListener("click", closeList)
function closeList(){
    document.getElementById("slider").style.height = "0px";
}

// make sure about deleting
document.getElementById('deleteButton').addEventListener("click", e=>{
    //show besure block
    document.getElementById('beSureBlock').classList.remove('d-none');
    //add link for delete
    let elementId = document.getElementById('eventId').value;
    document.getElementById('deleteButtonForSure').href = "modules/delete_event.php?id="+elementId;
})

document.getElementById('deleteButtonNoSure').addEventListener("click", l=>{
    document.getElementById('beSureBlock').classList.add('d-none');
})

// add informers
let info = window.location.search.substr(1);
let informer = "<div id=\"informer\" class=\"informer\"></div>"

switch (info) {
    case 'info=deleteSuccess':
        document.body.insertAdjacentHTML("afterbegin", informer);
        document.getElementById("informer").style.background = "#00CC66";
        document.getElementById("informer").innerText = "Deleting was successfully";
    break;

    case 'info=deleteWrong':
        document.body.insertAdjacentHTML("afterbegin", informer);
        document.getElementById("informer").style.background = "#FF4E6B";
        document.getElementById("informer").innerText = "Something goes wrong";
    break;

    case 'info=addSuccess':
        document.body.insertAdjacentHTML("afterbegin", informer);
        document.getElementById("informer").style.background = "#00CC66";
        document.getElementById("informer").innerText = "Creating was successfully";
    break;

    case 'info=addWrong':
        document.body.insertAdjacentHTML("afterbegin", informer);
        document.getElementById("informer").style.background = "#FF4E6B";
        document.getElementById("informer").innerText = "Something goes wrong";
    break;

    case 'info=editSuccess':
        document.body.insertAdjacentHTML("afterbegin", informer);
        document.getElementById("informer").style.background = "#00CC66";
        document.getElementById("informer").innerText = "Editing was successfully";
        break;

    case 'info=editWrong':
        document.body.insertAdjacentHTML("afterbegin", informer);
        document.getElementById("informer").style.background = "#FF4E6B";
        document.getElementById("informer").innerText = "Something goes wrong";
        break;
}





