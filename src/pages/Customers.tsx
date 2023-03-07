import { useEffect, useState } from "react";
import { BsPersonFill } from "react-icons/bs";
import {
  CgProfile,
  CgChevronRight,
  CgChevronDown,
  CgSearch,
} from "react-icons/cg";
import Footer from "../components/Footer";
import Customer from "../components/Customer";
import axios from "axios";

const Customers = (props: any) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [customers, setCustomers] = useState<any[]>([{}]);
  const [first, setFirst] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const clearFields = () => {
    setFirst("")
    setLast("")
    setEmail("")
    setCity("")
    setStreet("")
    setPhone("")
  }
  
  function getCustomers() {
    axios({
      method: "POST",
      url:"http://127.0.0.1:3000/customers",
      headers: {
        Authorization: "Bearer" + props.token,
      },
      data: {Search: searchTerm},
    })
    axios({
      method: "GET",
      url: "http://127.0.0.1:3000/customers",
      headers: {
        Authorization: "Bearer" + props.token
      },
    }).then(response => {
      const cust = response.data
      let tmp : any[] = []
      for (const person of cust)
      {
        tmp = [...tmp,
        {
          id: person.ID,
          firstName: person.FirstName,
          lastName: person.LastName,
          email: person.Email,
          city: person.City,
          street: person.Street,
          phone: person.Phone,
        }]
      }
      setCustomers([...tmp])
    })

  }

  function addCustomer(e:any) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/customer/create",
      headers: {
        Authorization: "Bearer" + props.token,
      },
      data: {
        CustomerID: Math.floor(Math.random() * 90000) + 10000,
        "First Name": first.charAt(0).toUpperCase() + first.slice(1),
        "Last Name": last.charAt(0).toUpperCase() + last.slice(1),
        Email: email,
        City: city.charAt(0).toUpperCase() + city.slice(1),
        Street: street,
        "Phone Number": phone,
      },
    }).then(response => {
      console.log(response)
      clearFields()
      getCustomers()
    }).catch(error => {

      if (error.response)
      {
        console.log(error.response)
        console.log(error.response.status)
        console.log(error.response.headers)
      }
    })
  }

  const deleteCustomer = (id:number) => {
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/customer/delete",
      headers: {
        Authorization: "Bearer" + props.token,
      },
      data: {CustomerID: id},
    }).then(response => {
      console.log(response)
      getCustomers()
    }).catch(error => {
      if (error.response)
      {
        console.log(error.response)
      }
    })
  }

  const styles = {
    label: "text-white mr-2 text-md tracking-wider",
    input:
      "p-4 bg-slate-900 border-2 border-slate-700 w-full rounded-lg text-white",
  };
  return (
    <>
      <div className="flex justify-center w-full min-h-screen">
        <div className="w-[80%] max-w-[900px] text-center">
          <p className="text-white py-2 text-2xl">Create Profile</p>
          <div className="h-1 rounded-full mb-4 bg-slate-900/50" />
          <form action="">
            <div className="grid md:grid-cols-4 gap-2">
              <div className="col-span-2">
                <label className={styles.label}>First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  onChange={e => setFirst(e.target.value)}
                  value={first}
                  required
                  className={styles.input}
                />
              </div>
              <div className="col-span-2">
                <label className={styles.label}>Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  onChange={e => setLast(e.target.value)}
                  value={last}
                  required
                  className={styles.input}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className={styles.label}>Phone Number</label>
                <input
                  type="tel"
                  pattern="[1-9]{1}[0-9]{9}"
                  maxLength={10}
                  placeholder="Phone Number"
                  onChange={e => setPhone(e.target.value)}
                  value={phone}
                  required
                  className={styles.input}
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className={styles.label}>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={e => setEmail(e.target.value)}
                  value={email}
                  required
                  className={styles.input}
                />
              </div>
              <div className="col-span-1">
                <label className={styles.label}>Street Address</label>
                <input
                  type="text"
                  placeholder="Street"
                  onChange={e => setStreet(e.target.value)}
                  value={street}
                  required
                  className={styles.input}
                />
              </div>
              <div className="col-span-1">
                <label className={styles.label}>City</label>
                  <input
                    type="text"
                    placeholder="City"
                    onChange={e => setCity(e.target.value)}
                    value={city}
                    required
                    className={styles.input}
                  />
              </div>
              {/*div className="col-span-1">
                <label className={styles.label}>ZIP</label>
                <input
                  type="text"
                  placeholder="ZIP"
                  required
                  className={styles.input}
                />
              </div*/}
              <button
                type="reset"
                onClick={clearFields}
                className="bg-red-500 border-2 border-red-800 text-lg px-4 py-2 rounded-lg mt-2 w-full col-span-2 hover:bg-red-700 transition-all ease-in-out duration-300"
              >
                Reset
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

          <div className="h-1 rounded-full my-4 bg-slate-900/50" />
          <p className="text-white pt-2 text-2xl">Search Customers</p>
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
              onClick={() => (setShowSearch(!showSearch), getCustomers())}
            >
              <CgSearch size={25} />
            </button>
          </div>
          {showSearch ? (
            <>
              <p className="text-white text-center py-2 text-xl">
                X Matching Records for {searchTerm}
              </p>
              <ul className="mx-4">
                <div className="grid md:grid-cols-2 gap-2">
                  {customers.map((customer) => (
                    <Customer
                      firstName={customer.firstName}
                      lastName={customer.lastName}
                      phone={customer.phone}
                      street={customer.street}
                      city={customer.city}
                      email={customer.email}
                      key={customer.id}
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

export default Customers;
