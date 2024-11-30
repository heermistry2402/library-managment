import { CssBaseline } from "@mui/material";
import { Outlet } from "react-router-dom";

import Login from "./Login";

const Layout = () => {
  return <>
    <CssBaseline />
    <Login />
    <Outlet />
  </>;
};

export default Layout;
