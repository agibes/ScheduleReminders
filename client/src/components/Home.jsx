import React, { useState, useEffect } from 'react';
import reactLogo from '../assets/react.svg';
import {getAllEvents} from '../api';
import {CreateEventForm} from './index';
import './App.css';

const Home = (props) => {
    const [count, setCount] = useState(0);
    const [showCreateEventForm, setShowCreateEventForm] = useState(false);
    const [draggingItem, setDraggingItem] = useState(null);
    const [eventItems, setEventItems] = useState([]);
  
    useEffect(()=>{
      const fetchEvents = async () => {
        try {
          setEventItems(await getAllEvents());
        } catch (err) {
          console.log(err);
        }
      };
      fetchEvents();
    }, []);
  
    const findDate = (currentDayOfWeek, targetDayOfWeek) => {
      var date = new Date();
      date.setDate(date.getDate() + targetDayOfWeek - currentDayOfWeek);
      //document.querySelector(`.day${targetDayOfWeek}`).textContent = date.toLocaleDateString();
    }
  
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  
    let time = new Date().toLocaleTimeString();
    let date = new Date().toLocaleDateString();
    let dayOfWeek = new Date().getDay();
    let day = weekday[dayOfWeek];
  
    const [currentTime, setCurrentTime] = useState(time);
    const [currentDate, setCurrentDate] = useState(date);
  
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
  
      if (currentIndex !== -1 && targetIndex !== -1) {
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
          <button id="previous">&#x2190;</button>
          {
          
          weekday.map((day, index) => (
            <div id="dayOfWeek" key={index}> 
              <p>{day}</p>
              <p className={`day${index}`}>{findDate(dayOfWeek, index)}</p>
  
              <div className="sortableList">
                {eventItems.map((eventItem) => {
                  if (eventItem.date) {
                    
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
                  } else {
                    return (<p>temp</p>);
                  }

                  //if eventItem.date == targetDate
                  //  <div key={eventItem.id} className={`item ${eventItem === draggingItem ? 'dragging' : ''}`} draggable="true" 
                  //    onDragStart={(e) => handleDragStart(e, eventItem)}
                  //    onDragEnd={handleDragEnd}
                  //    onDragOver={handleDragOver}
                  //    onDrop={() => handleDrop(eventItem)}>
                  //     <div className="details" onClick={(e) => updateItemStyles(e.target)}>
                  //       <p>{eventItem.name}</p>
                  //     </div>
                  //  </div>
                })}
              </div>
            </div>
          ))
          
          }
          <button id="next">&#x2192;</button>
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