import React, { useState } from "react";
import "./TaskWindow.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useUserStore from "../stores/useUserStore.js";
import moment from "moment-timezone";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios.js";

export default function TaskWindow() {
  const [repoLink, setRepoLink] = useState("");
  const { user, checkUserAuth } = useUserStore();
  const location = useLocation();
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  if (!location.state?.allowed) {
    return <Navigate to="/" />;
  }

  const deadlineIST = moment(user.task.taskDeadline)
    .tz("Asia/Kolkata")
    .format("DD MMM YYYY, hh:mm A");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDisabled(true);
    try {
      await checkUserAuth();
      if (user) {
        const response = await axiosInstance.post("/user/task-submission", {
          taskLink: repoLink,
        });
        toast.success(response.data.message);
        checkUserAuth();
        setDisabled(false);
        navigate("/");
      }
    } catch (err) {
      if (err.response.status === 401) return;
      if (err.response) {
        toast.error(err.response.data?.message || "An error occurred");
      } else if (err.request) {
        toast.error("No response from server");
      } else {
        toast.error("Round 0 submission failed");
      }
      setDisabled(false);
    }
  };

  return (
    <div className="task-container">
      <div className="question-box2">
        <div className="question-title">{user.task.taskTitle}</div>
        <div className="question-description">{user.task.taskDescription}</div>
      </div>
      <form onSubmit={handleSubmit} className="input-container">
        <input
          type="url"
          value={repoLink}
          onChange={(e) => setRepoLink(e.target.value)}
          className="repo-input"
          required
        />
        <div className="task-deadline">Task Deadline: {deadlineIST}</div>
        <div className="submit-button-container">
          <button type="submit" className="submit-button2" disabled={disabled}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

// const Task = () => {
//   //   const { user } = useUserStore();
//   const location = useLocation();
//   console.log("came");

//   return <div>Task</div>;
// };

// export default Task;
