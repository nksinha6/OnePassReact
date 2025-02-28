import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import blackArrowIcon from "../../asset/images/black-Arrow-Icon.svg";
import "./InviteGuests.scss";
import dayjs from "dayjs";

const InviteGuests = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [inviteValues, setInviteValues] = useState({
    date: "",
    time: "",
    duration: "30 mins",
  });
  const [formattedDate, setFormattedDate] = useState("");

  const handleDateChange = (e) => {
    const dateValue = e.target.value; // yyyy-mm-dd
    if (dateValue) {
      const formatted = dayjs(dateValue).format("DD/MM/YYYY"); // Convert to dd/mm/yyyy
      setFormattedDate(formatted);
      handleChangeValues({ target: { name: "date", value: formatted } }); // Pass formatted date
    }
  };
  // Refs for input fields
  const dateInputRef = useRef(null);
  const timeInputRef = useRef(null);

  const isDisabled =
    inviteValues.date && inviteValues.time && inviteValues.duration;

  const handleChangeValues = (e) => {
    const { name, value } = e.target;
    setInviteValues({ ...inviteValues, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Invite values:", inviteValues);
    localStorage.setItem("inviteData", JSON.stringify(inviteValues));
    navigate("/host/change-date-time");
  };

  return (
    <Container className="h-screen d-flex flex-column justify-content-between align-items-center">
      <div className="w-100">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center mb-3">
            <Button
              variant="button"
              className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
              onClick={handleBack}
            >
              <img src={blackArrowIcon} alt="blackArrowIcon" />
            </Button>
            <h5 className="mb-0">Invite Guests</h5>
          </div>
          {/* <Button
          variant="button"
          className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
        >
          <img src={menuIcon} alt="close" />
        </Button> */}
        </div>

        {/* Select Date */}
        <Form.Group className="mb-3">
          <Form.Label className="input-title">Select Date</Form.Label>
          <div className="input-group position-relative">
            <Form.Control
              type="text" // Change to text to display the formatted date
              className="border-end-0"
              placeholder="dd/mm/yyyy"
              value={formattedDate}
              readOnly // Prevent direct typing
              onClick={() => dateInputRef.current?.showPicker()}
            />
            <input
              type="date"
              ref={dateInputRef}
              className="position-absolute w-0 h-0 opacity-0 z-0"
              onChange={handleDateChange}
            />
            <span
              className="input-group-text bg-white"
              style={{ cursor: "pointer" }}
              onClick={() => dateInputRef.current?.showPicker()}
            >
              <FaCalendarAlt />
            </span>
          </div>
        </Form.Group>

        {/* Time and Duration */}
        <Row className="mb-4">
          <Col xs={6}>
            <Form.Label className="input-title">Starting from</Form.Label>
            <div className="input-group">
              <Form.Control
                type="time"
                className="border-end-0"
                placeholder="00:00 AM"
                ref={timeInputRef}
                name="time"
                onChange={handleChangeValues}
              />
              <span
                className="input-group-text bg-white"
                style={{ cursor: "pointer" }}
                onClick={() => timeInputRef.current?.showPicker()}
              >
                <FaClock />
              </span>
            </div>
          </Col>
          <Col xs={6}>
            <Form.Label className="input-title">
              Expected visit duration
            </Form.Label>
            <Form.Select name="duration" onChange={handleChangeValues}>
              <option>30 minutes</option>
              <option>30 minutes to 1 hour</option>
              <option>1 hour</option>
              <option>1 hour 30 minutes</option>
              <option>2 hours</option>
              <option>2 hours 30 minutes</option>
              <option>3 hours</option>
            </Form.Select>
          </Col>
        </Row>
      </div>
      {/* Buttons */}
      <Container className="d-flex justify-content-between w-100 mb-2">
        <Button variant="danger" className="w-50 me-2" onClick={handleBack}>
          Cancel
        </Button>
        <Button
          variant="dark"
          className="w-50 d-flex justify-content-center align-items-center gap-2"
          disabled={!isDisabled}
          onClick={handleSubmit}
        >
          Add Guests <GoArrowRight size={22} />
        </Button>
      </Container>
    </Container>
  );
};

export default InviteGuests;
