import dayjs from "dayjs";
//https://www.hittaducmai.se/post/build-a-calendar-from-scratch-with-tailwind-css
const today = dayjs().set("year", year);
const startWeek = today.startOf("isoWeek");
const weekDays = Array.from(new Array(7).keys()).map((index) => {
  return startWeek.add(index, "day");
});
const startOfMonth = today.set("month", month).startOf("month");
const startOfFirstWeek = startOfMonth.startOf("isoWeek");
const daysToFirstDay = startOfMonth.diff(startOfFirstWeek, "day");
const daysToPrepend = Array.from(new Array(daysToFirstDay).keys());
const daysInMonth = Array.from(new Array(startOfMonth.daysInMonth()).keys());
const Calendar = () => {
  return (
    <div>
      <div className="grid grid-cols-7 mt-2 rounded-md border overflow-hidden flex-1">
        {weekDays.map((weekDay, index) => (
          <div className="text-center" key={`weekday_${index}`}>
            {weekDay.format("ddd")}
          </div>
        ))}
        {daysToPrepend.map((day) => (
          <div key={`prepend_${day}`}></div>
        ))}
        {daysInMonth.map((day) => {
          const key = getDate(startOfMonth, day);
          return (
            <div className={`text-center `} key={key}>
              {day + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
