const getWeekNumber = ( data ) => {
    const currentDate = new Date();
    const startDate = new Date(currentDate.getFullYear(), 0, 1);

    const days = Math.floor((currentDate.getTime() - startDate.getTime()) /
        (24 * 60 * 60 * 1000));

    const weekNumber = Math.ceil(days / 7);
    return weekNumber;
}

function getStartDateFromWeekNumber(year, weekNumber) {
    // Create a new Date object for January 1st of the given year
    const januaryFirst = new Date(year, 0, 1);
  
    // Find the day of the week for January 1st (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = januaryFirst.getDay();
  
    // Calculate the number of days to add to January 1st to get to the start of the desired week
    const daysToAdd = 7 * (weekNumber - 1) - dayOfWeek;
  
    // Create a new Date object by adding the calculated number of days to January 1st
    const startDate = new Date(year, 0, 1 + daysToAdd);
    // const endDate=new Date(year,0,7+startDate.getDate())
    const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);
    return startDate.toDateString().slice(4,10)+"-"+ endDate.toDateString().slice(4,10);
  }

module.exports= { getWeekNumber,getStartDateFromWeekNumber };