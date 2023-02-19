import { useEffect, useState } from "react";
import { BsPersonFill, BsTrashFill } from "react-icons/bs";
import Footer from "../components/Footer";

const Team = () => {
  let initialMembers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      number: 1234567891,
      hiredDate: "Feb 12th 2023",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Smith",
      number: 1234567891,
      hiredDate: "Feb 12th 2023",
    },
    {
      id: 3,
      firstName: "John",
      lastName: "Smith",
      number: 1234567891,
      hiredDate: "Feb 12th 2023",
    },
    {
      id: 4,
      firstName: "John",
      lastName: "Smith",
      number: 1234567891,
      hiredDate: "Feb 12th 2023",
    },
  ];
  const [teamMembers, setTeamMembers] = useState(initialMembers);
  const [menu, setMenu] = useState<boolean>(false);
  const removeMember = (id: number) => {};
  const formatNumber = (num: number) => {
    //Filter only numbers from the input
    let cleaned = ("" + num).replace(/\D/g, "");
    //Check if the input is of correct length
    let match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      let formattedNumber = "(" + match[1] + ") " + match[2] + "-" + match[3];
      // console.log(formattedNumber);
      return formattedNumber;
    }
    return null;
  };
  useEffect(() => {
    // formatNumber("12345678");
  }, []);
  const styles = {
    links:
      "text-blue-500 border-b-2 border-transparent hover:border-blue-500 ease-in-out transition-all duration-300",
    label: "text-white py-2",
    input:
      "w-full rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white",
  };
  return (
    <>
      {/* <Navbar /> */}
      <div className="flex justify-center mt-20">
        <div className="max-w-[600px] w-[90%]">
          {/* <div className="text-white text-[50px] font-pacifico tracking-wider text-center my-4 select-none">
            Team Members
          </div> */}
          <div className="grid grid-cols-1 gap-4 px-4">
            {/* <button className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg mt-4 w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
              Add New Employee
            </button> */}
            {/* add employee menu start */}
            <div
              className={
                menu
                  ? "bg-slate-900 border-2 border-slate-800 shadow-md shadow-black mb-5 rounded-xl h-[450px] transition-all duration-300 ease-in-out"
                  : "bg-slate-900 border-2 border-slate-800 shadow-md shadow-black mb-5 rounded-xl h-[130px] transition-all duration-300 ease-in-out"
              }
            >
              <div className="flex justify-center">
                <div className="w-[500px] p-4">
                  <h2 className="text-white cap font-pacifico text-center text-4xl tracking-wide">
                    Team Members
                  </h2>
                  <div className="flex justify-center">
                    {!menu ? (
                      <button
                        className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg mt-2 w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                        onClick={() => setMenu(true)}
                      >
                        New Employee
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 border-2 border-red-800 text-lg px-4 py-2 rounded-lg mt-2 w-full hover:bg-red-700 transition-all ease-in-out duration-300"
                        onClick={() => setMenu(false)}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                  {menu ? (
                    <>
                      <div>
                        <p className={styles.label}>First name</p>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="John"
                        />
                        <p className={styles.label}>Last name</p>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Smith"
                        />
                        <p className={styles.label}>Phone number</p>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="1-234-6789"
                        />
                      </div>
                      <div className="flex justify-center">
                        <button className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg my-4 w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
                          Create Employee
                        </button>
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
            {/* add employee menu end */}

            {teamMembers.map((item) => (
              <div
                key={item.id}
                className={
                  "bg-slate-900 text-white p-4 w-full flex rounded-lg border-2 border-slate-800 shadow-md shadow-black hover:bg-blue-600 hover:scale-105 duration-300 ease-in-out transition-all"
                }
              >
                <BsPersonFill size={25} />
                <p
                  className={"text-xl mx-auto my-auto font-bold tracking-wide"}
                >
                  {`${item.firstName} ${item.lastName}`}
                </p>
                <p className="text-md mx-auto my-auto font-bold">
                  {formatNumber(item.number)}
                </p>
                {/* <p className="hidden md:block text-md mx-auto my-auto font-bold">
                    {item.hiredDate}
                  </p> */}
                <BsTrashFill
                  onClick={() => removeMember(item.id)}
                  size={25}
                  className="my-auto"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
