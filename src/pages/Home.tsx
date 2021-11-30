import React from "react";
import Posts from "../components/home/Posts";
import ProfileInfo from "../components/home/ProfileInfo";

function Home() {
  return (
    <>
      <div
        className="container-fluid p-4 bg-ligth"
        style={{
          minWidth: "100%",
          minHeight: "100vh",
        }}
      >
        <div className="row gap-4 justify-content-center">
          {/* <div className="col-12 col-md-3 card d-flex justify-content-center align-items-center p-4">
            <ProfileInfo />
          </div> */}
          <div
            className="col-12 col-md-12 d-flex flex-column bg-dark align-items-center p-4"
            style={{
              minHeight: "90vh",
              borderRadius: "10px",
            }}
          >
            <Posts />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
