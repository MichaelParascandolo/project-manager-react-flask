import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

{
  /* SignIn function that will check the validity of the login information */
}
function Signin(props: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  function delay(ms = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  function logMeIn(e: any) {
    const toastId = toast.loading("Please wait...");
    e.preventDefault();
    axios({
      method: "POST",
      url: "http://127.0.0.1:3000/token",
      data: {
        email: email,
        password: password,
      },
    })
      .then(async (response) => {
        toast.success("Login Successful", {
          id: toastId,
        });
        await delay();
        props.setToken(response.data.access_token);
      })
      .catch(async (error) => {
        if (error.response) {
          await delay();
          toast.error(error.response.data.msg, {
            id: toastId,
          });
          if (error.response.data.msg == "Invalid Password") {
            setPassword("");
          } else {
            setPassword("");
            setEmail("");
          }
        }
      });
  }
  useEffect(() => {
    navigate("/"); // resets browser path back to /
  }, []);

  const styles = {
    links:
      "text-blue-500 border-b-2 border-transparent hover:border-blue-500 ease-in-out transition-all duration-300",
    label: "text-white py-2",
    input:
      "w-full rounded-lg border-2 tracking-wider border-slate-900 p-2 bg-slate-700 text-white",
  };
  return (
    <div className="flex min-h-screen justify-center">
      <Toaster />
      <div className="my-auto w-full max-w-[550px] p-4">
        <div className="my-auto">
          <div className="-mb-6">
            <Logo />
          </div>
          <div className="mt-10 bg-slate-800 shadow-xl shadow-black rounded-xl border-2 border-slate-900 h-[400px]">
            <div className="flex justify-center">
              <div className="w-[500px] p-8">
                <h2 className="text-white cap font-bold text-center text-xl tracking-wide">
                  Sign in to your account
                </h2>
                <form onSubmit={logMeIn}>
                  <p className={styles.label}>Email</p>
                  <input
                    type="email"
                    value={email}
                    className={styles.input}
                    placeholder="name@company.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className={styles.label}>Password</p>
                  <input
                    type="password"
                    value={password}
                    className={styles.input}
                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                    onChange={(e) => setPassword(e.target.value)}
                    required
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
                      type="submit"
                      className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 mt-4 rounded-lg w-full hover:bg-blue-700 transition-all ease-in-out duration-300"
                    >
                      Login to your account
                    </button>
                  </div>
                </form>
                <div className="mt-4">
                  <p className="text-center text-gray-300 text-md">
                    {/* Don't have an account?{" "}
                    <a href="/signup" className={styles.links}>
                      Sign up
                    </a> */}
                    Contact your admin for registration.
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
