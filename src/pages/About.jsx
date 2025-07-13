import React from 'react';
import HeroSection from '../components/HeroSection';
import '../styles/about.css';

const About = () => {
  return (
    <div className="about-page">
      <HeroSection 
        title="About VaidikaKarma"
        subtitle="Preserving ancient Vedic traditions in the modern world"
        image="hero-bg.jpg"
      />
      
      <section className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <h2>Our Mission</h2>
              <p>
                VedicPurohit was founded with the mission to make authentic Vedic rituals accessible to everyone while 
                supporting the community of traditional purohits. In today's fast-paced world, many people find it 
                difficult to connect with qualified priests or understand the significance of these ancient ceremonies.
              </p>
              <p>
                We bridge this gap by providing a platform where you can easily find and book experienced purohits 
                for all types of Vedic rituals, from simple daily pujas to elaborate homams and samskaras.
              </p>
              <p>
                Our purohits are carefully selected based on their knowledge, experience, and dedication to preserving 
                the authenticity of Vedic traditions. Each ceremony is performed according to proper Vedic procedures 
                with attention to every detail.
              </p>
            </div>
            <div className="about-image">
              <img src="/assets/purohit1.jpg" alt="Traditional Purohit" />
            </div>
          </div>
        </div>
      </section>
      
      <section className="values-section">
        <div className="container">
          <h2 className="section-title">Our Core Values</h2>
          
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <i className="fas vedic-icon">ॐ</i>
              </div>
              <h3>Authenticity</h3>
              <p>All rituals performed strictly according to Vedic scriptures without shortcuts or compromises.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-hands-helping"></i>
              </div>
              <h3>Service</h3>
              <p>Dedicated to serving both our clients and the purohit community with respect and integrity.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-book"></i>
              </div>
              <h3>Knowledge</h3>
              <p>Committed to preserving and sharing the profound wisdom of Vedic traditions.</p>
            </div>
            
            <div className="value-card">
              <div className="value-icon">
                <i className="fas fa-users"></i>
              </div>
              <h3>Community</h3>
              <p>Building bridges between those seeking spiritual services and those preserving these traditions.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Our Founders</h2>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/purohit2.jpg" alt="Founder 1" />
              </div>
              <div className="member-info">
                <h3>Shri Ramakrishna Sharma</h3>
                <p className="title">Vedic Scholar & Founder</p>
                <p>
                  With over 35 years of experience in performing Vedic rituals, Shri Ramakrishna Sharma saw the need 
                  to create a platform that would make these sacred ceremonies more accessible while ensuring their 
                  authenticity.
                </p>
              </div>
            </div>
            
            <div className="team-member">
              <div className="member-image">
                <img src="/assets/purohit3.jpg" alt="Founder 2" />
              </div>
              <div className="member-info">
                <h3>Anand Patel</h3>
                <p className="title">Technology Head & Co-founder</p>
                <p>
                  A tech entrepreneur with deep respect for Vedic traditions, Anand combined his technical expertise 
                  with spiritual interests to create this unique platform connecting purohits with those seeking 
                  their services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="milestones-section">
        <div className="container">
          <h2 className="section-title">Our Journey</h2>
          
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2018</div>
              <div className="timeline-content">
                <h3>Founded</h3>
                <p>Started with 5 purohits in Bangalore serving local communities</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2019</div>
              <div className="timeline-content">
                <h3>Expansion</h3>
                <p>Extended services to 3 more cities with 25 purohits on our platform</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Digital Poojas</h3>
                <p>Introduced live-streamed ceremonies during pandemic lockdowns</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2022</div>
              <div className="timeline-content">
                <h3>National Presence</h3>
                <p>Covering 15 major cities with over 100 qualified purohits</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <h3>Mobile App</h3>
                <p>Launched our mobile application for easier access to services</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;