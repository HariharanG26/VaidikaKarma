  import React from 'react';
  import HeroSection from '../components/HeroSection';
  import ServiceCard from '../components/ServiceCard';
  import '../styles/services.css';

  const Services = () => {
    const allServices = [
      {
        id: 1,
        title: 'Ganapathi Homam',
        description: 'This sacred fire ritual is performed to invoke Lord Ganesha, the remover of obstacles. Ideal for new ventures, house warming, or any new beginnings.',
        image: 'ganapathi.jpg',
        duration: '2-3 hours',
        price: '₹5,000 - ₹10,000',
        benefits: ['Removes obstacles', 'Brings prosperity', 'Ensures success in endeavors']
      },
      {
        id: 2,
        title: 'Satyanarayana Pooja',
        description: 'A devotional worship of Lord Vishnu in his Satyanarayana form, performed for prosperity, peace and fulfillment of wishes.',
        image: 'homa.jpg',
        duration: '3-4 hours',
        price: '₹7,000 - ₹12,000',
        benefits: ['Brings peace and prosperity', 'Fulfills wishes', 'Strengthens family bonds']
      },
      {
        id: 3,
        title: 'Navagraha Homam',
        description: 'A powerful ritual to appease all nine planetary deities and mitigate malefic planetary influences in one\'s horoscope.',
        image: 'homa.jpg',
        duration: '4-5 hours',
        price: '₹15,000 - ₹25,000',
        benefits: ['Reduces planetary afflictions', 'Brings harmony', 'Improves overall life circumstances']
      },
      {
        id: 4,
        title: 'Wedding Ceremonies',
        description: 'Complete traditional Hindu wedding ceremonies including Vedic rituals, homas and sacraments performed by experienced purohits.',
        image: 'wedding.jpg',
        duration: 'Full day',
        price: '₹15,000 - ₹50,000',
        benefits: ['Authentic Vedic rituals', 'Customizable ceremonies', 'Blessed union']
      },
      {
        id: 5,
        title: 'Upanayanam',
        description: 'The sacred thread ceremony marking the spiritual rebirth of a young boy, performed with all Vedic rites and rituals.',
        image: 'blessing.jpg',
        duration: '3-4 hours',
        price: '₹10,000 - ₹20,000',
        benefits: ['Spiritual initiation', 'Traditional rites', 'Family blessings']
      },
      {
        id: 6,
        title: 'Griha Pravesh',
        description: 'House warming ceremony performed to purify and bless a new home, ensuring prosperity and happiness for the residents.',
        image: 'blessing.jpg',
        duration: '2-3 hours',
        price: '₹7,000 - ₹15,000',
        benefits: ['Purifies new home', 'Brings positive energy', 'Ensures prosperity']
      }
    ];

    return (
      <div className="services-page">
        <HeroSection 
          title="Our Sacred Services"
          subtitle="Experience authentic Vedic rituals performed by learned purohits"
          image="hero-bg.jpg"
        />
        
        <section className="all-services">
          <div className="container">
            <h2 className="section-title">Vedic Rituals & Ceremonies</h2>
            <p className="section-subtitle">We offer a wide range of traditional Hindu rituals performed according to authentic Vedic traditions</p>
            
            <div className="services-grid">
              {allServices.map(service => (
                <ServiceCard key={service.id} service={service} detailed={true} />
              ))}
            </div>
          </div>
        </section>
        
        <section className="service-info">
          <div className="container">
            <h3>Why Choose Our Services?</h3>
            <div className="info-grid">
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas vedic-icon">ॐ</i>
                </div>
                <h4>Authentic Vedic Practices</h4>
                <p>All rituals performed strictly according to Vedic scriptures by qualified purohits.</p>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-calendar-check"></i>
                </div>
                <h4>Flexible Scheduling</h4>
                <p>Book services at your convenience with options for weekday and weekend ceremonies.</p>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-rupee-sign"></i>
                </div>
                <h4>Transparent Pricing</h4>
                <p>No hidden charges. All costs explained upfront with various package options.</p>
              </div>
              
              <div className="info-item">
                <div className="info-icon">
                  <i className="fas fa-hands-helping"></i>
                </div>
                <h4>Complete Support</h4>
                <p>Guidance on preparations, materials needed and post-ceremony practices.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  };

  export default Services;