import React, { useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { FaUserCheck } from "react-icons/fa";
import "./InviteDetails.scss";
import image from "../../asset/images/image.png";
import Logo1PIcon from "../../asset/images/1Pass_Logo.svg";
import blackArrowIcon from "../../asset/images/black-Arrow-Icon.svg";
import menuIcon from "../../asset/images/menu-Icon.svg";
import messageIcon from "../../asset/images/message-Icon.svg";
import callIcon from "../../asset/images/call-Icon.svg";
import VerifiedProfileIcon from "../../asset/images/Verified-Profile-Icon.svg";
import { useNavigate } from "react-router-dom";
import NDAModal from "../../component/Modals/NonDisclosure/NDAModal";
import QRCode from "react-qr-code";

const InviteDetails = ({ role, page, isVerified }) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [show, setShow] = useState(true);
  const type = !isVerified;
  const handleHostClick = () => {
    navigate("/visitor/security-video");
  };
  return (
    <Container className="h-screen d-flex flex-column justify-content-center align-items-center p-2">
      {/* Header */}
      <div className="d-flex align-items-start justify-content-between w-100">
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
          <h5 className="mb-0">Invite Details</h5>
        </div>
        <Button
          variant="button"
          className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
          // onClick={handleBack}
        >
          <img src={menuIcon} alt="close" />
        </Button>
      </div>

      <div className="inviteDetails-card border-0">
        <div>
          <div className="profile-section">
            <img src={Logo1PIcon} alt="Company Logo" className="Logo1PIcon " />
          </div>

          <div className="border-top mt-4 pt-2 pt-sm-3">
            <p className="invite-text mb-1">
              <strong>Mayank Singh</strong> has invited you to their company{" "}
              <strong>XYZ Ltd</strong> on <strong>21/11/2024</strong>. Your
              invite is valid from <strong>12 PM till 12 PM+30 mins</strong>.
            </p>
          </div>

          <div className="border-top pt-2 pt-sm-3">
            <p className="directions-text mb-1">
              Please click on the link{" "}
              <a href="#" className="directions-link">
                Get Directions
              </a>{" "}
              for a detailed route on your preferred map application.
            </p>
          </div>

          <div className="border-top pt-2 pt-sm-3">
            <p className="border-bottom mb-1">
              You can scan the QR code below or use OTP{" "}
              <strong className={type && "blur-info"}>123456</strong> to
              check-in.
            </p>

            {/* <img src={image} alt="QR Code" className="qr-image blur-info" /> */}
          </div>
        </div>
      </div>
      <div className="flex-grow-1 text-center">
        <QRCode value="123456" className={`w-80 h-100  ${type && " blur-info-qr"}`} />
      </div>
      <Container className="d-flex flex-column justify-content-between align-items-center w-100 gap-2">
        <div className="w-100 d-flex justify-content-between gap-4">
        {type ? (
          <Button
            variant="dark"
            className="w-100 "
            onClick={() => navigate("/visitor/example")}
          >
            <img
              src={VerifiedProfileIcon}
              alt="Verified Profile Icon"
              className="me-2"
            />
            Verify Identity
          </Button>
        ) : (
          <>
            <Button
              variant="dark"
              className="w-50 "
              onClick={handleHostClick}
            >
              <img
                src={messageIcon}
                alt="Verified Profile Icon"
                className="me-2"
              />
              Host
            </Button>
            <Button
              variant="dark"
              className="w-50 "
              onClick={handleHostClick}
            >
              <img
                src={callIcon}
                alt="Verified Profile Icon"
                className="me-2"
              />
              Host
            </Button>
          </>
        )}
        </div>
        {isVerified && <Button
          variant="dark"
          className="w-100 "
          onClick={() => navigate("/visitor/home")}
        >
          return to Dashboard
        </Button>}
      </Container>

     {isVerified && <NDAModal show={show} setShow={setShow} />}
    </Container>
  );
};

export default InviteDetails;
