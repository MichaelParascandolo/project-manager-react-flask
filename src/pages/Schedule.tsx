import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import { IoMdArrowRoundBack, IoMdTrash } from "react-icons/io";
import { CgProfile, CgWorkAlt } from "react-icons/cg";
import Day from "../components/Day";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from "axios";

/* schedule page showing month week and each individual day*/
const Schedule = (props: any) => {
  const [schedule, setSchedule] = useState<any>([]);
  const getSchedule = () => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/schedule/display",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      // data: { "Start Date": "2023-04-02" },
    })
      .then((response) => {
        setSchedule(sortArray(response.data));
        // console.log(schedule);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
  // sorts the jobs into newest to oldest
  const sortArray = (arr: any) => {
    arr.sort((a: any, b: any) => {
      const aDateTime = new Date(`${a.start_date} ${a.start_time}`);
      const bDateTime = new Date(`${b.start_date} ${b.start_time}`);
      return aDateTime.getTime() - bDateTime.getTime();
    });
    return arr;
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
            className="bg-slate-900 pb-6 pt-2 mt-2 rounded-xl shadow-lg border-2 border-slate-800 shadow-black"
          >
            <div className="text-white tracking-widest ml-4">
              <div className="flex justify-between">
                <div>
                  {/* <CgProfile size={30} /> */}
                  <p className="my-auto">
                    {item.customer_first_name} {item.customer_last_name}
                  </p>
                  <p>
                    {item.street}, {item.city}
                  </p>
                </div>
                <button className="mr-4">
                  <IoMdTrash size={30} />
                </button>
              </div>
            </div>
            <div className="bg-slate-700 hidden md:block text-white p-4 my-2 border-l-2 border-r-2 border-slate-800 border-t-2 border-t-white border-b-2 border-b-white">
              <div className="text-sm px-2 tracking-wider capitalize">
                <p className="text-gray-200 uppercase mb-2 font-bold text-center text-[16px]">
                  {item.service_type}
                  <p className="text-gray-400">{item.generator_name}</p>
                </p>
                <div className="flex justify-between"></div>
                <div className="flex justify-evenly text-center">
                  <div>
                    <p className="text-gray-200">{item.start_date}</p>
                    <p className="text-gray-400">{item.start_time}</p>
                  </div>
                  <p className="text-gray-400 text-[30px]">-</p>
                  <div>
                    {/* <p className="text-gray-200">{item.finish_date}</p>
                    <p className="text-gray-400">{item.finish_time}</p> */}
                    <p className="text-gray-200">{item.start_date}</p>
                    <p className="text-gray-400">{item.start_time}</p>
                  </div>
                </div>
              </div>
              {/* <div className="bg-slate-300/50 mt-2 rounded-xl h-0.5 w-full" /> */}
            </div>
            <p className="ml-4 text-gray-300 tracking-wider capitalize">
              {item.notes}
            </p>
            {/* <button>Delete Job</button>
            <button>Complete Job</button> */}
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
