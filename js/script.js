'use strict';

//Public Globals
const days = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let c_date = new Date();
let day = c_date.getDay();
let month = c_date.getMonth();
let year = c_date.getFullYear();

const script = "https://script.google.com/macros/s/AKfycbzf8oosFpS2v2Uihyrsn9ycL6k89gu_s2_8C1qZglqCkUffgmMKOESWyFe6Ce_QuiQ1/exec";
let storedEvents;
$(function() {


            fetch(script)
                .then((res) => {
                    return res.json();
                })
                .then((events) => {


                        (function App() {

                                const calendar = `<div class="container">
    <div class="row">
        <div class="col-sm-10 mx-auto text-center mt-5 page-hero">
            <h3>ASG Micro Course</h3>
            <p>Click on a date to view the routine</p>
        </div>
    </div>
        <div class="row">
            <div class="col-sm-6 col-12 d-flex">
                <div class="card border-0 mt-5 flex-fill">
                    <div class="card-header py-3 d-flex justify-content-between">
                        <span class="prevMonth">&#10096;</span>
                        <span><strong id="s_m"></strong></span>
                        <span class="nextMonth">&#10097;</span>
                    </div>
                    <div class="card-body px-1 py-3">
                        <div class="table-responsive">
                            <table class="table table-sm table-borderless">
                                <thead class="days text-center">
                                    <tr>
                                        ${Object.keys(days).map(key => (
                                            `<th><span>${days[key].substring(0,3)}</span></th>`
                                        )).join('')}                                            
                                    </tr>
                                </thead>
                                <tbody id="dates" class="dates text-center"></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-6 col-12 d-flex pa-sm">
                <div class="card border-0 mt-5 flex-fill d-none" id="event">
                    <div class="card-header py-3 text-center">
                        Micro Routine
                        <button type="button" class="close hide">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="card-body px-1 py-3">
                        <div class="text-center">
                            <span class="event-date"></span><br>
                            <span class="event-day"></span>
                        </div> 
                        <div class="events-today my-3 px-3">
                          
                        </div> 
                
                    </div>
                </div>                            
            </div>
        </div>
    </div>
    `;

document.getElementById('app').innerHTML = calendar;   
})()

function renderCalendar(m, y) {
//Month's first weekday
let firstDay = new Date(y, m, 1).getDay();  
//Days in Month
let d_m = new Date(y, m+1, 0).getDate();
//Days in Previous Month
let d_pm = new Date(y, m, 0).getDate();


let table = document.getElementById('dates');
table.innerHTML = '';
let s_m = document.getElementById('s_m');
s_m.innerHTML = months[m] + ' ' + y;
let date = 1;
//remaing dates of last month
let r_pm = (d_pm-firstDay) +1;
for (let i = 0; i < 6; i++) {
    let row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
        if (i === 0 && j < firstDay) {  
            let cell = document.createElement('td');
            let span = document.createElement('span');
            let cellText = document.createTextNode(r_pm);
            span.classList.add('ntMonth');
            span.classList.add('prevMonth');                  
            cell.appendChild(span).appendChild(cellText);
            row.appendChild(cell);
            r_pm++;
        }
        else if (date > d_m && j <7) {
            if (j!==0) {
                let i = 0; 
                for (let k = j; k < 7; k++) {
                     i++                                             
                    let cell = document.createElement('td');
                    let span = document.createElement('span');
                    let cellText = document.createTextNode(i);
                    span.classList.add('ntMonth');                    
                    span.classList.add('nextMonth');                    
                    cell.appendChild(span).appendChild(cellText);
                    row.appendChild(cell);          
                };                  
            }                
           break;
        }
        else {
            let cell = document.createElement('td');
            let span = document.createElement('span');
            let cellText = document.createTextNode(date);
            span.classList.add('showEvent');
            if (date === c_date.getDate() && y === c_date.getFullYear() && m === c_date.getMonth()) {
                span.classList.add('bg-primary');
            } 
            cell.appendChild(span).appendChild(cellText);
            row.appendChild(cell);
            date++;
        }
    }
    table.appendChild(row);
}
}
renderCalendar(month, year)

    storedEvents = events;

    function showEvent(classDate){

        if (storedEvents == null){
            $('.events-today').html('<h5 class="text-center">No Class Today 😶</h5 class="text-center">');               
        }else{
            let eventsToday = storedEvents.filter(eventsToday => eventsToday.classDate === classDate);
            let eventsList = Object.keys(eventsToday).map(k => eventsToday[k]);
            if(eventsList.length>0){
                let eventsLi ='';
                eventsList.forEach(event =>  {
                    if(event.Status === "Done") {
                        $('.events-today').html(eventsLi +=`<div class="alert alert-secondary fade show" role="alert">
                        Class No . ${event.id} &nbsp;&nbsp;&nbsp; <span style="font-size:18px;color:green"> Status : ${event.Status}</span><br> 
                        <span style="font-size:20px;color:blue">${event.class}</span><br>Time : ${event.classTime}<br>Teacher : ${event.Teacher}<br><a class="btn btn-primary btn-sm" href="${event.link}" target="_blank">Class Link</a>
                      </div>`)
                    }else {
                        $('.events-today').html(eventsLi +=`<div class="alert alert-secondary fade show" role="alert">
                        Class No . ${event.id} &nbsp;&nbsp;&nbsp; <span style="font-size:18px;color:red"> Status : ${event.Status}</span><br> 
                        <span style="font-size:20px;color:blue">${event.class}</span><br>Time : ${event.classTime}<br>Teacher : ${event.Teacher}<br><a class="btn btn-primary btn-sm" href="${event.link}" target="_blank">Class Link</a>
                      </div>`)
                    }
                }
                );
            }else{
                $('.events-today').html('<h5 class="text-center">No Class Today 😶</h5 class="text-center">');
            }               
        }
        
    }
    
    $(document).on('click', '.prevMonth', function(){
    year = (month === 0) ? year - 1 : year;
    month = (month === 0) ? 11 : month - 1;
    renderCalendar(month, year);
    })
    $(document).on('click', '.nextMonth', function(){
    year = (month === 11) ? year + 1 : year;
    month = (month + 1) % 12;
    renderCalendar(month, year);
    })
 
    $(document).on('click', '.showEvent', function(){
    $('.showEvent').removeClass('active');
    $('#event').removeClass('d-none');
    $(this).addClass('active');
    let todaysDate = $(this).text() +' '+ (months[month]) +' '+ year;
    let eventDay = days[new Date(year, month, $(this).text()).getDay()];
    if (month > 9) {
        let classDate =   year + "-" + (month + 1) +"-" + $(this).text();
        $('.event-date').html(todaysDate).data('classDate', classDate);
        $('.event-day').html(eventDay);
        return showEvent(classDate);
    } else {
        let classDate =   year + "-" + 0 + (month + 1) +"-" + $(this).text();
        $('.event-date').html(todaysDate).data('classDate', classDate);
        $('.event-day').html(eventDay);
        return showEvent(classDate);
    }
    })
    $(document).on('click', '.hide', function(){
    $('#event').addClass('d-none');
    })
 
    })
    
.catch((err)=>{
    console.log(err);
})



})