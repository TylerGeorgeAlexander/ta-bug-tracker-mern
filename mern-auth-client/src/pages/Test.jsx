import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

// Test Page with a HERO
const Test = () => {
  // eslint-disable-next-line no-unused-vars
  const [userContext, setUserContext] = useContext(UserContext);
  const [dataTest, setDataTest] = useState();

  const testFetch = () => {
    console.log("Test Fetch");
    fetch(process.env.REACT_APP_API_ENDPOINT + "/bug/getFeed", {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
      // body: JSON.stringify({ username: email, password }),
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setDataTest(data);
      }
    });
  };

  return (
    <>
      {dataTest && JSON.stringify(dataTest.bugs)}
      <div
        className="hero min-h-screen"
        style={{ backgroundImage: `url("https://placeimg.com/1000/800/arch")` }}
      >
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Hello there, this is a test page!
            </h1>
            <p className="mb-5">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <button className="btn btn-primary" onClick={testFetch}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Test;
