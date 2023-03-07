import { CgProfile, CgMoreVertical } from "react-icons/cg";

const Customer = ({
  firstName,
  lastName,
  phone,
  street,
  city,
  email,
}: {
  firstName: string;
  lastName: string;
  phone: number;
  street: string;
  city: number;
  email: string;
}) => {
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
            <p className="tracking-wider">{formatNumber(phone)}</p>
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
