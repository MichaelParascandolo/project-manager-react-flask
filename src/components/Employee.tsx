import axios from "axios";
import { RiAdminLine, RiUserLine } from "react-icons/ri";
import toast from "react-hot-toast";
import { formatNumber } from "./Customer";

const Employee = ({
  item,
  userID,
  getTeam,
  token,
}: {
  item: any;
  userID: number | undefined;
  getTeam: any;
  token: string;
}) => {
  const changePermission = (id: number) => {
    axios({
      method: "POST",
      url: "http://localhost:3000/employees/permission",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        EmployeeID: id,
      },
    })
      .then((response) => {
        toast.success("Permission Changed");
        console.log(response);
        getTeam();
      })
      .catch((error) => {
        toast.error("Something Went Wrong");
        if (error.response) {
          console.log(error.response);
        }
      });
  };

  const deleteEmployee = (id: number) => {
    if (
      confirm(
        "Are you sure you want to delete this user?\nThis action cannot be undone."
      ) == true
    ) {
      axios({
        method: "POST",
        url: "http://localhost:3000/employees/delete",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: {
          EmployeeID: id,
        },
      })
        .then((response) => {
          toast.success("Employee Removed");
          console.log(response);
          getTeam();
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
      <div
        className={
          "bg-slate-700 text-white p-4 w-full rounded-lg border-2 border-slate-400 shadow-md shadow-slate-800 hover:scale-105 duration-300 ease-in-out transition-all"
        }
      >
        <div className="flex justify-evenly">
          <div className="my-auto hidden sm:block">
            <div className="bg-slate-700 border-2 text-white border-slate-400 p-3 m-4 rounded-full">
              {item.admin ? (
                <RiAdminLine size={70} />
              ) : (
                <RiUserLine size={70} />
              )}
            </div>
            <p className="text-lg text-center text-gray-400 tracking-wide font-bold">
              {item.admin ? "ADMIN" : "USER"}
            </p>
          </div>
          <div>
            <div className="flex justify-between">
              <div>
                <p className="text-xs text-gray-400 tracking-wide">
                  <span className="visible md:hidden text-[12px] mr-1 font-bold text-gray-400 text-center">
                    {item.admin ? "ADMIN" : "USER"} |
                  </span>
                  Employee ID: {item.id}
                </p>
                <p className={"text-xl font-bold tracking-wide"}>
                  {`${item.fN} ${item.lN}`}{" "}
                </p>
              </div>
            </div>
            <div className="h-0.5 w-full my-2 bg-slate-700 rounded-xl" />
            <p className="text-md py-0.5 tracking-wide text-gray-200">
              Number:
              <span className="ml-2">{formatNumber(item.phone)}</span>
            </p>
            <p className="text-md py-0.5 tracking-wide text-gray-200">
              Email: <span className="ml-2">{item.email}</span>
            </p>
            <p className="text-md py-0.5 tracking-wide text-gray-200">
              Hired: <span className="ml-2">{item.hiredDate}</span>
            </p>
            {userID !== item.id ? (
              <div className="flex mt-2">
                <button
                  onClick={() => changePermission(item.id)}
                  className="bg-blue-500 border-2 uppercase border-blue-800 mr-1 text-sm text-black tracking-wider px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300"
                >
                  {item.admin ? "Make User" : "Make Admin"}
                </button>
                <button
                  onClick={() => deleteEmployee(item.id)}
                  className="bg-red-500 border-2 uppercase border-red-800 ml-1 text-sm text-black tracking-wider px-4 py-2 rounded-lg hover:bg-red-700 transition-all ease-in-out duration-300"
                >
                  Delete User
                </button>
              </div>
            ) : (
              <p className=" text-gray-400">Currently Signed-In</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
