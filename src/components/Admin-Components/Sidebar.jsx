import { useState, useEffect } from "react";
import { FileText, Plus, Play, Star } from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({ activeTab, onTabChange }) {
  const [glitchEffect, setGlitchEffect] = useState(false);

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchEffect(true);
      setTimeout(() => setGlitchEffect(false), 200);
    }, Math.random() * 5000 + 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="admin_sidebar">
      <div className="admin_logo">
        <div
          className={`admin_heading ${glitchEffect ? "admin_glitch" : ""}`}
          data-text="INTERVIEW"
        >
          THE DARK
        </div>
        <div
          className={`admin_heading ${glitchEffect ? "admin_glitch" : ""}`}
          data-text="SYSTEM"
        >
          SIDE
        </div>
      </div>

      <nav className="admin_nav">
        <button
          className={`admin_navItem ${
            activeTab === "pending" ? "admin_active" : ""
          }`}
          onClick={() => onTabChange("pending")}
        >
          <FileText className="admin_icon" />
          <span>Pending</span>
        </button>

        <button
          className={`admin_navItem ${
            activeTab === "create" ? "admin_active" : ""
          }`}
          onClick={() => onTabChange("create")}
        >
          <Plus className="admin_icon" />
          <span>Create</span>
        </button>

        <button
          className={`admin_navItem ${
            activeTab === "ongoing" ? "admin_active" : ""
          }`}
          onClick={() => onTabChange("ongoing")}
        >
          <Play className="admin_icon" />
          <span>Ongoing</span>
        </button>

        <button
          className={`admin_navItem ${
            activeTab === "review" ? "admin_active" : ""
          }`}
          onClick={() => onTabChange("review")}
        >
          <Star className="admin_icon" />
          <span>Review</span>
        </button>
      </nav>

      <div className="admin_footer">
        <div className="admin_statusIndicator"></div>
        <span>SYSTEM ACTIVE</span>
      </div>
    </div>
  );
}
