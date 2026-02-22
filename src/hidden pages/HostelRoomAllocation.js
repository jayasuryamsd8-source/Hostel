import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "../admin/styles/HostelOverview.css";

/* ---------- CREATE INITIAL ROOMS ---------- */

const createRooms = (prefix) =>
  Array.from({ length: 20 }, (_, i) => ({
    id: `${prefix}${i + 1}`,
    capacity: 4,
    members: []
  }));

export default function HostelOverview() {
  const [activeFloor, setActiveFloor] = useState("Ground");
  const [selectedRoom, setSelectedRoom] = useState(null);

  const [floors, setFloors] = useState({
    Ground: createRooms("G"),
    First: createRooms("F")
  });

  /* ---------- ADD MEMBER ---------- */

  const addMember = () => {
    if (!selectedRoom) return;

    if (selectedRoom.members.length >= selectedRoom.capacity)
      return; // Prevent overflow

    const updatedFloors = { ...floors };

    const room =
      updatedFloors[activeFloor].find(
        (r) => r.id === selectedRoom.id
      );

    room.members.push(
      `Student ${room.members.length + 1}`
    );

    setFloors(updatedFloors);
    setSelectedRoom({ ...room });
  };

  /* ---------- REMOVE MEMBER ---------- */

  const removeMember = () => {
    if (!selectedRoom) return;

    if (selectedRoom.members.length === 0) return;

    const updatedFloors = { ...floors };

    const room =
      updatedFloors[activeFloor].find(
        (r) => r.id === selectedRoom.id
      );

    room.members.pop();

    setFloors(updatedFloors);
    setSelectedRoom({ ...room });
  };

  return (
    <div className="wrapper">
      <h1 className="title">Hostel Room Allocation</h1>

      {/* Floor Selector */}
      <div className="building">
        {["First", "Ground"].map((floor) => (
          <div
            key={floor}
            onClick={() => setActiveFloor(floor)}
            className={`floor-card ${
              activeFloor === floor ? "active" : ""
            }`}
          >
            {floor} Floor
          </div>
        ))}
      </div>

      {/* ROOM GRID */}
      <motion.div
        key={activeFloor}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="room-grid"
      >
        {floors[activeFloor].map((room) => {
          const full =
            room.members.length === room.capacity;

          return (
            <motion.div
              key={room.id}
              whileHover={{ scale: 1.05 }}
              className={`room ${
                full ? "full" : "available"
              }`}
              onClick={() => setSelectedRoom(room)}
            >
              <h3>{room.id}</h3>
              <p>
                {room.members.length}/{room.capacity}
              </p>
              <span>
                {full ? "Full" : "Available"}
              </span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {selectedRoom && (
          <motion.div
            className="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedRoom(null)}
          >
            <motion.div
              className="modal"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.7 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Room {selectedRoom.id}</h2>

              <p>
                {selectedRoom.members.length}/
                {selectedRoom.capacity} Occupied
              </p>

              <ul>
                {selectedRoom.members.length === 0 ? (
                  <li>No Members</li>
                ) : (
                  selectedRoom.members.map((m, i) => (
                    <li key={i}>{m}</li>
                  ))
                )}
              </ul>

              {/* ADMIN BUTTONS */}
              <div className="admin-buttons">
                <button
                  onClick={addMember}
                  disabled={
                    selectedRoom.members.length >=
                    selectedRoom.capacity
                  }
                >
                  + Add Member
                </button>

                <button
                  onClick={removeMember}
                  disabled={
                    selectedRoom.members.length === 0
                  }
                >
                  - Remove Member
                </button>
              </div>

              <button
                className="close-btn"
                onClick={() => setSelectedRoom(null)}
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
