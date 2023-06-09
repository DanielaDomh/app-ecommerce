import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate()
  const submit = (data) => {
    axios
    .post ("https://e-commerce-api-v2.academlo.tech/api/v1/users/login", data)
    .then(resp => {
      localStorage.setItem("token", resp.data.token)
      console.log(resp.data.token)
      navigate("/")
    })
    .catch(error => {
      if (error.response.status === 401){
        alert("Los datos ingresados no son correctos, por favor, intenta de nuevo.")
      }
    })
  };

  return (
    <div>
      <Form
        onSubmit={handleSubmit(submit)}
        className="p-5 mt-4"
        style={{ border: "1px solid grey" }}
      >
        <h2>Long In to continue </h2>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="email"
              placeholder="email@example.com"
              {...register("email")}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="password"
              placeholder="Password"
              {...register("password")}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 2 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
