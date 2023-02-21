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

function App() {
  const { token, removeToken, setToken } = useToken();
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
                  <Navbar removeToken={removeToken} />
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
                  <Navbar removeToken={removeToken} />
                  <Schedule />
                </>
              }
            />
            <Route
              path="/customers"
              element={
                <>
                  <Navbar removeToken={removeToken} />
                  <Customers />
                </>
              }
            />
            <Route
              path="/team"
              element={
                <>
                  <Navbar removeToken={removeToken} />
                  <Team />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                  <Navbar removeToken={removeToken} />
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
