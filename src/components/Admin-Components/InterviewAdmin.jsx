import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import PendingTab from "./PendingTab";
import CreateTab from "./CreateTab";
import OngoingTab from "./OngoingTab";
import ReviewTab from "./ReviewTab";
import "./InterviewAdmin.css";
import axiosInstance from "../../lib/axios.js";
import toast from "react-hot-toast";
import useAdminStore from "../../stores/useAdminStore.js";

export default function InterviewAdmin() {
  const [activeTab, setActiveTab] = useState("pending");
  const [meetLink, setMeetLink] = useState("");
  const [adminName, setAdminName] = useState("Admin");
  const [pendingInterviews, setPendingInterviews] = useState([]);
  const [ongoingInterviews, setOngoingInterviews] = useState([]);
  const [reviewInterviews, setReviewInterviews] = useState([]);
  const [currentReview, setCurrentReview] = useState(null);
  const { admin } = useAdminStore();

  useEffect(() => {
    setAdminName(admin.name);
    setMeetLink(admin.meetLink);
    fetchPendingSlots();
    fetchOngoingSlots();
    fetchReviewSlots();
  }, [admin]);

  async function fetchPendingSlots() {
    try {
      const response = await axiosInstance.post("/admin/get-all-slots", {
        status: "pending",
      });
      setPendingInterviews(response.data.data);
    } catch (err) {
      if (err.response.status === 401) return;
      toast.error(err.response.data?.message || "An error occurred");
    }
  }

  async function fetchOngoingSlots() {
    try {
      const response = await axiosInstance.post("/admin/get-all-slots", {
        status: "ongoing",
      });
      setOngoingInterviews(response.data.data);
    } catch (err) {
      if (err.response.status === 401) return;
      toast.error(err.response.data?.message || "An error occurred");
    }
  }

  async function fetchReviewSlots() {
    try {
      const response = await axiosInstance.get("/admin/review-slots");
      setReviewInterviews(response.data.data);
    } catch (err) {
      if (err.response.status === 401) return;
      toast.error(err.response.data?.message || "An error occurred");
    }
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleCreateMeet = (link) => {
    setMeetLink(link);
  };

  const handleTakeInterview = async (id) => {
    if (!meetLink) return;

    try {
      const response = await axiosInstance.put(`/admin/take-slot/${id}`);
      const slot = response.data.data;

      if (slot && slot.meetLink) {
        window.open(slot.meetLink, "_blank");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Meet link not found in response.");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleJoinMeet = async (id) => {
    try {
      const response = await axiosInstance.put(`/admin/join-slot/${id}`);
      const slot = response.data.data;

      if (slot && slot.meetLink) {
        window.open(slot.meetLink, "_blank");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        toast.error("Meet link not found in response.");
      }
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  const handleSubmitReview = async (slotId, userId, reviewData) => {
    try {
      const response = await axiosInstance.post(
        `/admin/review-submission/${slotId}/${userId}`,
        { ...reviewData }
      );
      toast.success(response.data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      } else {
        toast.error("An error occurred while submitting the review.");
      }
    }
  };

  return (
    <div className="admin_container">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
      <main className="admin_content_area">
        {activeTab === "pending" && (
          <PendingTab
            interviews={pendingInterviews}
            onTakeInterview={handleTakeInterview}
            hasMeetLink={!!meetLink}
          />
        )}
        {activeTab === "create" && (
          <CreateTab onCreateMeet={handleCreateMeet} />
        )}
        {activeTab === "ongoing" && (
          <OngoingTab
            interviews={ongoingInterviews}
            onJoinMeet={handleJoinMeet}
            meetLink={meetLink}
          />
        )}
        {activeTab === "review" && (
          <ReviewTab
            interviews={reviewInterviews}
            currentReview={currentReview}
            onSubmitReview={handleSubmitReview}
            adminName={adminName}
          />
        )}
      </main>
    </div>
  );
}
