import {
  CgProfile,
  CgChevronRight,
  CgChevronDown,
  CgSearch,
} from "react-icons/cg";
import { BsPersonFill } from "react-icons/bs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Customers = () => {
  // used for testing
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
  ];
  return (
    <>
      <Navbar />
      <div className="flex w-full h-screen">
        {/* sidebar */}
        {/* <div className="span-cols-1 bg-slate-900 w-[300px] h-screen">
          <div className="flex justify-center"></div>
          <div className="flex justify-center">
            <input
              className="mt-4 rounded-lg border-2 tracking-wider border-slate-800 p-2 bg-slate-700 text-white w-[90%]"
              type={"text"}
              placeholder="Search Customers"
            />
          </div>
          <div className="ml-4">
            <ul className="mt-8">
              <li className="text-white py-4 flex justify-between tracking-wider">
                Overview <CgChevronRight size={20} className={"mr-2"} />
              </li>
              <li className="text-white py-4 flex justify-between tracking-wider">
                Calendar <CgChevronRight size={20} className={"mr-2"} />
              </li>
              <li className="text-white py-4 flex justify-between tracking-wider">
                Customers <CgChevronRight size={20} className={"mr-2"} />
              </li>
              <li className="text-white py-4 flex justify-between tracking-wider">
                Settings <CgChevronRight size={20} className={"mr-2"} />
              </li>
            </ul>
          </div>
          <div className="mt-20 text-center">
            <a href="/calendar">
              <button className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg w-[90%] hover:bg-blue-700 transition-all ease-in-out duration-300">
                Sign Out
              </button>
            </a>
          </div>
        </div> */}
        {/* schedule */}
        <div className="w-full">
          <div className="flex justify-center">
            <div className="w-[100%] text-center">
              <div className="flex justify-center">
                <input
                  className="mt-4 rounded-lg border-2 tracking-wider border-slate-800 p-2 bg-slate-900 text-white w-[90%]"
                  type={"text"}
                  placeholder="Search Customers . . ."
                />
                <button className="border-slate-800 mt-4 ml-2 p-2 rounded-lg h-[45px] border-2 bg-slate-900 text-white hover:bg-blue-500 ease-in-out duration-300 transition-all">
                  <CgSearch size={25} />
                </button>
              </div>
              <p className="text-white py-2 text-xl">
                X Matching Records for Y
              </p>
            </div>
          </div>
          <ul className="mx-4">
            {/* <div className="bg-slate-800 flex justify-between border-2 border-slate-900 p-2 rounded-lg w-full text-white">
              <div className="ml-14 font-bold tracking-wide">Customer</div>
              <div className="mr-10 font-bold tracking-wide">Phone</div>
            </div> */}
            {customers.map((customer, index) => (
              <li
                key={index}
                className="bg-slate-800 border-2 border-slate-900 justify-start text-white p-4 my-4 rounded-lg flex shadow-lg shadow-slate-900"
              >
                <div className="mr-2 mt-2">
                  <CgProfile className="text-white" size={30} />
                </div>
                <div className="flex justify-between w-[100%]">
                  <div className="ml-4 my-auto">
                    {`${customer.firstName} ${customer.lastName}`}
                    {/* <CgChevronDown className="text-white" size={30} /> */}
                  </div>

                  {/* <div className="my-auto"> */}
                  <p className="my-auto">{customer.number}</p>
                  {/* </div> */}
                </div>
              </li>
            ))}
            {/* <div className="bg-slate-800 flex justify-between border-2 border-slate-900 p-2 rounded-lg w-full text-white">
              <div className="ml-14 font-bold tracking-wide">Customer</div>
              <div className="mr-10 font-bold tracking-wide">Phone</div>
            </div> */}
          </ul>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Customers;
