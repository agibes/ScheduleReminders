import React, { useState, useEffect } from 'react';
import {getAllEvents} from '../api';
import {findWeekDates, findMonth} from '../utils';
import {CalendarWeekView, CalendarMonthView, CreateEventForm, ViteReact} from './index';
import './App.css';

const Home = () => {
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);
    const [showCalendarWeekView, setShowCalendarWeekView] = useState(true);
    const [showCalendarMonthView, setShowCalendarMonthView] = useState(false);

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
            <CalendarWeekView currentDateTime={currentDateTime} weekInFocus={weekInFocus} setWeekInFocus={setWeekInFocus} eventItems={eventItems} setEventItems={setEventItems} changeDate={changeDate} setChangeDate={setChangeDate} weekModNext={weekModNext} setWeekModNext={setWeekModNext} weekModPrev={weekModPrev} setWeekModPrev={setWeekModPrev}/>
          </div>
        }

        {showCalendarMonthView &&
          <div className="calendar calendarMonthView">
            <CalendarMonthView currentDateTime={currentDateTime} monthInFocus={monthInFocus} setMonthInFocus={setMonthInFocus} weekInFocus={weekInFocus} eventItems={eventItems} setEventItems={setEventItems} changeDate={changeDate} setChangeDate={setChangeDate} monthModNext={monthModNext} setMonthModNext={setMonthModNext} monthModPrev={monthModPrev} setMonthModPrev={setMonthModPrev}/>
          </div>
        }
        
        {showCreateEventForm &&
            <div className="createEventForm">
                <CreateEventForm setShowCreateEventForm={setShowCreateEventForm} changeDate={changeDate} setChangeDate={setChangeDate}/>
            </div>
        }
        
        <ViteReact />

      </div>
    );
}

export default Home;