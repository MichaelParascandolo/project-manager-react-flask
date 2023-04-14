import { IoMdArrowRoundBack, IoMdTrash } from "react-icons/io";
import { CgProfile, CgWorkAlt } from "react-icons/cg";
import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const styles = {
  links:
    "text-blue-500 border-b-2 border-transparent hover:border-blue-500 ease-in-out transition-all duration-300",
  label: "text-white py-2",
  input:
    "w-full border-2 appearance-none tracking-wider border-slate-900 p-2 my-1 bg-slate-700 text-white",
};
const ServiceRecord = ({
  item,
  employees,
  token,
  getSchedule,
}: {
  item: any;
  employees: any;
  token: string;
  getSchedule: any;
}) => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const time = new Date();
  const deleteRecord = () => {
    if (
      confirm(
        "Are you sure you want to delete this record?\nThis action cannot be undone."
      ) == true
    ) {
      axios({
        method: "POST",
        url: "http://localhost:3000/schedule/delete",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          EmployeeID: 77879, // forcing admin privileges we can change this later
          ServiceID: item.service_id,
        },
      })
        .then((response) => {
          toast.success("Record Delete");
          getSchedule();
          console.log(response);
        })
        .catch((error) => {
          toast.error("Something Went Wrong");
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  };
  const completeRecord = () => {
     {
      axios({
        method: "POST",
        url: "http://localhost:3000/schedule/complete",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          EmployeeID: 77879, // forcing admin privileges we can change this later
          ServiceID: item.service_id,
          completeDate:
          time.getFullYear() +
          "-" +
          (time.getMonth() + 1) +
          "-" +
          time.getDate(),
          completeTime:
          time.getHours() +
          ":" +
          time.getMinutes(),
        },
      })
        .then((response) => {
          toast.success("Record Completed");
          getSchedule();
          console.log(response);
        })
        .catch((error) => {
          toast.error("Something Went Wrong");
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  };
  return (
    <>
      <Toaster />
      <div className="bg-slate-900 h-full pb-2 pt-2 mt-2 rounded-xl shadow-lg border-2 border-slate-800 shadow-black">
        <div className="text-white tracking-widest ml-4">
          <div className="flex justify-between">
            <div className="text-[15px] w-[150px]">
              {/* <CgProfile size={30} /> */}
              <p className="my-auto">
                {item.customer_first_name} {item.customer_last_name}
              </p>
              <p>
                {item.street}, {item.city}
              </p>
            </div>
            <button onClick={() => deleteRecord()} className="mr-4">
              <IoMdTrash size={30} />
            </button>
          </div>
        </div>
        <div className="bg-slate-700 hidden md:block text-white p-4 mt-2 border-l-2 border-r-2 border-slate-800">
          <div className="text-sm px-2 tracking-wider capitalize">
            <p className="text-gray-200 uppercase mb-2 font-bold text-center text-[16px]">
              {item.service_type}
              <br />
              <span className="text-gray-400">{item.generator_name}</span>
            </p>
            <div className="flex justify-evenly text-center">
              <div>
                <p className="text-gray-200">{item.start_date}</p>
                <p className="text-gray-400">{item.start_time}</p>
              </div>
              <p className="text-gray-400 text-[30px]">-</p>
              <div>
                <p className="text-gray-200">
                  {item.finish_date ? (
                    item.finish_date
                  ) : (
                    <>
                      <button onClick={() => completeRecord()} className="bg-blue-500 border-2 font-bold border-blue-800 text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300">
                        Complete
                      </button>
                    </>
                  )}
                </p>
                <p className="text-gray-400">{item.finish_time}</p>
              </div>
            </div>
          </div>
          {/* <div className="bg-slate-300/50 mt-2 rounded-xl h-0.5 w-full" /> */}
        </div>
        {/* <p className="ml-4 text-gray-300 tracking-wider capitalize mb-2">
          Notes:
        </p> */}
        <div className="h-[60px] overflow-y-auto border-b-2 border-b-gray-500 border-t-2 border-t-gray-500">
          <p className="m-2 text-gray-300 tracking-wide">{item.notes}</p>
        </div>
        {openMenu ? (
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
          </div>
        ) : null}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="bg-blue-500 border-2 w-[250px] font-bold border-blue-800 text-lg px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300"
          >
            {openMenu ? "Cancel" : "Assign Job"}
          </button>
        </div>
        {/* <p className="text-gray-500">{item.service_id}</p> */}
      </div>
    </>
  );
};

export default ServiceRecord;
