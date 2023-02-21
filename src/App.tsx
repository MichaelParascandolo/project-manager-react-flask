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
        <>
          <Signin setToken={setToken} />
        </>
      ) : (
        <>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* <Navbar name={name} admin={admin} removeToken={removeToken} /> */}
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
                  {/* <Navbar name={name} admin={admin} removeToken={removeToken} /> */}
                  <Schedule />
                </>
              }
            />
            <Route
              path="/customers"
              element={
                <>
                  {/* <Navbar name={name} admin={admin} removeToken={removeToken} /> */}
                  <Customers />
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  {/* <Navbar name={name} admin={admin} removeToken={removeToken} /> */}
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
            <Route
              path="*"
              element={
                <>
                  {/* <Navbar name={name} admin={admin} removeToken={removeToken} /> */}
                  <NotFound />
                </>
              }
            />
          </Routes>
        </>
      )}
    </BrowserRouter>
  );
}

export default App;
