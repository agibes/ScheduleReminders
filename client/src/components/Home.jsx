import React, { useState, useEffect } from 'react';
import {getAllEvents} from '../api';
import {findWeekDates, findMonth, handleDrop, dragElement} from '../utils';
import {CalendarWeekView, CalendarMonthView, CreateEventForm, ViteReact, UpdateTimeForm, Timer} from './index';
import './App.css';

const Home = () => {
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);
    const [showCalendarWeekView, setShowCalendarWeekView] = useState(false);
    const [showCalendarMonthView, setShowCalendarMonthView] = useState(false);
    const [showUpdateTime, setShowUpdateTime] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    
    const [draggingItem, setDraggingItem] = useState([]);
    const [eventItems, setEventItems] = useState([]);
    const [weekInFocus, setWeekInFocus] = useState([]);
    const [monthInFocus, setMonthInFocus] = useState([]);
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

    const [changeDate, setChangeDate] = useState(false);

    const [weekModPrev, setWeekModPrev] = useState(-1);
    const [weekModNext, setWeekModNext] = useState(1);
    const [monthModPrev, setMonthModPrev] = useState(-1);
    const [monthModNext, setMonthModNext] = useState(1);


    useEffect(() => {
      try {
        setMonthInFocus(findMonth(0, currentDateTime));
        setWeekInFocus(findWeekDates(0, currentDateTime));
        const widgets = document.getElementsByClassName("widget");
        for (var i = 0; i < widgets.length; i++) {
          dragElement(widgets.item(i));
       }
      } catch (err) {
        console.error(err);
      }
    }, []);

    useEffect(()=>{
      const fetchEvents = async () => {
        try {
          setEventItems(await getAllEvents());
          // eventItems.forEach(eventItem=>console.log(eventItem));
        } catch (err) {
          console.log(err);
        }
      };
      fetchEvents();
    }, [changeDate]);

    const updateTime = () => {
      setCurrentDateTime(new Date());
    }
  
    setInterval(updateTime, 1000);



    function changeDisplay(e) {      
      if (e.target.id == "week") {
        setShowCalendarWeekView(true);
        setShowCalendarMonthView(false);
        e.target.src = "../public/calendar-none.svg";
        e.target.id = "none";
      } else if (e.target.id == "month") {
        setShowCalendarWeekView(false);
        setShowCalendarMonthView(true);
        e.target.src = "../public/calendar-week.svg";
        e.target.id = "week";
      } else {
        setShowCalendarWeekView(false);
        setShowCalendarMonthView(false);
        e.target.src = "../public/calendar-month.svg";
        e.target.id = "month";
      }
    }
    return (
        <div className="App">
        <p id="date">{currentDateTime.toLocaleDateString()}</p>
        <p id="clock">{currentDateTime.toLocaleTimeString()}</p>

        <button className="menuButton" id="addItemButton" onClick={() => setShowCreateEventForm(true)}>Add Item</button>
        <button className="menuButton" id="calendarButton" onClick={(e) => changeDisplay(e)}>
          <img className="icon" id="month" alt="Calendar Button" src="../public/calendar-month.svg" />
        </button>
        <button className="menuButton" id="timerButton" onClick={()=> setShowTimer(!showTimer)}>
          <img className="icon" id="timer" alt="Timer Button" src="../public/timer.svg" />
        </button>
  
        {showCalendarWeekView &&
          <div id="calendar" className="widget">
  
            <CalendarWeekView 
              changeDate={changeDate} 
              setChangeDate={setChangeDate} 
              currentDateTime={currentDateTime} 
              draggingItem={draggingItem} 
              setDraggingItem={setDraggingItem} 
              eventItems={eventItems} 
              setEventItems={setEventItems} 
              weekInFocus={weekInFocus} 
              setWeekInFocus={setWeekInFocus} 
              weekModNext={weekModNext} 
              setWeekModNext={setWeekModNext} 
              weekModPrev={weekModPrev} 
              setWeekModPrev={setWeekModPrev} 
              setShowUpdateTime={setShowUpdateTime} />
          </div>
        }

        {showCalendarMonthView &&
          <div id="calendar" className="widget">
            <CalendarMonthView 
              changeDate={changeDate} 
              setChangeDate={setChangeDate} 
              currentDateTime={currentDateTime} 
              draggingItem={draggingItem} 
              setDraggingItem={setDraggingItem} 
              eventItems={eventItems} 
              setEventItems={setEventItems} 
              monthInFocus={monthInFocus} 
              setMonthInFocus={setMonthInFocus} 
              monthModNext={monthModNext} 
              setMonthModNext={setMonthModNext} 
              monthModPrev={monthModPrev} 
              setMonthModPrev={setMonthModPrev}
              setShowUpdateTime={setShowUpdateTime} />
          </div>
        }
        
        {showCreateEventForm &&
          <div className="createEventForm">
            <CreateEventForm 
              changeDate={changeDate} 
              setChangeDate={setChangeDate}
              setShowCreateEventForm={setShowCreateEventForm} />
          </div>
        }

      {showUpdateTime &&
        <div className="createEventForm">
          <UpdateTimeForm 
            changeDate={changeDate} 
            setChangeDate={setChangeDate} 
            draggingItem={draggingItem}
            setShowUpdateTime={setShowUpdateTime} />
        </div>
        }

        {showTimer &&
          <div id="timer" className="widget">
            <Timer />
          </div>
        }

      </div>
    );
}

export default Home;