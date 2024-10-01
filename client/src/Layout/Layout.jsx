import React, { useEffect,Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import LoadingPage from "../pages/LoadingPage/LoadingPage";
const Layout = () => {
  return (
    <>

      <Header />

      <Outlet />

      <Footer />
    
    </>
  );
};

export default Layout;
