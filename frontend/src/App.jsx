
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Eventos from "../src/components/Eventos";
import EditarEvento from "../src/components/EditarEvento"
import Mapa from "../src/components/Mapa";
import 'bulma/css/bulma.min.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mapa />} />
        <Route path="/eventos" element={<Eventos />} />
        <Route path="/eventos/:id" element={<EditarEvento />} />
      </Routes>
    </Router>
  );
};

export default App;