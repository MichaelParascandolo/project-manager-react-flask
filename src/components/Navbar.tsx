import { BiLogOut } from "react-icons/bi";

const Navbar = () => {
  const styles = {
    navItem:
      "px-4 border-b-2 border-transparent hover:border-blue-500 ease-in-out duration-300 transition-all",
  };
  return (
    <>
      <div className="h-[50px] w-full bg-slate-900 text-white flex justify-between tracking-wide shadow-md shadow-slate-900">
        <div className="my-auto px-4 flex">
          <p>Hello 👋, Michael</p>
          <a href="/">
            <button className="pl-2 text-gray-200">
              <BiLogOut size={22} />
            </button>
          </a>
        </div>
        <div className="px-2 my-auto">
          <ul className="flex">
            <li className={styles.navItem}>
              <a href="/schedule">Schedule</a>
            </li>
            <li className={styles.navItem}>
              <a href="/customers">Customers</a>
            </li>
            <li className={styles.navItem}>
              <a href="/">Home</a>
            </li>
          </ul>
        </div>
        {/* <div className="my-auto px-4">Logout</div> */}
      </div>
    </>
  );
};

export default Navbar;
