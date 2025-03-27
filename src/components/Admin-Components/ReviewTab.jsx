import { useState } from "react";
import "./Tab.css";

export default function ReviewTab({
  interviews,
  currentReview,
  onSubmitReview,
  adminName,
}) {
  const [reviewData, setReviewData] = useState({
    technicalSkills: "",
    communicationSkills: "",
    problemSolving: "",
    codeQuality: "",
    overallRating: "3",
    feedback: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e, slotId, userId) => {
    e.preventDefault();
    setIsSubmitting(true);
    // // Simulate API call
    // setTimeout(() => {
    onSubmitReview(slotId, userId, reviewData);
    setIsSubmitting(false);
    //   // Reset form
    //   setReviewData({
    //     technicalSkills: "",
    //     communicationSkills: "",
    //     problemSolving: "",
    //     codeQuality: "",
    //     overallRating: "3",
    //     feedback: "",
    //   });
    // }, 2000);
  };

  // const currentInterview = interviews.find(
  //   (interview) => interview.id === currentReview
  // );
  // const canReview =
  //   currentInterview && currentInterview.admins[0] === adminName;

  return (
    <div className="admin_tabContent fade-in">
      <h1 className="admin_title">Review Candidates</h1>

      {interviews.length === 0 ? (
        <div className="admin_emptyState">
          <p>You haven't taken any interviews yet.</p>
          <p>Go to the Pending tab to take an interview.</p>
        </div>
      ) : (
        interviews.map((interview, index) => (
          <div key={index}>
            {interview.users.map((user, index) => (
              <div className="admin_reviewForm" key={user._id}>
                <div className="admin_reviewForm_name">
                  Reviewing: {user.name}
                </div>
                <div className="admin_techStack" key={index}>
                  <h4>Domain:</h4>
                  <ul>
                    {user.round0.domain.map((domain, index) => (
                      <li key={index} className="admin_tech">
                        {domain}
                      </li>
                    ))}
                  </ul>
                </div>

                <form
                  onSubmit={(e) => handleSubmit(e, interview._id, user._id)}
                >
                  <div className="admin_formGroup">
                    <label htmlFor="techStack">Tech Stack</label>
                    <input
                      type="text"
                      id="techStack"
                      name="techStack"
                      value={reviewData.techStack}
                      onChange={handleChange}
                      placeholder="List relevant technologies"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="technicalSkills">Technical Skills</label>
                    <input
                      type="text"
                      id="technicalSkills"
                      name="technicalSkills"
                      value={reviewData.technicalSkills}
                      onChange={handleChange}
                      placeholder="Evaluate technical skills"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="communicationSkills">
                      Communication Skills
                    </label>
                    <input
                      type="text"
                      id="communicationSkills"
                      name="communicationSkills"
                      value={reviewData.communicationSkills}
                      onChange={handleChange}
                      placeholder="Evaluate communication skills"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="problemSolving">Problem Solving</label>
                    <input
                      type="text"
                      id="problemSolving"
                      name="problemSolving"
                      value={reviewData.problemSolving}
                      onChange={handleChange}
                      placeholder="Evaluate problem solving abilities"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="domainKnowledge">Domain Knowledge</label>
                    <input
                      type="text"
                      id="domainKnowledge"
                      name="domainKnowledge"
                      value={reviewData.domainKnowledge}
                      onChange={handleChange}
                      placeholder="Assess domain-specific knowledge"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="interestToLearn">Interest to Learn</label>
                    <input
                      type="text"
                      id="interestToLearn"
                      name="interestToLearn"
                      value={reviewData.interestToLearn}
                      onChange={handleChange}
                      placeholder="Evaluate learning motivation"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="managementSkills">Management Skills</label>
                    <input
                      type="text"
                      id="managementSkills"
                      name="managementSkills"
                      value={reviewData.managementSkills}
                      onChange={handleChange}
                      placeholder="Evaluate management skills"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="overallRating">Overall Rating (1-5)</label>
                    <select
                      id="overallRating"
                      name="overallRating"
                      value={reviewData.overallRating}
                      onChange={handleChange}
                      className="select"
                    >
                      <option value="1">1 - Poor</option>
                      <option value="2">2 - Below Average</option>
                      <option value="3">3 - Average</option>
                      <option value="4">4 - Good</option>
                      <option value="5">5 - Excellent</option>
                    </select>
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="additionalFeedback">
                      Additional Feedback
                    </label>
                    <textarea
                      id="additionalFeedback"
                      name="additionalFeedback"
                      value={reviewData.additionalFeedback}
                      onChange={handleChange}
                      placeholder="Provide additional feedback"
                      rows={4}
                      className="textarea"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <hr className="my-4 border-t-2 border-gray-300" />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="groupDiscussion">Group Discussion</label>
                    <input
                      type="text"
                      id="groupDiscussion"
                      name="groupDiscussion"
                      value={reviewData.groupDiscussion}
                      onChange={handleChange}
                      placeholder="Assess group discussion performance"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="communication">Communication</label>
                    <input
                      type="text"
                      id="communication"
                      name="communication"
                      value={reviewData.communication}
                      onChange={handleChange}
                      placeholder="Evaluate overall communication"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="leadership">Leadership</label>
                    <input
                      type="text"
                      id="leadership"
                      name="leadership"
                      value={reviewData.leadership}
                      onChange={handleChange}
                      placeholder="Assess leadership capabilities"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="criticalThinking">Critical Thinking</label>
                    <input
                      type="text"
                      id="criticalThinking"
                      name="criticalThinking"
                      value={reviewData.criticalThinking}
                      onChange={handleChange}
                      placeholder="Assess critical thinking skills"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="teamwork">Teamwork</label>
                    <input
                      type="text"
                      id="teamwork"
                      name="teamwork"
                      value={reviewData.teamwork}
                      onChange={handleChange}
                      placeholder="Evaluate teamwork skills"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="relevancy">Relevancy</label>
                    <input
                      type="text"
                      id="relevancy"
                      name="relevancy"
                      value={reviewData.relevancy}
                      onChange={handleChange}
                      placeholder="Assess overall relevancy"
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <hr className="my-4 border-t-2 border-gray-300" />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="taskTitle">Task Title</label>
                    <input
                      type="text"
                      id="taskTitle"
                      name="taskTitle"
                      value={reviewData.taskTitle}
                      onChange={handleChange}
                      placeholder="Enter task title"
                      required
                      className="input"
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="taskDescription">Task Description</label>
                    <textarea
                      id="taskDescription"
                      name="taskDescription"
                      value={reviewData.taskDescription}
                      onChange={handleChange}
                      placeholder="Provide task description"
                      rows={4}
                      className="textarea"
                      required
                    />
                  </div>

                  <div className="admin_formGroup">
                    <label htmlFor="taskDeadline">Task Deadline</label>
                    <input
                      type="date"
                      id="taskDeadline"
                      name="taskDeadline"
                      value={reviewData.taskDeadline}
                      onChange={handleChange}
                      className="input"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className={`admin_btn admin_btn-primary admin_submitButton ${
                      isSubmitting ? "admin_loading" : ""
                    }`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </form>
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
}
