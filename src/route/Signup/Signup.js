import classNames from "classnames";
import React, { useEffect } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import Select from "react-select";
import { Controller, useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const isAuth = localStorage.getItem("token");

  const titleOptions = [
    { value: "Mr", label: "Mr." },
    { value: "Miss", label: "Miss" },
    { value: "Mrs", label: "Mrs." },
  ];

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  useEffect(() => {
    if (isAuth) {
      navigate("/login");
    }
  }, [isAuth]);

  const onSubmit = (data) => {
    console.log("signup data:", data);
  };
  return (
    <Container className="mb-5">
      <Card className="w-75 p-4 m-auto mt-5">
        <Card.Title as={"h2"} className="m-auto mb-5">
          Signup
        </Card.Title>
        <Form name="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <Row className="justify-content-center">
            <Col md={2}>
              <Form.Group className="mb-4">
                <Form.Label className="fs-5 fw-normal">Title</Form.Label>
                <Controller
                  name={"title"}
                  control={control}
                  autoComplete="off"
                  rules={{
                    required: "This field is required",
                  }}
                  render={({ field: { value, onChange } }) => {
                    return (
                      <Select
                        inputId="signupTitle"
                        placeholder="Title"
                        classNamePrefix="react-select"
                        className={classNames("react-select-container", {
                          "is-invalid": errors.title,
                        })}
                        options={titleOptions}
                        value={titleOptions?.find((c) => c.value === value)}
                        onChange={(val) => onChange(val.value)}
                      />
                    );
                  }}
                />
                <ErrorMessage
                  errors={errors}
                  name="title"
                  render={({ message }) => (
                    <Card.Text className="text-danger">{message}</Card.Text>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-4">
                <Form.Label className="fs-5 fw-normal">First Name</Form.Label>
                <Form.Control
                  name="firstName"
                  id="signupFirstName"
                  type="text"
                  autoComplete="off"
                  className={classNames("fs-5", {
                    "is-invalid": errors.firstName,
                  })}
                  {...register("firstName", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Please enter a valid First Name",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="firstName"
                  render={({ message }) => (
                    <Card.Text className="text-danger">{message}</Card.Text>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={5}>
              <Form.Group className="mb-4">
                <Form.Label className="fs-5 fw-normal">Last Name</Form.Label>
                <Form.Control
                  name="lastName"
                  id="signUplastName"
                  type="text"
                  autoComplete="off"
                  className={classNames("fs-5", {
                    "is-invalid": errors.lastName,
                  })}
                  {...register("lastName", {
                    required: "This field is required",
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Please enter a valid Last Name",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="lastName"
                  render={({ message }) => (
                    <Card.Text className="text-danger">{message}</Card.Text>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-4">
                <Form.Label className="fs-5 fw-normal">Email</Form.Label>
                <Form.Control
                  name="email"
                  id="signupEmail"
                  type="text"
                  autoComplete="off"
                  className={classNames("form-control fs-5", {
                    "is-invalid": errors.email,
                  })}
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value:
                        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "Please enter a valid email address",
                    },
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="email"
                  render={({ message }) => (
                    <Card.Text className="text-danger">{message}</Card.Text>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fs-5 fw-normal">Passsword</Form.Label>
                <Form.Control
                  name="password"
                  id="signupPassword"
                  type="password"
                  autoComplete="off"
                  className={classNames("", {
                    "is-invalid": errors.password,
                  })}
                  {...register("password", {
                    required: "This field is required",
                  })}
                />

                <ErrorMessage
                  errors={errors}
                  name="password"
                  render={({ message }) => (
                    <Card.Text className="text-danger">{message}</Card.Text>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-4">
                <Form.Label className="fs-5 fw-normal">Passsword</Form.Label>
                <Form.Control
                  name="confirmPassword"
                  id="signupConfirmPassword"
                  type="password"
                  autoComplete="off"
                  className={classNames("", {
                    "is-invalid": errors.confirmPassword,
                  })}
                  {...register("confirmPassword", {
                    required: "This field is required",
                    validate: (value) =>
                      value === getValues("password") ||
                      "Confirm password should be matches with password",
                  })}
                />

                <ErrorMessage
                  errors={errors}
                  name="confirmPassword"
                  render={({ message }) => (
                    <Card.Text className="text-danger">{message}</Card.Text>
                  )}
                />
              </Form.Group>
            </Col>
            <Col md={12}>
              <Form.Group className="mb-4">
                <Form.Check
                  id="signupTerms"
                  name="acceptTerms"
                  type="checkbox"
                  autoComplete="off"
                  label={
                    "By checking this box you agree to the terms and conditions"
                  }
                  className={classNames("fs-5 fw-normal", {
                    "is-invalid": errors.acceptTerms,
                  })}
                  {...register("acceptTerms", {
                    required: "This field is required",
                  })}
                />
                <ErrorMessage
                  errors={errors}
                  name="acceptTerms"
                  render={({ message }) => (
                    <Card.Text className="text-danger">{message}</Card.Text>
                  )}
                />
              </Form.Group>
            </Col>
            <Col xs="auto" className="m-auto">
              <Button
                type="submit"
                // disabled={isLoading}
                variant="primary"
                className="w-100 px-5 py-2"
              >
                {/* {isLoading ? ( */}
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                {/* ) : ( */}
                  "Submit"
                {/* )} */}
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </Container>
  );
}
