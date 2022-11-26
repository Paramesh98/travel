import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Button,
  Container,
  Alert,
} from "reactstrap";
import axiosQuery from "../helpers/axiosQuery";

function DetailsList() {
  const [details, setDetails] = useState({
    loading: false,
    data: [],
    error: "",
  });
  const navigate = useNavigate();

  const getDetails = async () => {
    axios
      .get("http://localhost:5000/detail")
      .then((res) =>
        setDetails({ loading: false, data: res.data.data, error: "" })
      )
      .catch((err) => {
        setDetails({
          ...details,
          error: err?.response?.data?.message || "Something went wrong",
        });
      });
  };

  useEffect(() => {
    getDetails();
  }, []);

  const onDetailsClick = () => {
    navigate("/");
  };
  return (
    <Container className="my-5">
      <h4>Details</h4>
      {details.error && <Alert color="danger">{details.error}</Alert>}

      {details.data.length > 0 &&
        details.data.map((item) => {
          return (
            <Card key={item.name}>
              <CardHeader>
                <div>Name : {item.name}</div>
                <div>Email : {item.email}</div>
              </CardHeader>
              <CardBody>
                <CardTitle tag="h5">
                  Destingation : {item.destination}
                </CardTitle>
                <CardText>
                  <div>travellers : {item.travellers}</div>
                  budget per traveller :{" "}
                  {item.budget.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </CardText>
                <Button onClick={onDetailsClick}>Add Details</Button>
              </CardBody>
              {/* <CardFooter>email</CardFooter> */}
            </Card>
          );
        })}
    </Container>
  );
}

export default DetailsList;
