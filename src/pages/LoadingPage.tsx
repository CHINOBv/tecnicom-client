import React from "react";

function LoadingPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#333",
      }}
    >
      <div className="spinner" />
    </div>
  );
}

export default LoadingPage;
