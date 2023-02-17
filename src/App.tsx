import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/Notfound";
import Schedule from "./pages/Schedule";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Team from "./pages/Team";
import useToken from "./components/useToken";

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/team" element={<Team />} />
        {/* <Route path="/home" element={<Home />} /> */}
        {!token && token !== "" && token !== undefined ? (
          <Signin setToken={setToken} />
        ) : (
          <>
            <Routes>
              <Route
                path="/home"
                element={<Home token={token} setToken={setToken} />}
              />
            </Routes>
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
