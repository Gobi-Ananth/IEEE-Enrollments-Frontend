import SvgButton from "./SvgButton";

import "./Wrapper.css";

import Minimize from "../assets/minmize.svg";
import Maximize from "../assets/maximize.svg";
import Close from "../assets/close.svg";
import Right from "../assets/Right.svg";
import Left from "../assets/Left.svg";
import Lock from "../assets/lock.svg";
import Hamburger from "../assets/Hamburger.svg";
import Plus from "../assets/Plus.svg";
import Tab from "../assets/Tab.svg";
import { useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore.js";

export default function Wrapper({ title, children }) {
  const { logout, checkUserAuth } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClose = async () => {
    if (location.pathname === "/") {
      await logout();
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
          <SvgButton svgLabel={Hamburger} />
        </div>
      </section>

      <section className="container">{children}</section>
    </main>
  );
}
