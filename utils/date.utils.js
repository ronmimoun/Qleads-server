
function getNextMonth() {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    const nextMonth = currentMonth + 1;
    const nextYear = currentYear;

    if (nextMonth === 12) {
        nextMonth = 0;
        nextYear++;
    }
    currentDate.setFullYear(nextYear, nextMonth, currentDate.getDate());
    return currentDate;
}

function compareDates(date, dateToCompare) {
    const currDate = new Date(date);
    const comparingDate = new Date(dateToCompare);

    if (currDate < comparingDate) {
        return -1;
    } else if (currDate > comparingDate) {
        return 1;
    } else {
        return 0;
    }
}

module.exports = {
    getNextMonth,
    compareDates
}