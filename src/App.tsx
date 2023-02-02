// https://dev.to/nagatodev/how-to-connect-flask-to-reactjs-1k8i

const getData = async () => {
  const response = await fetch("/profile");
  const data = await response.json();
  console.log(data);
};

function App() {
  return (
    <div className="mt-[100px] flex justify-center">
      <div>
        <h1 className="text-white text-[45px] font-bold text-center font-mono tracking-widest">
          Project Manager
        </h1>
        <div className="mt-10 bg-slate-800 shadow-xl shadow-slate-900 rounded-xl border-2 border-slate-900 w-[400 py-2px] h-[400px]">
          <div className="flex justify-center">
            <div className="w-[500px] p-8">
              <h2 className="text-white font-bold text-center text-xl tracking-wide">
                Sign in to your account
              </h2>
              <p className="text-white py-2">Your email</p>
              <input
                type="email"
                className="w-full rounded-lg border-2 border-slate-900 py-2 bg-slate-700 text-white"
              />
              <p className="text-white py-2">Password</p>
              <input
                type="password"
                className="w-full rounded-lg border-2 border-slate-900 py-2 bg-slate-700 text-white"
              />
              <div className="flex justify-center">
                <button className="bg-blue-500 border-2 border-blue-800 text-lg px-4 py-2 rounded-lg mt-4 w-full">
                  Login to your account
                </button>
              </div>
              <p className="mt-2 text-center text-blue-500 text-md">
                Don't have an account?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
