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

  const [currentTime, setCurrentTime] = useState(moment().tz("Asia/Kolkata"));
  const [status, setStatus] = useState("waiting");
  const [slot, setSlot] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const fetchServerTime = async () => {
      try {
        const response = await axiosInstance.get("/server-time");
        const serverTime = moment(response.data.time).tz("Asia/Kolkata");
        setCurrentTime(serverTime);
      } catch (err) {
        console.error("Failed to fetch server time");
      }
    };

    fetchServerTime();
    const interval = setInterval(fetchServerTime, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user.slot?.dateTime) {
      checkUserAuth();
      const istDateTime = moment(user.slot.dateTime).tz("Asia/Kolkata");
      setSlot({
        date: istDateTime.format("D MMMM YYYY"),
        time: istDateTime.format("HH:mm"),
      });
    } else {
      const istDateTime = moment(user.slot.dateTime).tz("Asia/Kolkata");
      setSlot({
        date: istDateTime.format("D MMMM YYYY"),
        time: istDateTime.format("HH:mm"),
      });
    }
  }, [user.slot, checkUserAuth]);

  useEffect(() => {
    const slotDateTime = moment(
      `${slot.date} ${slot.time}`,
      "D MMMM YYYY HH:mm"
    ).tz("Asia/Kolkata");

    if (status !== "confirmed" && currentTime.isSameOrAfter(slotDateTime)) {
      setStatus("ready");
    }
  }, [currentTime, slot.date, slot.time, status]);

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
          <button className="ready-btn" onClick={handleReadyClick}>
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
