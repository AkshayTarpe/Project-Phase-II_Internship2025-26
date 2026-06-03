import React, { useState } from "react";
import axios from "axios";
import MarketingHeader from "../components/MarketingHeader";
import MarketingFooter from "../components/MarketingFooter";
import "./Landing.css";
import "./MarketingPages.css";
import "./Contact.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", text: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status.text) setStatus({ type: "", text: "" });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setStatus({ type: "error", text: "Please fill in name, email, subject, and message." });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setStatus({ type: "error", text: "Please enter a valid email address." });
      return;
    }

    setSubmitting(true);
    setStatus({ type: "", text: "" });
    try {
      await axios.post(`${API_BASE}/api/contact/messages`, {
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setStatus({
        type: "success",
        text: "Message sent successfully! We will get back to you soon.",
      });
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        (typeof err.response?.data === "string" ? err.response.data : null) ||
        "Could not send your message. Please try again later.";
      setStatus({ type: "error", text: msg });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="landing mp-subpage contact-page">
      <MarketingHeader />
      <main className="mp-main">
        <section className="mp-hero" aria-labelledby="contact-page-title">
          <div className="mp-hero-inner">
            <p className="mp-hero-eyebrow">Get in touch</p>
            <h1 id="contact-page-title" className="mp-hero-title">
              We are here
              <span className="mp-hero-title-accent"> to help.</span>
            </h1>
          </div>
        </section>

        <section className="landing-section mp-contact-body" aria-label="Contact options">
          <div className="landing-section-inner">
            <div className="mp-contact-layout">
              <aside className="mp-contact-aside" aria-label="Contact support illustration">
                <div className="mp-contact-aside-card mp-contact-animation-card">
                  <div className="mp-contact-animation-shell" aria-hidden>
                    <div className="mp-contact-envelope">
                      <span className="mp-contact-envelope-flap" />
                      <span className="mp-contact-envelope-body" />
                      <span className="mp-contact-envelope-light" />
                    </div>
                    <div className="mp-contact-bubble mp-contact-bubble--pulse" />
                    <div className="mp-contact-bubble mp-contact-bubble--float" />
                    <div className="mp-contact-bubble mp-contact-bubble--spark" />
                  </div>
                  <h2 className="mp-contact-aside-title">Contact support</h2>
                  <p className="mp-contact-aside-lead">
                    Have a question about Personal Carbon Tracker, your account, or how to get started? Our team is ready to help.
                  </p>
                  <p className="mp-contact-card-note mp-contact-card-note--small">
                    Submit your message through the form and we’ll respond quickly with actionable guidance.
                  </p>
                </div>
              </aside>

              <form className="mp-contact-form" onSubmit={handleSubmit} noValidate>
                <h2 className="mp-contact-form-heading">Send a message</h2>
                <p className="mp-contact-form-intro">
                  Share your question, feedback, or feature request and we’ll respond as soon as possible.
                </p>
                <div className="mp-form-fields-row">
                  <div className="mp-form-row">
                    <label className="mp-form-label" htmlFor="contact-name">
                      Name <span className="mp-form-required">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      className="mp-form-input"
                      required
                      autoComplete="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                  </div>
                  <div className="mp-form-row">
                    <label className="mp-form-label" htmlFor="contact-email">
                      Email <span className="mp-form-required">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      className="mp-form-input"
                      required
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div className="mp-form-row">
                  <label className="mp-form-label" htmlFor="contact-subject">
                    Subject <span className="mp-form-required">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    className="mp-form-input"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                  />
                </div>
                <div className="mp-form-row">
                  <label className="mp-form-label" htmlFor="contact-message">
                    Message <span className="mp-form-required">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    className="mp-form-textarea"
                    rows={5}
                    required
                    value={form.message}
                    onChange={handleChange}
                    placeholder="How can we help?"
                  />
                </div>
                {status.text && (
                  <p
                    className={
                      status.type === "error" ? "mp-form-feedback mp-form-feedback--error" : "mp-form-feedback mp-form-feedback--success"
                    }
                    role={status.type === "error" ? "alert" : "status"}
                  >
                    {status.text}
                  </p>
                )}
                <button
                  type="submit"
                  className="btn btn-primary mp-form-submit"
                  disabled={submitting}
                >
                  {submitting ? "Sending…" : "Send message"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

export default Contact;
