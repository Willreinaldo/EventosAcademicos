import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Eventos from "../components/Eventos";
import Mapa from "../components/Mapa";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Mapa />} />
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;