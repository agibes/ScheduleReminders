import React, {useEffect} from 'react';
import {findWeekDates, updateItemStyles, handleDragOver, handleDragStart, handleDrop, dragElement} from '../utils';

const calendarWeekView = ({draggingItem, setDraggingItem, currentDateTime, weekInFocus, setWeekInFocus, eventItems, setEventItems, changeDate, setChangeDate, weekModNext, setWeekModNext, weekModPrev, setWeekModPrev, setShowUpdateTime}) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    useEffect(() => {
      try {
        const widgets = document.getElementsByClassName("widget");
        for (var i = 0; i < widgets.length; i++) {
          dragElement(widgets.item(i));
       }
      } catch (err) {
        console.error(err);
      }
    }, []);

    return (
    <>
      <div id="calendarHeader" className="widgetHeader"></div>
      <div id="calendarWeekComponent" className="component calendarComponent">
        <div id="arrowButtons">
          <button id="previous" onClick={() => {
              setWeekModPrev((weekModPrev) => weekModPrev -= 1);
              setWeekModNext((weekModPrev) => weekModPrev -= 1);
              setWeekInFocus(findWeekDates(weekModPrev, currentDateTime));
            }}>&#x2190;</button>
            <p>{weekInFocus[3].toLocaleString('default', { month: 'long', year: 'numeric'})}</p>  
            <button id="next" onClick={() => {
              setWeekModNext((weekModNext) => weekModNext += 1);
              setWeekModPrev((weekModNext) => weekModNext += 1);
              setWeekInFocus(findWeekDates(weekModNext, currentDateTime));
            }}>&#x2192;</button>
        </div>
        {weekday.map((day, index) => {
          return(
            <div className="dayOfWeek" id={index} key={index}>
              <p key={index} className="day">{day}<br /> {weekInFocus[index].toDateString().slice(4)}</p>
            </div>
          );
        })}
        {weekday.map((day, index) => {
          const eventsInFocus = eventItems.filter((eventItem)=>new Date(Date.parse(eventItem.utcdatetime)).toDateString() == weekInFocus[index].toDateString());
          const sortedEvents = eventsInFocus.sort((a, b) => (new Date(Date.parse(a.utcdatetime)).toTimeString() > new Date(Date.parse(b.utcdatetime)).toTimeString()) ? 1 : -1);
          return(
            <div className="dayContainer" id={weekInFocus[index].toString()} onDrop={(e)=>handleDrop(e, draggingItem, eventItems, changeDate, setChangeDate, setEventItems, setShowUpdateTime)} onDragOver={handleDragOver}>
              {sortedEvents.map(eventItem => {
                return (
                  <div key={eventItem.id} className={`item ${eventItem === draggingItem ? 'dragging' : ''}`} draggable="true" 
                  onDragStart={(e) => handleDragStart(e, eventItem, setDraggingItem)}
                  onDrop={(e) => handleDrop(e, draggingItem, eventItems, changeDate, setChangeDate, setEventItems, setShowUpdateTime, eventItem)}
                  draggingitem={draggingItem}
                  >
                    <div className="details" onClick={(e) => updateItemStyles(e.target)}>
                      <p className="smallText">{new Date(Date.parse(eventItem.utcdatetime)).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</p>
                      <p>{eventItem.name}</p>
                      <p className="smallText">{eventItem.notes}</p>
                    </div>
                  </div>
                );
              })} 
            </div>
          );
        })}
      </div>
    </>
    );
};

export default calendarWeekView;