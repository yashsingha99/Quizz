import React from "react";
import Footer from "./Footer";
import Body from "./Body";
import Header from "./Header";

function Homepage() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header></Header>
      <Body></Body>
      <Footer></Footer>
    </div>
  );
}

export default Homepage;
