// date.ts file
const getMonthName = (date: string) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const firstDayDate = new Date(date);
    const monthIndex = firstDayDate.getMonth();
    return months[monthIndex];
};

export default getMonthName;
