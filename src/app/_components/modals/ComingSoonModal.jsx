"use client";

import { useEffect } from "react";

const ComingSoonModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="qr-coming-soon-overlay" onClick={onClose}>
      <div className="qr-coming-soon-dialog" onClick={(e) => e.stopPropagation()}>
        <button
          className="qr-coming-soon-close"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <div className="qr-coming-soon-content">
          <h2>Coming Soon</h2>
          <p>Online ordering will be available very soon. Please check back later!</p>
        </div>
        <div className="qr-coming-soon-actions">
          <button className="qr-coming-soon-btn qr-coming-soon-primary" onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComingSoonModal;
