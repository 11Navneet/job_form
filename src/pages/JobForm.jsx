import React, { useState } from "react";
import useFormValidation from "../hooks/useValidation"; // assuming useFormValidation.jsx is in the same directory
import Summary from "./Summary";

const JobForm = () => {
  const initialFormData = {
    fullName: "",
    email: "",
    phoneNumber: "",
    applyingForPosition: "",
    relevantExperience: "",
    portfolioURL: "",
    managementExperience: "",
    additionalSkills: {
      JavaScript: false,
      CSS: false,
      Python: false,
      Reactjs: false,
      Nodejs: false,
    },
    preferredInterviewTime: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitted, setSubmitted] = useState(false);
  const { errors, validateForm } = useFormValidation(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        additionalSkills: {
          ...prevFormData.additionalSkills,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      console.log("Form Submitted:", formData);
      setSubmitted(true);
    } else {
      console.error("Form has errors:", formErrors);
    }
  };

  return (
    <div className="container">
      {!submitted ? <h2>Job Application Form</h2> : <h2>Submitted Data Summary</h2>}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            <div className="form-div">
              <label>Full Name:</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>

            <div className="form-div">
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
          </div>

          <div className="form-group">
            <div className="form-div">
              <label>Phone Number:</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              {errors.phoneNumber && (
                <p className="error">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="form-div">
              <label>Applying for Position:</label>
              <select
                name="applyingForPosition"
                value={formData.applyingForPosition}
                onChange={handleChange}
              >
                <option value="">Select...</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.applyingForPosition && (
                <p className="error">{errors.applyingForPosition}</p>
              )}
            </div>
          </div>

          <div className="form-group">
            {(formData.applyingForPosition === "Developer" ||
              formData.applyingForPosition === "Designer") && (
              <div className="form-div">
                <label>Relevant Experience (years):</label>
                <input
                  type="number"
                  name="relevantExperience"
                  value={formData.relevantExperience}
                  onChange={handleChange}
                />
                {errors.relevantExperience && (
                  <p className="error">{errors.relevantExperience}</p>
                )}
              </div>
            )}

            {formData.applyingForPosition === "Designer" && (
              <div className="form-div">
                <label>Portfolio URL:</label>
                <input
                  type="text"
                  name="portfolioURL"
                  value={formData.portfolioURL}
                  onChange={handleChange}
                />
                {errors.portfolioURL && (
                  <p className="error">{errors.portfolioURL}</p>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            {formData.applyingForPosition === "Manager" && (
              <div className="form-div">
                <label>Management Experience:</label>
                <textarea
                  name="managementExperience"
                  value={formData.managementExperience}
                  onChange={handleChange}
                ></textarea>
                {errors.managementExperience && (
                  <p className="error">{errors.managementExperience}</p>
                )}
              </div>
            )}

            <div className="form-div">
              <label>Additional Skills:</label>
              {Object.keys(formData.additionalSkills).map((skill) => (
                <label key={skill} className="skills-div">
                  <input
                    type="checkbox"
                    name={skill}
                    checked={formData.additionalSkills[skill]}
                    onChange={handleChange}
                  />
                  {skill}
                </label>
              ))}
              {errors.additionalSkills && (
                <p className="error">{errors.additionalSkills}</p>
              )}
            </div>
          </div>

          <div className="form-div">
            <label>Preferred Interview Time:</label>
            <input
              type="date"
              name="preferredInterviewTime"
              value={formData.preferredInterviewTime}
              onChange={handleChange}
            />
            {errors.preferredInterviewTime && (
              <p className="error">{errors.preferredInterviewTime}</p>
            )}
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <Summary formData={formData} />
      )}
    </div>
  );
};

export default JobForm;
