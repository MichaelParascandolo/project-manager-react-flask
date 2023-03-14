import { RiAdminLine, RiUserLine } from "react-icons/ri";

const Employee = ({
  item,
  deleteEmployee,
  changePermission,
}: {
  item: any;
  deleteEmployee: any;
  changePermission: any;
}) => {
  const formatNumber = (num: number) => {
    //Filter only numbers from the input
    let cleaned = ("" + num).replace(/\D/g, "");
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let formattedNumber = "(" + match[1] + ") " + match[2] + "-" + match[3];
      return formattedNumber;
    }
    return null;
  };
  return (
    <>
      <div
        className={
          "bg-slate-900 text-white p-4 w-full rounded-lg border-2 border-slate-800 shadow-md shadow-black hover:scale-105 duration-300 ease-in-out transition-all"
        }
      >
        <div className="flex justify-evenly">
          <div className="my-auto hidden sm:block">
            <div className="bg-slate-800 border-2 text-white border-slate-700 p-3 m-4 rounded-full">
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
                  Employee ID: {item.id}
                </p>
                <p className={"text-xl font-bold tracking-wide"}>
                  {`${item.fN} ${item.lN}`}
                </p>
              </div>
              <div className="visible md:hidden">
                {item.admin ? (
                  <RiAdminLine size={30} />
                ) : (
                  <RiUserLine size={30} />
                )}
                <p className="text-xs text-gray-400 text-center">
                  {item.admin ? "ADMIN" : "USER"}
                </p>
              </div>
            </div>
            <div className="h-0.5 w-full my-2 bg-slate-800 rounded-xl" />
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
            <div className="flex mt-2">
              <button
                onClick={() => changePermission(item.id)}
                className="bg-blue-500 border-2 border-blue-800 mr-1 text-lg tracking-wider px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300"
              >
                {item.admin ? "Make User" : "Make Admin"}
              </button>
              <button
                onClick={() => deleteEmployee(item.id)}
                className="bg-red-500 border-2 border-red-800 ml-1 text-lg tracking-wider px-4 py-2 rounded-lg hover:bg-red-700 transition-all ease-in-out duration-300"
              >
                Delete User
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Employee;
