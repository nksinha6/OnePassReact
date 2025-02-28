import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import InvitationList from "../../component/Invitation/InvitationList";
import ContactPermissionModal from "../../component/Modals/ContactPermissionModal/ContactPermissionModal";

import menuIcon from "../../asset/images/menu-Icon.svg";
import blackArrowIcon from "../../asset/images/black-Arrow-Icon.svg";
import "./Invitation.scss";
import NDAModal from "../../component/Modals/NonDisclosure/NDAModal";

const Invitation = ({ role }) => {
  const inviteData = [
    {
      id: 1,
      name: "Mayank Singh",
      address: "XYZ Ltd New Delhi, India",
      time: "12:00 PM",
      date: "21/11/2024",
      url: role==="host"?"":"/visitor/invite-details",
    },
    {
      id: 2,
      name: "Mayank Singh",
      address: "XYZ Ltd New Delhi, India",
      time: "12:00 PM",
      date: "21/11/2024",
      url:  role==="host"?"":"/visitor/invite-details",
    },
    {
      id: 3,
      name: "Mayank Singh",
      address: "XYZ Ltd New Delhi, India",
      time: "12:00 PM",
      date: "21/11/2024",
      url:  role==="host"?"":"/visitor/invite-details",
    },
    {
      id: 4,
      name: "Mayank Singh",
      address: "XYZ Ltd New Delhi, India",
      time: "12:00 PM",
      date: "21/11/2024",
      url:  role==="host"?"":"/visitor/invite-details",
    },
  ];

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  return (
    <Container className="h-screen px-0">
      <div className="invitation">
        <div className="d-flex align-items-start justify-content-between px-2">
          <div className="d-flex align-items-center mb-3">
            <Button
              variant="button"
              className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
              onClick={handleBack}
            >
            <img
              src={blackArrowIcon}
              alt="blackArrowIcon"
              className="blackArrowIcon"
            />
            </Button>
            <h5 className="mb-0">Invitation</h5>
          </div>
          <Button
            variant="button"
            className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
            onClick={handleBack}
          >
            <img src={menuIcon} alt="close" />
          </Button>
        </div>
        <div>
          <p className="mb-0 px-2">Today</p>
        </div>
        <div className="flex-grow-1 overflow-y-auto pb-2">
        <InvitationList inviteData={inviteData} role={role} />
        </div>
      </div>
    </Container>
  );
};

export default Invitation;
