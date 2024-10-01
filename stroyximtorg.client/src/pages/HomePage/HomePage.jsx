import React from "react";
import About from "../../components/About/About";
import Products from "../../components/Products/Products";
import Callback from "../../components/CallBack/Callback";
import Main from "../../components/Main/Main";
import LoadingPage from "../LoadingPage/LoadingPage";

function HomePage() {
  return (
<>
      <Main />
      <About />
      <Products />
      <Callback />
</>
  );
}

export default HomePage;
