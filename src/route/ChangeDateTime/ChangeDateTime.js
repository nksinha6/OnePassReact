import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import avatarIcon from "../../asset/images/avatar-Icon.svg";
import blackArrowIcon from "../../asset/images/black-Arrow-Icon.svg";
import closeIcon from "../../asset/images/close-Icon.svg";
import Contacts from "../../component/ChangeDateTime/Contacts";
import Manually from "../../component/ChangeDateTime/Manually";
import ContactPermissionModal from "../../component/Modals/ContactPermissionModal/ContactPermissionModal";
import "./ChangeDateTime.scss";

const ChangeDateTime = () => {
  const tabs = ["Contacts", "Recent", "Manually"];
  const [contactsData, setContactsData] = useState([
    { id: 1, name: "Rahul", phone: "999-999-9999" },
    { id: 2, name: "Ankit", phone: "999-999-9998" },
    { id: 3, name: "Harsh", phone: "999-999-9997" },
    { id: 4, name: "Bharat", phone: "999-999-9996" },
    // { id: 8, name: "Bharat", phone: "999-999-9996" },
    // { id: 9, name: "Bharat", phone: "999-999-9996" },
    // { id: 10, name: "Bharat", phone: "999-999-9996" },
    // { id: 11, name: "Bharat", phone: "999-999-9996" },
    // { id: 12, name: "Bharat", phone: "999-999-9996" },
  ]);

  const [recentData, setRecentData] = useState([
    { id: 5, name: "Rahul2", phone: "999-999-9999" },
    { id: 6, name: "Ankit2", phone: "999-999-9998" },
  ]);

  const [activeTab, setActiveTab] = useState("Contacts");
  const [selectedContact, setSelectedContact] = useState([]);

  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const handleSelectContact = (SelectedItem) => {
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

  const addManualGuest = (data) => {
    console.log("add Manual Guest data:", data);
    const { name, phone } = data;
    setSelectedContact([
      ...selectedContact,
      { id: Number(Date.now().toFixed().split(".")[0]), name, phone },
    ]);
  };

  const handleReview = () => {
    localStorage.setItem("selectedContact", JSON.stringify(selectedContact));
    navigate("/host/add-invite");
  };

  const isDisabled = selectedContact.length === 0;

  return (
    <Container className="h-screen d-flex flex-column justify-content-between align-items-center">
      <div className="change-datetime w-100">
        {/* Header */}
        <div className="d-flex align-items-start justify-content-between">
          <div className="d-flex align-items-center mb-1">
            <Button
              variant="button"
              className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
              onClick={handleBack}
            >
              <img src={blackArrowIcon} alt="blackArrowIcon" className="blackArrowIcon" />
            </Button>
            <h5 className="mb-0">Change date/time</h5>
          </div>
          {/* <Button
            variant="button"
            className="text-dark p-0 me-2 border-0 font-monospace back-button-icon"
          >
            <img src={menuIcon} alt="close" />
          </Button> */}
        </div>
        <div className="main-content">
          <div className="main-content-header">
            <nav className="tabs border-0">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={activeTab === tab ? "active w-fit" : "w-fit"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </nav>

            {/* Selected contacts */}
            <div
              className={`selected-contacts ${
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

                    <img
                      src={closeIcon}
                      alt="closeIcon"
                      className="checkmark"
                    />
                  </div>
                  <span className="d-block small">
                    {contact.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Contacts */}
          <div className="main-content-body">
          {activeTab === "Contacts" && (
            <Contacts
              contactsData={contactsData}
              selectedContact={selectedContact}
              handleSelectContact={handleSelectContact}
            />
          )}
          {activeTab === "Recent" && (
            <Contacts
              contactsData={recentData}
              selectedContact={selectedContact}
              handleSelectContact={handleSelectContact}
            />
          )}
          {activeTab === "Manually" && (
            <Manually addManualGuest={addManualGuest} />
          )}
          </div>
        </div>
      </div>
      {/* Buttons */}
      <Container className="d-flex justify-content-between w-100 mb-2">
        <Button variant="danger" className="w-50 me-2" onClick={handleBack}>
          Cancel
        </Button>
        <Button
          variant="dark"
          className="w-50 d-flex justify-content-center align-items-center gap-2"
          disabled={isDisabled}
          onClick={handleReview}
        >
          Review invite <GoArrowRight size={22} />
        </Button>
      </Container>
      <ContactPermissionModal />
    </Container>
  );
};

export default ChangeDateTime;
