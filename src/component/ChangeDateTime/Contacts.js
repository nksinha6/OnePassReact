import React from "react";

import checkIcon from "../../asset/images/check-Icon.svg"; // Add a checkmark icon
import avatarIcon from "../../asset/images/avatar-Icon.svg"; // Add a checkmark icon

const Contacts = ({ contactsData, selectedContact, handleSelectContact }) => {
  return (
    <div>
      {" "}
      <div className="list-group list-group-checkable d-grid gap-2 border-0 mt-3 contacts-list">
        {contactsData.map((contact) => (
          <div
            key={contact.id}
            id={`contact-${contact.id}`}
            className="list-group-item rounded-3 py-3 d-flex justify-content-start align-items-center contact-item"
            onClick={() => handleSelectContact(contact)}
          >
            <div className="avatar">
              <img src={avatarIcon} alt="avatarIcon" className="avatarIcon" />

              {selectedContact.find((item) => item.id === contact.id) && (
                <img src={checkIcon} alt="selected" className="checkmark" />
              )}
            </div>
            <div className="ms-3 d-flex justify-content-center align-items-start flex-column">
              {contact.phone}
              <span className="d-block small opacity-50">{contact.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contacts;
