import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/Notfound";
import Schedule from "./pages/Schedule";
import Customers from "./pages/Customers";
import Home from "./pages/Home";
import Team from "./pages/Team";
import useToken from "./components/useToken";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const { token, removeToken, setToken } = useToken();
  const [admin, setAdmin] = useState();
  const [name, setName] = useState();

  return (
    <BrowserRouter>
      {!token && token !== "" && token !== undefined ? (
        // <>
        //   <Routes>
        //     <Route path="/" element={<Signin setToken={setToken} />} />
        //     <Route path="/signup" element={<Signup />} />
        //     <Route
        //       path="*"
        //       element={
        //         <>
        //           <NotFound />
        //         </>
        //       }
        //     />
        //   </Routes>
        // </>
        <Signin setToken={setToken} />
      ) : (
        <>
          <Routes>
            <Route
              path={"/*"}
              element={
                <>
                  <Home
                    setAdmin={setAdmin}
                    setName={setName}
                    token={token}
                    removeToken={removeToken}
                    setToken={setToken}
                    name={name}
                    admin={admin}
                  />
                </>
              }
            />
            <Route
              path="/schedule"
              element={
                <>
                  <Schedule
                    setAdmin={setAdmin}
                    setName={setName}
                    token={token}
                    removeToken={removeToken}
                    setToken={setToken}
                    name={name}
                    admin={admin}
                  />
                </>
              }
            />
            <Route
              path="/customers"
              element={
                <>
                  <Customers
                    setAdmin={setAdmin}
                    setName={setName}
                    token={token}
                    removeToken={removeToken}
                    setToken={setToken}
                    name={name}
                    admin={admin}
                  />
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <Team
                    setAdmin={setAdmin}
                    setName={setName}
                    token={token}
                    removeToken={removeToken}
                    setToken={setToken}
                    name={name}
                    admin={admin}
                  />
                </>
              }
            />
            {/* <Route
              path="*"
              element={
                <>
                  <NotFound />
                </>
              }
            /> */}
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
