import "./App.css";
import { Route, Routes } from "react-router";

import Navbar from "./components/layout/Navbar";
import AuthInstagramProvider from "./context/authInstagramContext";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import HandleCodeIG from "./pages/HandleCodeIG";
import { useContext, useEffect } from "react";
import { AuthInstagramContext } from "./context/authInstagramContext";

function App() {
  return (
    <>
      <AppState>
        <Navbar />
        <AppRouter />
      </AppState>
    </>
  );
}

const AppRouter = () => {
  const authIg = useContext(AuthInstagramContext);
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/handle-code" element={<HandleCodeIG />} />
      {authIg.authIGStatus !== "unauthorized" && (
        <>
          <Route path="/" element={<Home />} />
        </>
      )}
    </Routes>
  );
};

const AppState = ({ children }: any) => {
  return (
    <>
      <AuthInstagramProvider>{children}</AuthInstagramProvider>
    </>
  );
};

export default App;
