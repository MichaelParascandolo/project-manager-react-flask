import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";
import Day from "../components/Day";
import Footer from "../components/Footer";

{
  /* schedule page showing month week and each individual day*/
}
const Schedule = (props: any) => {
  return (
    <>
      <div className="flex justify-center mt-5">
        <div className="w-[500px] p-4 bg-slate-900 border-2 border-slate-800 shadow-md shadow-black mb-2 rounded-xl h-full transition-all duration-300 ease-in-out">
          <h2 className="text-white cap font-roboto text-center text-4xl tracking-wide">
            Job Schedule
          </h2>
          <h3 className="text-gray-500 uppercase text-sm my-1 text-center tracking-wider">
            X upcoming jobs
          </h3>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 px-2">
        <Day day="Monday" date={6} />
        <Day day="Tuesday" date={7} />
        <Day day="Wednesday" date={8} />
        <Day day="Thursday" date={9} />
        <Day day="Friday" date={10} />
      </div> */}
      <Footer />
    </>
  );
};

export default Schedule;
