import {useState} from "react";
import {updateEvent, } from '../api';
import {findMonth, updateItemStyles} from '../utils';

const calendarMonthView = ({draggingItem, setDraggingItem, currentDateTime, monthInFocus, setMonthInFocus, eventItems, setEventItems, changeDate, setChangeDate, monthModNext, setMonthModNext, monthModPrev, setMonthModPrev, setShowUpdateTime}) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const handleDragStart = (e, eventItem) => {
        setDraggingItem(eventItem);
      }
    
    const handleDragOver = (e) => {
        e.preventDefault();
      }
    
    const handleDrop = (e, eventItem) => {
      if (!draggingItem) return;
      const currentIndex = eventItems.indexOf(draggingItem);
      const draggingItemTime = new Date(eventItems[currentIndex].utcdatetime).toLocaleTimeString();

      if (!eventItem) {
        const targetDate = new Date(Date.parse(e.target.id));
        const dateString = `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()} ${draggingItemTime}`;
        updateEvent({id: eventItems[currentIndex].id, utcdatetime: dateString});
      } else {
        e.stopPropagation();
        const targetIndex = eventItems.indexOf(eventItem);
        const draggingItemDate = new Date(eventItems[currentIndex].utcdatetime).toLocaleDateString();
        const targetItemDate = new Date(eventItems[targetIndex].utcdatetime).toLocaleDateString();
        if (currentIndex !== -1 && targetIndex !== -1) {
          if (draggingItemDate != targetItemDate) {
            const datetimeString = `${targetItemDate} ${draggingItemTime}`;
            updateEvent({id: eventItems[currentIndex].id, utcdatetime: datetimeString});
          } else {
            setShowUpdateTime(true);
          }
          setEventItems(eventItems);
        }
      }
      setChangeDate(!changeDate);
    }

    return (
    <>
      <button id="previous" onClick={() => {
          setMonthModPrev((monthModPrev) => monthModPrev -= 1);
          setMonthModNext((monthModPrev) => monthModPrev -= 1);
          setMonthInFocus(findMonth(monthModPrev, currentDateTime));
      }}>&#x2190;</button>
      {weekday.map((day, index) => {
        return(
          <div className="dayOfWeek" id={index} key={index} onDrop={(e)=>handleDrop(e)} onDragOver={handleDragOver}>
            <p key={index} className="day">{day}</p>
            {monthInFocus.map((dayOfMonth) => {
              const eventsInFocus = eventItems.filter((eventItem)=>new Date(Date.parse(eventItem.utcdatetime)).toDateString() == dayOfMonth.toDateString());
              const sortedEvents = eventsInFocus.sort((a, b) => (new Date(Date.parse(a.utcdatetime)).toTimeString() > new Date(Date.parse(b.utcdatetime)).toTimeString()) ? 1 : -1);
              if (dayOfMonth.toString().slice(0,3) == day.slice(0,3)) {
                return (
                  <div className="dateContainer" id={dayOfMonth} key={dayOfMonth}>
                  <p className={`smallNumber ${new Date().getMonth() == dayOfMonth.getMonth() ? '' : 'notCurrentMonth'}`} key={index}>{dayOfMonth.toString().match(/\d+/)}</p>
                  {sortedEvents.map(eventItem=> {
                    return (
                      <div key={eventItem.id} className={`item ${eventItem === draggingItem ? 'dragging' : ''}`} draggable="true" 
                      onDragStart={(e) => handleDragStart(e, eventItem)}
                      onDrop={(e) => handleDrop(e, eventItem)}
                      >
                        <div className="details" onClick={(e) => updateItemStyles(e.target)}>
                          <p>{eventItem.name}</p>
                          <p className="smallText">{new Date(Date.parse(eventItem.utcdatetime)).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                          <p className="smallText">{eventItem.notes}</p>
                        </div>
                      </div>
                    );
                  })}
                  </div>
                );
              }
            })}  
          </div>
        );
      })}
      <button id="next" onClick={() => {
          setMonthModNext((monthModNext) => monthModNext += 1);
          setMonthModPrev((monthModNext) => monthModNext += 1);
          setMonthInFocus(findMonth(monthModNext, currentDateTime));
      }}>&#x2192;</button>
    </>
    );
};

export default calendarMonthView;