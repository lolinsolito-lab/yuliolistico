import React from 'react';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
import WellnessQuiz from '../components/WellnessQuiz';
import About from '../components/About';
import Services from '../components/Services';
import Journal from '../components/Journal';
import Membership from '../components/Membership';
import Newsletter from '../components/Newsletter';
import GiftCards from '../components/GiftCards';

import AcademyTeaserSection from '../components/AcademyTeaserSection';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Philosophy /> {/* The Hook: Why we exist */}
      <WellnessQuiz /> {/* The Lead Magnet: AI Consultant */}
      <Services /> {/* The Product: What we do */}
      <AcademyTeaserSection /> {/* The Authority: Psychological Upsell */}
      <GiftCards /> {/* The Revenue: Vouchers */}
      <Membership /> {/* The Retention/Upsell: High Ticket Club */}
      <About /> {/* The Trust: Who is Yuli */}
      <Journal /> {/* The Authority: Content Marketing */}
      <Newsletter /> {/* The Capture: Lead Gen */}
    </>
  );
};

export default HomePage;