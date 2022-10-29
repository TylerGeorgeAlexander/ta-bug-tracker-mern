import { Card, Tab, Tabs } from "@blueprintjs/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Register from "./components/Register";
// import Welcome from "./components/Welcome";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NoPage from "./pages/NoPage";
import Layout from "./pages/Layout";
// import Test from "./pages/Test";
import Bugs from "./pages/Bugs";
import BugForm from "./components/BugForm";
import Profile from "./pages/Profile";
import Reassign from "./pages/Reassign";

function App() {
  const [currentTab, setCurrentTab] = useState("login");
  const [userContext, setUserContext] = useContext(UserContext);

  const verifyUser = useCallback(() => {
    fetch(process.env.REACT_APP_API_ENDPOINT + "/users/refreshToken", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    }).then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setUserContext((oldValues) => {
          return { ...oldValues, token: data.token };
        });
      } else {
        setUserContext((oldValues) => {
          return { ...oldValues, token: null };
        });
      }
      // call refreshToken every 5 minutes to renew the authentication token.
      setTimeout(verifyUser, 5 * 60 * 1000);
    });
  }, [setUserContext]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);

  /**
   * Sync logout across tabs
   */
  const syncLogout = useCallback((event) => {
    if (event.key === "logout") {
      // If using react-router-dom, you may call history.push("/")
      window.location.reload();
    }
  }, []);

  useEffect(() => {
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, [syncLogout]);

  return userContext.token === null ? (
    <div className="login-body">
      <Card elevation="1" className="m-4">
        <Tabs id="Tabs" onChange={setCurrentTab} selectedTabId={currentTab}>
          <Tab id="login" title="Login" panel={<Login />} />
          <Tab id="register" title="Register" panel={<Register />} />
          <Tabs.Expander />
        </Tabs>
      </Card>
    </div>
  ) : userContext.token ? (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Index />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          {/* TODO Clean Up */}
          {/* <Route exact path="/test" element={<Test />} /> */}
          <Route
            exact
            path="/Bugs"
            element={<Bugs userContext={userContext} />}
          />
          <Route
            exact
            path="/Bugs/add"
            element={<BugForm userContext={userContext} />}
          />
          <Route
            exact
            path="/profile/:id"
            element={<Profile userContext={userContext} />}
          />
          <Route
            exact
            path="/reassign/:bugId"
            element={<Reassign userContext={userContext} />}
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ) : (
    <Loader />
  );
}

export default App;
