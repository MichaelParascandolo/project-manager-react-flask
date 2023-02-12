import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Day from "../components/Day";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Schedule = () => {
  return (
    <>
      <div>
        <Navbar />
        <div className="my-4 flex justify-center">
          <div className="text-center">
            <h1 className="text-white text-[30px] mb-2 font-mono tracking-wide">
              February
            </h1>
            <div className="flex justify-evenly">
              <div className=" bg-slate-400 rounded-full mr-2">
                <MdNavigateBefore size={25} />
              </div>
              <h2 className="text-gray-400 font-bold tracking-wider">
                6th - 10th
              </h2>
              <div className=" bg-slate-400 rounded-full ml-2">
                <MdNavigateNext size={25} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2">
          <Day day="Monday" date={6} />
          <Day day="Tuesday" date={7} />
          <Day day="Wednesday" date={8} />
          <Day day="Thursday" date={9} />
          <Day day="Friday" date={10} />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Schedule;
