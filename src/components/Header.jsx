import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Container, Nav, Offcanvas, Button } from 'react-bootstrap';
import './css/Header.css';
import { useLanguage } from '../context/LanguageContext.jsx';

const Header = () => {
  const { lang, toggle, t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <Navbar expand="lg" className="header py-3">
      <Container className="position-relative">
        {/* Mobile Toggle */}
        <Navbar.Toggle 
          aria-controls="mobile-navigation" 
          className="border-0 p-0 position-absolute top-0 start-0"
          onClick={() => setOpen(!open)}
        >
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        {/* Logo and Title */}
        <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center w-100 w-lg-auto">
          <a href="https://www.schb.dz/" target="_blank" rel="noopener noreferrer">
            <img 
              src="/Logo-Gica.png"  
              alt="SCHB Logo" 
              className="logo"
              style={{ height: '70px' }}
            />
          </a>
          <div className="text-center text-lg-start">
            <h1 className="h3 mb-1 fw-bold text-white text-shadow">{t('header.title')}</h1>
            <p className="mb-0 text-white-50">{t('header.subtitle')}</p>
          </div>
        </div>

        {/* Language Toggle - Top Right */}
        <div className="position-absolute top-0 end-0">
          <Button 
            variant="light" 
            size="sm" 
            className="rounded-pill fw-bold"
            onClick={toggle}
          >
            {lang === 'fr' ? 'العربية' : 'Français'}
          </Button>
        </div>

        {/* Desktop Navigation - Bottom Right */}
        <Navbar.Collapse className="position-absolute bottom-0 end-0 d-none d-lg-flex">
          <Nav className="gap-4">
            <Nav.Link as={Link} to="/" className="text-white text-decoration-none">{t('nav.home')}</Nav.Link>
            <Nav.Link as={Link} to="/plainte" className="text-white text-decoration-none">{t('nav.report')}</Nav.Link>
            <Nav.Link as={Link} to="/suivi" className="text-white text-decoration-none">{t('nav.track')}</Nav.Link>
            <Nav.Link as={Link} to="/politique-anti-corruption" className="text-white text-decoration-none">{t('nav.policy')}</Nav.Link>
            <Nav.Link as={Link} to="/about" className="text-white text-decoration-none">{t('nav.about')}</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>

      {/* Mobile Offcanvas */}
      <Offcanvas 
        show={open} 
        onHide={() => setOpen(false)} 
        placement="start"
        className="w-75"
        style={{ maxWidth: '340px' }}
      >
        <Offcanvas.Header closeButton className="bg-dark text-white">
          <Offcanvas.Title className="fw-bold">Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
          <Nav className="flex-column gap-4 text-center py-4">
            <Nav.Link as={Link} to="/" onClick={() => setOpen(false)} className="text-dark fw-bold">
              {t('nav.home')}
            </Nav.Link>
            <Nav.Link as={Link} to="/plainte" onClick={() => setOpen(false)} className="text-dark fw-bold">
              {t('nav.report')}
            </Nav.Link>
            <Nav.Link as={Link} to="/suivi" onClick={() => setOpen(false)} className="text-dark fw-bold">
              {t('nav.track')}
            </Nav.Link>
            <Nav.Link as={Link} to="/politique-anti-corruption" onClick={() => setOpen(false)} className="text-dark fw-bold">
              {t('nav.policy')}
            </Nav.Link>
            <Nav.Link as={Link} to="/about" onClick={() => setOpen(false)} className="text-dark fw-bold">
              {t('nav.about')}
            </Nav.Link>
          </Nav>
          <div className="mt-auto border-top pt-3">
            <Button 
              variant="outline-primary" 
              size="sm" 
              className="rounded-pill fw-bold w-100"
              onClick={() => { toggle(); }}
            >
              {lang === 'fr' ? 'العربية' : 'Français'}
            </Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
};

export default Header;