import React from "react";

import avatarIcon from "../../asset/images/avatar-Icon.svg";
import { MdDelete } from "react-icons/md";
import { LuArrowRight } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

export default function InvitationList({ inviteData, role }) {
  const navigate = useNavigate();
  return (
    <div className="list-group list-group-checkable d-grid gap-2 border-0 mt-3 invitation-list mx-2">
      {inviteData.map((contact) => (
        <div
          key={contact.id}
          className="list-group-item rounded-3 py-3 invitation-item"
        >
          <div className="d-flex justify-content-between align-items-center ">
            <div className=" d-flex justify-content-start align-items-center ">
              <div className="avatar">
                <img src={avatarIcon} alt="avatarIcon" className="avatarIcon" />
              </div>
              <div className="ms-3 d-flex justify-content-center align-items-start flex-column fw-bold">
                {contact.name}
              </div>
            </div>
            {role === "host" && <button className="btn">
              <MdDelete size={25} style={{ color: "red" }} />
            </button>}
          </div>
          <div className="mt-3">{contact.address}</div>
          <div className="d-flex justify-content-between align-items-center ">
            <div className="d-flex gap-3 align-items-start">
              <div>{contact.time}</div>
              <div>{contact.date}</div>
            </div>
            <button className="btn" onClick={() => contact?.url && navigate(contact?.url)}>
              <LuArrowRight size={25} style={{ color: "grey" }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
