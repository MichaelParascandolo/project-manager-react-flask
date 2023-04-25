import { CgProfile } from "react-icons/cg";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { FaCity } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";

// formats phone number so (xxx) xxx-xxx format
export const formatNumber = (num: number) => {
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

const Customer = ({
  item,
  token,
  getCustomers,
  admin,
}: {
  item: any;
  token: string;
  getCustomers: any;
  admin: boolean;
}) => {
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const deleteCustomer = (id: number) => {
    if (
      confirm(
        "Are you sure you want to delete this customer?\nThis action cannot be undone."
      ) == true
    ) {
      axios({
        method: "POST",
        url: "http://127.0.0.1:3000/customer/delete",
        headers: {
          Authorization: "Bearer " + token,
        },
        data: { CustomerID: id },
      })
        .then((response) => {
          console.log(response);
          getCustomers();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  };
  return (
    <>
      <li className="bg-slate-700 border-2 border-slate-500 text-white px-4 py-2 rounded-lg shadow-lg shadow-slate-700">
        <div
          onClick={() => setShowDetails(!showDetails)}
          className="flex justify-between w-full select-none cursor-pointer"
        >
          <div className="flex">
            <div className="my-auto">
              <CgProfile className="text-white" size={30} />
            </div>
            <div className="my-auto ml-2 text-start">
              <p className="tracking-wider text-lg">
                {item.FirstName} {item.LastName}
              </p>
            </div>
          </div>
          <div className="my-auto flex flex-wrap">
            <FaCity className="text-white" size={30} />
            <p className="tracking-wider my-auto mx-2">{item.City}</p>
            <div className="bg-slate-700 rounded-xl mx-4 my-auto h-8 w-0.5" />
            <button onClick={() => setShowDetails(!showDetails)}>
              {!showDetails ? (
                <MdExpandMore size={35} />
              ) : (
                <MdExpandLess size={35} />
              )}
            </button>
          </div>
        </div>
        {/* more details */}
        {showDetails ? (
          <>
            <div className="bg-slate-500 mt-2 rounded-xl h-0.5 w-full" />
            <div className="flex justify-around w-full">
              <div className="flex">
                <div className="my-auto mx-8">
                  <div className="flex justify-center">
                    <CgProfile size={70} />
                  </div>
                  <p className="mt-2 text-center text-lg font-bold tracking-wider">
                    {item.FirstName} <br /> {item.LastName}
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 text-start pt-2">
                    Phone: {formatNumber(item.Phone)}
                  </p>
                  <p className="text-gray-300 text-start py-1">
                    Email: {item.Email}
                  </p>
                  <p className="text-gray-300 mt-2 text-start py-1">
                    Address: <br />
                    {item.Street}, {item.City}
                    <br />
                    {item.State} {item.ZIP}
                  </p>
                </div>
              </div>
              <div className="my-auto flex flex-col">
                <a href={`/history/${item.ID}`}>
                  <button className="bg-blue-500 border-2 text-black border-blue-800 text-lg px-4 py-2 rounded-lg w-[200px] hover:bg-blue-700 transition-all ease-in-out duration-300">
                    View Jobs
                  </button>
                </a>
                {admin ? (
                  <button
                    onClick={() => deleteCustomer(item.ID)}
                    className="bg-red-500 border-2 text-black border-red-800 text-lg px-4 py-2 rounded-lg mt-2 w-[200px] hover:bg-red-700 transition-all ease-in-out duration-300"
                  >
                    Delete Customer
                  </button>
                ) : null}
              </div>
            </div>
          </>
        ) : null}
      </li>
    </>
  );
};

export default Customer;
