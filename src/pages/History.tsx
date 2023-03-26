import { BsCloudPlus, BsPlusCircle } from "react-icons/bs";
import { CgPhone, CgProfile, CgWorkAlt } from "react-icons/cg";
import { FaCity } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";

const History = () => {
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
  const item = {
    FirstName: "John",
    LastName: "Smith",
    Phone: 1234567891,
    Email: "johnsmith@gmail.com",
    Street: "1 Apple Park",
    City: "Cupertino",
    State: "California",
    ZIP: 95014,
  };
  const jobs = [
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      generatorName: "Generator Name",
    },
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      generatorName: "Generator Name",
    },
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      generatorName: "Generator Name",
    },
  ];

  return (
    <>
      <div className="bg-slate-800 w-full max-w-[900px] mt-5 mx-auto border-2 border-slate-900 text-white p-4 rounded-lg shadow-lg shadow-slate-900">
        <div className="flex justify-between w-full">
          <div className="flex">
            <div className="my-auto">
              <CgProfile className="text-white" size={30} />
            </div>
            <div className="my-auto ml-2 text-start">
              <p className="tracking-wider">
                {item.FirstName} {item.LastName}
              </p>
            </div>
          </div>
          <div className="my-auto flex flex-wrap">
            <FaCity className="text-white" size={30} />
            <p className="tracking-wider my-auto ml-2">{item.City}</p>
          </div>
          <div className="my-auto flex flex-wrap">
            <CgPhone className="text-white" size={30} />
            <p className="tracking-wider my-auto ml-2">
              {formatNumber(item.Phone)}
            </p>
          </div>
        </div>
        <div className="bg-slate-900/50 mt-2 rounded-xl h-1 w-full" />
        {/* more details */}
        <div className="flex justify-between w-full">
          <div className="flex">
            <div className="my-auto mx-8">
              <CgProfile size={70} />
              <p className="mt-2 text-center text-lg font-bold tracking-wider">
                {item.FirstName} <br /> {item.LastName}
              </p>
            </div>
            <div>
              <p className="text-gray-300 text-start pt-2">
                Phone: {formatNumber(item.Phone)}
              </p>
              <p className="text-gray-300 capitalize text-start py-1">
                Email: {item.Email}
              </p>
              <p className="text-gray-300 mt-2 text-start py-1">
                Address: <br />
                {item.Street}, {item.City}
                <br />
                {item.State} {item.ZIP}
              </p>
            </div>
          </div>
          <div className="my-auto flex flex-col">
            {/* <a href="/history">
              <button className="bg-blue-500 border-2 text-black border-blue-800 text-lg px-4 py-2 rounded-lg w-[200px] mt-2 hover:bg-blue-700 transition-all ease-in-out duration-300">
                View Jobs
              </button>
            </a> */}
            <button className="bg-red-500 border-2 text-black border-red-800 text-lg px-4 py-2 rounded-lg mt-2 w-[200px] hover:bg-red-700 transition-all ease-in-out duration-300">
              Delete Customer
            </button>
            {/* <p className="text-gray-600">Customer ID: {item.ID}</p> */}
          </div>
        </div>
        <div className="bg-slate-900/50 mt-1 rounded-xl h-1 w-full" />
        <div className="hidden md:flex my-2 justify-center">
          <div className="my-auto">
            <BsPlusCircle className="text-white" size={30} />
          </div>
          <div className="my-auto ml-2">
            <p className="tracking-wider text-lg">Create Job</p>
          </div>
        </div>
        <div className="bg-slate-900/50 mt-1 rounded-xl h-1 w-full" />
        <div className="hidden md:flex my-2 justify-center">
          <div className="my-auto">
            <CgWorkAlt className="text-white" size={30} />
          </div>
          <div className="my-auto ml-2">
            <p className="tracking-wider text-lg">Job History</p>
          </div>
        </div>
        {/* job history */}
        {jobs.map((item, index) => (
          <div
            key={index}
            className="bg-slate-700 hidden md:block border-2 border-slate-900 text-white p-4 my-2 rounded-lg shadow-md shadow-slate-900"
          >
            <div className="flex justify-between px-2 tracking-wider capitalize">
              <div>{item.generatorName}</div>|<div>{item.serviceType}</div>|
              <div>{item.serviceDate}</div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default History;
