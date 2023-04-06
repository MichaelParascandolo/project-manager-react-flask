import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Day from "../components/Day";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

/* schedule page showing month week and each individual day*/
const Schedule = (props: any) => {
  const [schedule, setSchedule] = useState<any>([]);
  const getSchedule = () => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/service/details",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: { CustomerID: null },
    })
      .then((response) => {
        setSchedule(response.data);
        console.log(schedule);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
  useEffect(() => {
    getSchedule();
  }, []);
  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="w-[500px] p-4 bg-slate-900 border-2 border-slate-800 shadow-md shadow-black mb-2 rounded-xl h-full transition-all duration-300 ease-in-out">
          <h2 className="text-white cap font-roboto text-center text-4xl tracking-wide">
            Job Schedule
          </h2>
          <h3 className="text-gray-500 uppercase text-sm my-1 text-center tracking-wider">
            {schedule.length} upcoming jobs
          </h3>
        </div>
      </div>
      {/* schedule */}
      <div className="h-1 rounded-full w-[95%] mx-auto my-2 bg-slate-900/50" />
      <div className="grid grid-cols-4 gap-4 w-[90%] m-auto">
        {schedule.map((item: any, index: number) => (
          <div
            key={index}
            className="bg-slate-900 hidden md:block border-2 border-slate-800 text-white p-4 my-2 rounded-lg shadow-lg shadow-black hover:scale-105 transition-all ease-in-out duration-300"
          >
            <div className="flex text-sm justify-between px-2 tracking-wider capitalize">
              <div>
                <div className="text-gray-200">{item.Generator}</div>
                <div className="text-gray-400">{item.ServiceType}</div>
              </div>
              <div>
                <div className="text-gray-200">{item.Date}</div>
                <div className="text-gray-400">{item.Time}</div>
              </div>
            </div>
            <div className="bg-slate-300/50 mt-2 rounded-xl h-0.5 w-full" />
            <div className="p-2 text-gray-300 tracking-wider capitalize">
              {item.Notes}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
