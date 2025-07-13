import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceCard from '../components/ServiceCard';
import PurohitCard from '../components/PurohitCard';
import TestimonialCard from '../components/TestimonialCard';
import '../styles/home.css';

const Home = () => {
  /* ───── Services to display ───── */
  const services = [
    {
      id: 1,
      title: 'Ganapathi Homam',
      description:
        'Invoke Lord Ganesha for success and prosperity in your endeavors.',
      image: 'ganapathi.jpg',
      duration: '2 hours',
      price: '₹5,000',
    },
    {
      id: 2,
      title: 'Wedding Ceremonies',
      description:
        'Traditional Hindu wedding ceremonies performed by experienced purohits.',
      image: 'wedding.jpg',
      duration: 'Full day',
      price: '₹15,000',
    },
    {
      id: 3,
      title: 'House Warming',
      description:
        'Griha Pravesh ceremony to bless your new home with positivity.',
      image: 'blessing.jpg',
      duration: '3 hours',
      price: '₹7,000',
    },
  ];

  /* ───── Featured Purohit (full data) ───── */
  const featuredPurohit = {
    id: 1,
    name: 'Shri Venkatesh Shastri',
    expertise: 'Vedic Rituals, Homams',
    experience: '25 years',
    location: 'Bangalore',
    image: 'purohit1.jpg',
    rating: 4.8,
    languages: ['Sanskrit', 'Kannada', 'Telugu', 'Hindi'],
    about:
      'A highly respected Vedic scholar with expertise in all major homams and rituals. Trained in the traditional gurukula system.',
    ceremonies: [
      'Ganapathi Homam',
      'Navagraha Homam',
      'Satyanarayana Pooja',
      'Weddings',
    ],
  };

  /* ───── Testimonials ───── */
  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      review:
        'The Ganapathi Homam performed by Shri Venkatesh Shastri was truly divine. Everything was arranged perfectly.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Priya Menon',
      review:
        'Our wedding ceremony was conducted with such authenticity and grace. Highly recommended!',
      rating: 5,
    },
    {
      id: 3,
      name: 'Anand Patel',
      review:
        'The house‑warming ceremony brought such positive energy to our home. Thank you for the wonderful service.',
      rating: 4,
    },
  ];

  return (
    <div className="home-container">
      {/* Hero */}
      <HeroSection
        title="Preserving Vedic Traditions"
        subtitle="Connect with authentic Vedic purohits for all your spiritual needs"
        image="hero-bg.jpg"
        ctaText="Book a Pooja Now"
        ctaLink="/book-pooja"
      />

      {/* Services */}
      <section className="services-section">
        <h2>Our Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* Featured Purohit */}
      <section className="purohits-section">
        <h2>Featured Purohit</h2>
        <div className="purohits-grid">
          {/* Pass `detailed` so the card shows the full flex layout */}
          <PurohitCard purohit={featuredPurohit} detailed />
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <h2>What Our Clients Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </section>

      {/* Call‑to‑Action */}
      <section className="cta-section">
        <h3>Ready for a Divine Experience?</h3>
        <p>
          Book a purohit for your next ceremony and experience authentic Vedic
          traditions.
        </p>
        <a href="/book-pooja" className="cta-button">
          Book Now
        </a>
      </section>
    </div>
  );
};

export default Home;
