import {updateEvent} from '../api';

export const findWeekDates = (weekMod, today) => {
    let week = [];
    for (var i = 0; i < 7; i++) {      
      const newDate = new Date();
      const dateToAdd = newDate.setDate(newDate.getDate() + (weekMod * 7) + i - today.getDay());
      week.push(new Date(dateToAdd));
    }
    return week;
}

export const findMonth = (monthMod, today) => {
  let month = [];
  const focusMonth = today.getMonth() + monthMod;
  for (var i = 0; i < 42; i++) {
    const newDate = new Date(today.getFullYear(), focusMonth, 1);
    const firstWeekday = newDate.getDay();
    if (i < firstWeekday) {
      const dateToAdd = newDate.setDate(newDate.getDate() - i - 1);
      month.unshift(new Date(dateToAdd));
    } else {
      const dateToAdd = newDate.setDate(newDate.getDate() + i - firstWeekday);
      month.push(new Date(dateToAdd));
    }
  }
  return month;
}

export const updateItemStyles = (e) => {
  if (e.style.textDecoration == "") {
    e.style.textDecoration = "line-through";
  } else {
    e.style.textDecoration = "";
  }
}

export const handleDragStart = (e, eventItem, setDraggingItem) => {
  setDraggingItem(eventItem);
}

export const handleDragOver = (e) => {
  e.preventDefault();
}

export const handleDrop = (e, draggingItem, eventItems, changeDate, setChangeDate, setEventItems, setShowUpdateTime, eventItem) => {
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

// const handleDrop = (e, eventItem) => {
//   if (!draggingItem) return;
//   const currentIndex = eventItems.indexOf(draggingItem);
//   const draggingItemTime = new Date(eventItems[currentIndex].utcdatetime).toLocaleTimeString();

//   if (!eventItem) {
//     const targetDate = new Date(Date.parse(e.target.id));
//     const dateString = `${targetDate.getFullYear()}-${targetDate.getMonth() + 1}-${targetDate.getDate()} ${draggingItemTime}`;
//     updateEvent({id: eventItems[currentIndex].id, utcdatetime: dateString});
//   } else {
//     e.stopPropagation();
//     const targetIndex = eventItems.indexOf(eventItem);
//     const draggingItemDate = new Date(eventItems[currentIndex].utcdatetime).toLocaleDateString();
//     const targetItemDate = new Date(eventItems[targetIndex].utcdatetime).toLocaleDateString();
//     if (currentIndex !== -1 && targetIndex !== -1) {
//       if (draggingItemDate != targetItemDate) {
//         const datetimeString = `${targetItemDate} ${draggingItemTime}`;
//         updateEvent({id: eventItems[currentIndex].id, utcdatetime: datetimeString});
//       } else {
//         setShowUpdateTime(true);
//       }
//       setEventItems(eventItems);
//     }
//   }
//   setChangeDate(!changeDate);
// }