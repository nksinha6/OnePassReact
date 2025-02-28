import { ErrorMessage } from "@hookform/error-message";
import React, { useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Manually = ({ addManualGuest }) => {
  const countryList = [
    { isoCode: "IN", phonecode: "+91" },
    { isoCode: "US", phonecode: "+1" },
    { isoCode: "CA", phonecode: "+1" },
    { isoCode: "DE", phonecode: "+49" },
    { isoCode: "FR", phonecode: "+33" },
    { isoCode: "IT", phonecode: "+39" },
    { isoCode: "ES", phonecode: "+34" },
    { isoCode: "GB", phonecode: "+44" },
    { isoCode: "AU", phonecode: "+61" },
    { isoCode: "NZ", phonecode: "+64" },
    { isoCode: "JP", phonecode: "+81" },
    { isoCode: "CN", phonecode: "+86" },
    { isoCode: "BR", phonecode: "+55" },
    { isoCode: "MX", phonecode: "+52" },
    { isoCode: "RU", phonecode: "+7" },
    { isoCode: "AR", phonecode: "+54" },
    { isoCode: "CL", phonecode: "+56" },
    { isoCode: "CO", phonecode: "+57" },
    { isoCode: "VE", phonecode: "+58" },
    { isoCode: "PE", phonecode: "+51" },
    { isoCode: "UY", phonecode: "+598" },
    { isoCode: "EC", phonecode: "+593" },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: "onSubmit" });

  const onSubmit = (value) => {
    console.log("add Manual Guest data:", value);
    const data = {
      name: value.name,
      phone: value.phone.replace("-",""),
    }
    addManualGuest(data);
    setValue('name','');
    setValue('phone','');
  };

  const formatNumber = (value) => {
    const rawValue = value.replace(/\D/g, "");
    if (rawValue.length <= 5) return rawValue;
    return rawValue.slice(0, 5) + "-" + rawValue.slice(5, 10);
  };

  const handleChange = (e) => {
    const formattedValue = formatNumber(e.target.value);
    setValue("phone", formattedValue);
  };

  const watchPhone = watch("phone");
  const watchName = watch("name");
  console.log("watchPhone", watchPhone, "watchName", watchName);

  return (
    <div>
      <Form name="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3">
          <Form.Label className="input-title">Guest Name</Form.Label>
          <div className="input-group">
            <Form.Control
              name="name"
              id="name"
              {...register("name", {
                required: "This field is required",
              })}
              value={watch("name")}
              type="text"
              placeholder="Enter Guest Name"
            />
            <ErrorMessage
              errors={errors}
              name="name"
              render={({ message }) => (
                <Card.Text className="text-danger">{message}</Card.Text>
              )}
            />
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="input-title">Mobile Number</Form.Label>
          <div className="input-group">
            <select className="form-select Mobile-Number-country-select">
              {countryList.map((country) => (
                <option
                  value={country.phonecode}
                  className="d-flex justify-content-start align-items-center"
                >
                  <img
                    alt="United States"
                    src={
                      "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                      country.isoCode +
                      ".svg"
                    }
                  />
                  {country.phonecode}
                </option>
              ))}
            </select>
            <Form.Control
              type="text"
              {...register("phone")}
              maxLength={11}
              onChange={handleChange}
              value={watch("phone")}
              inputMode="numeric"
              // onFocus={(e) => {
              //   setTimeout(() => {
              //     e.target.scrollIntoView({
              //       behavior: "smooth",
              //       block: "center",
              //     });
              //   }, 300);
              // }}
            />
            <ErrorMessage
              errors={errors}
              name="phone"
              render={({ message }) => (
                <Card.Text className="text-danger">{message}</Card.Text>
              )}
            />
          </div>
        </Form.Group>
        <Button
          variant="dark"
          className="w-fit p-2 px-3"
          type="submit"
          disabled={watchName && watchPhone.length === 11 ? false : true}
        >
          Add Guest
        </Button>
      </Form>
    </div>
  );
};

export default Manually;
