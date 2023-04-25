import {
  IoMdTrash,
  IoMdCheckmarkCircle,
  IoMdCloseCircle,
  IoMdClipboard,
} from "react-icons/io";
import { useState, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const ServiceRecord = ({
  item,
  employees,
  token,
  getSchedule,
  admin,
  generators,
  techs,
}: {
  item: any;
  employees: any;
  token: string;
  getSchedule: any;
  admin: boolean;
  techs: any;
  generators?: any;
}) => {
  const time = new Date();
  const containerRef = useRef<any>(null);
  const [currentFEmpID, setCurrentFEmpID] = useState<any>("default");
  const [currentSEmpID, setCurrentSEmpID] = useState<any>("default");
  const [currentTEmpID, setCurrentTEmpID] = useState<any>("default");
  const [currentFoEmpID, setCurrentFoEmpID] = useState<any>("default");
  const [menu, setMenu] = useState<boolean>(false);
  const [generatorname, setGeneratorName] = useState<any>();
  const [startDate, setDate] = useState<any>();
  const [startTime, setTime] = useState<any>();
  const [jobNotes, setJobNotes] = useState<any>();
  const [serviceType, setServiceType] = useState<any>([]);

  const serviceTypes: string[] = [
    "Installation",
    "Maintenance",
    "Repair",
    "Troubleshoot",
    "Other",
  ];
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
  const editRecord = (e: any) => {
    {
      e.preventDefault();
      axios({
        method: "POST",
        url: "http://localhost:3000/schedule/edit",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          ServiceID: item.service_id,
          GeneratorName: generatorname,
          Date: startDate,
          Time: startTime,
          ServiceType: serviceType,
          Notes: jobNotes,
        },
      })
        .then((response) => {
          toast.success("Record Edited");
          setMenu(false);
          containerRef.current.scrollTo(0, 0);
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
          ServiceID: item.service_id,
          completeDate:
            time.getFullYear() +
            "-" +
            (time.getMonth() + 1) +
            "-" +
            time.getDate(),
          completeTime: time.getHours() + ":" + time.getMinutes(),
        },
      })
        .then((response) => {
          if (response.data.Service_Performed == true) {
            toast.success("Record Completed");
          } else {
            toast.success("Record Incomplete");
          }
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

  const addTech = (e: any) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/schedule/techs",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        ServiceID: item.service_id,
        FirstEmployeeID: currentFEmpID,
        SecondEmployeeID: currentSEmpID,
        ThirdEmployeeID: currentTEmpID,
        FourthEmployeeID: currentFoEmpID,
      },
    })
      .then((response) => {
        toast.success("Tech Added");
        getSchedule();
        containerRef.current.scrollTo(0, 0);
        console.log(response);
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  return (
    <>
      <Toaster />
      <div
        ref={containerRef}
        className="bg-slate-800/80 h-full pb-2 pt-2 mt-2 rounded-xl shadow-lg border-2 border-slate-500 shadow-slate-800"
      >
        <div className="text-white tracking-widest ml-4">
          <div className="flex justify-between">
            <div className="text-[15px] w-[250px] h-[75px]">
              <p className="my-auto">
                {item.customer_first_name} {item.customer_last_name}
              </p>
              <p>
                {item.street}, {item.city}
              </p>
            </div>
            <div className="flex w-[100px] justify-between">
              {!menu && admin ? (
                <button onClick={() => setMenu(true)}>
                  <IoMdClipboard
                    size={30}
                    className="hover:text-blue-500 ease-in-out transition-all duration-300"
                  />
                </button>
              ) : admin ? (
                <button onClick={() => setMenu(false)}>
                  <IoMdCloseCircle
                    size={30}
                    className="hover:text-red-500 ease-in-out transition-all duration-300"
                  />
                </button>
              ) : null}
              {admin ? (
                <button onClick={() => deleteRecord()} className="mr-4">
                  <IoMdTrash
                    className="hover:text-red-500 ease-in-out transition-all duration-300"
                    size={30}
                  />
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div className="bg-slate-600 text-white p-4 mt-2 rounded-b-xl">
          {/* editing job menu */}
          {menu ? (
            <form onSubmit={editRecord}>
              <div className="grid md:grid-cols-4 gap-2 -mt-4">
                <div className="col-span-2">
                  <label>Date:</label>
                  <input
                    type="date"
                    required
                    onChange={(e) => setDate(e.target.value)}
                    value={startDate}
                  />
                </div>
                <div className="col-span-2">
                  <label>Time:</label>
                  <input
                    type="time"
                    required
                    onChange={(e) => setTime(e.target.value)}
                    value={startTime}
                  />
                </div>
                <div className="col-span-2">
                  <label>Generator:</label>
                  <select
                    required
                    onChange={(e) => {
                      setJobNotes(e.target.value.split(",")[0]);
                      setGeneratorName(e.target.value.split(",")[1]);
                    }}
                  >
                    <option value={"default"}>(Please Select a Value)</option>
                    {generators.map((gen: any, index: number) => (
                      <option key={index} value={[gen.gNotes, gen.gID]}>
                        {gen.gName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <label>Service Type:</label>
                  <select
                    required
                    onChange={(e) => {
                      setServiceType(e.target.value);
                    }}
                  >
                    <option value={"default"}>(Please Select a Value)</option>
                    {serviceTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-4">
                  <label>Notes:</label>
                  <textarea
                    className="w-full h-[80px] rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white"
                    onChange={(e) => setJobNotes(e.target.value)}
                    value={jobNotes}
                  />
                </div>
              </div>
              <button
                type="submit"
                className="bg-blue-500 border-2 text-black border-blue-800 text-lg px-4 py-1 rounded-lg mt-4 w-full col-span-2 hover:bg-blue-700 transition-all ease-in-out duration-300"
              >
                Edit Job
              </button>
            </form>
          ) : (
            <div className="text-sm -mt-2 h-[120px] px-2 tracking-wider capitalize">
              <p className="text-white uppercase font-bold text-center text-[16px]">
                {item.service_type}
              </p>
              <p className="text-gray-300 mb-2 text-center tracking-wide font-semibold text-[14px]">
                {item.generator_name}
              </p>
              <div className="flex select-none -mt-1 justify-evenly text-center rounded-lg bg-slate-800/70 p-2 border-2 border-slate-600">
                <div>
                  <p className="text-gray-200">{item.start_date}</p>
                  <p className="text-gray-400">{item.start_time}</p>
                </div>
                {item.finish_date && admin ? (
                  <div>
                    <p className="text-gray-300 text-[25px]">-</p>
                    <button onClick={() => completeRecord()}>
                      <IoMdCloseCircle
                        className="hover:text-red-500 ease-in-out transition-all duration-300"
                        size={20}
                      />
                    </button>
                  </div>
                ) : (
                  <p className="text-gray-300 text-[25px] my-auto">-</p>
                )}
                <div>
                  {item.finish_date ? (
                    <div>
                      <p className="text-gray-200">{item.finish_date}</p>
                      <p className="text-gray-400">{item.finish_time}</p>
                    </div>
                  ) : (
                    <div>
                      <button onClick={() => completeRecord()}>
                        <IoMdCheckmarkCircle
                          className="hover:text-green-500 transition-all ease-in-out duration-300"
                          size={35}
                        />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* showing scheduled techs */}
              <div className="flex justify-evenly">
                {techs.map((techs: any, index: number) =>
                  techs.service_id == item.service_id ? (
                    <p key={index} className="text-gray-200">
                      {techs.employee_first_name}
                    </p>
                  ) : null
                )}
              </div>
            </div>
          )}
        </div>
        {!menu ? (
          <div className="h-[70px] overflow-y-auto">
            <p className="m-2 text-gray-300 tracking-wide">{item.notes}</p>
          </div>
        ) : null}
        {admin && !menu ? (
          <>
            <div className="h-0.5 rounded-full w-[95%] mx-auto my-2 bg-slate-500" />
            <div className="grid grid-cols-2 mt-2 px-2 gap-2">
              <select
                required
                onChange={(e) => {
                  setCurrentFEmpID(e.target.value);
                }}
              >
                <option value={"default"}>Employee 1</option>
                {employees.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.fN}
                  </option>
                ))}
              </select>
              <select
                required
                onChange={(e) => {
                  setCurrentSEmpID(e.target.value);
                }}
              >
                <option value={"default"}>Employee 2</option>
                {employees.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.fN}
                  </option>
                ))}
              </select>
              <select
                required
                onChange={(e) => {
                  setCurrentTEmpID(e.target.value);
                }}
              >
                <option value={"default"}>Employee 3</option>
                {employees.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.fN}
                  </option>
                ))}
              </select>
              <select
                required
                onChange={(e) => {
                  setCurrentFoEmpID(e.target.value);
                }}
              >
                <option value={"default"}>Employee 4</option>
                {employees.map((item: any, index: number) => (
                  <option key={index} value={item.id}>
                    {item.fN}
                  </option>
                ))}
              </select>
              <button
                className="bg-blue-500 border-2 font-bold border-blue-800 text-lg py-1 col-span-2 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300"
                onClick={addTech}
              >
                Assign Job
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ServiceRecord;
