import { BsCloudPlus, BsPlusCircle } from "react-icons/bs";
import { CgPhone, CgProfile, CgWorkAlt } from "react-icons/cg";
import { FaCity } from "react-icons/fa";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import Footer from "../components/Footer";

const History = () => {
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
  const item = {
    FirstName: "John",
    LastName: "Smith",
    Phone: 1234567891,
    Email: "johnsmith@gmail.com",
    Street: "1 Apple Park",
    City: "Cupertino",
    State: "California",
    ZIP: 95014,
  };
  const jobs = [
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      generatorName: "Generator Name",
    },
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      generatorName: "Generator Name",
    },
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      generatorName: "Generator Name",
    },
  ];
  const styles = {
    label: "text-white flex ml-1 text-md tracking-wider",
    input:
      "w-full rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white",
  };
  return (
    <>
      <div className="bg-slate-800 w-full max-w-[900px] my-5 mx-auto border-2 border-slate-900 text-white p-4 rounded-lg shadow-lg shadow-slate-900">
        <div className="flex py-2 justify-around w-full">
          <div className="my-auto flex">
            <div>
              <div className="flex">
                <CgProfile size={90} />
                <p className="ml-4 text-center text-[30px] tracking-wider">
                  {item.FirstName} <br /> {item.LastName}
                </p>
              </div>
              <button className="bg-red-500 border-2 text-black border-red-800 text-lg px-4 py-2 rounded-lg mt-4 w-[200px] hover:bg-red-700 transition-all ease-in-out duration-300">
                Delete Customer
              </button>
            </div>
          </div>
          <div className="my-auto text-lg">
            <p className="text-gray-300 text-start pt-2">
              Phone: {formatNumber(item.Phone)}
            </p>
            <p className="text-gray-300 text-start py-1">Email: {item.Email}</p>
            <p className="text-gray-300 mt-2 text-start py-1">
              Address: <br />
              {item.Street}, {item.City}
              <br />
              {item.State} {item.ZIP}
            </p>
          </div>
        </div>
        <div className="bg-slate-900/50 my-4 rounded-xl h-1 w-full" />
        {/* create job form */}
        <form>
          <div className="grid md:grid-cols-4 gap-2">
            <div className="col-span-2">
              <label className={styles.label}>Date:</label>
              <input type="text" required className={styles.input} />
            </div>
            <div className="col-span-2">
              <label className={styles.label}>Time:</label>
              <input type="text" required className={styles.input} />
            </div>
            <div className="col-span-2">
              <label className={styles.label}>Generator:</label>
              <input type="text" required className={styles.input} />
            </div>
            <div className="col-span-2">
              <label className={styles.label}>Service Type:</label>
              <input type="email" required className={styles.input} />
            </div>
            <div className="col-span-4">
              <label className={styles.label}>Notes:</label>
              <textarea className="w-full h-[100px] rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white" />
            </div>
            {/* <div className="col-span-2 md:col-span-1">
              <label className={styles.label}>Street Address:</label>
              <input type="text" required className={styles.input} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className={styles.label}>City:</label>
              <input type="text" required className={styles.input} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className={styles.label}>State:</label>
              <input type="text" required className={styles.input} />
            </div>
            <div className="col-span-2 md:col-span-1">
              <label className={styles.label}>ZIP Code:</label>
              <input type="text" required className={styles.input} />
            </div> */}
          </div>
          <button
            type="submit"
            // onClick={addCustomer}
            className="bg-blue-500 border-2 text-black border-blue-800 text-lg px-4 py-2 rounded-lg my-4 w-full col-span-2 hover:bg-blue-700 transition-all ease-in-out duration-300"
          >
            Create Job
          </button>
        </form>
        <div className="bg-slate-900/50 mt-1 rounded-xl h-1 w-full" />
        <div className="hidden md:flex my-2 justify-center">
          <div className="my-auto">
            <CgWorkAlt className="text-white" size={30} />
          </div>
          <div className="my-auto ml-2">
            <p className="tracking-wider text-lg">Job History</p>
          </div>
        </div>
        {/* job history */}
        {jobs.map((item, index) => (
          <div
            key={index}
            className="bg-slate-700 hidden md:block border-2 border-slate-900 text-white p-4 my-2 rounded-lg shadow-md shadow-slate-900"
          >
            <div className="flex justify-between px-2 tracking-wider capitalize">
              <div>{item.generatorName}</div>|<div>{item.serviceType}</div>|
              <div>{item.serviceDate}</div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default History;
