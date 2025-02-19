import React, { useState, useEffect } from "react";
import logo from "../../assets/HorizontalLogo.png";
import MessageComponent from "../../components/util/MessageComponent/MessageComponent";
import { authenticateUser, verifyUser } from "../../api/AuthApi";
import RegisterPage from '../Register/Register'
import { Redirect } from "react-router-dom";
import "./Login.css";
import {
  Grid,
  Segment,
  Header,
  Button,
  Divider,
  Form,
  Input,
  Image
} from "semantic-ui-react";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successfulLogin, setSuccessfulLogin] = useState(false);
  const [forgotPassword,  setForgotPassword] = useState(false)
  const [register, setRegister] = useState(false)


  useEffect(() => {
    const jwt = Cookies.get("jwt");
    if (jwt) {
      verifyUser().then(verified => {
        console.log("VERIFIED");
        console.log(verified);
        if (verified) {
          setSuccessfulLogin(true);
        }
      });
    }
  }, []);

  const login = async event => {
    if (!username || !password) {
      setError("Missing username or password");
      return;
    }
    let authResponse = await authenticateUser(username, password);
    if (authResponse.token) {
      setSuccessfulLogin(true);
    } else {
      setError("Invalid username/password");
    }
  };

  if (successfulLogin) {
    return <Redirect to="/dashboard" />;
  }

  if (forgotPassword) {
    return <Redirect to="/passwordreset" />;
  }

  function Register(){
    setRegister(true)
  }

  return (
    <Grid stackable className="container">
      <Grid.Column width={4} />
      <Grid.Column width={8}>
        {error && (
          <MessageComponent type="failure" title="Uh no!" content={error} />
        )}
        <Segment padded="very" stacked>
          <Header
            centered
            textAlign="center"
            as="div"
            icon
            style={{ backgroundColor: "white" }}
          >
            <Image src={logo} fluid style={{ width: "50%" }} />
          </Header>
          <Divider hidden />
          <Segment raised color="orange">
            <Form widths='equal'>
              <Form.Field
                label="Username"
                control={Input}
                onChange={event => setUsername(event.target.value)}
              />
              <Form.Input
                label="Password"
                control={Input}
                type="password"
                onChange={event => setPassword(event.target.value)}
              />
             <Button floated='left' style={{width:"48%"}} className="loginButton" fluid onClick={login}>
                Login
              </Button>
                <Button floated='right' style={{width:"48%"}} className="loginButton" fluid onClick={Register}>
                    Register
                </Button>
              <div style={{padding: '3vh'}} />
              <Button className="forgotButton" style={{ marginTop: 10 }} fluid onClick={() => setForgotPassword(true)}>
                Forgot Password?
              </Button>
            </Form>
            <RegisterPage setRegister={setRegister} register={register} />
          </Segment>
        </Segment>
      </Grid.Column>
    </Grid>
  );
}

export default Login;