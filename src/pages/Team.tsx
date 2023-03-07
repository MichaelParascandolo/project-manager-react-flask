import axios from "axios";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Employee from "../components/Employee";
import Footer from "../components/Footer";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  admin: boolean;
  hiredDate: string;
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
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [num, setNum] = useState<string>("");
  const [admin, setAdmin] = useState<boolean | undefined>();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const time = new Date();
  const [teamMembers, setTeamMembers] = useState<Employee[]>([tmp]);

  function getTeam() {
    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/employees",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    }).then((response) => {
      const emp = response.data;
      // console.log(emp);

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
        Admin: admin,
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
        toast.success("Employee Added");
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
        toast.error("Something Went Wrong");
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  const deleteEmployee = (id: number) => {
    if (
      confirm(
        "Are you sure you want to delete this user?\nThis action cannot be undone."
      ) == true
    ) {
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
          toast.success("Employee Removed");
          console.log(response);
          getTeam();
        })
        .catch((error) => {
          toast.error("Something Went Wrong");
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  };

  useEffect(() => {
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
      <Toaster />
      <div className="flex justify-center mt-10">
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
                              onClick={() => setAdmin(true)}
                              type="submit"
                              className="bg-blue-500 border-2 border-blue-800 text-lg mr-1 px-4 py-2 rounded-lg my-4 w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                            >
                              Create Admin
                            </button>
                            <button
                              onClick={() => setAdmin(false)}
                              type="submit"
                              className="bg-blue-500 border-2 border-blue-800 text-lg ml-1 px-4 py-2 rounded-lg my-4 w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                            >
                              Create User
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
              <Employee
                item={item}
                key={item.id}
                deleteEmployee={deleteEmployee}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Team;
