import React, { Component } from "react";

import { MapContainer, TileLayer } from 'react-leaflet'
import { useNavigate } from 'react-router-dom';

import "./home.css";
import img1 from "../images/H1.png"
const Home = () => {
  const Navigator = useNavigate();

  function toUserHome(){
    Navigator('/userHome');
  }

  function toHawkerHome(){
    Navigator('/loginPage');
  }
  return (
    // <section className="bg-emerald-500 flex items-center justify-center h-screen">
    // <div>
    //   <h2 className="text-center text-white font-medium text-2xl">
    //         👍Login Success
    //       </h2>
    // </div>
    // </section>
    
    <div className="bg-orange-300 card-container">
    <div className="bg-orange-400 card">
      <h2 className="text-white font-bold">User</h2>
      <img src={img1}/>
      <p className="text-white font-medium">Login as a User</p>
      <button className="bg-orange-500" onClick={toUserHome}>User</button>
    </div>
    <div className="bg-orange-400 card">
      <h2 className="text-white font-bold">Hawker</h2>
      <img src={img1}/>
      <p className="text-white font-medium">Login as a Hawker</p>
      <button className="bg-orange-500" onClick={toHawkerHome}>Hawker</button>
    </div>
    </div>   
  );
}

export default Home
