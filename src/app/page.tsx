"use client"
import React, { useState } from "react";
import Navbar from "./components/front-end/Navbar";
import Cart from "./components/front-end/Cart";
import Hero from "./components/front-end/Hero";
import Feature from "./components/front-end/Feature";
import TrendingProducts from "./components/front-end/TrendingProducts";
import Footer from "./components/front-end/Footer";
import Banner from "./components/front-end/Banner";


const Home = () => {
  const [showCart, setShowCart] = useState(false);

  return (
    <main>
      <Navbar setShowCart={setShowCart}/>
      {showCart && <Cart setShowCart={setShowCart}/>}
      <Hero />
      <Feature />
      <TrendingProducts />
      <Banner />
      <Footer />
    </main>
  );
};

export default Home;
