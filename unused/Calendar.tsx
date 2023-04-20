import { useEffect, useRef, useState } from "react";
import CalendarRow from "./CalendarRow";

export interface CalendarProps {}

const Calendar = () => {
  const [activeMonth, setActiveMonth] = useState(new Date().getMonth());
  const [activeMonthString, setActiveMonthString] = useState(
    new Date().toDateString().split(" ")[1]
  );
  const [activeYear, setActiveYear] = useState(new Date().getFullYear());
  const prevMonth = useRef<number>(null);
  const [firstDayInMonth, setFirstDayInMonth] = useState<number[]>([]);

  useEffect(() => {
    let x = [];
    for (let i = 1; i <= 12; i++) {
      x.push(new Date(`${activeYear}/${i}/1`).getDay());
    }
    setFirstDayInMonth(x);
  }, [activeYear]);

  useEffect(() => {
    setActiveMonthString(
      new Date(new Date().setMonth(activeMonth)).toDateString().split(" ")[1]
    );
    //remember previous activeMonth
    //@ts-ignore
    prevMonth.current = activeMonth;
  }, [activeMonth]);

  return (
    <div className="p-4 bg-white  dark:bg-slate-700 border-2 border-slate-500 mt-20 mx-4">
      <div className="w-full h-[500px] rounded">
        <div className="flex items-center justify-between mb-4">
          <div className="font-bold text-xl text-white">
            {`${activeMonthString} ${activeYear}`}
          </div>
          <div className="flex space-x-4">
            <button
              className="py-2 px-6 rounded bg-slate-700 text-white"
              onClick={() => {
                if (prevMonth.current === 0) {
                  setActiveYear(activeYear - 1);
                  setActiveMonth(11);
                } else {
                  setActiveMonth(activeMonth - 1);
                }
              }}
            >
              <svg
                width={15}
                height={15}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
                ></path>
              </svg>
            </button>
            <button
              className="py-2 px-6 rounded bg-slate-700 text-white"
              onClick={() => {
                if (prevMonth.current === 11) {
                  setActiveYear(activeYear + 1);
                  setActiveMonth(0);
                } else {
                  setActiveMonth(activeMonth + 1);
                }
              }}
            >
              <svg
                width={15}
                height={15}
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        <div className="-mx-2">
          <table className="w-full dark:text-white">
            <thead>
              <tr>
                <th className="py-3 px-2 md:px-3 text-lg ">S</th>
                <th className="py-3 px-2 md:px-3 text-lg ">M</th>
                <th className="py-3 px-2 md:px-3 text-lg ">T</th>
                <th className="py-3 px-2 md:px-3 text-lg ">W</th>
                <th className="py-3 px-2 md:px-3 text-lg ">T</th>
                <th className="py-3 px-2 md:px-3 text-lg ">F</th>
                <th className="py-3 px-2 md:px-3 text-lg ">S</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(
                    activeYear,
                    activeMonth + 1,
                    0
                  ).getDate()}
                  row={0}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(
                    activeYear,
                    activeMonth + 1,
                    0
                  ).getDate()}
                  row={1}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(
                    activeYear,
                    activeMonth + 1,
                    0
                  ).getDate()}
                  row={2}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(
                    activeYear,
                    activeMonth + 1,
                    0
                  ).getDate()}
                  row={3}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(
                    activeYear,
                    activeMonth + 1,
                    0
                  ).getDate()}
                  row={4}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                />
              </tr>
              <tr>
                <CalendarRow
                  firstDay={firstDayInMonth[activeMonth]}
                  lastDayInMonth={new Date(
                    activeYear,
                    activeMonth + 1,
                    0
                  ).getDate()}
                  row={5}
                  currentMonth={activeMonth}
                  currentYear={activeYear}
                />
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
