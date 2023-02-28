import { useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

function Signin(props: any) {
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  function logMeIn(event: any) {
    event.preventDefault();
    if (loginForm.email != "" && loginForm.password != "") {
      axios({
        method: "POST",
        url: "http://127.0.0.1:3000/token",
        data: {
          email: loginForm.email,
          password: loginForm.password,
        },
      })
        .then((response) => {
          props.setToken(response.data.access_token);
          setWrongPassword(false);
          // console.log("Email" + loginForm.email);
          // console.log("Password" + loginForm.password);
          // console.log("Token" + response.data.access_token);
        })
        .catch((error) => {
          if (error.response) {
            setWrongPassword(true);
            console.log(error.response);
            console.log(error.response.status);
            console.log(error.response.headers);
          }
        });

      setLoginForm({
        email: "",
        password: "",
      });
    }
  }

  function handleChange(event: any) {
    const { value, name } = event.target;
    setLoginForm((prevNote) => ({
      ...prevNote,
      [name]: value,
    }));
  }

  const styles = {
    links:
      "text-blue-500 border-b-2 border-transparent hover:border-blue-500 ease-in-out transition-all duration-300",
    label: "text-white py-2",
    input:
      "w-full rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white",
  };
  return (
    <div className="flex min-h-screen justify-center">
      <div className="my-auto w-full max-w-[550px] p-4">
        <div className="my-auto">
          <div className="-mb-6">
            <Logo />
          </div>
          <div className="mt-10 bg-slate-800 shadow-xl shadow-black rounded-xl border-2 border-slate-900 h-[400px]">
            <div className="flex justify-center">
              <div className="w-[500px] p-8">
                {!wrongPassword ? (
                  <h2 className="text-white cap font-bold text-center text-xl tracking-wide">
                    Sign in to your account
                  </h2>
                ) : (
                  <h2 className="text-red-500 cap font-bold text-center text-xl tracking-wide">
                    Invalid Credentials
                  </h2>
                )}

                <form className="login">
                  <p className={styles.label}>Email</p>
                  <input
                    type="email"
                    name="email"
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="name@company.com"
                    value={loginForm.email}
                  />
                  <p className={styles.label}>Password</p>
                  <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    value={loginForm.password}
                  />
                  <div className="flex justify-between mt-4">
                    <div className="flex">
                      <input
                        type="checkbox"
                        className="w-4 h-4 mr-2 mt-1 accent-blue-500"
                      />
                      <p className="text-gray-300">Remember me</p>
                    </div>
                    <a href="#" className={styles.links}>
                      Forgot password?
                    </a>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 mt-4 rounded-lg w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                      onClick={logMeIn}
                    >
                      Login to your account
                    </button>
                  </div>
                </form>
                <div className="mt-4">
                  <p className="text-center text-gray-300 text-md">
                    Don't have an account?{" "}
                    <a href="/signup" className={styles.links}>
                      Sign up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Signin;
