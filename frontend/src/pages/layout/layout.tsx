import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <div>
      <Header />
      <main className="max-w-[1300px] mx-auto ">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
