import React, { useState, useEffect } from 'react';
import {getAllEvents} from '../api';
import {findWeekDates, findMonth, handleDrop} from '../utils';
import {CalendarWeekView, CalendarMonthView, CreateEventForm, ViteReact, UpdateTimeForm} from './index';
import './App.css';

const Home = () => {
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);
    const [showCalendarWeekView, setShowCalendarWeekView] = useState(true);
    const [showCalendarMonthView, setShowCalendarMonthView] = useState(false);
    const [showUpdateTime, setShowUpdateTime] = useState(false);
    
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
    
    return (
        <div className="App">
        <p id="date">{currentDateTime.toLocaleDateString()}</p>
        <p id="clock">{currentDateTime.toLocaleTimeString()}</p>
        <button id="addItemButton" onClick={() => setShowCreateEventForm(true)}>Add Item</button>
        <button id="calendarView" onClick={() => {
          setShowCalendarWeekView(!showCalendarWeekView);
          setShowCalendarMonthView(!showCalendarMonthView);
        }}>calendar view</button>
  
        {showCalendarWeekView &&
          <div className="calendar calendarWeekView">
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
          <div className="calendar calendarMonthView">
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
        
        <ViteReact />

      </div>
    );
}

export default Home;