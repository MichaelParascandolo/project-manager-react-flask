import {
  CgProfile,
  CgChevronRight,
  CgChevronDown,
  CgChevronUp,
} from "react-icons/cg";
import { BsPersonFill } from "react-icons/bs";

const Schedule = () => {
  const customers = [
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
  ];
  return (
    <>
      <div className="flex w-full">
        {/* sidebar */}
        <div className="span-cols-1 bg-slate-900 h-screen w-[300px]">
          <div className="flex justify-center">
            <div className="mt-6">
              <div className="flex justify-center">
                <BsPersonFill className="text-white" size={40} />
              </div>
              <p className="text-lg text-white tracking-wider">
                Hello, Michael
              </p>
            </div>
          </div>
          <div className="flex justify-center">
            <input
              className="bg-slate-600 text-lg bg-2 px-2 py-1 m-2 text-white rounded-md w-full"
              type={"text"}
              placeholder="Search Customers"
            />
          </div>
          <div className="ml-4">
            <ul className="mt-8">
              <li className="text-white py-4 flex justify-between">
                Calendar <CgChevronRight size={20} className={"mr-2"} />
              </li>
              <li className="text-white py-4 flex justify-between">
                Customers <CgChevronRight size={20} className={"mr-2"} />
              </li>
              <li className="text-white py-4 flex justify-between">
                Settings <CgChevronRight size={20} className={"mr-2"} />
              </li>
            </ul>
          </div>
        </div>
        {/* schedule */}
        <div className="span-cols-3 bg-slate-600 h-screen w-full">
          <div className="pl-4">
            <p className="text-white py-2 text-xl">
              X Matching Records for for Y
            </p>
            {/* <p className="text-white py-2 text-xl">Search Results</p> */}
          </div>
          <ul className="mx-4">
            <div className="bg-slate-800 flex justify-between border-2 border-slate-900 p-2 rounded-lg w-full text-white">
              <div className="ml-10 font-bold tracking-wide">Customer</div>
              <div className="mr-10 font-bold tracking-wide">Phone</div>
            </div>
            {customers.map((customer, index) => (
              <li
                key={index}
                className="bg-slate-800 border-2 border-slate-900 justify-start text-white p-4 my-4 rounded-lg flex shadow-lg shadow-slate-900"
              >
                <div className="flex justify-between">
                  <div className="mr-2 mt-2">
                    <CgProfile className="text-white" size={30} />
                  </div>
                  <div>
                    <div>{`${customer.firstName} ${customer.lastName}`}</div>
                    <CgChevronDown className="text-white" size={30} />
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Schedule;
