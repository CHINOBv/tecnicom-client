import React, { useEffect, useState } from "react";
import { apiUrl } from "../vars";

function LoginPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const getAccessCode = () => {
    window.location.replace(apiUrl + "/api/ig/authorize");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="d-flex justify-content-center p-5">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body justify-content-center align-items-center d-flex flex-column">
                <h5 className="card-title">Ingresa con Instagram</h5>
                {isMounted && (
                  <button onClick={getAccessCode} className="btn btn-primary">
                    Ingresa con instagram
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
