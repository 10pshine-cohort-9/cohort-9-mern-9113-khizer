import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SiteHeader from "./components/layout/SiteHeader";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;