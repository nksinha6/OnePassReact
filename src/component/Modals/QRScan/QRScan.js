import React, { useEffect, useRef, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Html5Qrcode } from "html5-qrcode";
import { FaCamera, FaExclamationTriangle } from "react-icons/fa"; // React Icons
import "./QRScan.scss";

const QRScan = ({ show, handleClose, handleScan  }) => {
  const scannerRef = useRef(null);
  const [scanner, setScanner] = useState(null);
  const [hasScanned, setHasScanned] = useState(false); // Prevent multiple scans
  const [cameraError, setCameraError] = useState(false);
  const [cameras, setCameras] = useState([]);
  const [currentCamera, setCurrentCamera] = useState(null);

  useEffect(() => {
    if (show) {
      Html5Qrcode.getCameras()
        .then((devices) => {
          if (devices.length > 0) {
            const cameraList = devices.filter(
              (device) => !device.label.includes("Virtual Camera")
            );
            setCameras(cameraList);
            setCurrentCamera(cameraList[0]?.id || null);

            if (cameraList.length > 0) {
              startScanner(cameraList[0].id);
            } else {
              setCameraError(true);
            }
          } else {
            setCameraError(true);
          }
        })
        .catch(() => {
          setCameraError(true);
        });
    } else {
      stopScanner();
    }

    return () => {
      stopScanner();
    };
  }, [show]);

  const startScanner = (cameraId) => {
    if (scanner) stopScanner(); // Ensure no duplicate scanners

    if (!cameraId) {
      setCameraError(true);
      return;
    }

    const html5QrCode = new Html5Qrcode("qr-reader");
    html5QrCode
      .start(
        cameraId,
        {
          fps: 10,
          qrbox: { width: 250, height: 250 }
        },
        (decodedText) => {
          if (!hasScanned) {
            setHasScanned(true);
            console.log("QR Code Scanned:", decodedText);
            stopScanner();
            handleClose(); // Close modal after scan
            handleScan(decodedText);
          }
        },
        (errorMessage) => {
          // Suppress console errors to avoid spam
        }
      )
      .then(() => {
        setScanner(html5QrCode);
        setHasScanned(false); // Reset scan flag when scanner starts
      })
      .catch((err) => {
        console.error("Error starting scanner:", err);
        setCameraError(true);
      });
  };

  const stopScanner = () => {
    if (scanner && scanner.getState() === 2) {
      scanner
        .stop()
        .then(() => {
          console.log("Scanner stopped");
        })
        .catch((err) => console.warn("Error stopping scanner:", err));
      setScanner(null);
    }
    setHasScanned(false); // Reset scan flag
  };

  const switchCamera = () => {
    if (cameras.length > 1) {
      const nextCameraIndex =
        (cameras.findIndex((c) => c.id === currentCamera) + 1) % cameras.length;
      const nextCameraId = cameras[nextCameraIndex].id;
      setCurrentCamera(nextCameraId);
      startScanner(nextCameraId);
    }
  };

  return (
    <div className="qr-modal">
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {cameraError ? "Camera Access Denied" : "Scan QR Code"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          {cameraError ? (
            <div className="camera-error">
              <FaExclamationTriangle size={50} className="error-icon" />
              <p>Camera access is denied or not available.</p>
              <p>Please enable camera permissions and try again.</p>
            </div>
          ) : (
            <div className="scanner-container">
              <div
                id="qr-reader"
                className="qr-scanner-frame"
                ref={scannerRef}
              ></div>
              {cameras.length > 1 && (
                <button className="camera-switch" onClick={switchCamera}>
                  <FaCamera size={20} /> Switch Camera
                </button>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default QRScan;
