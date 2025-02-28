import React, { useRef, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import avatarIcon from "../../asset/images/avatar-Icon.svg"; // Add a checkmark icon
import blackAddIcon from "../../asset/images/black-Add-Icon.svg";
import blackArrowIcon from "../../asset/images/black-Arrow-Icon.svg";
import closeIcon from "../../asset/images/close-Icon.svg";
import "./AddInvite.scss";

const AddInvite = () => {
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [guestList, setGuestList] = useState([{ name: "", phone: "" }]);
  const [selectedContact, setSelectedContact] = useState(
    JSON.parse(localStorage.getItem("selectedContact"))
  );

  const [inviteValues, setInviteValues] = useState(
    JSON.parse(localStorage.getItem("inviteData"))
  );

  const handleAddGuest = () => {
    // Add guest to the list
    setGuestList([...guestList, { name: "", phone: "" }]);
  };

  const handleRemoveGuest = (index) => {
    // Remove guest from the list
    setGuestList([...guestList.slice(0, index), ...guestList.slice(index + 1)]);
  };
  const handleChangeGuest = (value, name, index) => {
    // Update guest details in the list
    setGuestList([
      ...guestList.slice(0, index),
      { ...guestList[index], [name]: value },
      ...guestList.slice(index + 1),
    ]);
  };

  const handleSelectContact = (SelectedItem) => {
    if (selectedContact.length === 1) {
      return;
    }

    if (selectedContact.find((item) => item.id === SelectedItem?.id)) {
      // Add fade-out animation
      const element = document.getElementById(`contact-${SelectedItem.id}`);
      if (element) {
        element.classList.add("removing");
        setTimeout(() => {
          setSelectedContact((prev) =>
            prev.filter((item) => item.id !== SelectedItem?.id)
          );
        }, 300); // Match with CSS animation duration
      }
      return;
    }

    setSelectedContact([...selectedContact, SelectedItem]);
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

  const handleReview = () => {
    navigate("/host/invite");
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
              <img
                src={blackArrowIcon}
                alt="blackArrowIcon"
                className="blackArrowIcon"
              />
            </Button>
            <h5 className="mb-0">Add Guests</h5>
          </div>
          {/* <Button
          variant="button"
          className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
        >
          <img src={menuIcon} alt="close" />
        </Button> */}
        </div>
        {/* there are two add invite screens */}
        {false ? (
          <>
            {guestList.map((guest, index) => (
              <div
                key={index}
                className="border border-light p-2 mb-2 rounded shadow-sm"
              >
                <Form.Group className="mb-3">
                  {index > 0 ? (
                    <div className="d-flex justify-content-between align-items-center">
                      <Form.Label className="input-title">
                        Guest name
                      </Form.Label>
                      <Button
                        variant="button"
                        className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
                        onClick={() => handleRemoveGuest(index)}
                      >
                        <img src={closeIcon} alt="close" />
                      </Button>
                    </div>
                  ) : (
                    <Form.Label className="input-title">Guest name</Form.Label>
                  )}
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      className="p-2"
                      placeholder="Enter Name"
                      value={guest.name}
                      onChange={(e) =>
                        handleChangeGuest(e.target.value, "name", index)
                      }
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label className="input-title">Mobile number</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      className="p-2"
                      placeholder="Enter number"
                      value={guest.phone}
                      onChange={(e) =>
                        handleChangeGuest(e.target.value, "phone", index)
                      }
                    />
                  </div>
                </Form.Group>
              </div>
            ))}
            {
              <div>
                <button
                  onClick={handleAddGuest}
                  className="border-0 bg-white text-black add-guest-button"
                >
                  <img
                    src={blackAddIcon}
                    alt="black-Add-Icon"
                    className="me-2"
                  />
                  Add Guest
                </button>
              </div>
            }
          </>
        ) : (
          <>
            <div className="d-flex flex-column justify-content-center align-items-center w-100">
              <div className="w-100">
                {/* Selected contacts */}
                <p className="h6 small opacity-50">Guests</p>
                <div
                  className={`selected-contacts mb-2 ${
                    selectedContact.length ? "expanded" : ""
                  }`}
                >
                  {selectedContact.map((contact, index) => (
                    <div
                      key={contact.id}
                      id={`contact-${contact.id}`}
                      className="selected-contact rounded-3 pt-3 d-flex justify-content-center align-items-center flex-column"
                      onClick={() => handleSelectContact(contact)}
                    >
                      <div className="avatar">
                        <img
                          src={avatarIcon}
                          alt="avatarIcon"
                          className="avatarIcon"
                        />
                        {selectedContact.length !== 1 && (
                          <img
                            src={closeIcon}
                            alt="closeIcon"
                            className="checkmark"
                          />
                        )}
                      </div>
                      <span className="d-block small opacity-50">
                        {contact.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-100">
                {/* Select Date */}
                <Form.Group className="mb-3">
                  <Form.Label className="input-title">Date</Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="date"
                      className="border-end-0"
                      placeholder="dd/mm/yyyy"
                      ref={dateInputRef}
                      value={inviteValues?.date}
                      name="date"
                      onChange={handleChangeValues}
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
                    <Form.Label className="input-title">
                      Starting from
                    </Form.Label>
                    <div className="input-group">
                      <Form.Control
                        type="time"
                        className="border-end-0"
                        placeholder="00:00 AM"
                        ref={timeInputRef}
                        value={inviteValues?.time}
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
                    <Form.Select name="duration" value={inviteValues?.duration} onChange={handleChangeValues}>
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
            </div>
          </>
        )}
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
            onClick={handleReview}
          >
            Send Invite  <GoArrowRight size={22} />
          </Button>
        </Container>
    </Container>
  );
};

export default AddInvite;
