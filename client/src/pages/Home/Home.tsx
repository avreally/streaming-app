import React from "react";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

type HomeProps = {
  baseUrl: string;
};

function Home({ baseUrl }: HomeProps) {
  return (
    <div className="app">
      <Navbar />
      <main className="main">
        <Sidebar baseUrl={baseUrl} />
        <div className="mainSection">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Home;
