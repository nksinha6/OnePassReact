import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { UserInfo } from "../../redux/Action/UserInfoAction";

export default function UserList() {
  // const dispatch = useDispatch();
  // const { userList, isLoadding } = useSelector(state => state.Users);

  // useEffect(() => {
  //   dispatch(UserInfo());
  // }, [dispatch]);

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={10}>
          <Card.Title className="my-5 text-start fs-3 fw-bold">
            User account list
          </Card.Title>
          {/* {isLoadding ? (
            <Card className=" border-0 p-5 m-5 position-relation">
              <Spinner
                as="span"
                animation="border"
                size="xl"
                role="status"
                aria-hidden="true"
                variant="primary"
                className="position-absolute top-50 start-50"
              />
            </Card>
          ) : ( */}
            <Table responsive>
              <thead>
                <tr>
                  <th>Sr. no</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {userList?.map((user, key) => (
                  <tr key={key}>
                    <td>{key + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>
                      <Button className="mx-2">Edit</Button>
                      <Button className="mx-2">Delete</Button>
                    </td>
                  </tr>
                ))} */}
                no data
              </tbody>
            </Table>
          {/* )} */}
        </Col>
      </Row>
    </Container>
  );
}
