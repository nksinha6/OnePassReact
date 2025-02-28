import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { IoNotifications } from "react-icons/io5";

const ContactPermissionModal = ({type}) => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);




  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="text-center">
        {type==="SMS"?(
          <div className="w-100 d-flex flex-column justify-content-center align-items-center gap-2 mb-3">
            <IoNotifications size={25}/>
           <p> Allow <strong>1/Pass</strong> to read SMS's on the device?</p>
          </div>
        ):(
        <p>
          Allow <strong>1/Pass</strong> to access your contacts?
        </p>
      )}
        <Button variant="light" className="w-100 mb-2" onClick={handleClose}>
          Allow
        </Button>
        <Button variant="light" className="w-100 border" onClick={handleClose}>
          Don't allow
        </Button>
      </Modal.Body>
    </Modal>
  );
};

export default ContactPermissionModal;
