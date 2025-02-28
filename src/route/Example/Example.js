import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import aadharCard from "../../asset/images/aadhar-card.svg";
import Logo1PIcon from "../../asset/images/1Pass_Logo.svg";
import whiteLockIcon from "../../asset/images/white-lock-icon.svg";
import uploadIcon from "../../asset/images/Upload-Icon.svg";
import FaceMatchIcon from "../../asset/images/Face-Match-Icon.svg";
import "./Example.scss";
import { useNavigate } from "react-router-dom";
import CapturePhoto from "../../component/Modals/CapturePhoto/CapturePhoto";
import { FaCheck } from "react-icons/fa";
import axios from "axios";
import { showToast } from "../../component/ToastProvider/ToastProvider";

const Example = () => {
  const [step, setStep] = useState("Aadhaar");
  const [img1, setImg1] = useState(null);
  const [img2, setImg2] = useState(null);
  const [faceImg, setFaceImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const matchFace = async (imageFile1, imageFile2) => {
    try {
      console.log("imageFiles", imageFile1, "imageFile=======>", imageFile2);

      const formData = new FormData();
      formData.append("reference_id", "eefa-abs1-0001-8915");
      formData.append("consent", "Y");
      formData.append("consent_purpose", "for ID check in purpose only");
      formData.append("image1", imageFile1);
      formData.append("image2", imageFile2);

      const response = await axios.post(
        "https://in.staging.decentro.tech/v2/kyc/forensics/face_match",
        formData,
        {
          headers: {
            client_id: "unitol_staging",
            client_secret: "yfhvfqJEvAuKw5U5JnmBoVKSX9Z9mySe",
            module_secret: "CRPVNGwsdaVfr3dv6RcBEkEO6QKCfa9j",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // console.log('Response:', response.data?.data?.status);
      console.log("Response:", response.data?.data);
      if (response.data?.data?.status === "SUCCESS") {
        handleSubmit();
      } else {
        showToast("Photo did not Match", "error");
        setImg1(null);
        setImg2(null);
        setFaceImg(null);
        setStep("Aadhaar");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (faceImg) {
      if (faceImg === "noImage") {
        showToast("Photo did not Match", "error");
        setImg1(null);
        setImg2(null);
        setFaceImg(null);
        setStep("Aadhaar");
        return;
      } else {
        setIsLoading(true);
        matchFace(img1, faceImg);
      }
    }
  }, [faceImg]);

  const navigate = useNavigate();
  const handleFileChange = (e, setImage) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
  };

  const handleSubmit = () => {
    if (step === "Aadhaar") {
      setStep("Aadhaar-Add");
    } else if (step === "Aadhaar-Add" && img1 && img2) {
      setStep("Face-Match");
      console.log("Uploaded Images:", img1, img2);
    } else if (step === "Face-Match") {
      setStep("Capture-Photo");
    } else if (step === "Capture-Photo") {
      setStep("Success");
    } else if (step === "Success") {
      navigate("/check-in/invite-details");
    }
  };

  return (
    <Container className="h-screen text-center pt-3 example-container d-flex flex-column justify-content-start align-items-center">
      <img src={Logo1PIcon} alt="Logo" className="Logo1PIcon" />

      {step === "Aadhaar" && (
        <>
          <h5 className="mt-3 fw-bold title-invite-sent">
            Be ready with Aadhaar Card
          </h5>
          <p className="example-sent-message">
            We will now use a secure connection to authenticate your identity.
            Your personal data will be handled strictly in accordance with
            government guidelines on data protection and retention.
            <br />
            <br />
            Please have your Aadhaar card ready for the next step.
          </p>
          <div className="pt-3 flex-grow-1">
            <img src={aadharCard} alt="Aadhaar Card" className="h-80 w-100" />
          </div>
        </>
      )}

      {step === "Aadhaar-Add" && (
        <>
          <h5 className="mt-3 fw-bold title-invite-sent">
            Upload your Aadhaar Card
          </h5>
          <p className="example-sent-message">
            Your personal data will be handled in strict compliance with
            government guidelines.
          </p>

          <div className="upload-section flex-grow-1">
            <label className="upload-box">
              <span>Upload Aadhaar Front</span>
              <div className="upload-container position-relative">
                {img1 ? (
                  <img
                    src={URL.createObjectURL(img1)}
                    alt="Upload Icon"
                    className="Upload-Aadhaar-img"
                  />
                ) : (
                  <>
                    <img src={uploadIcon} alt="Upload Icon" />

                    <p>
                      <strong>Click to Upload</strong> or drag and drop <br />
                      PNG, JPG, PDF up to 10 MB
                    </p>
                  </>
                )}
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg, application/pdf"
                  className="file-input"
                  onChange={(e) => handleFileChange(e, setImg1)}
                />
              </div>
            </label>

            <label className="upload-box">
              <span>Upload Aadhaar Back</span>
              <div className="upload-container">
                {img2 ? (
                  <img
                    src={URL.createObjectURL(img2)}
                    alt="Upload Icon"
                    className="Upload-Aadhaar-img"
                  />
                ) : (
                  <>
                    <img src={uploadIcon} alt="Upload Icon" />
                    <p>
                      <strong>Click to Upload</strong> or drag and drop <br />
                      PNG, JPG, PDF up to 10 MB
                    </p>
                  </>
                )}
                <Form.Control
                  type="file"
                  accept="image/png, image/jpeg, application/pdf"
                  className="file-input"
                  onChange={(e) => handleFileChange(e, setImg2)}
                />
              </div>
            </label>
          </div>
        </>
      )}

      {step === "Face-Match" && (
        <>
          <h5 className="mt-3 fw-bold title-invite-sent">Face Match</h5>
          <p className="example-sent-message">
            Next, you will click a picture of your face using your phone's front
            camera.
            <br />
          </p>
          <div className="pt-3 flex-grow-1">
            <img
              src={FaceMatchIcon}
              alt="Aadhaar Card"
              className="h-80 w-100"
            />
          </div>
          <div className="checklist-container">
            <p className="title">Please ensure :</p>
            <ul className="checklist">
              <li>
                <FaCheck className="check-icon" />
                You are in a well-lit place
              </li>
              <li>
                <FaCheck className="check-icon" />
                You have no obstructions such as hats, masks, or glasses on your
                face
              </li>
            </ul>
          </div>
        </>
      )}

      {step === "Capture-Photo" && (
        <CapturePhoto setImage={setFaceImg} isLoading={isLoading} />
      )}

      {step === "Success" && (
        <>
          <h5 className="mt-3 fw-bold title-invite-sent">Success</h5>
          <p className="example-sent-message">
            Thank you for authenticating your identity. Please continue to
            Exploring the App.
          </p>
          <div className="flex-grow-1"></div>
        </>
      )}

      {/* Continue Button */}
      {step !== "Capture-Photo" && (
        <Container className="d-flex justify-content-between align-items-center w-100 mb-2">
          <Button
            variant="dark"
            className="w-100 mt-4 text-center d-flex justify-content-center align-items-center gap-1"
            onClick={handleSubmit}
            disabled={step === "Aadhaar-Add" && (!img1 || !img2)}
          >
            {step === "Aadhaar-Add" && (
              <img src={whiteLockIcon} alt="Lock Icon" className="mr-2" />
            )}
            {(step === "Aadhaar" ||
              step === "Success" ||
              step === "Face-Match") &&
              "Continue"}
            {step === "Aadhaar-Add" && "Proceed Securely"}
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Example;
