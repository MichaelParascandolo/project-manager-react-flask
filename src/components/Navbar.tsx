import { BiLogOut, BiMenu } from "react-icons/bi";

const Navbar = () => {
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
            <BiMenu size={30} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
