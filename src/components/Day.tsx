import Job from "./Job";

const Day = ({ day, date }: { day: string; date?: number }) => {
  return (
    <>
      <div className="bg-slate-700 rounded-lg shadow-lg shadow-slate-800 border-2 border-slate-400">
        <h1 className="text-white text-center font-mono tracking-wider m-1 text-[25px] bg-slate-700/50 block rounded-lg font-bold">
          {date}
        </h1>
        <h2 className="text-gray-300 text-center font-mono tracking-wider pb-1">
          {day}
        </h2>
        <div className="w-full h-[2px] bg-slate-700 rounded-lg" />
        <Job
          name={"John Smith"}
          desc={"Repair"}
          start={"9:00:am"}
          end={"11:00:am"}
        />
        <Job
          name={"John Smith"}
          desc={"Repair"}
          start={"9:00:am"}
          end={"11:00:am"}
        />
        <Job
          name={"John Smith"}
          desc={"Repair"}
          start={"9:00:am"}
          end={"11:00:am"}
        />
      </div>
    </>
  );
};

export default Day;
