import React, { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import {getAllEvents, updateEvent} from '../api';
import {CreateEventForm} from './index';
import './App.css';

const Home = () => {
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);
    const [draggingItem, setDraggingItem] = useState(null);
    const [eventItems, setEventItems] = useState([]);
    const [weekDates, setWeekDates] = useState([]);
    const [goPrev, setGoPrev] = useState(-1);
    const [goNext, setGoNext] = useState(1);
    const [changeDate, setChangeDate] = useState(false);
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
    let time = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString();
    let currentDayOfWeek = new Date().getDay();
  
    const [currentTime, setCurrentTime] = useState(time);
    const [currentDate, setCurrentDate] = useState(date);

    const findWeekDates = (mod, currentDayOfWeek) => {
      let week = []
      for (var i = 0; i < 7; i++) {
        const todaysDate = new Date();
        const dateInMilliseconds = todaysDate.setDate(todaysDate.getDate() + (7 * mod) + i - currentDayOfWeek);
        const dateObject = new Date(dateInMilliseconds);
        week.push(dateObject.toDateString());
      }
      return week;
    }

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
  
    const updateItemStyles = (e) => {
      if (e.style.textDecoration == "") {
        e.style.textDecoration = "line-through";
      } else {
        e.style.textDecoration = "";
      }
    }
  
    setInterval(updateTime, 1000);
    
    const handleDragStart = (e, eventItem) => {
      setDraggingItem(eventItem);
      e.dataTransfer.setData('text/plain', '');
    }
  
    const handleDragEnd = () => {
      setDraggingItem(null);
    }
  
    const handleDragOver = (e) => {
      e.preventDefault()
    }
  
    const handleDrop = (targetItem) => {
      if (!draggingItem) return;
  
      const currentIndex = eventItems.indexOf(draggingItem);
      const targetIndex = eventItems.indexOf(targetItem);
  
      //cannot drag to a empty dayOfWeek box
      if (currentIndex !== -1 && targetIndex !== -1) {
        if (eventItems[currentIndex].date != eventItems[targetIndex].date) {
          setChangeDate(!changeDate);
          updateEvent({id: eventItems[currentIndex].id, date: eventItems[targetIndex].date});
        }
        eventItems.splice(currentIndex, 1);
        eventItems.splice(targetIndex, 0, draggingItem);
        setEventItems(eventItems);
      }
    }
    
    return (
        <div className="App">
        <p id="date">{currentDate}</p>
        <p id="clock">{currentTime}</p>
        <button id="addItemButton" onClick={() => setShowCreateEventForm(true)}>Add Item</button>
  
        <div id="calendar">
          {weekday.map((day, index) => {
            return (
              <>
              <button id="previous" onClick={() => {
                setGoPrev((goPrev) => goPrev -= 1);
                setGoNext((goPrev) => goPrev -= 1);
                setWeekDates(findWeekDates(goPrev, currentDayOfWeek));
              }}>&#x2190;</button>

              <div id="dayOfWeek" key={index}>
                {weekDates.length > 0 &&
                  <p className="datedate">{day}<br /> {weekDates[index].slice(4)}</p>
                }
    
                <div className="sortableList">
                  {eventItems.map((eventItem) => {
                    const eventItemDate = new Date(Date.parse(eventItem.date)).toDateString();
                    if (eventItemDate == weekDates[index]) {
                      return (
                        <div key={eventItem.id} className={`item ${eventItem === draggingItem ? 'dragging' : ''}`} draggable="true" 
                            onDragStart={(e) => handleDragStart(e, eventItem)}
                            onDragEnd={handleDragEnd}
                            onDragOver={handleDragOver}
                            onDrop={() => handleDrop(eventItem)}>
                          <div className="details" onClick={(e) => updateItemStyles(e.target)}>
                            <p>{eventItem.name}</p>
                          </div>
                        </div>
                      );
                    } 
                  })}
                </div>
              </div>

              <button id="next" onClick={() => {
                setGoNext((goNext) => goNext += 1);
                setGoPrev((goNext) => goNext += 1);
                setWeekDates(findWeekDates(goNext, currentDayOfWeek));
              }}>&#x2192;</button>
              </>
          )})}
        </div>
        
        {showCreateEventForm &&
            <div>
                <CreateEventForm setShowCreateEventForm={setShowCreateEventForm}/>
            </div>
        }


  
  
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="/vite.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    );
}

export default Home;