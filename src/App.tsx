import "./App.css";

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router";

// import oauth from "axios-oauth-client";
import Home from "./pages/Home";
const client_id = "359294529284647";
const client_secret = "d43b1fce076bb4c522f70de3cb7a1ab5";
const redirectURI = "https://localhost:3000/";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // const Url = ;
    let code = window.location.href.match(/code=([^&]*)/);
    if (code) {
      const codeRes = code[1];
      const codeFormatted = codeRes.replace("#_", "");
      setAccessToken(codeFormatted);
    }

    setIsMounted(true);
  }, [accessToken]);

  useEffect(() => {
    (async () => {
      if (accessToken) {
        const data = {
          client_secret,
          client_id: client_id,
          grant_type: "authorization_code",
          redirect_uri: "https://localhost:3000/",
          code: accessToken,
        };
        console.log(data);
      }
    })();
  }, [accessToken]);

  const getAuthCode = async () => {
    window.open(
      "http://192.168.0.4:443/api/ig/authorize",
      "_blank",
      "location=yes,height=570,width=520,scrollbars=yes,status=yes"
    );
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
