import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import { toast, Toaster } from "react-hot-toast";
import {
  CgProfile,
  CgChevronRight,
  CgChevronDown,
  CgSearch,
} from "react-icons/cg";
import Footer from "../components/Footer";
import Customer from "../components/Customer";
import axios from "axios";

const Clients = (props: any) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  // const [menu, setMenu] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [customers, setCustomers] = useState<any[]>([{}]);
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [ZIP, setZIP] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const clearFields = () => {
    setFirst("");
    setLast("");
    setEmail("");
    setCity("");
    setStreet("");
    setPhone("");
    setState("");
    setZIP("");
  };

  function getCustomers() {
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/customer/display",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: { Search: searchTerm },
    }).then((response) => {
      const customers = response.data;
      setCustomers(customers);
      console.log(customers);
    });
  }

  function addCustomer(e: any) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/customer/create",
      headers: {
        Authorization: "Bearer " + props.token,
      },
      data: {
        CustomerID: Math.floor(Math.random() * 90000) + 10000,
        "First Name": first.charAt(0).toUpperCase() + first.slice(1),
        "Last Name": last.charAt(0).toUpperCase() + last.slice(1),
        "Phone Number": phone,
        Email: email,
        City: city.charAt(0).toUpperCase() + city.slice(1),
        Street: street,
        State: state,
        "ZIP Code": ZIP,
      },
    })
      .then((response) => {
        toast.success("Customer Added");
        console.log(response);
        clearFields();
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

  const styles = {
    label: "text-white flex ml-1 text-md tracking-wider",
    input:
      "w-full rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white",
  };
  return (
    <>
      <Toaster />
      <div className="flex justify-center w-full min-h-screen">
        <div className="w-[80%] max-w-[900px] text-center">
          <div className="bg-slate-900 border-2 border-slate-800 shadow-md shadow-black mt-5 p-4 rounded-xl transition-all duration-300 ease-in-out">
            <h2 className="text-white cap font-roboto my-2 text-center text-4xl tracking-wide">
              Manage Clients
            </h2>
            {/* <div className="h-1 rounded-full mb-2 bg-slate-900/50" /> */}
            <form action="">
              <div className="grid md:grid-cols-4 gap-2">
                <div className="col-span-2">
                  <label className={styles.label}>First Name:</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirst(e.target.value)}
                    value={first}
                    required
                    className={styles.input}
                  />
                </div>
                <div className="col-span-2">
                  <label className={styles.label}>Last Name:</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLast(e.target.value)}
                    value={last}
                    required
                    className={styles.input}
                  />
                </div>
                <div className="col-span-2">
                  <label className={styles.label}>Phone Number:</label>
                  <input
                    type="tel"
                    pattern="[1-9]{1}[0-9]{9}"
                    maxLength={10}
                    placeholder="Phone Number"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                    className={styles.input}
                  />
                </div>
                <div className="col-span-2">
                  <label className={styles.label}>Email:</label>
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className={styles.input}
                  />
                </div>
                <div className="col-span-1">
                  <label className={styles.label}>Street Address:</label>
                  <input
                    type="text"
                    placeholder="Street"
                    onChange={(e) => setStreet(e.target.value)}
                    value={street}
                    required
                    className={styles.input}
                  />
                </div>
                <div className="col-span-1">
                  <label className={styles.label}>City:</label>
                  <input
                    type="text"
                    placeholder="City"
                    onChange={(e) => setCity(e.target.value)}
                    value={city}
                    required
                    className={styles.input}
                  />
                </div>
                <div className="col-span-1">
                  <label className={styles.label}>State:</label>
                  <input
                    type="text"
                    placeholder="State"
                    onChange={(e) => setState(e.target.value)}
                    value={state}
                    required
                    className={styles.input}
                  />
                </div>
                <div className="col-span-1">
                  <label className={styles.label}>ZIP Code:</label>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    onChange={(e) => setZIP(e.target.value)}
                    value={ZIP}
                    required
                    className={styles.input}
                  />
                </div>
                <button
                  type="reset"
                  onClick={clearFields}
                  className="bg-red-500 border-2 border-red-800 text-lg px-4 py-2 rounded-lg mt-2 w-full col-span-2 hover:bg-red-700 transition-all ease-in-out duration-300"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  onClick={addCustomer}
                  className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg mt-2 w-full col-span-2 hover:bg-blue-700 transition-all ease-in-out duration-300"
                >
                  Create Customer
                </button>
              </div>
            </form>
          </div>

          <div className="h-1 rounded-full mt-6 bg-slate-900/50" />
          <p className="text-white pt-2 text-2xl">Search Clients</p>
          <div className="flex justify-center">
            <input
              className="mt-4 rounded-lg border-2 tracking-wider border-slate-800 p-2 bg-slate-900 text-white w-full"
              type={"text"}
              placeholder="Search Customers . . ."
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <button
              className="border-slate-800 mt-4 ml-2 p-2 rounded-lg h-[45px] border-2 bg-slate-900 text-white hover:bg-blue-500 ease-in-out duration-300 transition-all"
              onClick={() => (setShowSearch(true), getCustomers())}
            >
              <CgSearch size={25} />
            </button>
          </div>
          {showSearch ? (
            <>
              {/* <p className="text-white text-center py-2 text-xl">
                X Matching Records for {searchTerm}
              </p> */}
              <ul className="m-4">
                <div className="grid md:grid-cols-1 gap-4">
                  {customers.map((item, index) => (
                    <Customer
                      item={item}
                      key={index}
                      token={props.token}
                      getCustomers={getCustomers}
                    />
                  ))}
                </div>
              </ul>
            </>
          ) : null}
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Clients;
