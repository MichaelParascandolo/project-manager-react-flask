import Navbar from "../components/Navbar";
import { RiTeamFill } from "react-icons/ri";
import { BsPersonFill, BsCalendarFill } from "react-icons/bs";
import Footer from "../components/Footer";

const Home = () => {
  const size: number = 60;
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-20">
        <div className="w-[600px]">
          <div className="text-white text-[50px] font-pacifico tracking-wider text-center my-4">
            Welcome, Michael
          </div>
          <div className="grid grid-cols-2 gap-4 px-4">
            <a href="/team">
              <div className="bg-slate-900 col-span-1 text-white p-4 flex rounded-lg border-2 border-slate-800 shadow-md shadow-black hover:scale-105 duration-300 ease-in-out transition-all">
                <RiTeamFill size={size} />
                <p className="text-xl mx-auto my-auto">Team</p>
              </div>
            </a>
            <a href="/customers">
              <div className="bg-slate-900 col-span-1 text-white p-4 flex rounded-lg border-2 border-slate-800 shadow-md shadow-black hover:scale-105 duration-300 ease-in-out transition-all">
                <BsPersonFill size={size} />
                <p className="text-xl mx-auto my-auto">Customers</p>
              </div>
            </a>
            <a href="/schedule">
              <div className="bg-slate-900 col-span-2 text-white p-4 flex rounded-lg border-2 border-slate-800 shadow-md shadow-black hover:scale-105 duration-300 ease-in-out transition-all">
                <BsCalendarFill size={size} />
                <p className="text-xl mx-auto my-auto">Schedule</p>
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
