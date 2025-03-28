import React, { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import moment from "moment-timezone";
import "./SlotWindow.css";
import useUserStore from "../stores/useUserStore.js";
import axiosInstance from "../lib/axios.js";

export default function SlotWindow() {
  const { user, checkUserAuth } = useUserStore();
  const location = useLocation();

  const istDateTime = moment(user.slot?.dateTime || new Date()).tz(
    "Asia/Kolkata"
  );
  const [slot] = useState({
    date: istDateTime.format("D MMMM YYYY"),
    time: istDateTime.format("HH:mm"),
  });
  // const [currentTime, setCurrentTime] = useState(new Date());
  const [status, setStatus] = useState("waiting");
  const [serverTime, setServerTime] = useState(null);

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await axiosInstance.get("/server-time");
        setServerTime(new Date(response.data.serverTime));
      } catch (err) {
        toast.error("Failed to sync with server time.");
      }
    };

    fetchServerTime();

    // Refresh server time every 30 seconds
    const interval = setInterval(fetchServerTime, 15000);

    return () => clearInterval(interval);
  }, []);

  // Compare slot time with server time
  useEffect(() => {
    if (serverTime) {
      const serverFormattedTime = moment(serverTime)
        .tz("Asia/Kolkata")
        .format("HH:mm");

      if (status !== "confirmed" && serverFormattedTime >= slot.time) {
        setStatus("ready");
      }
    }
  }, [serverTime, slot.time, status]);

  if (!location.state?.allowed || !user.slot) {
    return <Navigate to="/" />;
  }

  const handleReadyClick = async () => {
    try {
      const response = await axiosInstance.put(`/user/ready/${user.slot._id}`);
      setStatus("confirmed");
      checkUserAuth();
      toast.success(response.data.message);
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data?.message || "An error occurred");
      } else {
        toast.error("No response from server");
      }
    }
  };

  return (
    <div className="slot-window-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="window waiting-window"
      >
        WAITING...
        <div className="loading-spinner"></div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 100, y: -50, rotate: -5 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="window slot-window"
      >
        YOUR SLOT
        <div className="slot-info">
          <div className="slot-item date">
            <Calendar className="icon" /> {slot.date}
          </div>
          <div className="slot-item time">
            <Clock className="icon" /> {slot.time}
          </div>
        </div>
        {status === "ready" && !user.slot.isReady && (
          <button className="ready-btn btn" onClick={handleReadyClick}>
            I&apos;M READY!
          </button>
        )}
        {user.slot.isReady && !user.slot.meetLink && (
          <p>Link will be sent via mail shortly.</p>
        )}
        {user.slot.isReady && user.slot.meetLink && (
          <a
            href={user.slot.meetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="join-btn"
          >
            JOIN MEETING
          </a>
        )}
      </motion.div>
    </div>
  );
}
