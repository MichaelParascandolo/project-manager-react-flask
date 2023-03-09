import { CgProfile, CgMoreVertical, CgPhone, CgMore } from "react-icons/cg";
import { useState } from "react";

const Customer = ({ item }: { item: any }) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const formatNumber = (num: number) => {
    //Filter only numbers from the input
    let cleaned = ("" + num).replace(/\D/g, "");
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let formattedNumber = "(" + match[1] + ") " + match[2] + "-" + match[3];
      return formattedNumber;
    }
    return null;
  };
  return (
    <>
      <li className="bg-slate-800 border-2 border-slate-900 text-white px-4 py-2 rounded-lg shadow-lg shadow-slate-900">
        <div className="flex justify-between w-full">
          <div className="flex">
            <div className="my-auto">
              <CgProfile className="text-white" size={30} />
            </div>
            <div className="my-auto ml-2 text-start">
              <p className="tracking-wider">{item.FirstName}</p>
              <p className="tracking-wider">{item.LastName}</p>
            </div>
          </div>
          {/* <div className="h-full bg-slate-900/50 rounded-xl w-0.5" /> */}
          <div className="my-auto flex flex-wrap">
            <CgPhone className="text-white" size={30} />
            <p className="tracking-wider my-auto ml-2">
              {formatNumber(item.Phone)}
            </p>
          </div>
        </div>
        <div className="bg-slate-900/50 mt-1 rounded-xl h-1 w-full" />
        {/* more details */}
        {showDetails ? (
          <>
            <p className="text-gray-300 text-start py-1">Email: {item.Email}</p>
            <p className="text-gray-300 text-start py-1">
              Address: <br />
              {item.Street}, {item.City}
              <br />
              {item.State} {item.ZIP}
            </p>
          </>
        ) : null}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-blue-300 text-sm mt-1 tracking-wider hover:text-blue-500"
        >
          {showDetails ? "Hide Details" : "More Details"}
        </button>
      </li>
    </>
  );
};

export default Customer;
