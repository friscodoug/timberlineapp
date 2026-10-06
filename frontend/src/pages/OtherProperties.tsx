import React from 'react';
import { Building2, ExternalLink, MapPin, ChevronRight } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS, BRAND, CONTACT } from '../config/brand.config';
import './OtherProperties.css';

export default function OtherProperties() {
  const openProperty = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <Building2 size={48} color={COLORS.primary} />
        <h1 className="page-title center">{BRAND.otherPropertiesTitle}</h1>
        <p className="header-subtext">Explore more unique stays from our collection</p>
      </div>

      <div className="properties-list">
        {BRAND.sisterProperties.map((property, index) => (
          <Card key={index} className="property-card">
            <div className="property-image-container">
              <img src={property.image} alt={property.name} className="property-image" />
            </div>
            <div className="property-content">
              <h2 className="property-name">{property.name}</h2>
              <p className="property-description">{property.description}</p>
              <button className="visit-btn" onClick={() => openProperty(property.url)}>
                <span>Visit Website</span>
                <ExternalLink size={18} />
              </button>
            </div>
          </Card>
        ))}
      </div>

      <Card className="info-card">
        <p className="info-text">
          {BRAND.otherPropertiesDescription}
        </p>
      </Card>
    </div>
  );
}
