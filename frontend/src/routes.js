import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DetailsList from "./pages/detailsList";
import Home from "./pages/home";

function CustomRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details" element={<DetailsList />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default CustomRoute;
