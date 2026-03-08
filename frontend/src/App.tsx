import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CabinProvider } from './context/CabinContext';
import Welcome from './pages/Welcome';
import CabinSelection from './pages/CabinSelection';
import Dashboard from './pages/Dashboard';
import Guidebook from './pages/Guidebook';
import CabinMode from './pages/CabinMode';
import ComeBack from './pages/ComeBack';
import Newsletter from './pages/Newsletter';
import Connect from './pages/Connect';
import Help from './pages/Help';
import Weather from './pages/Weather';
import './index.css';

export default function App() {
  return (
    <CabinProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/cabin-selection" element={<CabinSelection />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/guidebook" element={<Guidebook />} />
          <Route path="/cabin-mode" element={<CabinMode />} />
          <Route path="/come-back" element={<ComeBack />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/connect" element={<Connect />} />
          <Route path="/help" element={<Help />} />
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </CabinProvider>
  );
}
