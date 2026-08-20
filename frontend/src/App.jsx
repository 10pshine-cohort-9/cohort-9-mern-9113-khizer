import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SiteHeader from "./components/layout/SiteHeader";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notes from "./pages/Notes";
import NoteEditor from "./pages/NoteEditor";
import EditNote from "./pages/EditNote";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes/new"
          element={
            <ProtectedRoute>
              <NoteEditor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/notes/edit/:id"
          element={
            <ProtectedRoute>
              <EditNote />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;