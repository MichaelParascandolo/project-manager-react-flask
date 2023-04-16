import { useEffect, useState } from "react";
import { BiLogOut, BiMenu } from "react-icons/bi";
import { CgChevronRight } from "react-icons/cg";
import axios from "axios";

const Navbar = (props: any) => {
  const [name, setName] = useState<String>();
  const [admin, setAdmin] = useState<boolean>();
  const [nav, setNav] = useState<Boolean>(false);

  function getData() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/profile",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        setName(res.firstName);
        setAdmin(res.Admin);
      })
      .catch((error) => {
        console.log(error);
        props.removeToken();
        // removes the users token if it's no longer valid
      });
  }
  function logOut() {
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/logout",
    })
      .then((response) => {
        console.log(response.data);
        props.removeToken();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  const navLinks = [
    {
      title: "Home",
      path: "/",
      adminRequired: false,
    },
    {
      title: "Team",
      path: "/team",
      adminRequired: true,
    },
    {
      title: "Clients",
      path: "/clients",
      adminRequired: false,
    },
    {
      title: "Schedule",
      path: "/schedule",
      adminRequired: false,
    },
  ];
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="h-[50px] w-full bg-slate-700 select-none text-white flex justify-between tracking-wide shadow-md shadow-slate-800">
        <div className="my-auto px-4 flex">
          <p>Hello 👋, {name}</p>
          <p className="ml-2 mt-2 text-gray-400 text-[10px]">
            {admin ? "ADMIN" : "USER"}
          </p>
        </div>
        <div className="px-2 my-auto">
          <ul className="hidden md:flex">
            {navLinks.map((item, index) =>
              admin ? (
                <a href={item.path} key={index}>
                  <li
                    className={
                      "px-4 border-b-2 border-transparent hover:border-blue-500 ease-in-out duration-300 transition-all"
                    }
                  >
                    {item.title}
                  </li>
                </a>
              ) : !item.adminRequired ? (
                <a href={item.path} key={index}>
                  <li
                    className={
                      "px-4 border-b-2 border-transparent hover:border-blue-500 ease-in-out duration-300 transition-all"
                    }
                    key={index}
                  >
                    {item.title}
                  </li>
                </a>
              ) : null
            )}
            <button className="text-gray-200 mr-2" onClick={logOut}>
              <BiLogOut size={22} />
            </button>
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
            <div className="bg-slate-700 border-2 border-slate-400 w-[50%] p-4 h-screen">
              <div className="select-none">
                <h1
                  className={`font-pacifico text-center tracking-wide text-white text-[25px]`}
                >
                  Quality Electric Services
                </h1>
                <h2
                  className={`font-roboto text-center text-gray-400 text-[15}px] tracking-widest`}
                >
                  {admin ? "ADMIN" : "USER"}
                </h2>
              </div>
              <div className="ml-4">
                <ul className="mt-8">
                  {navLinks.map((item, index) =>
                    admin ? (
                      <a href={item.path} key={index}>
                        <li className="text-white py-6 flex justify-between tracking-wider">
                          {item.title}
                          <CgChevronRight size={20} className={"mr-2"} />
                        </li>
                        <div className="bg-slate-700/70 w-full h-0.5 rounded-lg" />
                      </a>
                    ) : !item.adminRequired ? (
                      <a href={item.path} key={index}>
                        <li className="text-white py-6 flex justify-between tracking-wider">
                          {item.title}
                          <CgChevronRight size={20} className={"mr-2"} />
                        </li>
                        <div className="bg-slate-700/70 w-full h-0.5 rounded-lg" />
                      </a>
                    ) : null
                  )}
                </ul>
              </div>
              <button
                className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                onClick={props.removeToken}
              >
                Sign Out
              </button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
};

export default Navbar;
