import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreePine, Leaf, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import { COLORS, IMAGES, BRAND, LOCATION } from '../config/brand.config';
import { useCabin } from '../context/CabinContext';
import './Welcome.css';

export default function Welcome() {
  const navigate = useNavigate();
  const { selectedCabin, isLoading } = useCabin();

  useEffect(() => {
    if (!isLoading && selectedCabin) {
      navigate('/dashboard');
    }
  }, [isLoading, selectedCabin, navigate]);

  if (isLoading) {
    return (
      <div className="welcome-container">
        <div className="loading">
          <Leaf size={40} color={COLORS.primary} />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="cabin-mode-logo-container">
          <img src={IMAGES.cabinModeLogo} alt="Cabin Mode" className="cabin-mode-logo" />
        </div>
        <p className="cabin-mode-tagline">{BRAND.cabinModeTagline}</p>
        <div className="logo-container">
          <img src={IMAGES.logo} alt={BRAND.name} className="logo" />
        </div>

        <Card className="welcome-card">
          <h1 className="headline">{BRAND.welcomeHeadline}</h1>
          <TreePine size={32} color={COLORS.secondary} className="bear-icon" />
          <p className="subtext">{BRAND.tagline}</p>
          <p className="instruction">{BRAND.welcomeSubtext}</p>
          
          <button className="continue-btn" onClick={() => navigate('/cabin-selection')}>
            <span>Continue</span>
            <ArrowRight size={20} color="white" />
          </button>
        </Card>

        <div className="footer">
          <Leaf size={16} color={COLORS.primary} />
          <span>{LOCATION.displayLocation}</span>
        </div>
      </div>
    </div>
  );
}
