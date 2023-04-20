import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import ServiceRecord from "../components/ServiceRecord";
import Datepicker from "react-tailwindcss-datepicker";

/* schedule page showing month week and each individual day*/
const Schedule = (props: any) => {
  const [schedule, setSchedule] = useState<any>([]);
  const [employees, setEmployees] = useState<any>([]);
  const [value, setValue] = useState<any>({
    startDate: null,
    endDate: null,
  });
  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    // console.log(value);
  };

  // returns all service records with customer info
  function getSchedule() {
    console.log(value);
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/schedule/display",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: { startDate: value.startDate, endDate: value.endDate },
    })
      .then((response) => {
        console.log(response.data.services);
        setSchedule(sortArray(response.data.services));
        setEmployees(response.data.team);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  }
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
  }, [value]);

  const styles = {
    links:
      "text-blue-500 border-b-2 border-transparent hover:border-blue-500 ease-in-out transition-all duration-300",
    label: "text-white py-2",
    input:
      "w-full rounded-lg border-2 tracking-wider border-slate-500 p-2 bg-slate-600 text-white",
  };
  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="w-[700px] p-4 bg-slate-700 border-2 border-slate-500 shadow-md shadow-slate-700 mb-2 rounded-xl h-full transition-all duration-300 ease-in-out">
          <h2 className="text-white cap font-roboto text-center text-4xl tracking-wide">
            Job Schedule
          </h2>
          {/* <h3 className="text-gray-300 uppercase text-sm my-1 text-center tracking-wider">
            {schedule.length} upcoming jobs
          </h3> */}
          <Datepicker
            useRange={false}
            placeholder="DISPLAYING ALL JOBS"
            inputClassName={styles.input}
            // containerClassName={""}
            showShortcuts={true}
            separator={"-"}
            value={value}
            onChange={handleValueChange}
          />
        </div>
      </div>
      {/* schedule */}
      <div className="h-1 rounded-full w-[95%] mx-auto my-2 bg-slate-500" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 w-[90%] m-auto">
        {schedule.map((item: any, index: number) => (
          <ServiceRecord
            item={item}
            key={index}
            employees={employees}
            token={props.token}
            getSchedule={getSchedule}
          />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Schedule;
