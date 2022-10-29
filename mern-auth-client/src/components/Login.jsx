import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userContext, setUserContext] = useContext(UserContext);

  // DEMO SIGN IN
  const formSubmitHandlerDemo = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";
    
    fetch(process.env.REACT_APP_API_ENDPOINT + "/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "admin@admin.com",
        password: "asdfasdf",
      }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

  // REGULAR AUTH HANDLER
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const genericErrorMessage = "Something went wrong! Please try again later.";

    fetch(process.env.REACT_APP_API_ENDPOINT + "/users/login", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: email.toLowerCase(), password }),
    })
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.ok) {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = await response.json();
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };

  // HTML FORMS
  return (
    <>
      {error && <Callout intent="danger">{error}</Callout>}
      <form onSubmit={formSubmitHandler} className="auth-form m-2">
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="emailLogin"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="passwordLogin"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button
          intent="primary"
          disabled={isSubmitting}
          text={`${isSubmitting ? "Signing In" : "Sign In"}`}
          fill
          type="submit"
        />
      </form>
      <form onSubmit={formSubmitHandlerDemo} className="auth-form-demo m-2">
        <FormGroup className="hidden" label="Email" labelFor="email">
          <InputGroup
            className="hidden"
            id="emailLogin"
            placeholder="Email"
            type="email"
            value="admin@admin.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup className="hidden" label="Password" labelFor="password">
          <InputGroup
            className="hidden"
            id="passwordLogin"
            placeholder="Password"
            type="password"
            value="asdfasdf"
            onChange={(e) => setPassword(e.target.value)}
          />
        </FormGroup>
        <Button intent="success" text={`DEMO SIGN IN`} fill type="submit" />
      </form>
    </>
  );
};

export default Login;
