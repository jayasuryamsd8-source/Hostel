import React, { useState, useEffect } from "react";
import "../admin/styles/VacationLeave.css";

function VacationLeave() {
  const [formData, setFormData] = useState({
    name: "",
    registerNo: "",
    email: "",
    dateOfLeaving: "",
    dateOfReturn: "",
    purpose: "",
  });

  const [leaveDays, setLeaveDays] = useState(0);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  /* AUTO CALCULATE LEAVE DAYS */
  useEffect(() => {
    if (formData.dateOfLeaving && formData.dateOfReturn) {
      const from = new Date(formData.dateOfLeaving);
      const to = new Date(formData.dateOfReturn);
      const diff =
        Math.floor((to - from) / (1000 * 60 * 60 * 24)) + 1;

      setLeaveDays(diff > 0 ? diff : 0);
    }
  }, [formData.dateOfLeaving, formData.dateOfReturn]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (leaveDays <= 0) {
      setStatus("error:Invalid leave dates");
      return;
    }

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "60e6c0d6-b8ca-4ec2-b5cd-7795db8a41a8",

          subject: "New Vacation Leave Application",
          from_name: "Hostel Leave Portal",

          name: formData.name,
          register_no: formData.registerNo,
          email: formData.email,
          leave_from: formData.dateOfLeaving,
          leave_to: formData.dateOfReturn,
          total_days: leaveDays,
          purpose: formData.purpose,

          /* AUTO-REPLY TO STUDENT */
          replyto: formData.email,
          autoresponse:
            "Your leave application has been successfully submitted to the warden. You will be notified after review.",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success:Leave application sent successfully");
        setFormData({
          name: "",
          registerNo: "",
          email: "",
          dateOfLeaving: "",
          dateOfReturn: "",
          purpose: "",
        });
        setLeaveDays(0);
      } else {
        setStatus("error:Failed to submit leave");
      }
    } catch (error) {
      console.error(error);
      setStatus("error:Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const statusType = status.split(":")[0];
  const statusText = status.split(":")[1];

  const hasValue = (v) => (v ? "has-value" : "");

  return (
    <div className="leave-bg">
      <form className="glass-card" onSubmit={handleSubmit}>
        <h2 className="title">Vacation Leave</h2>
        <p className="subtitle">Apply hostel leave</p>

        <div className={`field ${hasValue(formData.name)}`}>
          <input
            placeholder=" "
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Student Name</label>
        </div>

        <div className={`field ${hasValue(formData.registerNo)}`}>
          <input
            placeholder=" "
            name="registerNo"
            value={formData.registerNo}
            onChange={handleChange}
            required
          />
          <label>Register Number</label>
        </div>

        <div className={`field ${hasValue(formData.email)}`}>
          <input
            placeholder=" "
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Email Address</label>
        </div>

        <div className={`field ${hasValue(formData.dateOfLeaving)}`}>
          <input
            placeholder=" "
            type="date"
            name="dateOfLeaving"
            value={formData.dateOfLeaving}
            onChange={handleChange}
            required
          />
          <label>Leave From</label>
        </div>

        <div className={`field ${hasValue(formData.dateOfReturn)}`}>
          <input
            placeholder=" "
            type="date"
            name="dateOfReturn"
            value={formData.dateOfReturn}
            onChange={handleChange}
            required
          />
          <label>Leave To</label>
        </div>

        <div className="leave-days">
          Total Leave Days: <b>{leaveDays}</b>
        </div>

        <div className={`field textarea ${hasValue(formData.purpose)}`}>
          <textarea
            placeholder=" "
            name="purpose"
            value={formData.purpose}
            onChange={handleChange}
            required
          />
          <label>Reason</label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Apply Leave"}
        </button>

        {status && (
          <div className={`status ${statusType}`}>
            {statusText}
          </div>
        )}
      </form>
    </div>
  );
}

export default VacationLeave;
