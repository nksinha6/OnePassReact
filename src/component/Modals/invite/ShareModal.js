import React from "react";
import { Modal } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaWhatsapp, FaEnvelope, FaEllipsisH, FaCode } from "react-icons/fa";
import "./ShareModal.scss";

const ShareModal = ({show, setShow}) => {
  const url = window.location.href; // URL to share
  const text = "Check this out!"; // Default message

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Share URLs for fallback
  const shareLinks = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
    email: `mailto:?subject=Check this out&body=${encodeURIComponent(text)}%20${encodeURIComponent(url)}`,
    more: `https://www.addtoany.com/share?url=${encodeURIComponent(url)}`,
  };

  // Web Share API Handler
  const handleWebShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Share This",
        text: text,
        url: url,
      })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      window.open(shareLinks.more, "_blank"); // Fallback for unsupported browsers
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="share-modal">
        <Modal.Header closeButton>
          <Modal.Title>Share</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="share-icons">
            <div className="share-item">
              <FaCode className="icon" />
              <span>Embed</span>
            </div>
            <div className="share-item" onClick={() => window.open(shareLinks.whatsapp, "_blank")}>
              <FaWhatsapp className="icon whatsapp" />
              <span>WhatsApp</span>
            </div>
            <div className="share-item" onClick={() => window.open(shareLinks.facebook, "_blank")}>
              <FaFacebook className="icon facebook" />
              <span>Facebook</span>
            </div>
            <div className="share-item" onClick={() => window.open(shareLinks.twitter, "_blank")}>
              <FaTwitter className="icon twitter" />
              <span>Twitter</span>
            </div>
            <div className="share-item" onClick={() => window.location.href = shareLinks.email}>
              <FaEnvelope className="icon email" />
              <span>Email</span>
            </div>
            <div className="share-item" onClick={handleWebShare}>
              <FaEllipsisH className="icon more" />
              <span>More</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShareModal;
