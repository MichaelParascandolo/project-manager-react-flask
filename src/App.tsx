import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import Schedule from "./pages/Schedule";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Notfound />} />
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
