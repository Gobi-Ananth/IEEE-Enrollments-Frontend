import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignUpPage from "./components/SignUpPage.jsx";
import Wrapper from "./components/Wrapper.jsx";
import Rounds from "./components/Rounds.jsx";
import RoundZero from "./components/RoundZero.jsx";
import { Toaster } from "react-hot-toast";
import useUserStore from "./stores/useUserStore.js";
import { useEffect } from "react";
import Interview from "./components/Interview.jsx";
import SlotWindow from "./components/SlotWindow.jsx";
import FallBack from "./components/FallBack.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import NotFoundScreen from "./components/NotFoundScreen.jsx";
import AdminLogin from "./components/Admin-Components/AdminLogin.jsx";
import useAdminStore from "./stores/useAdminStore.js";
import InterviewAdmin from "./components/Admin-Components/InterviewAdmin.jsx";
import TaskWindow from "./components/TaskWindow.jsx";

export default function App() {
  const { user, checkUserAuth, checkingUserAuth } = useUserStore();
  const { admin, checkAdminAuth } = useAdminStore();

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/thedarkside")) {
      checkAdminAuth();
    } else {
      checkUserAuth();
    }
  }, []);

  if (checkingUserAuth)
    return (
      <Router>
        <Wrapper>
          <LoadingScreen />
        </Wrapper>
      </Router>
    );

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route
            path="/login"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />
          <Route
            path="/"
            element={
              user ? (
                <Wrapper title="https://enrollments.ieeevit.org/">
                  <Rounds />
                </Wrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/round0"
            element={
              user ? (
                <Wrapper title="https://enrollments.ieeevit.org/round0">
                  <RoundZero />
                </Wrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/slots"
            element={
              user ? (
                <Wrapper title="https://enrollments.ieeevit.org/slots">
                  <Interview />
                </Wrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/meet"
            element={
              user ? (
                <Wrapper title="https://enrollments.ieeevit.org/meet">
                  <SlotWindow />
                </Wrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/task"
            element={
              user ? (
                <Wrapper title="https://enrollments.ieeevit.org/task">
                  <TaskWindow />
                </Wrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/fallback"
            element={
              user ? (
                <Wrapper title="https://enrollments.ieeevit.org/fallback">
                  <FallBack />
                </Wrapper>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/thedarkside/login"
            element={!admin ? <AdminLogin /> : <Navigate to="/thedarkside" />}
          />
          <Route
            path="/thedarkside"
            element={
              admin ? <InterviewAdmin /> : <Navigate to="/thedarkside/login" />
            }
          />
          <Route
            path="*"
            element={
              <Wrapper>
                <NotFoundScreen />
              </Wrapper>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
