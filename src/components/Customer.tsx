import { CgProfile, CgMoreVertical } from "react-icons/cg";

const Customer = ({
  firstName,
  lastName,
  number,
  address,
  zip,
  email,
}: {
  firstName: string;
  lastName: string;
  number: string;
  address: string;
  zip: number;
  email: string;
}) => {
  return (
    <>
      <li className="bg-slate-800 border-2 border-slate-900 justify-start text-white p-4 m-2 rounded-lg flex shadow-lg shadow-slate-900">
        <div className="flex justify-between w-[100%]">
          <div className="flex">
            <div className="my-auto">
              <CgProfile className="text-white" size={30} />
            </div>
            <div className="my-auto ml-2">
              <p className="tracking-wider">{`${firstName} ${lastName}`}</p>
            </div>
          </div>
          <div className="h-full bg-slate-900/50 rounded-xl w-0.5" />
          <div className="my-auto">
            <p className="tracking-wider">{number}</p>
          </div>
          <div className="my-auto">
            <CgMoreVertical className="text-white" size={30} />
          </div>
        </div>
        <div className="bg-red-500 h-2" />
      </li>
    </>
  );
};

export default Customer;
