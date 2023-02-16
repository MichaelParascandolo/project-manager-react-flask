import { useState } from "react";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { CgChevronRight } from "react-icons/cg";
import Logo from "./Logo";

const Navbar = () => {
  const [nav, setNav] = useState<Boolean>(false);
  const navLinks = [
    {
      title: "Home",
      path: "/home",
    },
    {
      title: "Team",
      path: "/team",
    },
    {
      title: "Customers",
      path: "/customers",
    },
    {
      title: "Schedule",
      path: "/schedule",
    },
  ];
  return (
    <>
      <div className="h-[50px] w-full bg-slate-900 select-none text-white flex justify-between tracking-wide shadow-md shadow-slate-900">
        <div className="my-auto px-4 flex">
          <p>Hello 👋, Michael</p>
          {/* <a href="/" className="pl-2 my-auto">
            <button className="text-gray-200">
              <BiLogOut size={22} />
            </button>
          </a> */}
        </div>
        <div className="px-2 my-auto">
          <ul className="hidden md:flex">
            {navLinks.map((item, index) => (
              <li
                className={
                  "px-4 border-b-2 border-transparent hover:border-blue-500 ease-in-out duration-300 transition-all"
                }
                key={index}
              >
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
          <div className="flex md:hidden cursor-pointer">
            <BiMenu size={30} onClick={() => setNav(true)} />
          </div>
        </div>
      </div>
      {/* mobile nav menu */}
      <div
        className={
          nav
            ? "h-screen select-none w-full fixed md:hidden top-0 left-0 bg-black/70 opacity-100 transition-all duration-300 ease-in"
            : "h-screen select-none w-0 fixed md:hidden top-0 left-0 bg-black/70 opacity-0 transition-all duration-300 ease-out"
        }
        onClick={() => setNav(false)}
      >
        {nav ? (
          <>
            <div className="bg-slate-900 border-2 border-slate-800 w-[50%] p-4 h-screen">
              {/*  */}
              <div className="select-none">
                <h1
                  className={`font-pacifico text-center tracking-wide text-white text-[25px]`}
                >
                  Quality Electric Services
                </h1>
                <h2
                  className={`font-roboto text-center text-gray-400 text-[15}px] tracking-widest`}
                >
                  Project Manager
                </h2>
              </div>
              {/*  */}
              <div className="ml-4">
                <ul className="mt-8">
                  {navLinks.map((item, index) => (
                    <a href={item.path} key={index}>
                      <li className="text-white py-6 flex justify-between tracking-wider">
                        {item.title}
                        <CgChevronRight size={20} className={"mr-2"} />
                      </li>
                      <div className="bg-slate-800/70 w-full h-0.5 rounded-lg" />
                    </a>
                  ))}
                </ul>
              </div>
              <a href="/" className="w-full">
                <button className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
                  Sign Out
                </button>
              </a>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
