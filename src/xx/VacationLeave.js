import React, { useState } from "react";
import "../styles/DayLeaveForm.css";

function VacationLeave() {
  const [formData, setFormData] = useState({
    leaveDate: "",
    returnDate: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/apply-leave", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Leave application submitted successfully!");
      setFormData({ leaveDate: "", returnDate: "", purpose: "" });
    } else {
      alert("Something went wrong!");
    }
  };

  return (
    <div className="vaca-leave-form">
      <form className="form-section" onSubmit={handleSubmit}>
        <h1>Vacation Leave Application</h1>

        <div className="form-input">
          <label>Date of Leaving</label>
          <input
            type="date"
            name="leaveDate"
            value={formData.leaveDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <label>Date of Return</label>
          <input
            type="date"
            name="returnDate"
            value={formData.returnDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-input">
          <label>Purpose</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit Leave</button>
      </form>
    </div>
  );
}

export default VacationLeave;
