import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Modal, Card, Button } from 'react-bootstrap';
import './css/SuccessModal.css';
import { useLanguage } from '../context/LanguageContext.jsx';
import { QRCodeCanvas } from 'qrcode.react';

function generateTrackingId() {
  const now = new Date();
  const year = now.getFullYear();
  const storeKey = `rpt-seq-${year}`;
  const current = Number(localStorage.getItem(storeKey) || '0') + 1;
  localStorage.setItem(storeKey, String(current));
  return `RPT-${year}-${String(current).padStart(3, '0')}`;
}

function formatDZ(date) {
  try {
    return new Intl.DateTimeFormat('fr-DZ', {
      timeZone: 'Africa/Algiers',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit'
    }).format(date);
  } catch {
    return date.toLocaleString();
  }
}

const SuccessModal = ({ open, onClose, data = {}, reportType = 'unknown' }) => {
  const { t } = useLanguage();
  const [trackingId, setTrackingId] = useState('');
  const [savedAt, setSavedAt] = useState('');
  const qrRef = useRef(null);

  const qrValue = useMemo(() => {
    const base = window.location.origin;
    return `${base}/suivi?id=${encodeURIComponent(trackingId)}`;
  }, [trackingId]);

  useEffect(() => {
    if (!open) return;
    const id = generateTrackingId();
    const now = new Date();
    const saved = formatDZ(now);

    const existing = JSON.parse(localStorage.getItem('reports') || '{}');
    existing[id] = {
      id,
      type: reportType,
      createdAt: now.toISOString(),
      createdAtDZ: saved,
      data,
      status: 'submitted'
    };
    localStorage.setItem('reports', JSON.stringify(existing));

    setTrackingId(id);
    setSavedAt(saved);
  }, [open, reportType, data]);

  if (!open) return null;

  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(trackingId); } catch {}
  };

  const goToTracking = () => {
    window.location.href = `/suivi?id=${encodeURIComponent(trackingId)}`;
  };

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (!canvas) return;
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `${trackingId}.png`;
    link.click();
  };

  return (
    <Modal show={open} onHide={onClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{t('success.title')}</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        <Card className="border-0 bg-light mb-3">
          <Card.Body>
            <p className="mb-2">{t('success.p1')}</p>
            <p className="mb-0">{t('success.p2')}</p>
          </Card.Body>
        </Card>

        <Card className="border-0 bg-light text-center">
          <Card.Body>
            <div className="fw-semibold mb-2">{t('success.trackCode')}</div>
            <div className="fs-4 fw-bold mb-1" style={{ letterSpacing: '0.5px' }}>{trackingId}</div>
            <div className="text-muted small mb-3">{t('success.savedAt')} {savedAt}</div>
            
            <div ref={qrRef} className="d-flex justify-content-center mb-3">
              {trackingId && <QRCodeCanvas value={qrValue} size={160} includeMargin />}
            </div>
            
            <div className="d-flex gap-2 flex-wrap justify-content-center">
              <Button variant="outline-secondary" size="sm" onClick={handleCopy}>
                {t('success.copyCode')}
              </Button>
              <Button variant="outline-secondary" size="sm" onClick={downloadQR}>
                {t('success.downloadQR')}
              </Button>
              <Button variant="primary" size="sm" onClick={goToTracking}>
                {t('success.openTracking')}
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Modal.Body>
      
      <Modal.Footer>
        <Button variant="primary" onClick={goToTracking}>
          {t('success.backHome')}
        </Button>
        <Button variant="secondary" onClick={onClose}>
          {t('success.close')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
