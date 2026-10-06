import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HelpCircle, Images, X } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS, PROPERTIES } from '../config/brand.config';
import type { Property } from '../config/brand.config';
import { useCabin } from '../context/CabinContext';
import './CabinSelection.css';

export default function CabinSelection() {
  const navigate = useNavigate();
  const { selectCabin } = useCabin();
  const [showPhotos, setShowPhotos] = useState(false);

  const handleSelectCabin = (cabin: Property) => {
    selectCabin(cabin);
    navigate('/dashboard');
  };

  return (
    <div className="page-container">
      <BackButton />
      
      <h1 className="page-title">Select Your Cabin</h1>
      <p className="page-subtitle">Tap your cabin to continue</p>

      <div className="cabin-grid">
        {PROPERTIES.map((cabin) => (
          <div
            key={cabin.id}
            className="cabin-card"
            onClick={() => handleSelectCabin(cabin)}
          >
            <img src={cabin.image} alt={cabin.name} className="cabin-image" />
            <div className="cabin-overlay">
              <span className="cabin-name">{cabin.name}</span>
            </div>
          </div>
        ))}
      </div>

      <Card className="help-card">
        <HelpCircle size={24} color={COLORS.secondary} />
        <h3 className="help-title">Not sure which cabin you're in?</h3>
        <p className="help-text">Check the name on your welcome sign or your door code message.</p>
        <button className="photo-btn" onClick={() => setShowPhotos(true)}>
          <Images size={20} color="white" />
          <span>Show Cabin Photos</span>
        </button>
      </Card>

      {showPhotos && (
        <div className="modal-overlay" onClick={() => setShowPhotos(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 className="modal-title">Our Cabins</h2>
              <button className="close-btn" onClick={() => setShowPhotos(false)}>
                <X size={28} color={COLORS.primary} />
              </button>
            </div>
            <div className="modal-body">
              {PROPERTIES.map((cabin) => (
                <Card key={cabin.id} className="modal-cabin-card">
                  <img src={cabin.image} alt={cabin.name} className="modal-cabin-image" />
                  <p className="modal-cabin-name">{cabin.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
