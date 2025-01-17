import "asserts/css/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "screens/SignIn";
import Dashboard from "screens/Dashboard";
import Sharing from "screens/Sharing";
import Friends from "screens/Friends";
import MyExpenses from "screens/MyExpenses";
import SignUp from "screens/SignUp";

function App() {
  const token = localStorage.getItem("token");
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {token && (
          <>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/my-expenses" element={<MyExpenses />} />
            <Route path="/sharing-expenses" element={<Sharing />} />
            <Route path="/friends-expenses" element={<Friends />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
