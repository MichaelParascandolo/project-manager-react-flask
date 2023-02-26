import axios from "axios";
import {useEffect, useState, SetStateAction } from "react";
import { BsPersonFill, BsTrashFill } from "react-icons/bs";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";


interface Employee {
  id: number;
  firstName: String;
  lastName: String;
  phone: number;
  hiredDate: String;
}
const tmp : Employee={
  firstName: "",
  lastName: "",
  id: 0,
  phone: 0,
  hiredDate: ""
}



const Team = (props: any) => {
  const [teamMembers, setTeamMembers] = useState<Employee[]>([tmp]);
  function getData() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/profile",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        const res = response.data;
        res.access_token && props.setToken(res.access_token);
        props.setName(res.firstName);
        props.setAdmin(res.Admin);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }
  

  function getTeam() {

    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/employees",
    })
    .then((response) => {
      const emp = response.data;
      setTeamMembers([
      {
          id: emp.id,
          firstName: emp.fN,
          lastName: emp.lN,
          phone: emp.phone,
          hiredDate: emp.hiredDate
      }]);
      
        
      })
      
  }

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [num, setNum] = useState("");
  const time = new Date();
  const handleClick = () => {
    
      setTeamMembers([...teamMembers, {
        firstName: first,
        lastName: last,
        id: Math.random()*400,
        phone: Number(num),
        hiredDate: time.getMonth()+1 + "/" + time.getDate() + "/" + time.getFullYear()
    }])
    
    
  }

  const remove = (element: Employee) => {
    const tmpTeam = teamMembers.filter(t => t.id !== element.id)
    setTeamMembers(tmpTeam)
  }
 

  const [menu, setMenu] = useState<boolean>(false);
  const removeMember = (id: number) => {};
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
  useEffect(() => {
    // formatNumber("12345678");
    getData();
    getTeam();
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
      <Navbar
        name={props.name}
        admin={props.admin}
        removeToken={props.removeToken}
      />
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
                          onChange={e => setFirst(e.target.value)}
                          value={first}
                        />
                        <p className={styles.label}>Last name</p>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="Smith"
                          onChange={e => setLast(e.target.value)}
                          value={last}
                        />
                        <p className={styles.label}>Phone number</p>
                        <input
                          type="text"
                          className={styles.input}
                          placeholder="1-234-6789"
                          onChange={e => setNum(e.target.value)}
                          value = {num}
                        />
                      </div>
                      <div className="flex justify-center">
                        <button className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg my-4 w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                          onClick={handleClick}
                        >
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
                  {item.phone}
                </p>
                {<p className="hidden md:block text-md mx-auto my-auto font-bold">
                    {item.hiredDate}
                  </p>}
               
                <button onClick={() => remove(item)}>
                  <BsTrashFill 
                  size={25}
                  className="my-auto"></BsTrashFill>
                </button>
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
