import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home";


const Router = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage /> } />
        <Route path="/:reserva/:hotel/:numPassenger" element={<HomePage />} />;
      </Routes>
    </BrowserRouter>
  );
};

export default Router;