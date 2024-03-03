import {findWeekDates, updateItemStyles, handleDragOver, handleDragStart, handleDrop} from '../utils';

const calendarWeekView = ({draggingItem, setDraggingItem, currentDateTime, weekInFocus, setWeekInFocus, eventItems, setEventItems, changeDate, setChangeDate, weekModNext, setWeekModNext, weekModPrev, setWeekModPrev, setShowUpdateTime}) => {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    return (
    <>
      <button id="previous" onClick={() => {
        setWeekModPrev((weekModPrev) => weekModPrev -= 1);
        setWeekModNext((weekModPrev) => weekModPrev -= 1);
        setWeekInFocus(findWeekDates(weekModPrev, currentDateTime));
      }}>&#x2190;</button>
      {weekday.map((day, index) => {
        const eventsInFocus = eventItems.filter((eventItem)=>new Date(Date.parse(eventItem.utcdatetime)).toDateString() == weekInFocus[index].toDateString());
        const sortedEvents = eventsInFocus.sort((a, b) => (new Date(Date.parse(a.utcdatetime)).toTimeString() > new Date(Date.parse(b.utcdatetime)).toTimeString()) ? 1 : -1);
        return(
          <div className="dayOfWeek" id={weekInFocus[index]} key={index} onDrop={(e)=> handleDrop(e, draggingItem, eventItems, changeDate, setChangeDate, setEventItems, setShowUpdateTime)} onDragOver={handleDragOver}>
            {weekInFocus.length > 0 &&
              <p key={index} className="day">{day}<br /> {weekInFocus[index].toDateString().slice(4)}</p>
            }

            {sortedEvents.map(eventItem=> {
              return (
                <div key={eventItem.id} className={`item ${eventItem === draggingItem ? 'dragging' : ''}`} draggable="true" 
                onDragStart={(e) => handleDragStart(e, eventItem, setDraggingItem)}
                onDrop={(e) => handleDrop(e, draggingItem, eventItems, changeDate, setChangeDate, setEventItems, setShowUpdateTime, eventItem)}
                draggingitem={draggingItem}
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