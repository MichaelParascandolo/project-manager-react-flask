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
      {!token && token !== "" && token !== undefined ? (
        <Signin setToken={setToken} />
      ) : (
        <>
          <Routes>
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
              path="/history"
              element={
                <>
                  <Navbar
                    token={token}
                    setToken={setToken}
                    removeToken={removeToken}
                  />
                  <History />
                </>
              }
            />
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
