import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/pages/Layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import AddBook from "./components/pages/add-book";
import AddUser from "./components/pages/add-user";
import ManagUser from "./components/pages/managuser";
import UserReport from "./components/pages/userreport";
import AdminProfile from "./components/pages/AdminProfile";
import ForgotPassword from "./components/pages/ForgotPassword";
import Login from "./components/pages/Login";
import Dashboard from "./components/pages/dashboard";
import ManageBook from "./components/pages/manage-book";
import Cilent from "./components/pages/cilent";
import Logout from "./components/pages/Logout";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}/>
          <Route path="Add-book" element={<AddBook/>}/>
          <Route path="Add-user" element={<AddUser/>}/>
          <Route path="manage-book" element={<ManageBook/>}/>
          <Route path="managuser" element={<ManagUser/>}/>
          <Route path="userreport" element={<UserReport/>}/>
          <Route path="AdminProfile" element={<AdminProfile/>}/>
          <Route path="ForgotPassword" element={<ForgotPassword/>}/>
          <Route path="Login" element={<Login/>}/>
          <Route path="dashboard" element={<Dashboard/>}/>
          <Route path="cilent" element={<Cilent/>}/>
          <Route path="Logout" element={<Logout/>}/>
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
