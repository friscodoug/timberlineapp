import React from 'react';
import { Heart, Calendar, Check } from 'lucide-react';
import BackButton from '../components/BackButton';
import Card from '../components/Card';
import { COLORS, BRAND, CONTACT } from '../config/brand.config';
import './ComeBack.css';

export default function ComeBack() {
  const openBooking = () => {
    window.open(BRAND.bookingUrl, '_blank');
  };

  return (
    <div className="page-container">
      <BackButton />

      <div className="header-center">
        <Heart size={48} color={COLORS.secondary} />
        <h1 className="page-title center">{BRAND.comeBackHeadline}</h1>
        <p className="subheadline">{BRAND.comeBackSubtext}</p>
      </div>

      <Card>
        <p className="description">
          Returning guests receive exclusive discounts when booking direct.
        </p>

        <div className="code-container">
          <p className="code-label">Your Discount Code</p>
          <div className="code-box">
            <span className="code-text">{BRAND.discountCode}</span>
          </div>
          <p className="code-hint">Use at checkout for {BRAND.discountAmount}</p>
        </div>

        <div className="benefits">
          <div className="benefit-item">
            <Check size={22} color={COLORS.primary} />
            <span>Best price guarantee</span>
          </div>
          <div className="benefit-item">
            <Check size={22} color={COLORS.primary} />
            <span>No booking fees</span>
          </div>
          <div className="benefit-item">
            <Check size={22} color={COLORS.primary} />
            <span>Direct host communication</span>
          </div>
        </div>

        <button className="primary-btn" onClick={openBooking}>
          <Calendar size={22} color="white" />
          <span>Book Your Next Stay</span>
        </button>
      </Card>
    </div>
  );
}
