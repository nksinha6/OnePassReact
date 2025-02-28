import React, { useState } from "react";
import "./Home.scss";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import whiteAddIcon from "../../asset/images/white-Add-Icon.svg";
import { useNavigate } from "react-router-dom";
export default function Home({ role }) {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(role === "host" ? "host" : "guest");
  // ["Invites", "Watchlist", "Location", "Profile"]
  const cardList = [
    {
      title: role === "host" ? "Invites":"Invitation",
      subtitle: "Lorem Ipsum",
      notification: 0,
      url: role === "host" ? "/host/Invitation" : "/visitor/Invitation",
    },
    {
      title: "Watchlist",
      subtitle: "Lorem Ipsum",
      notification: 0,
      url: "",
    },
    {
      title: "Location",
      subtitle: "Lorem Ipsum",
      notification: 0,
      url: "",
    },
    {
      title: "Profile",
      subtitle: "Lorem Ipsum",
      notification: 0,
      url: "",
    },
  ];

  return (
    <>
      <Container className="h-screen d-flex flex-column justify-content-between align-items-center px-0">
        {/* Header */}
        <div className="w-100">
          <div className="bg-dark text-white p-4 text-left home-page-header w-100">
            <h4>
              Hello, Mayank Singh <span className="text-success">●</span>
            </h4>
            <p>Lorem Ipsum</p>

            {/* Custom Toggle Buttons */}
            <div className="toggle-container w-100">
              <button
                className={`toggle-btn ${selected === "host" ? "active" : ""}`}
                onClick={() => role === "host" && setSelected("host")}
              >
                Host
              </button>
              <button
                className={`toggle-btn ${selected === "guest" ? "active" : ""}`}
                onClick={() => setSelected("guest")}
              >
                Guest
              </button>
            </div>

            {/* Countdown */}
            <Row className="text-center mt-4 home-page-number-container">
              {selected === "host" && (
                <>
                  <Col>
                    <h1>07</h1>
                    <p>Lorem Ipsum</p>
                  </Col>
                  <Col>
                    <h1>15</h1>
                    <p>Lorem Ipsum</p>
                  </Col>
                  <Col>
                    <h1>28</h1>
                    <p>Lorem Ipsum</p>
                  </Col>
                </>
              )}
            </Row>
          </div>

          {/* Card Grid */}
          <Container className="home-page-cards-container d-block">
            <Row className="g-3">
              {cardList.map((item, index) => (
                <Col xs={6} key={index}>
                  <Card className="p-3 shadow-sm home-page-card">
                    <Card.Body onClick={() => item?.url && navigate(item?.url)}>
                      <Card.Title>{item?.title}</Card.Title>
                      <Card.Text>Lorem Ipsum</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
            <div
              className={`py-4 d-flex justify-content-end align-items-center ${
                selected === "host" ? "" : "my-4"
              }`}
            >
              {selected === "host" && (
                <Button
                  variant="dark"
                  href="/host/invite-guests"
                  className="w-fit d-flex justify-content-center align-items-center gap-1"
                >
                  <img
                    src={whiteAddIcon}
                    alt="white-Add-Icon"
                    className="me-2"
                  />
                  Invite Guest
                </Button>
              )}
            </div>
          </Container>
        </div>

        {/* Floating Button */}
        <Container className="home-page-last-container">
          <div className="position-relative w-100"></div>
        </Container>
      </Container>
    </>
  );
}
