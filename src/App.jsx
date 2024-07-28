import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import PetDetailPage from './pages/PetDetailPage';
import ErrorBoundary from './components/ErrorBoundary';

const App = () => (
  <Router>
    <ErrorBoundary>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pets/:id" element={<PetDetailPage />} />
      </Routes>
    </ErrorBoundary>
  </Router>
);

export default App;
