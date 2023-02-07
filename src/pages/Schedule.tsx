import Day from "../components/Day";
import Footer from "../components/Footer";

const Schedule = () => {
  return (
    <>
      <div>
        <div className="h-[50px] w-full bg-slate-900 text-white flex justify-between tracking-wide shadow-md shadow-slate-900">
          <div className="my-auto px-4">
            <p>Hello, Michael</p>
          </div>
          <div className="my-auto px-4">Logout</div>
        </div>
        <div className="my-4 flex justify-center">
          <h1 className="text-white text-[30px] font-mono tracking-wide">
            Weekly Schedule
          </h1>
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
