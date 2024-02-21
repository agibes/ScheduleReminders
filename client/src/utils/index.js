export const findWeekDates = (weekMod, today) => {
    let week = [];
    for (var i = 0; i < 7; i++) {      
      const newDate = new Date();
      const dateToAdd = newDate.setDate(newDate.getDate() + (weekMod * 7) + i - today.getDay());

      const dateObject = new Date(dateToAdd);
      week.push(dateObject.toDateString());
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