import { createContext, useEffect, useState } from "react";

import fetchApi from "../services/fetchApi";
import fetchInstagram from "../services/fetchInstagram";

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
  userName?: string;
  accountType?: string;
  mediaCount?: number;
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
    setAuthIGStatus("unauthorized");
    localStorage.clear();
  };

  useEffect(() => {
    if (authIGStatus !== "loading") {
      if (accessCode && !accessToken) {
        setAuthIGStatus("loading");
        getToken(accessCode);
      }
    }
  }, [accessCode, accessToken, authIGStatus]);

  const getToken = (code: string) => {
    setAuthIGStatus("loading");
    return fetchApi
      .post(`/ig/authorize-token?code=${code}`)
      .then((response) => {
        if (response.status === 200) {
          setAccessToken(response.data.access_token);
          setUserIG((pv) => ({ ...pv, id: response.data.user_id }));
          localStorage.setItem("accessToken", response.data.access_token);
          localStorage.setItem("userId", response.data.user_id);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthIGStatus("unauthorized");
      });
  };

  useEffect(() => {
    if (!accessToken) {
      setAuthIGStatus("loading");
      const accessTokenLs = localStorage
        .getItem("accessToken")
        ?.replace("undefined", "");
      if (accessTokenLs) {
        setAccessToken(accessTokenLs);
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
        return;
      }
      setAuthIGStatus("unauthorized");
    }
  }, [accessCode, accessToken, authIGStatus]);

  useEffect(() => {
    if (!userIG.userName) {
      const userIdLs = localStorage.getItem("userId")?.replace("undefined", "");
      if (userIdLs) {
        getUserInfo(userIdLs);
      }
    }
  }, [userIG]);

  const getUserInfo = (userId: string) => {
    setAuthIGStatus("loading");
    return fetchInstagram(`/${userId}?fields=username,account_type,media_count`)
      .then((response) => {
        if (response.status === 200) {
          const { username, account_type, media_count, id } = response.data;
          setUserIG({
            id,
            userName: username,
            accountType: account_type,
            mediaCount: media_count,
          });
          setAuthIGStatus("available");
        }
      })
      .catch((error) => {
        console.log(error);
        setAuthIGStatus("unauthorized");
        logout();
      });
  };

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
