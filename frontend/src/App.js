import "asserts/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "screens/SignIn";
import Dashboard from "screens/Dashboard";
import SignUp from "screens/SignUp";
import Admin from "screens/Admin";

function App() {
  const role = localStorage.getItem("role");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {role === "c" ? (
            <Route path="/dashboard" element={<Dashboard />} />
        ) : (
            <Route path="/admin" element={<Admin />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
