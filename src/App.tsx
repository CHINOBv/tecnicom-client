import "./App.css";
import { Route, Routes } from "react-router";

import Navbar from "./components/layout/Navbar";
import AuthInstagramProvider from "./context/authInstagramContext";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import HandleCodeIG from "./pages/HandleCodeIG";
import { useContext } from "react";
import { AuthInstagramContext } from "./context/authInstagramContext";
import LoadingPage from "./pages/LoadingPage";
import MediasProvider from "./context/mediasContext";
import PostPage from "./pages/PostPage";

function App() {
  return (
    <>
      <AppState>
        <AppRouter />
      </AppState>
    </>
  );
}

const AppRouter = () => {
  const authIg = useContext(AuthInstagramContext);

  if (authIg.authIGStatus === "loading") {
    return <LoadingPage />;
  }

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/handle-code" element={<HandleCodeIG />} />
        {authIg.authIGStatus !== "unauthorized" ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/post/:id/:type" element={<PostPage />} />
          </>
        ) : (
          <>
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </>
  );
};

const AppState = ({ children }: any) => {
  return (
    <>
      <AuthInstagramProvider>
        <MediasProvider>{children}</MediasProvider>
      </AuthInstagramProvider>
    </>
  );
};

export default App;
