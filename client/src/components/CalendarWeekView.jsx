import {useState} from "react";
import {updateEvent, } from '../api';
import {findWeekDates} from '../utils';

const calendarWeekView = ({currentDateTime, weekInFocus, setWeekInFocus, eventItems, setEventItems, changeDate, setChangeDate, weekModNext, setWeekModNext, weekModPrev, setWeekModPrev}) => {
    const [draggingItem, setDraggingItem] = useState(null);

    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    const updateItemStyles = (e) => {
        if (e.style.textDecoration == "") {
          e.style.textDecoration = "line-through";
        } else {
          e.style.textDecoration = "";
        }
    }

    const handleDragStart = (e, eventItem) => {
        setDraggingItem(eventItem);
      }
    
    const handleDragEnd = () => {
        setDraggingItem(null);
    }

    const handleDragOver = (e) => {
        e.preventDefault();
      }
    
      const handleDrop = (e, eventItem) => {
        if (!draggingItem) return;
        const currentIndex = eventItems.indexOf(draggingItem);
        
        if (!eventItem) {
          const targetDate = new Date(Date.parse(weekInFocus[e.target.id]));
          const dateString = `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()}`;
          updateEvent({id: eventItems[currentIndex].id, date: dateString});
        } else {
          e.stopPropagation();
          const targetIndex = eventItems.indexOf(eventItem);
          if (currentIndex !== -1 && targetIndex !== -1) {
            if (eventItems[currentIndex].date != eventItems[targetIndex].date) {
              updateEvent({id: eventItems[currentIndex].id, date: eventItems[targetIndex].date});
            }
            eventItems.splice(currentIndex, 1);
            eventItems.splice(targetIndex, 0, draggingItem);
            setEventItems(eventItems); 
          }
        }
        setChangeDate(!changeDate); 
      }

    return (
        <>
            <button id="previous" onClick={() => {
                setWeekModPrev((weekModPrev) => weekModPrev -= 1);
                setWeekModNext((weekModPrev) => weekModPrev -= 1);
                setWeekInFocus(findWeekDates(weekModPrev, currentDateTime));
            }}>&#x2190;</button>
            {weekday.map((day, index) => {
                return(
                    <div className="dayOfWeek" id={index} key={index} onDrop={(e)=>handleDrop(e)} onDragOver={handleDragOver}>
                        {weekInFocus.length > 0 &&
                          <p key={index} className="day">{day}<br /> {weekInFocus[index].slice(4)}</p>
                        }

                        <div className="sortableList">
                            {eventItems.map((eventItem) => {
                                const eventItemDate = new Date(Date.parse(eventItem.date)).toDateString();
                                if (eventItemDate == weekInFocus[index]) {
                                    return(
                                        <div key={eventItem.id} className={`item ${eventItem === draggingItem ? 'dragging' : ''}`} draggable="true" 
                                        onDragStart={(e) => handleDragStart(e, eventItem)}
                                        onDragEnd={handleDragEnd}
                                        onDrop={(e) => handleDrop(e, eventItem)}
                                        >
                                            <div className="details" onClick={(e) => updateItemStyles(e.target)}>
                                                <p>{eventItem.name}</p>
                                                <p className="smallText">{eventItem.notes}</p>
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </div>
                    </div>
                );
            })}
            <button id="next" onClick={() => {
                setWeekModNext((weekModNext) => weekModNext += 1);
                setWeekModPrev((weekModNext) => weekModNext += 1);
                setWeekInFocus(findWeekDates(weekModNext, currentDateTime));
            }}>&#x2192;</button>
        </>
    );
};

export default calendarWeekView;