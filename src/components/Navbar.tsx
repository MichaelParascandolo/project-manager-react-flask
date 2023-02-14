import { useState } from "react";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { CgChevronRight } from "react-icons/cg";
import Logo from "./Logo";

const Navbar = () => {
  const [nav, setNav] = useState<Boolean>(true);
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
  const styles = {
    navItem:
      "px-4 border-b-2 border-transparent hover:border-blue-500 ease-in-out duration-300 transition-all",
  };
  return (
    <>
      <div className="h-[50px] w-full bg-slate-900 text-white flex justify-between tracking-wide shadow-md shadow-slate-900">
        <div className="my-auto px-4 flex">
          <p>Hello 👋, Michael</p>
          <a href="/" className="pl-2 my-auto">
            <button className="text-gray-200">
              <BiLogOut size={22} />
            </button>
          </a>
        </div>
        <div className="px-2 my-auto">
          <ul className="hidden md:flex">
            {navLinks.map((item, index) => (
              <li className={styles.navItem} key={index}>
                <a href={item.path}>{item.title}</a>
              </li>
            ))}
          </ul>
          <div className="flex md:hidden">
            <BiMenu size={30} onClick={() => setNav(!nav)} />
          </div>
        </div>
      </div>
      {/* mobile nav menu */}
      {nav ? (
        <>
          <div className="h-screen w-full fixed top-0 left-0 bg-black/70">
            <div className="bg-slate-900 border-2 border-slate-800 w-[300px] h-screen">
              <Logo />
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
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Navbar;
