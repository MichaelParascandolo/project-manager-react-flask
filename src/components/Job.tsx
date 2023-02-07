import { GoPerson } from "react-icons/go";

const Job = ({
  name,
  desc,
  start,
  end,
}: {
  name: string;
  desc: string;
  start: string;
  end: string;
}) => {
  return (
    <>
      <div className="text-white mb-6 pb-4 bg-slate-900 m-2 rounded-lg shadow-md shadow-black">
        <div className="">
          <div className="flex justify-center">
            <div className="text-center my-2">
              {/* <GoPerson /> */}
              <span>{name}</span>
              <p className="text-gray-400">{desc}</p>
            </div>
          </div>
          <div className="px-4 mx-2 flex justify-between bg-slate-700 p-2 rounded-lg">
            <span className="text-gray-300">{start}</span>-
            <span className="text-gray-300">{end}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Job;
