// import React, { useRef, useState } from "react";
// import Webcam from "react-webcam";
// import { Button, Container } from "react-bootstrap";
// import { FaCamera } from "react-icons/fa";

// const CapturePhoto = () => {
//   const webcamRef = useRef(null);
//   const [image, setImage] = useState(null);

//   const capture = () => {
//     const imageSrc = webcamRef.current.getScreenshot();
//     setImage(imageSrc);
//   };

//   return (
//     <Container className="d-flex flex-column align-items-center mt-5">
//       {!image ? (
//         <>
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/png"
//             className="border rounded shadow-sm"
//             width={400}
//             height={300}
//           />
//           <Button variant="primary" className="mt-3" onClick={capture}>
//             <FaCamera className="me-2" /> Capture Photo
//           </Button>
//         </>
//       ) : (
//         <>
//           <img src={image} alt="Captured" className="border rounded shadow-sm" />
//           <Button variant="secondary" className="mt-3" onClick={() => setImage(null)}>
//             Retake Photo
//           </Button>
//         </>
//       )}
//     </Container>
//   );
// };

// export default CapturePhoto;

import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import { Button, Container, Spinner } from "react-bootstrap";
import { FaCamera, FaLock, FaRedo } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "./CapturePhoto.scss"; // Add a CSS file for styling

const CapturePhoto = ({setImage,isLoading}) => {
  const webcamRef = useRef(null);

  const base64ToFile = async(base64String, fileName) => {
    if(!base64String) return "noImage";
    const byteString = atob(base64String.split(',')[1]); 
    const mimeType = base64String.split(',')[0].split(':')[1].split(';')[0];
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i);
    }

    return await new File([uint8Array], fileName, { type: mimeType });
};
  const capture = async() => {
    const imageSrc = webcamRef.current.getScreenshot();
  const newImage = await base64ToFile(imageSrc,"photoToMatchYourID.jpg");
    setImage(newImage);
  };

  return (
    <Container className="camera-container flex-grow-1 pb-4">
      {!isLoading ? (
        <div className="camera-wrapper h-100">
            <h5 className="mt-3 fw-bold title-invite-sent text-black">Identity Verification</h5>
          <div className="webcam-overlay h-100">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="webcam-feed h-100"
            />
            <div className="face-outline"></div>
          </div>
          <div className="controls">
            <Button variant="primary" className="mt-3" onClick={capture}>
              <FaCamera className="me-2" /> Face Match
            </Button>
          </div>
        </div>
      ) : (
        <div className="verification-container">
          <Spinner animation="border" variant="light" className="spinner" />
          <p className="text">
            <FaLock className="lock-icon" /> Verifying details securely
          </p>
        </div>
      )}
    </Container>
  );
};

export default CapturePhoto;
