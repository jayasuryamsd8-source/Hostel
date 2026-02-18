import React, { useState } from "react";
import "../admin/styles/complaint.css";

function Complaint() {
  const [formData, setFormData] = useState({
    name: "",
    registerNo: "",
    email: "",
    category: "",
    priority: "",
    complaint: "",
  });

  const [anonymous, setAnonymous] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "60e6c0d6-b8ca-4ec2-b5cd-7795db8a41a8",
          subject: "New Hostel Complaint",
          from_name: "Hostel Complaint Portal",

          name: anonymous ? "Anonymous Student" : formData.name,
          register_no: anonymous ? "Not provided" : formData.registerNo,
          email: anonymous ? "anonymous@hostel.local" : formData.email,

          category: formData.category,
          priority: formData.priority,
          complaint: formData.complaint,

          replyto: anonymous ? "anonymous@hostel.local" : formData.email,
          autoresponse:
            "Your complaint has been received successfully. The hostel administration will review it shortly.",
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus("success:Complaint submitted successfully");
        setFormData({
          name: "",
          registerNo: "",
          email: "",
          category: "",
          priority: "",
          complaint: "",
        });
        setAnonymous(false);
      } else {
        setStatus("error:Failed to submit complaint");
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
    <div className="complaint-bg">
      <form className="glass-card" onSubmit={handleSubmit}>
        <h2 className="title">Hostel Complaint</h2>
        <p className="subtitle">Report hostel-related issues</p>

        <div className={`field ${hasValue(formData.name)}`}>
          <input
            placeholder=" "
            name="name"
            value={formData.name}
            onChange={handleChange}
            required={!anonymous}
            disabled={anonymous}
          />
          <label>Student Name</label>
        </div>

        <div className={`field ${hasValue(formData.registerNo)}`}>
          <input
            placeholder=" "
            name="registerNo"
            value={formData.registerNo}
            onChange={handleChange}
            required={!anonymous}
            disabled={anonymous}
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
            required={!anonymous}
            disabled={anonymous}
          />
          <label>Email Address</label>
        </div>

        <div className={`field select ${hasValue(formData.category)}`}>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Electricity">Electricity</option>
            <option value="Water">Water</option>
            <option value="Cleanliness">Cleanliness</option>
            <option value="Food">Food</option>
            <option value="Room Issue">Room Issue</option>
            <option value="Other">Other</option>
          </select>
          <label>Complaint Category</label>
        </div>

        <div className={`field select ${hasValue(formData.priority)}`}>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <label>Priority</label>
        </div>

        <div className={`field textarea ${hasValue(formData.complaint)}`}>
          <textarea
            placeholder=" "
            name="complaint"
            value={formData.complaint}
            onChange={handleChange}
            required
          />
          <label>Complaint Details</label>
        </div>

        <div className="anonymous-box">
          <input
            type="checkbox"
            id="anonymous"
            checked={anonymous}
            onChange={() => setAnonymous(!anonymous)}
          />
          <label htmlFor="anonymous">
            Submit anonymously (identity hidden)
          </label>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
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

export default Complaint;
