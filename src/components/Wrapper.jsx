import SvgButton from "./SvgButton";

import "./Wrapper.css";

import Minimize from "../assets/minmize.svg";
import Maximize from "../assets/maximize.svg";
import Close from "../assets/close.svg";
import Right from "../assets/Right.svg";
import Left from "../assets/Left.svg";
import Lock from "../assets/lock.svg";
import Plus from "../assets/Plus.svg";
import Tab from "../assets/Tab.svg";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore.js";
import toast from "react-hot-toast";
import { useEffect, useRef, useState } from "react";

export default function Wrapper({ title, children }) {
  const { user, logout, checkUserAuth } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const isLoadingScreen =
    children && children.type && children.type.name === "LoadingScreen";
  const isNotFoundScreen =
    children && children.type && children.type.name === "NotFoundScreen";
  const isPopupDisabled = isLoadingScreen || isNotFoundScreen;

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target) &&
        !buttonRef.current.contains(event.target)
      ) {
        setShowPopup(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef, buttonRef]);

  const getProfileImage = () => {
    if (isPopupDisabled) {
      return "/profile.png";
    } else {
      if (!user || !user.picture) {
        return "/profile.png";
      } else {
        return user.picture;
      }
    }
  };

  const togglePopup = () => {
    if (!isPopupDisabled) {
      setShowPopup(!showPopup);
    }
  };

  const handleClose = async () => {
    if (location.pathname === "/") {
      await logout();
      toast.success("Logout successful");
      await checkUserAuth();
    } else {
      navigate("/");
      await checkUserAuth();
    }
  };

  return (
    <main className="wrapper">
      <section className="upper-nav">
        <div className="tab">
          <img src={Tab} alt="IEEE VIT TAB" />
          <img src={Plus} alt="Plus" />
        </div>
        <div className="window-controls">
          <SvgButton svgLabel={Minimize} />
          <SvgButton svgLabel={Maximize} />
          <SvgButton svgLabel={Close} onClick={handleClose} />
        </div>
      </section>
      <section className="lower-nav">
        <div className="nav-controls">
          <SvgButton svgLabel={Left} />
          <SvgButton svgLabel={Right} />
        </div>
        <div className="address-bar">
          <img src={Lock} />
          <h3 className="text">{title}</h3>
        </div>
        <div className="nav-ham">
          <div className="profile-container">
            <button
              onClick={togglePopup}
              className={`profile-btn ${isPopupDisabled ? "disabled" : ""} ${
                showPopup ? "active" : ""
              }`}
              ref={buttonRef}
              disabled={isPopupDisabled}
            >
              <img
                src={getProfileImage()}
                alt="Profile"
                className="profile-icon"
              />
            </button>

            {showPopup && !isPopupDisabled && (
              <div className="profile-popup" ref={popupRef}>
                <div className="profile-header">
                  <h3>Candidate</h3>
                </div>
                <div className="profile-content">
                  <div className="profile-image">
                    <img
                      src={getProfileImage()}
                      alt="Candidate's Profile Picture"
                      className="my-image"
                    />
                  </div>
                  <div className="profile-name">{user.name}</div>
                  <p className="profile-email">{user.email}</p>
                  <div className="profile-Info">
                    <span>Current Round: {user.currentRound}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="container">{children}</section>
    </main>
  );
}
