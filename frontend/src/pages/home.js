import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import { countries } from "../config/countries.constants";

function Home() {
  const [details, setDetails] = useState({
    name: "",
    email: "",
    destination: "",
    travellers: "",
    budget: "",
  });
  const [status, setStatus] = useState({
    success: "",
    error: "",
  });
  const navigate = useNavigate();

  const onSubmit = () => {
    axios
      .post("http://localhost:5000/detail", details)
      .then((res) => {
        setStatus({ error: "", success: "Successfully saved" });
        navigate("/details");
      })
      .catch((err) => {
        setStatus({
          error: err?.response?.data?.message || "Something went wrong",
          success: "",
        });
      });
  };

  const onChange = (e) => {
    setDetails((state) => {
      return {
        ...state,
        [e.target.id]: e.target.value,
      };
    });
  };
  return (
    <Container className="mt-5" mt={4}>
      <h4>Please enter the details </h4>
      {status.success && <Alert color="success">{status.success}</Alert>}
      {status.error && <Alert color="danger">{status.error}</Alert>}
      <FormGroup>
        <Label for="name">Name</Label>
        <Input
          onChange={onChange}
          type="text"
          id="name"
          placeholder="Please enter your name"
        />
      </FormGroup>
      <FormGroup>
        <Label for="email">Email</Label>
        <Input
          onChange={onChange}
          type="email"
          id="email"
          placeholder="Please enter your email"
        />
      </FormGroup>
      <FormGroup>
        <Label for="destination">Where do you want to go?</Label>
        <Input
          type="select"
          onChange={onChange}
          id="destination"
          placeholder="Please enter your destination"
        >
          <option value="" disabled selected>
            Select an option
          </option>
          {countries.map((item) => {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="travellers">No. of travellers</Label>
        <Input
          onChange={onChange}
          type="number"
          id="travellers"
          placeholder="Please enter no of traverllers"
        />
      </FormGroup>
      <FormGroup>
        <Label for="budget">Budget Per Person in dollars($)</Label>
        <Input
          onChange={onChange}
          type="number"
          id="budget"
          placeholder="Please enter budget Per Person"
        />
      </FormGroup>
      <FormGroup>
        <Button onClick={onSubmit} outline color="primary" block>
          Submit
        </Button>
      </FormGroup>
    </Container>
  );
}

export default Home;
