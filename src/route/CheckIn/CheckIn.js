import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./CheckIn.scss";

import logo from "../../asset/images/1Pass_Logo.svg";
import checkinImage from "../../asset/images/check-in.png";
import otpIcon from "../../asset/images/otp-icon.png";
import qrIcon from "../../asset/images/qr code scan.png";
import QRScan from "../../component/Modals/QRScan/QRScan";

export default function CheckIn({ role, page }) {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token") !== null ? true : false;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // useEffect(() => {
  //   if (isAuth) {
  //     navigate("/");
  //   }
  // }, [isAuth]);

  const handleOtp = (data) => {
    console.log("signup data:", data);
    navigate(`/${page}/enter-otp`);
  };
  const handleQRScan = () => {
    setShow(true);
  };

  const handleScan = (text) => {
    console.log("QR Code Scanned:", text);
    navigate(`/${page}/success`);
  };

  return (
    <Container className="h-screen d-flex flex-column justify-content-between align-items-center  p-2">
      <Card className="d-flex justify-content-center border-0">
        <Card.Body className="text-center m-auto">
          <Card.Img src={logo} className="Logo1PIcon" />
        </Card.Body>
        <Card.Title as={"h2"} className="m-auto text-center">
          Welcome Visitors
        </Card.Title>
        <Card.Text className="m-auto text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          egestas purus at consequat rutrum.
        </Card.Text>
      </Card>
      <div className="flex-grow-1">
          <img src={checkinImage} alt="check-in" className="h-100 w-100" />
      </div>
      <Card className="m-auto mt-0 mt-sm-3 border-0 px-md-5 px-0">
        <Row className="">
          <Col xs="auto" className="m-auto w-100 mb-2">
            <Button
              type="button"
              onClick={handleQRScan}
              // disabled={watchMobileNumber?.length !== 10}
              variant="primary"
              className="d-flex justify-content-center align-items-center w-100 py-2 gap-2"
            >
              <span>
                <img src={qrIcon} style={{ height: "22px", width: "22px" }} />
              </span>
              Scan QR
            </Button>
          </Col>
          <Col xs="auto" className="m-auto w-100 ">
            <Button
              type="button"
              onClick={handleOtp}
              // disabled={watchMobileNumber?.length !== 10}
              variant="primary"
              className="d-flex justify-content-center align-items-center w-100 py-2 gap-2"
            >
              <span>
                <img src={otpIcon} style={{ height: "22px", width: "22px" }} />
              </span>
              Enter OTP
            </Button>
          </Col>
        </Row>
      </Card>
      <QRScan show={show} handleClose={handleClose} handleScan={handleScan} />
    </Container>
  );
}
