import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/Home/Home';
import WorkshopVisualization from './components/Home/Workshop';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/workshop" element={<WorkshopVisualization />} />

      </Routes>
    </Router>
  );
}

export default App;