import { ErrorMessage } from "@hookform/error-message";
import classNames from "classnames";
import { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./login.scss";

import flagOfIndia from "../../asset/images/Flag Of India.png";
import loginImage from "../../asset/images/login-image.png";
import Logo1PIcon from "../../asset/images/1Pass_Logo.svg";

export default function Login() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token") !== null ? true : false;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: "onSubmit" });

  const watchMobileNumber = watch("mobileNumber");
  useEffect(() => {
    if (isAuth) {
      navigate("/");
    }
  }, [isAuth]);

  const onSubmit = async(data) => {
    console.log("signup data:", data);
    navigate("/enter-otp");
  };

  const formatNumber = (value) => {
    const rawValue = value.replace(/\D/g, "");
    if (rawValue.length <= 5) return rawValue;
    return rawValue.slice(0, 5) + "-" + rawValue.slice(5, 10);
  };

  const handleChange = (e) => {
    const formattedValue = formatNumber(e.target.value);
    setValue("mobileNumber", formattedValue);
  };

  return (
    <Container className="h-screen d-flex flex-column justify-content-between align-items-center">
      <Card className="d-flex justify-content-center border-0">
        <Card.Body className="text-center m-auto">
          <Card.Img src={Logo1PIcon} className="Logo1PIcon" />
        </Card.Body>
        <Card.Title as={"h2"} className="m-auto text-center">
          Sign in with mobile number
        </Card.Title>
        <Card.Text className="m-auto text-center">
          1/Pass ensures only authenticated and verified hosts are able to
          invite visitors
        </Card.Text>
      </Card>
      <div className="login-image-wrapper">
          <img src={loginImage} alt="loginImage" className="w-100 h-100" />
        </div>
      <Card className="border-0 px-md-5 px-0">
        <Form name="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <Row>
            <Col md={12}>
              <Form.Group className="mb-3">
                <Form.Label className="fs-6">Mobile number</Form.Label>
                <div className="d-flex justify-content-center align-items-center position-relative">
                  <Card.Body className="flag-of-india-wrapper m-auto p-0">
                    <Card.Img src={flagOfIndia} className="w-100" />
                  </Card.Body>
                  <Form.Control
                    name="mobileNumberPrefixer"
                    id="mobileNumberPrefixerId"
                    type="text"
                    disabled
                    value={"+91"}
                    autoComplete="off"
                    className={classNames("mobile-number-prefixer-wrapper")}
                  />
                  <Form.Control
                    type="text"
                    {...register("mobileNumber")}
                    maxLength={11}
                    onChange={handleChange}
                    value={watch("mobileNumber")}
                    inputMode="numeric"
                    // onFocus={(e) => {
                    //   setTimeout(() => {
                    //     e.target.scrollIntoView({
                    //       behavior: "smooth",
                    //       block: "center",
                    //     });
                    //   }, 300);
                    // }}
                  />
                </div>
                <ErrorMessage
                  errors={errors}
                  name="mobileNumber"
                  render={({ message }) => (
                    <Card.Text className="text-danger">{message}</Card.Text>
                  )}
                />
              </Form.Group>
            </Col>

            <Col xs="auto" className="m-auto w-100 pb-2">
              <Button
                type="submit"
                disabled={watchMobileNumber?.length !== 11}
                variant="primary"
                className="w-100 px-5 py-2"
              >
                Send OTP
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}
