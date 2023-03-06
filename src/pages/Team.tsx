import axios from "axios";
import { useEffect, useState } from "react";
import { BsPersonFill, BsTrashFill } from "react-icons/bs";
import { RiUserLine, RiAdminLine } from "react-icons/ri";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

interface Employee {
  id: number;
  firstName: String;
  lastName: String;
  phone: number;
  email: String;
  admin: boolean;
  hiredDate: String;
}
const tmp: Employee = {
  firstName: "",
  lastName: "",
  id: 0,
  phone: 0,
  admin: false,
  email: "",
  hiredDate: "",
};

const Team = (props: any) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [num, setNum] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const time = new Date();
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
        // props.removeToken();
        console.log(error);
      });
  }

  function getTeam() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/employees",
    }).then((response) => {
      const emp = response.data;
      console.log(emp);

      var tmp: Employee[] = [];

      for (const person of emp)
        tmp = [
          ...tmp,
          {
            firstName: person.fN,
            lastName: person.lN,
            id: person.id,
            phone: person.phone,
            admin: person.admin,
            email: person.email,
            hiredDate: person.hiredDate,
          },
        ];
      setTeamMembers([...tmp]);
    });
  }

  function addEmployee(e: any) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://localhost:3000/employees/create",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: {
        EmployeeID: Math.floor(Math.random() * 90000) + 10000,
        Email: email,
        Password: password,
        "First Name": first.charAt(0).toUpperCase() + first.slice(1),
        "Last Name": last.charAt(0).toUpperCase() + last.slice(1),
        "Phone Number": num,
        Admin: false,
        hiredDate:
          time.getMonth() +
          1 +
          " / " +
          time.getDate() +
          " / " +
          time.getFullYear(),
      },
    })
      .then((response) => {
        console.log(response);
        setFirst("");
        setLast("");
        setNum("");
        setEmail("");
        setPassword("");
        setMenu(false);
        getTeam();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const deleteEmployee = (id: number) => {
    axios({
      method: "POST",
      url: "http://localhost:3000/employees/delete",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: {
        EmployeeID: id,
      },
    })
      .then((response) => {
        console.log(response);
        getTeam();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
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
        <div className="max-w-[550px] w-[90%]">
          <div className="grid grid-cols-1 gap-4 px-4">
            <div
              className={
                menu
                  ? "bg-slate-900 border-2 border-slate-800 shadow-md shadow-black mb-5 rounded-xl h-[640px] transition-all duration-300 ease-in-out"
                  : "bg-slate-900 border-2 border-slate-800 shadow-md shadow-black mb-5 rounded-xl h-[150px] transition-all duration-300 ease-in-out"
              }
            >
              <div className="flex justify-center">
                <div className="w-[500px] p-4">
                  <h2 className="text-white cap font-pacifico text-center text-4xl tracking-wide">
                    Team Members
                  </h2>
                  <h3 className="text-gray-400 text-center tracking-wider">
                    {teamMembers.length} Total Employees
                  </h3>
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
                  <div
                    className={
                      menu
                        ? "opacity-1 transition-all ease-in-out duration-500"
                        : "opacity-0 transition-all ease-in-out duration-500"
                    }
                  >
                    {/* add new employee dropdown menu */}
                    {menu ? (
                      <>
                        <form onSubmit={addEmployee}>
                          <p className={styles.label}>First name</p>
                          <input
                            type="text"
                            className={styles.input}
                            placeholder="John"
                            onChange={(e) => setFirst(e.target.value)}
                            value={first}
                            required
                          />
                          <p className={styles.label}>Last name</p>
                          <input
                            type="text"
                            className={styles.input}
                            placeholder="Smith"
                            onChange={(e) => setLast(e.target.value)}
                            value={last}
                            required
                          />
                          <p className={styles.label}>Phone number</p>
                          <input
                            type="text"
                            pattern="[1-9]{1}[0-9]{9}"
                            maxLength={10}
                            className={styles.input}
                            placeholder="1-234-6789"
                            onChange={(e) => setNum(e.target.value)}
                            value={num}
                            required
                          />
                          <p className={styles.label}>Email:</p>
                          <input
                            type="email"
                            className={styles.input}
                            placeholder="Johnsmith@gmail.com"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            required
                          />
                          <p className={styles.label}>Password:</p>
                          <input
                            type="password"
                            className={styles.input}
                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            required
                          />
                          <div className="flex justify-center">
                            <button
                              type="submit"
                              className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg my-4 w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                            >
                              Create Employee
                            </button>
                          </div>
                        </form>
                      </>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
            {/* list of employees */}
            {teamMembers.map((item) => (
              <div
                key={item.id}
                className={
                  "bg-slate-900 text-white p-4 w-full rounded-lg border-2 border-slate-800 shadow-md shadow-black hover:scale-105 duration-300 ease-in-out transition-all"
                }
              >
                <div className="flex justify-evenly">
                  <div className="my-auto hidden sm:block">
                    <div className="bg-slate-800 border-2 text-white border-slate-700 p-3 m-4 rounded-full">
                      {item.admin ? (
                        <RiAdminLine size={70} />
                      ) : (
                        <RiUserLine size={70} />
                      )}
                    </div>
                    <p className="text-lg text-center text-gray-400 tracking-wide font-bold">
                      {item.admin ? "ADMIN" : "USER"}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 tracking-wide">
                      Employee ID: {item.id}
                    </p>
                    <p className={"text-xl font-bold tracking-wide"}>
                      {`${item.firstName} ${item.lastName}`}
                    </p>
                    <div className="h-0.5 w-full my-2 bg-slate-800 rounded-xl" />
                    <p className="text-md py-0.5 tracking-wide text-gray-200">
                      Number:
                      <span className="ml-2">{formatNumber(item.phone)}</span>
                    </p>
                    <p className="text-md py-0.5 tracking-wide text-gray-200">
                      Email: <span className="ml-2">{item.email}</span>
                    </p>
                    <p className="text-md py-0.5 tracking-wide text-gray-200">
                      Hired: <span className="ml-2">{item.hiredDate}</span>
                    </p>
                    <div className="flex mt-2">
                      <button className="bg-blue-500 border-2 border-blue-800 mr-1 text-lg tracking-wider px-4 py-2 rounded-lg hover:bg-blue-700 transition-all ease-in-out duration-300">
                        {item.admin ? "Make User" : "Make Admin"}
                      </button>
                      <button className="bg-red-500 border-2 border-red-800 ml-1 text-lg tracking-wider px-4 py-2 rounded-lg hover:bg-red-700 transition-all ease-in-out duration-300">
                        Delete User
                      </button>
                    </div>
                  </div>
                </div>
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
