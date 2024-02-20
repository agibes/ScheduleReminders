import React, { useState, useEffect } from 'react';
import {getAllEvents} from '../api';
import {findWeekDates} from '../utils';
import {Calendar, CreateEventForm, ViteReact} from './index';
import './App.css';

const Home = () => {
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);
    const [showCalendar, setShowCalendar] = useState(true);
    const [eventItems, setEventItems] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [changeDate, setChangeDate] = useState(false);
  
    let time = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString();
    let currentDayOfWeek = new Date().getDay();
  
    const [currentTime, setCurrentTime] = useState(time);
    const [currentDate, setCurrentDate] = useState(date);

    useEffect(() => {
      try {
        setWeekDates(findWeekDates(0, currentDayOfWeek));
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
      let time = new Date().toLocaleTimeString();
      let date = new Date().toLocaleDateString();
      setCurrentTime(time);
      setCurrentDate(date);
    }
  
    setInterval(updateTime, 1000);
    
    return (
        <div className="App">
        <p id="date">{currentDate}</p>
        <p id="clock">{currentTime}</p>
        <button id="addItemButton" onClick={() => setShowCreateEventForm(true)}>Add Item</button>
  
        {showCalendar &&
          <div id="calendar">
            <Calendar weekDates={weekDates} setWeekDates={setWeekDates} eventItems={eventItems} setEventItems={setEventItems} changeDate={changeDate} setChangeDate={setChangeDate}/>
          </div>
        }
        
        {showCreateEventForm &&
            <div>
                <CreateEventForm setShowCreateEventForm={setShowCreateEventForm}/>
            </div>
        }
        
        <ViteReact />

      </div>
    );
}

export default Home;