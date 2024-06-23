import React from 'react'

function Summary({formData}) {
  return (
    <div className="summary">
        <p><strong>Full Name:</strong> {formData.fullName}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone Number:</strong> {formData.phoneNumber}</p>
        <p><strong>Applying for Position:</strong> {formData.applyingForPosition}</p>
        {formData.applyingForPosition && (formData.applyingForPosition === "Developer" || formData.applyingForPosition === "Designer") && (
          <p><strong>Relevant Experience:</strong> {formData.relevantExperience} years</p>
        )}
        {formData.applyingForPosition === "Designer" && (
          <p><strong>Portfolio URL:</strong> {formData.portfolioURL}</p>
        )}
        {formData.applyingForPosition === "Manager" && (
          <p><strong>Management Experience:</strong> {formData.managementExperience}</p>
        )}
        <p><strong>Additional Skills:</strong> {Object.keys(formData.additionalSkills).filter(skill => formData.additionalSkills[skill]).join(", ")}</p>
        <p><strong>Preferred Interview Time:</strong> {formData.preferredInterviewTime}</p>
      </div>
  )
}

export default Summary
