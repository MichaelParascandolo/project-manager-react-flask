import Footer from "../components/Footer";
import Logo from "../components/Logo";
import { BiError } from "react-icons/bi";

function NotFound() {
  return (
    <div className="mt-[125px] flex justify-center">
      <div className="my-auto w-full max-w-[600px] p-4">
        <div className="-mb-6">
          <Logo />
        </div>
        <div className="mt-10 bg-slate-800 shadow-lg shadow-black rounded-xl border-2 border-slate-900 h-[250px]">
          <div className="flex justify-center">
            <div className="w-[500px] p-8">
              <div className="text-white flex justify-center mb-2">
                <BiError size={50} />
              </div>
              <p className="text-white cap font-bold text-center text-2xl tracking-wide mb-2">
                404 Error <br /> Page Not Found
              </p>
              {/* <p className="text-white cap font-bold text-center text-2xl tracking-wide">
                Page not found . . .
              </p> */}
              <div className="flex justify-center">
                <a href="/">
                  <button className="bg-blue-500 border-2 border-blue-800 text-lg px-10 py-2 rounded-lg mt-2 hover:bg-blue-700 transition-all ease-in-out duration-300">
                    Go Home
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default NotFound;
