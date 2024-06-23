import { useState } from "react";

const useFormValidation = (formData) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};
    if (!formData.fullName.trim()) {
      newErrors = {
        ...newErrors,
        fullName: "Full Name is required",
      };
    }

    if (!formData.email.trim()) {
      newErrors = {
        ...newErrors,
        email: "Email is required",
      };
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors = {
        ...newErrors,
        email: "Please enter a valid email address",
      };
    }

    if (!formData.phoneNumber.trim()) {
      newErrors = {
        ...newErrors,
        phoneNumber: "Phone Number is required",
      };
    } else if (isNaN(formData.phoneNumber)) {
      newErrors = {
        ...newErrors,
        phoneNumber: "Phone Number must be a valid number",
      };
    }

    if ((formData.applyingForPosition === "Developer" || formData.applyingForPosition === "Designer") && !formData.relevantExperience.trim()) {
      newErrors = {
        ...newErrors,
        relevantExperience: "Relevant Experience is required",
      };
    } else if ((formData.applyingForPosition === "Developer" || formData.applyingForPosition === "Designer") && (isNaN(formData.relevantExperience) || parseInt(formData.relevantExperience) <= 0)) {
      newErrors = {
        ...newErrors,
        relevantExperience: "Relevant Experience must be a number greater than 0",
      };
    }

    if (formData.applyingForPosition === "Designer" && !formData.portfolioURL.trim()) {
      newErrors = {
        ...newErrors,
        portfolioURL: "Portfolio URL is required",
      };
    } else if (formData.applyingForPosition === "Designer" && !isValidURL(formData.portfolioURL)) {
      newErrors = {
        ...newErrors,
        portfolioURL: "Please enter a valid URL",
      };
    }

    if (formData.applyingForPosition === "Manager" && !formData.managementExperience.trim()) {
      newErrors = {
        ...newErrors,
        managementExperience: "Management Experience is required",
      };
    }

    if (!formData.additionalSkills.JavaScript && !formData.additionalSkills.CSS && !formData.additionalSkills.Python) {
      newErrors = {
        ...newErrors,
        additionalSkills: "Please select at least one additional skill",
      };
    }

    if (!formData.preferredInterviewTime.trim()) {
      newErrors = {
        ...newErrors,
        preferredInterviewTime: "Preferred Interview Time is required",
      };
    }

    setErrors(newErrors);
    return newErrors;
  };

  const isValidURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return { errors, validateForm };
};

export default useFormValidation;
