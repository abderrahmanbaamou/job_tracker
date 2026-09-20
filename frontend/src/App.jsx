import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AddApplication from "./pages/AddApplication";
import ApplicationDetails from "./pages/ApplicationDetails";
import EditApplication from "./pages/EditApplication";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route
        path="/applications/add"
        element={<AddApplication />}
      />

      <Route
        path="/applications/:id"
        element={<ApplicationDetails />}
      />

      <Route
        path="/applications/:id/edit"
        element={<EditApplication />}
      />
    </Routes>
  );
}

export default App;