import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import Logo1PIcon from "../../asset/images/1Pass_Logo.svg";
import blackArrowIcon from "../../asset/images/black-Arrow-Icon.svg";
import menuIcon from "../../asset/images/menu-Icon.svg";
import wifiIcon from "../../asset/images/wifi-Icon.svg";
import "./VisitDetails.scss";

const VisitDetails = ({ role, page, isVerified }) => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [show, setShow] = useState(true);
  const type = true;
  return (
    <Container className="h-screen d-flex flex-column justify-content-start align-items-center">
      {/* Header */}
      {page === "check-out" && (
        <div className="d-flex align-items-start justify-content-between w-100">
          <div className="d-flex align-items-center mb-2">
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
            <h5 className="mb-0">Visit Details</h5>
          </div>
          <Button
            variant="button"
            className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
            // onClick={handleBack}
          >
            <img src={menuIcon} alt="close" />
          </Button>
        </div>
      )}

      <div className={`VisitDetails-card border-0 ${page === "check-in" && " mt-3"}`}>
        <Card className="d-flex justify-content-center border-0">
          <Card.Body className=" text-center m-auto pt-0">
            <Card.Img src={Logo1PIcon} className="Logo1PIcon" />
            <Card.Title as={"h2"} className="m-auto text-center mt-3">
              {page === "check-in" ? "Visit Details" : "Checkout Details"}{" "}
            </Card.Title>
            <Card.Text className="m-auto text-center mt-3">
              <div>
                <p className="invite-text mb-0">
                  <strong>Mayank Singh</strong> has invited you to their company{" "}
                  <strong>XYZ Ltd</strong> on <strong>21/11/2024</strong>. Your
                  invite is valid from <strong>12 PM till 12 PM+30 mins</strong>
                  .
                </p>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>

        <div className="border-top pt-2">
          <p className="directions-text">
            Please click on the link{" "}
            <a href="#" className="directions-link">
              Get Directions
            </a>{" "}
            for a detailed route on your preferred map application.
          </p>
        </div>

        <div className="qr-section border-top pt-1">
          <p className="qr-text border-bottom mb-1">
            You can scan the QR code below or use OTP <strong>123456</strong> to{" "}
            {page === "check-in" ? " check-in" : " check-out"}.
          </p>

          {/* <img src={image} alt="QR Code" className="qr-image blur-info" /> */}
        </div>
      </div>
      {page === "check-out" ? (
        <div className="flex-grow-1 text-center">
          <QRCode value="123456" className="w-80 h-100" />
        </div>
      ) : (
        <div className="flex-grow-1 text-center pt-3">
        <Card className="border-0 ">
          <Card.Body className="d-flex justify-content-center align-items-center bg-dark-subtle flex-column rounded-2">
            <div>
              <p className="directions-text mb-2">
                {" "}
                <img src={wifiIcon} alt="wifiIcon" className="mb-1 mx-1" />{" "}
                Wi-Fi Credentials
              </p>
            </div>
            <p className="directions-text mb-1 d-flex justify-content-center align-items-center gap-5">
              <strong>XYAHDNSKCM</strong>{" "}
              <span>
                Password=<strong>XYZ</strong>
              </span>
            </p>
          </Card.Body>
        </Card>
        </div>
      )}
      <div className="position-fixed bottom-0 w-100 start-0 end-0 d-flex justify-content-center  left-0 right-0">
        <Container className="d-flex justify-content-between w-100 mb-2 gap-4">
          <Button
            variant="dark"
            className="w-100 position-sticky bottom-0"
            onClick={() =>
              navigate("/visitor/home")
            }
          >
            Continue
          </Button>
        </Container>
      </div>
    </Container>
  );
};

export default VisitDetails;
