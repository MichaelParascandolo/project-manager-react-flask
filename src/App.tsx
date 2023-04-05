import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Schedule from "./pages/Schedule";
import Clients from "./pages/Clients";
import Home from "./pages/Home";
import Team from "./pages/Team";
import useToken from "./components/useToken";
import Navbar from "./components/Navbar";
import History from "./pages/History";

function App() {
  const { token, removeToken, setToken } = useToken();
  return (
    <BrowserRouter>
      {/* Checks to see if a user has a token and gives one if their token statis is undefined or blank */}
      {!token && token !== "" && token !== undefined ? (
        <Signin setToken={setToken} />
      ) : (
        <>
          <Routes>
           {/* Brings users to the Home page from the NavBar */}
            <Route
              path={"/*"}
              element={
                <>
                  <Navbar
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                  <Home
                    token={token}
                    removeToken={removeToken}
                    setToken={setToken}
                  />
                </>
              }
            />
            {/* Brings users to the Schedule page from the NavBar */}
            <Route
              path="/schedule"
              element={
                <>
                  <Navbar
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                  <Schedule
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                </>
              }
            />
            {/* Brings users to the Customers page from the NavBar */}
            <Route
              path="/clients"
              element={
                <>
                  <Navbar
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                  <Clients
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                </>
              }
            />
            <Route
              path="/history/:customerID"
              element={
                <>
                  <Navbar
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                  <History
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                </>
              }
            />
            {/* Brings users to the Team page from the NavBar */}
            <Route
              path="/team"
              element={
                <>
                  <Navbar
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                  <Team
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
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
