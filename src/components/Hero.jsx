import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import './css/Hero.css';

const Hero = ({
  title,
  subtitle,
  imageSrc,
  imageAlt = '',
  primaryCta,
  secondaryCta,
}) => {
  const hasImage = Boolean(imageSrc);
  
  return (
    <section className="hero-section py-5">
      <Container>
        <Row className={`align-items-center ${!hasImage ? 'justify-content-center text-center' : ''}`}>
          <Col lg={hasImage ? 5 : 12} className="mb-4 mb-lg-0">
            <h1 className="display-3 fw-bolder mb-3">{title}</h1>
            {subtitle && <p className="lead text-muted mb-4">{subtitle}</p>}
            <div className="d-flex gap-3 flex-wrap justify-content-center justify-content-lg-start">
              {primaryCta && (
                <Button 
                  variant="primary" 
                  size="lg" 
                  href={primaryCta.href}
                  className="rounded-pill px-4 hero-btn"
                >
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button 
                  variant="outline-secondary" 
                  size="lg" 
                  href={secondaryCta.href}
                  className="rounded-pill px-4"
                >
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          </Col>

          {hasImage && (
            <Col lg={7}>
              <div className="hero-graphic p-4 bg-light rounded">
                <img 
                  src={imageSrc} 
                  alt={imageAlt} 
                  className="img-fluid rounded shadow-sm scales-img" 
                />
              </div>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Hero;
