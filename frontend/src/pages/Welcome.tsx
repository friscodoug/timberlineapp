import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreePine, Leaf, ArrowRight } from 'lucide-react';
import Card from '../components/Card';
import { COLORS } from '../styles/theme';
import { LOGO_URL, CABIN_MODE_LOGO_URL } from '../data/cabins';
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
          <img src={CABIN_MODE_LOGO_URL} alt="Cabin Mode" className="cabin-mode-logo" />
        </div>
        <p className="cabin-mode-tagline">a guided stay experience brought to you by</p>
        <div className="logo-container">
          <img src={LOGO_URL} alt="Pine Acres Glamping" className="logo" />
        </div>

        <Card className="welcome-card">
          <h1 className="headline">Welcome to Pine Acres Glamping</h1>
          <TreePine size={32} color={COLORS.secondary} className="bear-icon" />
          <p className="subtext">Your glamping adventure awaits.</p>
          <p className="instruction">Select your accommodation to unlock your guest portal.</p>
          
          <button className="continue-btn" onClick={() => navigate('/cabin-selection')}>
            <span>Continue</span>
            <ArrowRight size={20} color="white" />
          </button>
        </Card>

        <div className="footer">
          <Leaf size={16} color={COLORS.primary} />
          <span>Broken Bow, Oklahoma</span>
        </div>
      </div>
    </div>
  );
}
