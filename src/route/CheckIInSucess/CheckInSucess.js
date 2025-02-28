import { Button, Card, Col, Container, Row } from "react-bootstrap";

import "./CheckInSucess.scss";

import { GoArrowLeft } from "react-icons/go";
import logo from "../../asset/images/1Pass_Logo.svg";
import { useNavigate } from "react-router-dom";

export default function CheckInSucess({role,page}) {
  const navigate = useNavigate();
  const goBack = () => navigate(`/${page}`);
  return (
    <Container className="pt-4 pt-md-2 pb-lg-5 pb-4 h-100">
      <Card
        className="d-flex justify-content-center border-0"
        style={{ height: "80vh" }}
      >
        <Card.Body className=" text-center m-auto">
          <Card.Img src={logo} className="w-25" />
          <Card.Title as={"h2"} className="m-auto text-center mt-3">
          {page==="check-in" ? "Checked in" : "Checked out"} Successfully
          </Card.Title>
          <Card.Text className="m-auto text-center mt-3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
            egestas purus at consequat rutrum.
          </Card.Text>
        </Card.Body>
      </Card>
      <Card className="m-auto mt-0 mt-sm-3 border-0 px-md-5 px-0">
        <Row className="m-auto">
          <Col xs="auto">
            <Button
              type="submit"
              variant="primary"
              className="d-flex align-items-center w-100 px-5 py-2 gap-2"
              onClick={goBack}
            >
              <GoArrowLeft size={22} /> Back to {page==="check-in" ? "Check in" : "Check out"}
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
