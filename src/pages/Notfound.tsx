import Footer from "../components/Footer";
import Logo from "../components/Logo";

function Notfound() {
  return (
    <div className="mt-[125px] flex justify-center">
      <div>
        <div className="-mb-6">
          <Logo />
        </div>
        <div className="mt-10 bg-slate-800 shadow-xl shadow-black rounded-xl border-2 border-slate-900 h-[250px]">
          <div className="flex justify-center">
            <div className="w-[500px] p-8">
              <p className="text-[50px] text-center text-white">:(</p>
              <p className="text-white mt-2 cap font-bold text-center text-xl tracking-wide">
                We can't find what you're looking for . . .
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

export default Notfound;
