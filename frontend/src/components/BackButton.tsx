import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { COLORS } from '../styles/theme';

export default function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        background: 'none',
        marginBottom: '16px',
      }}
    >
      <ArrowLeft size={24} color={COLORS.primary} />
    </button>
  );
}
