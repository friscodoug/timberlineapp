import React from 'react';
import { Mail, Leaf, Send } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS, CONTACT } from '../config/brand.config';
import './Newsletter.css';

const BENEFITS = [
  'Seasonal specials',
  'Last-minute cabin openings',
  'Giveaways',
  'Retreat announcements',
];

export default function Newsletter() {
  const handleSubscribe = () => {
    window.open(CONTACT.newsletterUrl, '_blank');
  };

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <Mail size={48} color={COLORS.primary} />
        <h1 className="page-title center">Unlock Cabin Deals</h1>
      </div>

      <Card>
        <p className="description-left">Join our {CONTACT.newsletterName} newsletter for:</p>

        <div className="benefits-list">
          {BENEFITS.map((benefit, index) => (
            <div key={index} className="benefit-row">
              <Leaf size={18} color={COLORS.primary} />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        <button className="primary-btn" onClick={handleSubscribe}>
          <Send size={20} color="white" />
          <span>Join {CONTACT.newsletterName}</span>
        </button>

        <p className="privacy-text">
          We respect your inbox. Unsubscribe anytime.
        </p>
      </Card>
    </div>
  );
}
