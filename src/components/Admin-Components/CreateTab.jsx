import { useState } from "react";
import "./Tab.css";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios.js";

export default function CreateTab({ onCreateMeet }) {
  const [meetLink, setMeetLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meetLink) {
      return;
    }
    setIsSubmitting(true);
    try {
      await axiosInstance.post("/admin/meetlink-submission", {
        meetLink,
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      toast.error("Failed to create meeting link. Please try again.");
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="admin_tabContent fade-in">
      <h1 className="admin_title">Create Meeting</h1>

      <div className="admin_createForm">
        <form onSubmit={handleSubmit}>
          <div className="admin_formGroup">
            <label htmlFor="meetLink">Meeting Link</label>
            <input
              type="url"
              id="meetLink"
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
              placeholder="Enter your meeting URL"
              required
              className="input"
            />
            <p className="admin_hint">
              Enter a valid meeting URL (Google Meet, Zoom, etc.)
            </p>
          </div>

          <button
            type="submit"
            className={`admin_btn admin_btn-primary admin_createButton ${
              isSubmitting ? "admin_loading" : ""
            }`}
            disabled={isSubmitting || !meetLink}
          >
            {isSubmitting ? "Creating..." : "Create Meet"}
          </button>

          {success && (
            <div className="admin_successMessage">
              <p>Meeting link created successfully!</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
