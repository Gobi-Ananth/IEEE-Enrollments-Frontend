import React, { useState } from "react";
import "./TaskWindow.css";
import { Navigate, useLocation } from "react-router-dom";
import useUserStore from "../stores/useUserStore.js";

export default function TaskWindow() {
  const [repoLink, setRepoLink] = useState("");
  const { user } = useUserStore();
  const location = useLocation();

  if (!location.state?.allowed) {
    return <Navigate to="/" />;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted repo link:", repoLink);
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
        <div className="submit-button-container">
          <button type="submit" className="submit-button2" disabled>
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
