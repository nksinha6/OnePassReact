import React, { useState } from "react";
import "./Invite.scss";
import { Container, Button, Image } from "react-bootstrap";
import menuIcon from "../../asset/images/menu-Icon.svg";
import shareIcon from "../../asset/images/share-Icon.svg";
import image from "../../asset/images/image.png";
import blackArrowIcon from "../../asset/images/black-Arrow-Icon.svg";
import Logo1PIcon from "../../asset/images/1Pass_Logo.svg";
import { useNavigate } from "react-router-dom";
import ShareModal from "../../component/Modals/invite/ShareModal";
import QRCode from "react-qr-code";
import { SiDotenv } from "react-icons/si";

const Invite = () => {
  const names = JSON.parse(localStorage.getItem("selectedContact")).map(
    (item) => item.name
  );
  const inviteDetails = {
    name: names,
    company: "XYZ Ltd",
    date: "21/11/2024",
    time: "12 PM",
    duration: "30 mins",
    otp: "23432",
  };
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [show, setShow] = useState(false);
const dateInfo = JSON.parse(localStorage.getItem("inviteData"));
  return (
    <Container className="h-screen d-flex flex-column justify-content-between align-items-center">
      <div className="w-100  d-flex flex-column justify-content-between align-items-center">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between w-100">
          <div className="d-flex align-items-center mb-3">
            {/* <Button
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
          <h5 className="mb-0">Invite</h5> */}
          </div>
          <div className="d-flex align-items-end text-end">
            <Button
              variant="button"
              className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
              onClick={() => setShow(true)}
            >
              <img src={shareIcon} alt="close" />
            </Button>
            {/* <Button
            variant="button"
            className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
            // onClick={handleBack}
          >
            <img src={menuIcon} alt="close" />
          </Button> */}
          </div>
        </div>

        {/* Logo */}
        <img src={Logo1PIcon} alt="Logo" className="Logo1PIcon mt-3" />

        {/* Invite Sent Message */}
        <h5 className="mt-3 fw-bold title-invite-sent">Invite sent</h5>
        <p className="invite-sent-message w-100">
          {/* You invited{" "}
          <span>
            {inviteDetails.name.map((name, index) => {
              return (
                name + (index === inviteDetails.name.length - 1 ? " " : ", ")
              );
            })}
          </span>{" "}
          at <span>{inviteDetails.company}</span> on{" "}
          <span>{inviteDetails.date}</span>.
          <br />
          Your invite is valid from <span>{inviteDetails.time}</span> till{" "}
          <span>
            {inviteDetails.time}+{inviteDetails.duration}
          </span> */}
          Following Guest are invited on <span>{dateInfo.date}</span> & <span>{dateInfo.time}</span>
        </p>

        {/* QR Code & OTP */}
        {/* <div className="border-top pt-3">
          <p className=" invite-sent-message">
            For check-in the QR Code is below and the OTP is{" "}
            <span>{inviteDetails.otp}</span>
          </p>
        </div> */}
      </div>
      <div className="flex-grow-1 pb-4 text-center w-100">
        <div className="h-100 overflow-y-auto">
          <ul className="list-group list-group-numbered">
          {names.map((name, index) => {
            return (
              <li
                key={index}
                className="list-group-item text-truncate border-0 py-1"
              >
                 {name} 
              </li>
            );
          })}
          </ul>
        </div>
        {/* <QRCode value={selectedContact} className="w-80 h-100" /> */}
        {/* <img src={image} alt="QR Code" className="enter-otp-image-wrapper " /> */}
      </div>

      {/* Continue Button */}
      <Container className="d-flex justify-content-between w-100 mb-2">
        <Button
          variant="dark"
          className="w-100 d-flex justify-content-center align-items-center"
          href="/host/home"
        >
          Continue to Dashboard
        </Button>
      </Container>
      <ShareModal show={show} setShow={setShow} />
    </Container>
  );
};

export default Invite;
