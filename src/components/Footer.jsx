import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './css/Footer.css';
import { useLanguage } from '../context/LanguageContext.jsx';

function Footer() {
  const { t } = useLanguage();
  
  const ContactRow = ({ name, tel, fax }) => (
    <>
      <Row className="py-2">
        <Col lg={4} className="fw-semibold mb-2 mb-lg-0">
          {name}
        </Col>
        <Col lg={8}>
          <div className="d-flex flex-wrap align-items-center gap-2">
            <span className="text-white-50">{t('footer.tel')}</span>
            <span className="fw-semibold">{tel}</span>
            <span className="d-none d-sm-inline text-white-50">|</span>
            <span className="text-white-50">{t('footer.fax')}</span>
            <span className="fw-semibold">{fax}</span>
          </div>
        </Col>
      </Row>
      <hr className="border-white border-opacity-25 my-2" />
    </>
  );

  return (
    <footer className="footer py-4 mt-4 text-white">
      <Container>
        <h3 className="h4 fw-bold mb-3">{t('footer.contacts')}</h3>
        
        <ContactRow name={t('footer.dg')} tel="213 31 60 65 43" fax="213 31 60 65 39" />
        <ContactRow name={t('footer.up')} tel="213 31 90 68 45" fax="213 31 90 66 23" />
        <ContactRow name={t('footer.ucc')} tel="213 31 86 40 40" fax="213 31 86 40 03" />
        <ContactRow name={t('footer.uca')} tel="213 31 82 24 10" fax="213 31 82 24 10" />
        <ContactRow name={t('footer.ucs')} tel="213 31 75 26 63" fax="213 31 75 26 63" />
      </Container>
    </footer>
  );
}

export default Footer;
