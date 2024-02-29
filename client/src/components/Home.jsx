import React, { useState, useEffect } from 'react';
import {getAllEvents} from '../api';
import {findWeekDates, findMonth} from '../utils';
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
            <CalendarWeekView const draggingItem={draggingItem} setDraggingItem={setDraggingItem} currentDateTime={currentDateTime} weekInFocus={weekInFocus} setWeekInFocus={setWeekInFocus} eventItems={eventItems} setEventItems={setEventItems} changeDate={changeDate} setChangeDate={setChangeDate} weekModNext={weekModNext} setWeekModNext={setWeekModNext} weekModPrev={weekModPrev} setWeekModPrev={setWeekModPrev} setShowUpdateTime={setShowUpdateTime} />
          </div>
        }

        {showCalendarMonthView &&
          <div className="calendar calendarMonthView">
            <CalendarMonthView draggingItem={draggingItem} setDraggingItem={setDraggingItem} currentDateTime={currentDateTime} monthInFocus={monthInFocus} setMonthInFocus={setMonthInFocus} eventItems={eventItems} setEventItems={setEventItems} changeDate={changeDate} setChangeDate={setChangeDate} monthModNext={monthModNext} setMonthModNext={setMonthModNext} monthModPrev={monthModPrev} setMonthModPrev={setMonthModPrev} setShowUpdateTime={setShowUpdateTime}/>
          </div>
        }
        
        {showCreateEventForm &&
            <div className="createEventForm">
                <CreateEventForm setShowCreateEventForm={setShowCreateEventForm} changeDate={changeDate} setChangeDate={setChangeDate}/>
            </div>
        }

      {showUpdateTime &&
            <div className="createEventForm">
                <UpdateTimeForm setShowUpdateTime={setShowUpdateTime} changeDate={changeDate} setChangeDate={setChangeDate} draggingItem={draggingItem}/>
            </div>
        }
        
        <ViteReact />

      </div>
    );
}

export default Home;