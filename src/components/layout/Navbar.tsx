import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthInstagramContext } from "../../context/authInstagramContext";

function Navbar() {
  const { authIGStatus, logout } = useContext(AuthInstagramContext);
  const nav = useNavigate();
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse d-flex justify-content-between"
            id="navbarTogglerDemo01"
          >
            <Link
              className="navbar-brand"
              to={authIGStatus !== "unauthorized" ? "/" : "login"}
            >
              Tecnicom
            </Link>
            <div>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    aria-current="page"
                    to={authIGStatus !== "unauthorized" ? "/" : "login"}
                  >
                    Posts
                  </Link>
                </li>
                <li className="nav-item">
                  {authIGStatus === "unauthorized" ? (
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  ) : (
                    <a
                      href="javascript:void(0)"
                      className="nav-link"
                      onClick={() => {
                        logout();
                        nav("/login", {
                          replace: true,
                        });
                      }}
                    >
                      Cerrar sesion
                    </a>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
