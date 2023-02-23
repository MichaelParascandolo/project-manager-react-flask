import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import {
  CgProfile,
  CgChevronRight,
  CgChevronDown,
  CgSearch,
} from "react-icons/cg";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import axios from "axios";

const Customers = (props: any) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
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
  // used for testing
  const customers = [
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
    {
      firstName: "John",
      lastName: "Appleseed",
      number: "1-234-5678",
    },
  ];
  const styles = {
    label: "text-white mr-2 text-md tracking-wider",
    input:
      "p-4 bg-slate-900 border-2 border-slate-700 w-full rounded-lg text-white",
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar
        name={props.name}
        admin={props.admin}
        removeToken={props.removeToken}
      />
      <div className="flex w-full min-h-screen">
        <div className="w-full">
          <div className="flex justify-center">
            <div className="w-[80%] max-w-[900px] text-center">
              <p className="text-white py-2 text-2xl">Create Profile</p>
              <div className="h-1 rounded-full mb-4 bg-slate-900/50" />
              <form action="">
                <div className="grid md:grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <label className={styles.label}>First Name</label>
                    <input
                      type="text"
                      placeholder="First Name"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className="col-span-2">
                    <label className={styles.label}>Last Name</label>
                    <input
                      type="text"
                      placeholder="Last Name"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className={styles.label}>Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className={styles.label}>Email</label>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className={styles.input}
                    />
                  </div>
                  <div className="col-span-1">
                    <label className={styles.label}>Street Address</label>
                    <input
                      type="text"
                      placeholder="Street"
                      required
                      className={styles.input}
                    />
                  </div>
                  {/* <div>
                    <label className={styles.label}>City</label>
                    <input
                      type="text"
                      placeholder="City"
                      required
                      className={styles.input}
                    />
                  </div> */}
                  <div className="col-span-1">
                    <label className={styles.label}>ZIP</label>
                    <input
                      type="text"
                      placeholder="ZIP"
                      required
                      className={styles.input}
                    />
                  </div>
                  <button
                    type="reset"
                    className="bg-red-500 border-2 border-red-800 text-lg px-4 py-2 rounded-lg mt-2 w-full col-span-2 hover:bg-red-700 transition-all ease-in-out duration-300"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg mt-2 w-full col-span-2 hover:bg-blue-700 transition-all ease-in-out duration-300"
                  >
                    Create Customer
                  </button>
                </div>
              </form>

              <div className="h-1 rounded-full my-4 bg-slate-900/50" />
              <p className="text-white py-2 text-2xl">Search Customer</p>
              <div className="flex justify-center">
                <input
                  className="mt-4 rounded-lg border-2 tracking-wider border-slate-800 p-2 bg-slate-900 text-white w-full"
                  type={"text"}
                  placeholder="Search Customers . . ."
                />
                <button
                  className="border-slate-800 mt-4 ml-2 p-2 rounded-lg h-[45px] border-2 bg-slate-900 text-white hover:bg-blue-500 ease-in-out duration-300 transition-all"
                  onClick={() => setShowSearch(!showSearch)}
                >
                  <CgSearch size={25} />
                </button>
              </div>

              <p className="text-white py-2 text-xl">
                X Matching Records for Y
              </p>
            </div>
          </div>
          <ul className="mx-4">
            {customers.map((customer, index) => (
              <li
                key={index}
                className="bg-slate-800 border-2 border-slate-900 justify-start text-white p-4 my-4 rounded-lg flex shadow-lg shadow-slate-900"
              >
                <div className="mr-2 mt-2">
                  <CgProfile className="text-white" size={30} />
                </div>
                <div className="flex justify-between w-[100%]">
                  <div className="ml-4 my-auto">
                    {`${customer.firstName} ${customer.lastName}`}
                  </div>
                  <p className="my-auto">{customer.number}</p>
                </div>
              </li>
            ))}
          </ul>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Customers;
