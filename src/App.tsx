import Footer from "./components/Footer";
import Logo from "./components/Logo";

// USED FOR TESTING
const getData = async () => {
  const response = await fetch("/profile");
  const data = await response.json();
  console.log(data);
};

function App() {
  const styles = {
    links:
      "text-blue-500 border-b-2 border-transparent hover:border-blue-500 ease-in-out transition-all duration-300",
    input:
      "w-full rounded-lg border-2 border-slate-900 p-2 bg-slate-700 text-white",
  };
  return (
    <div className="mt-[100px] flex justify-center">
      <div>
        <div className="-mb-6">
          <Logo />
        </div>
        <div className="mt-10 bg-slate-800 shadow-xl shadow-black rounded-xl border-2 border-slate-900 w-[400 py-2px] h-[400px]">
          <div className="flex justify-center">
            <div className="w-[500px] p-8">
              <h2 className="text-white cap font-bold text-center text-xl tracking-wide">
                Sign in to your account
              </h2>
              <p className="text-white py-2">Your email</p>
              <input
                type="email"
                className={styles.input}
                placeholder="name@company.com"
              />
              <p className="text-white py-2">Password</p>
              <input
                type="password"
                className={styles.input}
                placeholder="*******"
              />
              <div className="flex justify-between mt-4">
                <div className="flex">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mr-2 mt-1 accent-blue-500"
                  />
                  <p className="text-gray-400">Remember me</p>
                </div>
                <a href="#" className={styles.links}>
                  Forgot password?
                </a>
              </div>
              <div className="flex justify-center">
                <button className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg mt-4 w-full hover:bg-blue-700 transition-all ease-in-out duration-300">
                  Login to your account
                </button>
              </div>
              <div className="mt-4">
                <p className="text-center text-white text-md">
                  Don't have an account?{" "}
                  <a href="#" className={styles.links}>
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
  );
}

export default App;
