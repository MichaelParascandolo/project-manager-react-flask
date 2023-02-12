import { BsPersonFill, BsCalendarFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Home = () => {
  const iconSize: number = 60;
  const styles = {
    container:
      "bg-slate-900 text-white p-4 flex rounded-lg border-2 border-slate-800 shadow-md shadow-black hover:bg-blue-600 hover:scale-105 duration-300 ease-in-out transition-all",
    text: "text-2xl mx-auto my-auto font-bold tracking-wide",
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-20">
        <div className="w-[600px]">
          <div className="text-white text-[50px] font-pacifico tracking-wider text-center mt-4 select-none">
            Welcome, Michael
          </div>
          <h2 className="font-roboto text-center mb-4 -mt-2 text-gray-400 text-xl tracking-widest select-none">
            Admin
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            <a href="/team">
              <div className={styles.container}>
                <RiTeamFill size={iconSize} />
                <p className={styles.text}>Team</p>
              </div>
            </a>
            <a href="/customers">
              <div className={styles.container}>
                <BsPersonFill size={iconSize} />
                <p className={styles.text}>Customers</p>
              </div>
            </a>
            <a href="/schedule">
              <div className={styles.container}>
                <BsCalendarFill size={iconSize} />
                <p className={styles.text}>Schedule</p>
              </div>
            </a>
            <a href="/">
              <div className={styles.container}>
                <BiLogOut size={iconSize} />
                <p className={styles.text}>Logout</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
