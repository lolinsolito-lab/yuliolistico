import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, ArrowRight, Star, Heart, Send } from 'lucide-react';
import { useCanonical } from '../../hooks/useCanonical';
import GiftCards from '../../components/GiftCards';

const GiftVouchersPage: React.FC = () => {
  useCanonical('https://yuliolistico.com/gift-cards');
  const [selectedVoucher, setSelectedVoucher] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#faf9f6] pt-24">
      <GiftCards />
    </div>
  );
};

export default GiftVouchersPage;
