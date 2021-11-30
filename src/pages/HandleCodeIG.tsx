import React, { useContext, useEffect, useState } from "react";
import { AuthInstagramContext } from "../context/authInstagramContext";
import { useNavigate } from "react-router-dom";

function HandleCodeIG() {
  const { accessCode, setAccessCode, setAuthIGStatus } =
    useContext(AuthInstagramContext);

  const nav = useNavigate();

  useEffect(() => {
    let code = window.location.href.match(/code=([^&]*)/);
    if (code) {
      const codeRes = code[1];
      const codeFormatted = codeRes.replace("#_", "");
      localStorage.setItem("accessCode", codeFormatted);
      setAccessCode(codeFormatted);
      setAuthIGStatus("loading");
    } else {
      setAuthIGStatus("unauthorized");
    }

    nav("/", {
      replace: true,
    });
  }, [accessCode, nav, setAccessCode, setAuthIGStatus]);
  return <h1>Code</h1>;
}

export default HandleCodeIG;
