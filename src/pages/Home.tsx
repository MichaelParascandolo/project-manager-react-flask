import { useEffect, useState } from "react";
import { BsPersonFill, BsCalendarFill } from "react-icons/bs";
import { RiTeamFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import axios from "axios";
import Footer from "../components/Footer";

const Home = (props: any) => {
  const [name, setName] = useState<String>();
  const [admin, setAdmin] = useState<Boolean>();

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
        setName(res.firstName);
        setAdmin(Boolean(res.Admin));
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  // logs out the user and removes their token
  function logOut() {
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/logout",
    })
      .then((response) => {
        console.log(response.data);
        props.removeToken();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  }

  useEffect(() => {
    getData();
  }, []);

  const iconSize: number = 60;
  const styles = {
    container:
      "bg-slate-700 text-white select-none draggable-none p-2 flex rounded-lg border-2 border-slate-500 shadow-lg shadow-slate-700 hover:bg-blue-600 hover:scale-105 duration-300 ease-in-out transition-all",
    text: "text-2xl mx-auto my-auto font-bold tracking-wide",
  };

  // Home page layout, references the different pages of the system
  return (
    <>
      <div className="flex justify-center md:mt-20">
        <div className="w-[600px]">
          <div className="text-gray-100 text-[40px] md:text-[50px] font-pacifico tracking-wider text-center mt-4 select-none">
            Welcome, {name}
          </div>
          <h2 className="font-roboto uppercase text-center mb-4 -mt-2 text-gray-600 font-bold text-xl tracking-wider select-none">
            {admin ? "Admin" : "User"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4">
            {admin ? (
              <a href="/team">
                <div className={styles.container}>
                  <RiTeamFill size={iconSize} />
                  <h3 className={styles.text}>Team</h3>
                </div>
              </a>
            ) : null}
            <a href="/schedule" className={!admin ? "md:col-span-2" : ""}>
              <div className={styles.container}>
                <BsCalendarFill size={iconSize} />
                <h3 className={styles.text}>Schedule</h3>
              </div>
            </a>
            <a href="/clients">
              <div className={styles.container}>
                <BsPersonFill size={iconSize} />
                <h3 className={styles.text}>Clients</h3>
              </div>
            </a>
            <div className={styles.container} onClick={logOut}>
              <BiLogOut size={iconSize} />
              <h3 className={styles.text}>Logout</h3>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
