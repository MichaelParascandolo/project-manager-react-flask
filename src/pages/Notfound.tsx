import Footer from "../components/Footer";
import Logo from "../components/Logo";

function NotFound() {
  return (
    <div className="mt-[125px] flex justify-center">
      <div className="my-auto w-full max-w-[600px] p-4">
        <div className="-mb-6">
          <Logo />
        </div>
        <div className="mt-10 bg-slate-800 shadow-xl shadow-black rounded-xl border-2 border-slate-900 h-[250px]">
          <div className="flex justify-center">
            <div className="w-[500px] p-8">
              <p className="text-white mt-10 cap font-bold text-center text-2xl tracking-wide">
                404 Page Not Found
              </p>
              <div className="flex justify-center">
                <a href="/">
                  <button className="bg-blue-500 border-2 border-blue-800 text-lg px-10 py-2 rounded-lg mt-4 hover:bg-blue-700 transition-all ease-in-out duration-300">
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
