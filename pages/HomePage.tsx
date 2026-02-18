import React from 'react';
import Hero from '../components/Hero';
import Philosophy from '../components/Philosophy';
// import WellnessQuiz from '../components/WellnessQuiz'; // DEFERRED - Fase 3
import About from '../components/About';
import Services from '../components/Services';
import Journal from '../components/Journal';
import Membership from '../components/Membership';
import Newsletter from '../components/Newsletter';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <Philosophy /> {/* The Hook: Why we exist */}
      {/* <WellnessQuiz /> - DEFERRED Fase 3 */}
      <Services /> {/* The Product: What we do */}
      <Membership /> {/* The Retention/Upsell: High Ticket Club */}
      <About /> {/* The Trust: Who is Yuli */}
      <Journal /> {/* The Authority: Content Marketing */}
      <Newsletter /> {/* The Capture: Lead Gen */}
    </>
  );
};

export default HomePage;