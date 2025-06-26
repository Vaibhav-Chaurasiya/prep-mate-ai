import React, { useState, useEffect } from 'react';

const Price = () => {
  const [selectedCountry, setSelectedCountry] = useState("Select Country");
  const [openFAQ, setOpenFAQ] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqData = [
    "What happens if my payment fails during checkout?",
    "Can I cancel my subscription to Remasto Rise?",
    "Does the subscription cost vary by country?",
    "Will I receive a tax invoice after payment?",
    "Can I try out the platform before subscribing?",
    "Is there a refund for the first month's payment after subscribing?",
    "Which platforms manage payments for Remasto?",
    "Is there a cost associated with using the platform?",
    "How can I verify if my payment was successful?",
    "How are the mock interview questions curated?",
    "Are the 'company interviews' verified and supported by the respective companies?",
    "Is my data secure when using the platform?",
    "Can our AI make mistakes in providing feedback?",
    "Do you provide options for business integrations for your services?",
  ];

  // Inline Styles
  const styles = {
    body: {
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      backgroundColor: '#191b2a',
      color: 'white',
      lineHeight: 1.6,
    },
    
    rematoPage: {
      minHeight: '100vh',
      backgroundColor: '#191b2a',
      color: 'white',
    },

    headerSection: {
      textAlign: 'center',
      padding: isMobile ? '2rem 1rem' : '4rem 2rem 3rem',
      background: 'linear-gradient(135deg, #191b2a 0%, #2c3e50 100%)',
    },

    mainTitle: {
      fontSize: isMobile ? '2rem' : '3rem',
      fontWeight: 700,
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },

    riseText: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 800,
    },

    subtitle: {
      fontSize: '1.2rem',
      color: 'rgba(255, 255, 255, 0.8)',
      marginBottom: '2rem',
    },

    countrySelector: {
      maxWidth: '400px',
      margin: '0 auto',
    },

    countrySelectorText: {
      marginBottom: '1rem',
      color: 'rgba(255, 255, 255, 0.9)',
    },

    dropdown: {
      width: '100%',
      padding: '0.75rem 1rem',
      background: 'rgba(255, 255, 255, 0.1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      color: 'white',
      fontSize: '1rem',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
    },

    pricingSection: {
      padding: isMobile ? '2rem 1rem' : '3rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },

    pricingTable: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '15px',
      overflow: 'hidden',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },

    pricingHeader: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
      background: 'rgba(139, 92, 246, 0.1)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    },

    planName: {
      padding: '1.5rem',
      textAlign: 'center',
      fontWeight: 600,
      fontSize: '1.1rem',
      borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    },

    featureRow: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr',
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      transition: 'background-color 0.3s ease',
    },

    featureName: {
      padding: '1rem 1.5rem',
      fontWeight: 500,
      borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      background: 'rgba(255, 255, 255, 0.02)',
    },

    featureValue: {
      padding: '1rem 1.5rem',
      textAlign: 'center',
      borderRight: isMobile ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
      borderBottom: isMobile ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },

    checkmark: {
      color: '#10b981',
      fontSize: '1.2rem',
      fontWeight: 'bold',
    },

    enterpriseCell: {
      background: 'rgba(139, 92, 246, 0.05)',
    },

    enterpriseContent: {
      textAlign: 'center',
    },

    enterpriseText: {
      marginBottom: '1rem',
      fontSize: '0.9rem',
      lineHeight: 1.5,
    },

    exploreApisBtn: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      color: 'white',
      border: 'none',
      padding: '0.5rem 1rem',
      borderRadius: '6px',
      fontSize: '0.9rem',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
    },

    freeForever: {
      background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 700,
      fontSize: '1.1rem',
    },

    upgradeBtn: {
      background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      fontWeight: 700,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)',
    },

    finalRow: {
      background: 'rgba(255, 255, 255, 0.02)',
      borderBottom: 'none',
    },

    whyUpgradeSection: {
      padding: isMobile ? '2rem 1rem' : '4rem 2rem',
      maxWidth: '1200px',
      margin: '0 auto',
    },

    sectionTitle: {
      textAlign: 'center',
      fontSize: isMobile ? '2rem' : '2.5rem',
      fontWeight: 700,
      marginBottom: '3rem',
      background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },

    featuresGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(350px, 1fr))',
      gap: '2rem',
    },

    featureCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '15px',
      padding: isMobile ? '1.5rem' : '2rem',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      transition: 'all 0.3s ease',
      textAlign: 'center',
    },

    featureImage: {
      marginBottom: '1.5rem',
      borderRadius: '10px',
      overflow: 'hidden',
    },

    featureImageImg: {
      width: '100%',
      height: '200px',
      objectFit: 'cover',
      borderRadius: '10px',
    },

    featureCardTitle: {
      fontSize: '1.3rem',
      marginBottom: '1rem',
      fontWeight: 600,
    },

    purpleText: {
      background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      fontWeight: 700,
    },

    featureCardText: {
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 1.6,
    },

    discountSection: {
      padding: '3rem 2rem',
      textAlign: 'center',
      background: 'rgba(255, 255, 255, 0.02)',
    },

    discountTitle: {
      fontSize: '2rem',
      marginBottom: '1rem',
      fontWeight: 600,
    },

    discountText: {
      maxWidth: '600px',
      margin: '0 auto 2rem',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 1.6,
    },

    discountButtons: {
      display: 'flex',
      gap: '1rem',
      justifyContent: 'center',
      flexWrap: 'wrap',
      flexDirection: isMobile ? 'column' : 'row',
      alignItems: isMobile ? 'center' : 'flex-start',
    },

    discountBtnPrimary: {
      padding: '0.75rem 2rem',
      border: 'none',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: 'white',
    },

    discountBtnSecondary: {
      padding: '0.75rem 2rem',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: 'rgba(255, 255, 255, 0.1)',
      color: 'white',
    },

    giftSection: {
      padding: '3rem 2rem',
      textAlign: 'center',
    },

    giftTitle: {
      fontSize: '2rem',
      marginBottom: '1rem',
      fontWeight: 600,
    },

    giftText: {
      maxWidth: '600px',
      margin: '0 auto 2rem',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 1.6,
    },

    giftBtn: {
      background: 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)',
      color: 'white',
      border: 'none',
      padding: '0.75rem 2rem',
      borderRadius: '8px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 12px rgba(236, 72, 153, 0.3)',
    },

    faqSection: {
      padding: isMobile ? '2rem 1rem' : '4rem 2rem',
      maxWidth: '1000px',
      margin: '0 auto',
    },

    faqTitle: {
      textAlign: 'center',
      fontSize: isMobile ? '2rem' : '2.5rem',
      marginBottom: '3rem',
      fontWeight: 600,
    },

    faqGrid: {
      display: 'grid',
      gap: '1rem',
    },

    faqItem: {
      background: 'rgba(255, 255, 255, 0.05)',
      borderRadius: '10px',
      overflow: 'hidden',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },

    faqQuestion: {
      width: '100%',
      padding: '1.5rem',
      background: 'none',
      border: 'none',
      color: 'white',
      textAlign: 'left',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 500,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background-color 0.3s ease',
    },

    faqArrow: {
      transition: 'transform 0.3s ease',
      color: '#8b5cf6',
    },

    faqArrowOpen: {
      transition: 'transform 0.3s ease',
      color: '#8b5cf6',
      transform: 'rotate(180deg)',
    },

    faqAnswer: {
      padding: '0 1.5rem 1.5rem',
      color: 'rgba(255, 255, 255, 0.8)',
      lineHeight: 1.6,
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },

    footer: {
      background: 'rgba(0, 0, 0, 0.3)',
      padding: '3rem 2rem 2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    },

    footerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
      gap: isMobile ? '2rem' : '3rem',
      marginBottom: '2rem',
    },

    footerBrand: {
    },

    footerBrandTitle: {
      fontSize: '1.5rem',
      marginBottom: '1rem',
      background: 'linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    },

    footerBrandText: {
      color: 'rgba(255, 255, 255, 0.7)',
      lineHeight: 1.6,
    },

    footerLinks: {
      display: 'grid',
      gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '2rem',
    },

    footerColumn: {
    },

    footerColumnTitle: {
      fontSize: '1rem',
      marginBottom: '1rem',
      color: 'white',
      fontWeight: 600,
    },

    footerList: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
    },

    footerListItem: {
      marginBottom: '0.5rem',
    },

    footerLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '0.9rem',
      transition: 'color 0.3s ease',
    },

    footerBottom: {
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: '2rem',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      flexDirection: isMobile ? 'column' : 'row',
      gap: isMobile ? '1rem' : '0',
      textAlign: isMobile ? 'center' : 'left',
    },

    footerBottomText: {
      color: 'rgba(255, 255, 255, 0.5)',
      fontSize: '0.9rem',
    },

    socialLinks: {
      display: 'flex',
      gap: '1rem',
    },

    socialLink: {
      color: 'rgba(255, 255, 255, 0.7)',
      textDecoration: 'none',
      fontSize: '1.2rem',
      transition: 'color 0.3s ease',
    },
  };

  return (
    <div style={styles.rematoPage}>
      {/* Header Section */}
      <div style={styles.headerSection}>
        <h1 style={styles.mainTitle}>
          Subscription Pricing <span style={styles.riseText}>Rise</span>
        </h1>
        <p style={styles.subtitle}>Unlimited interviews with monthly subscription</p>

        <div style={styles.countrySelector}>
          <p style={styles.countrySelectorText}>Select a country to view pricing</p>
          <div>
            <select 
              style={styles.dropdown} 
              value={selectedCountry} 
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              <option>Select Country</option>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
          </div>
        </div>
      </div>

      {/* Pricing Table */}
      <div style={styles.pricingSection}>
        <div style={styles.pricingTable}>
          <div style={styles.pricingHeader}>
            <div style={styles.planName}>Remasto</div>
            <div style={styles.planName}>
              Remasto <span style={styles.riseText}>Rise</span>
            </div>
            <div style={styles.planName}>Enterprise and APIs</div>
          </div>

          <div style={{...styles.featureRow, ...styles.headerRow}}>
            <div style={styles.featureName}>Mock Interview Duration</div>
            <div style={styles.featureValue}>Upto 5 minutes (unlimited)</div>
            <div style={{...styles.featureValue, ...styles.enterpriseCell}}>
              <div style={styles.enterpriseContent}>
                <p style={styles.enterpriseText}>
                  Customized plan available with commercial license and enterprise solutions for schools, Colleges,
                  Non-Profits, and Corporates.
                </p>
                <button style={styles.exploreApisBtn}>Explore APIs</button>
              </div>
            </div>
          </div>

          {["Role-Based Interview Questions", "Real-Time Feedback & Insights", "Create Your Interviews"].map(
            (feature, index) => (
              <div key={index} style={styles.featureRow}>
                <div style={styles.featureName}>{feature}</div>
                <div style={styles.featureValue}>
                  <span style={styles.checkmark}>✓</span>
                </div>
                <div style={styles.featureValue}>
                  <span style={styles.checkmark}>✓</span>
                </div>
              </div>
            ),
          )}

          {[
            "Company-Level Questions",
            "Resume-Based Practice",
            "Salary Negotiation Interviews",
            "MBA Admission Interviews",
            "System Design Interview Prep",
          ].map((feature, index) => (
            <div key={index} style={styles.featureRow}>
              <div style={styles.featureName}>{feature}</div>
              <div style={styles.featureValue}>Upto 5 minutes</div>
              <div style={styles.featureValue}>
                <span style={styles.checkmark}>✓</span>
              </div>
            </div>
          ))}

          <div style={{...styles.featureRow, ...styles.finalRow}}>
            <div style={styles.featureName}></div>
            <div style={styles.featureValue}>
              <span style={styles.freeForever}>Free Forever</span>
            </div>
            <div style={styles.featureValue}>
              <button style={styles.upgradeBtn}>UPGRADE NOW</button>
            </div>
          </div>
        </div>
      </div>

      {/* Why Upgrade Section */}
      <div style={styles.whyUpgradeSection}>
        <h2 style={styles.sectionTitle}>
          Why upgrade to Remasto <span style={styles.riseText}>Rise</span>
        </h2>

        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureImage}>
              <img style={styles.featureImageImg} src="https://images.pexels.com/photos/3194518/pexels-photo-3194518.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Interview Duration" />
            </div>
            <h3 style={styles.featureCardTitle}>
              <span style={styles.purpleText}>More</span> Interview time
            </h3>
            <p style={styles.featureCardText}>Choose a longer interview practice session, up to 30 minutes, for more comprehensive preparation.</p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureImage}>
              <img style={styles.featureImageImg} src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Resume Based" />
            </div>
            <h3 style={styles.featureCardTitle}>
              <span style={styles.purpleText}>Resume based</span> Interviews
            </h3>
            <p style={styles.featureCardText}>
              Practice role-specific, resume-based interview questions for up to 30 minutes to enhance your confidence
              and readiness.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureImage}>
              <img style={styles.featureImageImg} src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Company Level" />
            </div>
            <h3 style={styles.featureCardTitle}>
              <span style={styles.purpleText}>Company Level</span> Questions
            </h3>
            <p style={styles.featureCardText}>
              Confidently land your dream role with personalized analytics and actionable feedback. Prepare effectively
              for your target company and ace every interview — all in up to 30 minutes.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureImage}>
              <img style={styles.featureImageImg} src="https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Analytics" />
            </div>
            <h3 style={styles.featureCardTitle}>
              <span style={styles.purpleText}>In-depth</span> Analytics
            </h3>
            <p style={styles.featureCardText}>
              In-depth analytics that evaluate multiple factors, providing comprehensive insights into your interview
              performance, helping you improve across key areas.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureImage}>
              <img style={styles.featureImageImg} src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Job Description" />
            </div>
            <h3 style={styles.featureCardTitle}>
              <span style={styles.purpleText}>Job Description-Based</span> Interview Practice
            </h3>
            <p style={styles.featureCardText}>
              Practice job description-based interviews of up to 30 minutes, tailored to your role and target company.
            </p>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureImage}>
              <img style={styles.featureImageImg} src="https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop" alt="Resume Builder" />
            </div>
            <h3 style={styles.featureCardTitle}>
              <span style={styles.purpleText}>Resume</span> Builder and Analyzer
            </h3>
            <p style={styles.featureCardText}>
              Unlock unlimited attempts to create job-ready, ATS-friendly resumes with our Resume Builder and Analyzer.
            </p>
          </div>
        </div>
      </div>

      {/* Discount Section */}
      <div style={styles.discountSection}>
        <h2 style={styles.discountTitle}>Check for University & Organization Discounts</h2>
        <p style={styles.discountText}>
          We have partnered with multiple universities and organizations for discounted pricing. If you are a Student or
          a Professional, do check your eligibility for a discount.
        </p>
        <div style={styles.discountButtons}>
          <button style={styles.discountBtnPrimary}>STUDENT DISCOUNT</button>
          <button style={styles.discountBtnSecondary}>PROFESSIONAL DISCOUNT</button>
        </div>
      </div>

      {/* Gift Section */}
      <div style={styles.giftSection}>
        <h2 style={styles.giftTitle}>Gift a Remasto Rise</h2>
        <p style={styles.giftText}>
          Give the gift of career growth with a Remasto Rise Gift Card—one month of premium access to mock interviews,
          resume customization, and skill development.
        </p>
        <button style={styles.giftBtn}>GIFT NOW</button>
      </div>

      {/* FAQ Section */}
      <div style={styles.faqSection}>
        <h2 style={styles.faqTitle}>FAQs</h2>
        <div style={styles.faqGrid}>
          {faqData.map((question, index) => (
            <div key={index} style={styles.faqItem}>
              <button style={styles.faqQuestion} onClick={() => toggleFAQ(index)}>
                {question}
                <span style={openFAQ === index ? styles.faqArrowOpen : styles.faqArrow}>▼</span>
              </button>
              {openFAQ === index && (
                <div style={styles.faqAnswer}>
                  <p>
                    This is a placeholder answer for the FAQ question. In a real implementation, you would have specific
                    answers for each question.
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <div style={styles.footerBrand}>
            <h3 style={styles.footerBrandTitle}>Remasto</h3>
            <p style={styles.footerBrandText}>
              Remasto is an impact-first start-up with a mission to empower job seekers globally through GenAI
              solutions. We provide real-time interview practices with actionable feedback to track and enhance a
              candidate's interview performance.
            </p>
          </div>

          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>About</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>About</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Pricing</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Request Role</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Topics</a>
                </li>
              </ul>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Business Solutions</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>For Business</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>For Schools</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>For Colleges</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>API</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Enterprise</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>French Language</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Contact Us</a>
                </li>
              </ul>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Policies</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Privacy Policy</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Terms</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>How it works</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>FAQs</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Trust Center</a>
                </li>
              </ul>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerColumnTitle}>Resources</h4>
              <ul style={styles.footerList}>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Community</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Blog</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Careers</a>
                </li>
                <li style={styles.footerListItem}>
                  <a href="#" style={styles.footerLink}>Gifting</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <p style={styles.footerBottomText}>© 2025 Remasto. All Rights Reserved.</p>
          <div style={styles.socialLinks}>
            <a href="#" style={styles.socialLink} aria-label="Twitter">
              𝕏
            </a>
            <a href="#" style={styles.socialLink} aria-label="YouTube">
              📺
            </a>
            <a href="#" style={styles.socialLink} aria-label="Instagram">
              📷
            </a>
            <a href="#" style={styles.socialLink} aria-label="LinkedIn">
              💼
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Price;