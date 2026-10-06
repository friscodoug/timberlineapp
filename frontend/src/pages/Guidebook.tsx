import React from 'react';
import { Book, Wifi, Droplets, Flame, Tv, LogOut, Home, UtensilsCrossed, Map, Beer, ExternalLink } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS, LOCATION } from '../config/brand.config';
import { useCabin } from '../context/CabinContext';
import './Guidebook.css';

const GUIDE_ITEMS = [
  { icon: Wifi, text: 'WiFi information' },
  { icon: Droplets, text: 'Hot tub instructions' },
  { icon: Flame, text: 'Fire pit instructions' },
  { icon: Tv, text: 'TV instructions' },
  { icon: LogOut, text: 'Checkout steps' },
  { icon: Home, text: 'Property information' },
  { icon: UtensilsCrossed, text: `Restaurants in ${LOCATION.cityName}` },
  { icon: Map, text: 'Local activities and hiking' },
  { icon: Beer, text: 'Breweries and coffee shops' },
];

export default function Guidebook() {
  const { selectedCabin } = useCabin();

  const openGuidebook = () => {
    if (selectedCabin?.guidebookUrl) {
      window.open(selectedCabin.guidebookUrl, '_blank');
    }
  };

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <Book size={48} color={COLORS.primary} />
        <h1 className="page-title center">Your Complete Cabin Guide</h1>
      </div>

      <Card>
        <p className="description">
          Everything you need for a perfect stay is inside our digital guidebook.
        </p>

        <p className="inside-text">Inside you'll find:</p>

        <div className="item-list">
          {GUIDE_ITEMS.map((item, index) => (
            <div key={index} className="list-item">
              <item.icon size={22} color={COLORS.secondary} />
              <span>{item.text}</span>
            </div>
          ))}
        </div>

        <button className="primary-btn" onClick={openGuidebook}>
          <ExternalLink size={22} color="white" />
          <span>Open the Digital Guidebook</span>
        </button>
      </Card>
    </div>
  );
}
