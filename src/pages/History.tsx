import { CgProfile, CgWorkAlt } from "react-icons/cg";
import { IoMdArrowRoundBack, IoMdTrash } from "react-icons/io";
import Footer from "../components/Footer";
import { formatNumber } from "../components/Customer";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const History = (props: any) => {
  const { customerID } = useParams();
  const [display, setDisplay] = useState<boolean>(false);
  const [item, setItem] = useState<any>();
  const [generators, setGenerators] = useState<any[]>([{}]);
  const [work, setWork] = useState<any[]>([{}]);
  const getGenerators = () => {
    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/generators/details",
      headers: {
        Authorization: "Bearer " + props.token,
      },
    })
      .then((response) => {
        setGenerators(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      })
  };
  const getData = (id: number) => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/customer/details",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: { clientID: id },
    })
      .then((response) => {
        setItem(response.data);
        setDisplay(true);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
  // might be able to just import this function from customer component
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
          Authorization: "Bearer " + props.token,
        },
        data: { CustomerID: id },
      })
        .then((response) => {
          console.log(response);
          history.back();
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
          }
        });
    }
  };
 
  const getWork = (id: number) => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/service/details",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: { CustomerID: id },
    })
      .then((response) => {
        setWork(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        }
      });
  };
  useEffect(() => {
    getData(Number(customerID)); // searches customer by their ID
    getWork(Number(customerID));
    getGenerators();
  }, []);
  // used for testing
  const jobs = [
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      serviceTime: "11:00AM",
      generatorName: "Generator Name",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quos suscipit quibusdam sapiente voluptatum? Quam ipsam nostrum eum in voluptatibus.",
    },
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      serviceTime: "11:00AM",
      generatorName: "Generator Name",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quos suscipit quibusdam sapiente voluptatum? Quam ipsam nostrum eum in voluptatibus.",
    },
    {
      serviceType: "installation",
      serviceDate: "3/19/2023",
      serviceTime: "11:00AM",
      generatorName: "Generator Name",
      notes:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa quos suscipit quibusdam sapiente voluptatum? Quam ipsam nostrum eum in voluptatibus.",
    },
  ];
  const styles = {
    label: "text-white flex ml-1 text-md tracking-wider",
    input:
      "w-full rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white",
    button:
      "flex uppercase bg-slate-700 px-4 py-1.5 rounded-lg text-sm border-slate-600 hover:bg-blue-500 transition-all ease-in-out duration-300",
  };
  return (
    <>
      <div className="bg-slate-800 w-full max-w-[900px] my-5 mx-auto border-2 border-slate-900 text-white p-4 rounded-lg shadow-lg shadow-slate-900">
        {display ? (
          <>
            <div className="flex justify-between w-full">
              <a href="/clients">
                <button className={styles.button}>
                  <IoMdArrowRoundBack className="text-white mr-2" size={20} />{" "}
                  back
                </button>
              </a>
              <div className="flex">
                <div className="my-auto">
                  <button
                    onClick={() => deleteCustomer(item.ID)}
                    className={styles.button}
                  >
                    <IoMdTrash className="text-white mr-2" size={20} />
                    Delete Customer
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 mt-2 rounded-xl h-1 w-full" />
            <div className="flex py-2 justify-around w-full">
              <div className="my-auto flex">
                <div>
                  <div className="flex">
                    <CgProfile size={80} />
                    <div className="my-auto ml-4">
                      <p className="text-[30px] tracking-wider">
                        {item.FirstName} {item.LastName}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-auto text-lg">
                <div>
                  <p className="text-gray-300 text-start pt-2">
                    Phone:{" "}
                    <span className="text-white">
                      {formatNumber(item.Phone)}
                    </span>
                  </p>
                  <p className="text-gray-300 text-start py-1">
                    Email: <span className="text-white">{item.Email}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-300 mt-2 text-start py-1">
                    Address: <br />
                    <span className="text-white">
                      {item.Street}, {item.City}
                    </span>
                    <br />
                    <span className="text-white">
                      {item.State} {item.ZIP}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/50 my-4 rounded-xl h-1 w-full" />
            {/* create job form */}
            <form>
              <div className="grid md:grid-cols-4 gap-2">
                <div className="col-span-2">
                  <label className={styles.label}>Date:</label>
                  <input type="date" required className={styles.input} />
                </div>
                <div className="col-span-2">
                  <label className={styles.label}>Time:</label>
                  <input type="time" required className={styles.input} />
                </div>
                <div className="col-span-2">
                  <label className={styles.label}>Generator:</label>
                    <select required className={styles.input}>
                      {generators.map((gen, index) => (
                          <option value="{gen.gID}">{gen.gName}</option>
                      ))}  
                    </select>
                {/*<input type="text" required className={styles.input} />*/}
                </div>
                <div className="col-span-2">
                  <label className={styles.label}>Service Type:</label>
                  <input type="email" required className={styles.input} />
                </div>
                <div className="col-span-4">
                  <label className={styles.label}>Notes:</label>
                  <textarea className="w-full h-[100px] rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white" />
                </div>
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
                <div className="flex text-sm justify-between px-2 tracking-wider capitalize">
                  <div>
                    <div className="text-gray-200">{item.generatorName}</div>
                    <div className="text-gray-400">{item.serviceType}</div>
                  </div>
                  <div>
                    <div className="text-gray-200">{item.serviceDate}</div>
                    <div className="text-gray-400">{item.serviceTime}</div>
                  </div>
                </div>
                <div className="bg-slate-300/50 mt-2 rounded-xl h-0.5 w-full" />
                <div className="p-2 text-gray-300 tracking-wider capitalize">
                  {item.notes}
                </div>
              </div>
            ))}
            <p className="text-gray-400 text-center mt-2">Client: {item.ID}</p>
          </>
        ) : (
          <p className="text-white">Loading . . .</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default History;
