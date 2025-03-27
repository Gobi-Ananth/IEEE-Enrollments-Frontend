import { useState, useEffect } from "react";
import "./AdminLogin.css";
import useAdminStore from "../../stores/useAdminStore.js";

export default function AdminLogin() {
  const [hover, setHover] = useState(false);
  const [shake, setShake] = useState(false);
  const { login, loading } = useAdminStore();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (hover) {
      const interval = setInterval(() => {
        setShake((prev) => !prev);
      }, 100);
      return () => clearInterval(interval);
    } else {
      setShake(false);
    }
  }, [hover]);

  const handleLogin = async () => {
    setDisabled(true);
    await login();
    setDisabled(false);
  };

  return (
    <div className="admin_login_container">
      <div
        className={`admin_login_card ${shake ? "shake-right" : "shake-left"}`}
      >
        <div className="admin_login_btn-container">
          <button
            className="admin_login_horror-btn"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={handleLogin}
            disabled={loading || disabled}
          >
            {loading ? "ELIMINATING..." : "ELIMINATE YOURSELF"}
          </button>
        </div>
        <p className="admin_login_disclaimer">
          <span className="admin_login_warning">⚠ DISCLAIMER:</span> By clicking
          this, you irrevocably agree to self-eliminate yourself from IEEE VIT
          enrollments. This action is permanent, irreversible, and absolute.
          Proceed... if you dare. 👁👁
        </p>
      </div>
    </div>
  );
}
