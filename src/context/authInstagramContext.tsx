import { createContext, useEffect, useState } from "react";
import fetchApi from "../services/fetchApi";

export type TAuthIGStatus =
  | "unavailable"
  | "unauthorized"
  | "available"
  | "loading";

export interface IAuthInstagramContext {
  accessCode: string;
  setAccessCode: (value: string) => void;
  accessToken: string;
  setAccessToken: (value: string) => void;
  authIGStatus: TAuthIGStatus;
  setAuthIGStatus: (value: TAuthIGStatus) => void;
  logout: () => void;
  userIG: IUserIG;
  setUserIG: (value: IUserIG) => void;
}

export interface IUserIG {
  id: string;
}

export const AuthInstagramContext = createContext({} as IAuthInstagramContext);

const AuthInstagramProvider = ({ children }: any) => {
  const [accessCode, setAccessCode] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [userIG, setUserIG] = useState<IUserIG>({} as IUserIG);

  const [authIGStatus, setAuthIGStatus] =
    useState<TAuthIGStatus>("unavailable");

  const logout = () => {
    setAccessCode("");
    setAccessToken("");
    setUserIG({} as IUserIG);
    setAuthIGStatus("unavailable");
    localStorage.clear();
  };

  useEffect(() => {
    if (authIGStatus !== "loading") {
      if (accessCode && !accessToken) {
        setAuthIGStatus("loading");
        fetchApi
          .post(`/ig/authorize-token?code=${accessCode}`)
          .then((response) => {
            if (response.status === 200) {
              setAccessToken(response.data.access_token);
              localStorage.setItem("accessToken", response.data.access_token);
              setUserIG((pv) => ({
                ...pv,
                id: response.data.user_id,
              }));
              setAuthIGStatus("available");
              console.log(response.data);
            }
          })
          .catch((error) => {
            console.log(error);
            setAuthIGStatus("unauthorized");
          });
      }
    }
  }, [accessCode, accessToken, authIGStatus]);

  useEffect(() => {
    if (!accessToken) {
      setAuthIGStatus("loading");
      const accessTokenLs = localStorage
        .getItem("accessToken")
        ?.replace("undefined", "");
      if (accessTokenLs) {
        setAccessToken(accessTokenLs);
        setAuthIGStatus("available");
        return;
      }
      setAuthIGStatus("unauthorized");
    }

    if (!accessCode) {
      setAuthIGStatus("loading");
      const accessCodeLs = localStorage
        .getItem("accessCode")
        ?.replace("undefined", "");
      if (accessCodeLs) {
        setAccessCode(accessCodeLs);
        setAuthIGStatus("loading");
        return;
      }
      setAuthIGStatus("unauthorized");
    }
  }, [accessCode, accessToken, authIGStatus]);

  return (
    <AuthInstagramContext.Provider
      value={{
        accessCode,
        setAccessCode,
        accessToken,
        setAccessToken,
        authIGStatus,
        setAuthIGStatus,
        logout,
        userIG,
        setUserIG,
      }}
    >
      {children}
    </AuthInstagramContext.Provider>
  );
};

export default AuthInstagramProvider;
