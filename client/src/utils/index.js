export const findWeekDates = (mod, currentDayOfWeek) => {
    let week = []
    for (var i = 0; i < 7; i++) {
      const todaysDate = new Date();
      const dateInMilliseconds = todaysDate.setDate(todaysDate.getDate() + (7 * mod) + i - currentDayOfWeek);
      const dateObject = new Date(dateInMilliseconds);
      week.push(dateObject.toDateString());
    }
    return week;
}