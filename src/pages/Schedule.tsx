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
  const [employees, setEmployees] = useState<any>([]);

  // returns all service records with customer info
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
        setSchedule(sortArray(response.data.services));
        console.log(response.data);
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

  /* Shows the team member page*/
  function getTeam() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/employees",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        setEmployees(response.data);
        console.log(employees);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }
  useEffect(() => {
    getSchedule();
    getTeam();
  }, []);

  const styles = {
    links:
      "text-blue-500 border-b-2 border-transparent hover:border-blue-500 ease-in-out transition-all duration-300",
    label: "text-white py-2",
    input:
      "w-full border-2 appearance-none tracking-wider border-slate-900 p-2 my-1 bg-slate-700 text-white",
  };
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
            className="bg-slate-900 pb-2 pt-2 mt-2 rounded-xl shadow-lg border-2 border-slate-800 shadow-black"
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
                  <br />
                  <span className="text-gray-400">{item.generator_name}</span>
                </p>
                <div className="flex justify-between"></div>
                <div className="flex justify-evenly text-center">
                  <div>
                    <p className="text-gray-200">{item.start_date}</p>
                    <p className="text-gray-400">{item.start_time}</p>
                  </div>
                  <p className="text-gray-400 text-[30px]">-</p>
                  <div>
                    <p className="text-gray-200">
                      {item.finish_date ? item.finish_date : "PENDING"}
                    </p>
                    <p className="text-gray-400">{item.finish_time}</p>
                  </div>
                </div>
              </div>
              {/* <div className="bg-slate-300/50 mt-2 rounded-xl h-0.5 w-full" /> */}
            </div>
            <div>
              <p className="ml-4 text-gray-300 tracking-wider capitalize">
                {item.notes}
              </p>
            </div>
            <div className="grid grid-cols-2 mt-2 px-2 gap-1">
              <select required className={styles.input}>
                <option value={"default"}>Employee 1</option>
                {employees.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.fN}
                  </option>
                ))}
              </select>
              <select required className={styles.input}>
                <option value={"default"}>Employee 2</option>
                {employees.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.fN}
                  </option>
                ))}
              </select>
              <select required className={styles.input}>
                <option value={"default"}>Employee 3</option>
                {employees.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.fN}
                  </option>
                ))}
              </select>
              <select required className={styles.input}>
                <option value={"default"}>Employee 4</option>
                {employees.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.fN}
                  </option>
                ))}
              </select>
              <button className="bg-blue-500 col-span-2 items-end border-2 font-bold border-blue-800 text-lg px-4 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-all ease-in-out duration-300">
                Mark Completed
              </button>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
