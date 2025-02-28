import React, { useState } from "react";
import { Container, Button } from "react-bootstrap";
import Logo1PIcon from "../../asset/images/1Pass_Logo.svg";
import "./SecurityVideo.scss";

const SecurityVideo = () => {
    
  const videosList = [
    {
      id: 1,
      title: "Video 1",
      url: "https://www.youtube.com/embed/4rJWeDW3lh0",
    },
    // {
    //   id: 2,
    //   title: "Video 2",
    //   url: "https://www.youtube.com/embed/4rJWeDW3lh0",
    // },
    // {
    //   id: 3,
    //   title: "Video 3",
    //   url: "https://www.youtube.com/embed/4rJWeDW3lh0",
    // },
    // {
    //   id: 4,
    //   title: "Video 4",
    //   url: "https://www.youtube.com/embed/4rJWeDW3lh0",
    // },
  ];




  return (
    <Container className="security-video-container">
      <div className="logo">
        <img src={Logo1PIcon} alt="Logo 1P" className="Logo1PIcon" />
      </div>
      <h2 className="title">Security Video</h2>
      <p className="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus egestas
        purus at consequat rutrum.
      </p>
      <div className="video-wrapper mb-5 pb-4">
        {videosList?.map((item, index) => (
          <iframe
            key={index}
            width="100%"
            height="200"
            src={item?.url}
            title={item?.title}
            frameBorder="0"
            allowFullScreen
          ></iframe>
        ))}
      </div>
      <div className="position-fixed bottom-0 w-100 start-0 end-0 d-flex justify-content-center left-0 right-0">
        <Container className="d-flex justify-content-between w-100 mb-2">
          <Button variant="dark" className="w-100 mt-4" href="/check-in/visit-details">
            Continue
          </Button>
        </Container>
      </div>
    </Container>
  );
};

export default SecurityVideo;
