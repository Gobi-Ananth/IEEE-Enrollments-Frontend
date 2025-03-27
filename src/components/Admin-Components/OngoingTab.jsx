import { useState } from "react";
import { ExternalLink } from "lucide-react";
import "./Tab.css";

export default function OngoingTab({ interviews, onJoinMeet, meetLink }) {
  const [joining, setJoining] = useState(null);

  const handleJoinMeet = (id) => {
    setJoining(id);
    // Gobi this is Simulating joining
    onJoinMeet(id);
    setJoining(null);
  };

  return (
    <div className="admin_tabContent fade-in">
      <h1 className="admin_title">Ongoing Interviews</h1>

      {interviews.length === 0 ? (
        <div className="admin_emptyState">
          <p>No ongoing interviews at the moment.</p>
        </div>
      ) : (
        <div className="admin_interviewList">
          {interviews.map((interview) => (
            <div key={interview._id} className="admin_interviewCard">
              {interview.users.map((user) => (
                <div className="admin_interviewInfo" key={user._id}>
                  <h3>{user.name}</h3>
                  <div className="admin_techStack">
                    <h4>Domain:</h4>
                    <ul>
                      {user.round0.domain.map((domain, index) => (
                        <li key={index} className="admin_tech">
                          {domain}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="admin_adminList">
                    <h4>Current Admins:</h4>
                    {interview.admins.length > 0 ? (
                      <ul>
                        {interview.admins.map((admin, index) => (
                          <li key={index} className="admin_adminItem">
                            {admin.name}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>No admins have joined yet</p>
                    )}
                  </div>
                </div>
              ))}

              <button
                className={`admin_btn admin_joinButton ${
                  joining === interview._id ? "admin_loading" : ""
                }`}
                onClick={() => handleJoinMeet(interview._id)}
                disabled={joining !== null}
              >
                <ExternalLink className="admin_buttonIcon" />
                {joining === interview._id ? "Joining..." : "Join Meet"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
