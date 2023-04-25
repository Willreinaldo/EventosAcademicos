
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Eventos from "../src/components/Eventos";
import Mapa from "../src/components/Mapa";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mapa />} />
        <Route path="/eventos" element={<Eventos />} />
      </Routes>
    </Router>
  );
};

export default App;