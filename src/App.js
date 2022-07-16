import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import BillListing from "./Pages/BillListing/BillListing";
import AddBill from "./Pages/AddBill/AddBill";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<BillListing />}></Route>
        <Route path="/edit/:id" element={<AddBill />}></Route>
        <Route path="/addBill" element={<AddBill />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
