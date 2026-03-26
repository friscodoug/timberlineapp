import React from 'react';
import { Building2, ExternalLink, MapPin, ChevronRight } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS } from '../styles/theme';
import './OtherProperties.css';

const PROPERTIES = [
  {
    id: '1',
    name: 'Hibernation Hollow Cabins',
    location: 'Broken Bow / Hochatown, Oklahoma',
    description: 'Cozy cabin rentals including the Honeydome, Bear Hug, and Little Bear Tinyhouse.',
    url: 'https://www.hibernationhollowcabins.com',
    image: 'https://customer-assets.emergentagent.com/job_9548fa8e-ba19-4435-b9f5-e400e160c6c7/artifacts/7yjce6m0_Dome%20Cover%20final.jpg',
  },
];

export default function OtherProperties() {
  const openProperty = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <Building2 size={48} color={COLORS.primary} />
        <h1 className="page-title center">Our Other Properties</h1>
        <p className="header-subtext">Explore more unique stays from our collection</p>
      </div>

      <div className="properties-list">
        {PROPERTIES.map((property) => (
          <Card key={property.id} className="property-card">
            <div className="property-image-container">
              <img src={property.image} alt={property.name} className="property-image" />
            </div>
            <div className="property-content">
              <h2 className="property-name">{property.name}</h2>
              <div className="property-location">
                <MapPin size={16} color={COLORS.secondary} />
                <span>{property.location}</span>
              </div>
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
          All properties are owned and operated by Douglas Rice, ensuring the same quality 
          and attention to detail you've experienced at Pine Acres Glamping.
        </p>
      </Card>
    </div>
  );
}
