import React, { useRef, useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const formRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .sendForm(
        "service_axk3bfb",
        "template_f81ynt8",
        formRef.current,
        "RTm7VGI2Oqe0Y8p8k"
      )
      .then(
        (result) => {
          alert("Message sent successfully!");
          setFormData({
            name: "",
            email: "",
            company: "",
            message: "",
          });
          setIsSubmitting(false);
        },
        (error) => {
          alert("Failed to send message. Please try again.");
          setIsSubmitting(false);
        }
      );
  };

  return (
    <form ref={formRef} className="contact-form" onSubmit={sendEmail}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your full name"
          required
          value={formData.name}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="your.email@example.com"
          required
          value={formData.email}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="company">Company / Organization</label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Your company or organization"
          value={formData.company}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="Type your message here..."
          required
          value={formData.message}
          onChange={handleInputChange}
          disabled={isSubmitting}
        ></textarea>
      </div>

      <button type="submit" className="submit-btn" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
};

export default Contact;
