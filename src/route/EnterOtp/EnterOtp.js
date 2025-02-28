import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";

import "./EnterOtp.scss";

import { useEffect, useRef, useState } from "react";
import logo from "../../asset/images/1Pass_Logo.svg";
import blackArrowIcon from "../../asset/images/black-Arrow-Icon.svg";
import Logo1PIcon from "../../asset/images/1Pass_Logo.svg";
import enterOtpImage from "../../asset/images/enter-otp-image.png";
import menuIcon from "../../asset/images/menu-Icon.svg";
import { useNavigate } from "react-router-dom";
import ContactPermissionModal from "../../component/Modals/ContactPermissionModal/ContactPermissionModal";

export default function EnterOtp({ role, page }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onSubmit" });

  const navigate = useNavigate();

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(59);
  const otpInputs = useRef([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.value && index < 5) {
      otpInputs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpInputs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const pastedOtp = pastedData
        .split("")
        .concat(new Array(6 - pastedData.length).fill(""));
      setOtp(pastedOtp);
      otpInputs.current[Math.min(pastedData.length, 5)].focus();
    }
  };

  const resendOtp = () => {
    setTimeLeft(59);
    setOtp(new Array(6).fill(""));
  };

  const onSubmit = (data) => {
    const otpValue = otp.join("");
    console.log("Form data:", { ...data, otp: otpValue });
    setOtp(new Array(6).fill(""));

    if (role === "desk-admin" && page) {
      navigate(`/${page}/success`);
      return;
    }

    if (otpValue === "123456") {
      navigate("/host/home");
      return;
    }
    if (otpValue === "654321") {
      navigate("/visitor/home");
      return;
    }
    setOtp(new Array(6).fill(""));
  };

  const handleBack = () => navigate(-1);
  return (
    <Container className="h-screen d-flex flex-column justify-content-between align-items-center">
      {role === "desk-admin" && page && (
        <div className="d-flex align-items-start justify-content-between w-100">
          <div className="d-flex align-items-center mb-1">
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
            <h5 className="mb-0">
              {page === "check-in" ? "Check In" : "Check Out"}
            </h5>
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

      <Card className="d-flex justify-content-center border-0">
        <Card.Body className="text-center m-auto">
          <Card.Img src={Logo1PIcon} className="Logo1PIcon" />
        </Card.Body>
        <Card.Title as={"h2"} className="m-auto text-center">
          Enter OTP
        </Card.Title>
        <Card.Text className="m-auto text-center">
          {role === "desk-admin"
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas purus at consequat rutrum."
            : "Enter the OTP that was sent to your mobile number 999 999 9999"}
        </Card.Text>
      </Card>
      <div className="flex-grow-1">
        <Card.Img src={enterOtpImage} className="w-100 h-100" />
      </div>
      {role !== "desk-admin" && (
        <Card className="border-0">
          <Card.Text className="m-auto text-center">
            By submitting the OTP, you agree with our
            <Card.Link href="#">Terms and Conditions</Card.Link>
            and
            <Card.Link href="#">Privacy Policy</Card.Link>
          </Card.Text>
        </Card>
      )}
      <Card className="m-auto mt-0 border-0 px-md-5 px-0">
        <Row className="justify-content-center my-3">
          <Col xs="auto">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Card className="border-0 m-auto">
                <Card.Body className="d-flex flex-row gap-2 p-0">
                  {otp.map((digit, index) => (
                    <Form.Control
                      key={index}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      ref={(ref) => (otpInputs.current[index] = ref)}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      onPaste={handlePaste}
                      className="text-center fs-4"
                      style={{ width: "3rem", height: "3rem" }}
                      onFocus={(e) => {
                        setTimeout(() => {
                          e.target.scrollIntoView({
                            behavior: "smooth",
                            block: "center",
                          });
                        }, 300);
                      }}
                    />
                  ))}
                </Card.Body>
              </Card>

              <Card className="border-0 mt-3">
                {role !== "desk-admin" && (
                  <Card.Body className="d-flex justify-content-between p-0">
                    <Card.Text className="text-muted mb-2">
                      <span>{`0:${timeLeft
                        .toString()
                        .padStart(2, "0")} sec left`}</span>
                    </Card.Text>
                    <button
                      className="bg-transparent border-0 fs-6 p-0 h-auto mb-2"
                      onClick={resendOtp}
                      style={{ cursor: "pointer" }}
                      disabled={timeLeft > 0}
                    >
                      Resend OTP
                    </button>
                  </Card.Body>
                )}

                <Button
                  type="submit"
                  variant="primary"
                  disabled={otp.some((digit) => !digit)}
                  className="w-100 pt-2"
                >
                  Submit OTP
                </Button>
              </Card>
            </Form>
          </Col>
        </Row>
      </Card>
      {role !== "desk-admin" && <ContactPermissionModal type={"SMS"} />}
    </Container>
  );
}
