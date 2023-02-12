import { BsPersonFill, BsTrashFill } from "react-icons/bs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Team = () => {
  const teamMembers = [
    {
      id: 1,
      firstName: "John",
      lastName: "Smith",
      number: 12345678,
      hiredDate: "Feb 12th 2023",
    },
    {
      id: 2,
      firstName: "John",
      lastName: "Smith",
      number: 12345678,
      hiredDate: "Feb 12th 2023",
    },
    {
      id: 3,
      firstName: "John",
      lastName: "Smith",
      number: 12345678,
      hiredDate: "Feb 12th 2023",
    },
    {
      id: 4,
      firstName: "John",
      lastName: "Smith",
      number: 12345678,
      hiredDate: "Feb 12th 2023",
    },
  ];
  const removeMember = (id: number) => {
    alert("delete " + id);
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-20">
        <div className="max-w-[600px] w-[90%]">
          <div className="text-white text-[50px] font-pacifico tracking-wider text-center my-4 select-none">
            Team Members
          </div>
          <div className="grid grid-cols-1 gap-4 px-4">
            <button className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg mt-4 w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
              Add New Employee
            </button>
            {teamMembers.map((item) => (
              <>
                <div
                  key={item.id}
                  className={
                    "bg-slate-900 text-white p-4 w-full flex rounded-lg border-2 border-slate-800 shadow-md shadow-black hover:bg-blue-600 hover:scale-105 duration-300 ease-in-out transition-all"
                  }
                >
                  <BsPersonFill size={25} />
                  <p
                    className={
                      "text-xl mx-auto my-auto font-bold tracking-wide"
                    }
                  >
                    {`${item.firstName} ${item.lastName}`}
                  </p>
                  <p className="text-md mx-auto my-auto font-bold">
                    {item.number}
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
              </>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
