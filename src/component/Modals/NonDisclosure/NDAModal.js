// DigitalContract
import React from "react";
import { Modal, Button } from "react-bootstrap";
import "./NDAModal.scss";
import DigitalContract from "../../../asset/images/DigitalContract.svg";

const NDAModal = ({ show, setShow }) => {
  const handleClose = () => setShow(false);

  return (
    <Modal show={show} centered className="nda-modal">
      <Modal.Body>
        <h5 className="text-center fw-bold NDA-Title">
          Non-Disclosure Agreement
        </h5>

        <div className="image-container text-center">
          <img
            src={DigitalContract}
            alt="NDA Illustration"
            className="nda-image"
          />
        </div>

        <p className="NDA-Text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          egestas purus at consequat rutrum.
        </p>
        <p className="NDA-Text">
          Donec velit dui, tempus eu molestie sit amet, condimentum eget orci.
          Fusce vitae leo ligula.
        </p>

        <Button
          variant="dark"
          className="w-100 mt-3 accept-btn"
          onClick={handleClose}
        >
          Accept
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default NDAModal;
