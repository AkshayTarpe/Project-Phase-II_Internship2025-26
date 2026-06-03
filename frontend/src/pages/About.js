import React from "react";
import MarketingHeader from "../components/MarketingHeader";
import MarketingFooter from "../components/MarketingFooter";
import "./Landing.css";
import "./MarketingPages.css";

function About() {
  return (
    <div className="landing mp-subpage">
      <MarketingHeader />
      <main className="mp-main">
        <section className="mp-hero" aria-labelledby="about-page-title">
          <div className="mp-hero-inner">
            <p className="mp-hero-eyebrow">Our story</p>
            <h1 id="about-page-title" className="mp-hero-title">
              Carbon Clarity
              <span className="mp-hero-title-accent"> for real life.</span>
            </h1>
            <p className="mp-hero-lead">
              We built Personal Carbon Tracker to make personal carbon tracking simple, honest, and actionable whether
              you are just starting out or refining a long-term sustainability habit.
            </p>
          </div>
        </section>

        <section className="landing-section landing-about-page mp-about-body">
          <div className="landing-section-inner">
            <div className="mp-about-lead-card">
              <p className="mp-about-lead-text">
                Personal Carbon Tracker is built to help people move from uncertainty to confidence. We give you clear daily insight, helpful context, and a lightweight roadmap for reducing your footprint in real life.
              </p>
            </div>

            <div className="mp-values">
              <div className="mp-value-pill">4,300+ engaged users</div>
              <div className="mp-value-pill">5 core footprint categories</div>
              <div className="mp-value-pill">Fast, actionable guidance</div>
            </div>

            <div className="mp-about-grid">
              <div className="mp-about-tile">
                <span className="mp-about-tile-icon" aria-hidden>
                  🎯
                </span>
                <h3 className="mp-about-tile-title">Our mission</h3>
                <p className="mp-about-tile-text">
                  Empower everyone to understand their impact with transparent emissions tracking and practical steps to reduce it over time.
                </p>
              </div>
              <div className="mp-about-tile">
                <span className="mp-about-tile-icon" aria-hidden>
                  🤝
                </span>
                <h3 className="mp-about-tile-title">What we believe</h3>
                <p className="mp-about-tile-text">
                  Small, consistent changes matter. Transparency builds trust. Your data is yours; we focus on helping you learn and improve.
                </p>
              </div>
              <div className="mp-about-tile">
                <span className="mp-about-tile-icon" aria-hidden>
                  🌱
                </span>
                <h3 className="mp-about-tile-title">Where we are headed</h3>
                <p className="mp-about-tile-text">
                  We are focused on smarter personalization, clearer progress, and habit-friendly insights that make sustainability easier.
                </p>
              </div>
            </div>

            <div className="mp-feature-grid">
              <div className="mp-feature-card">
                <div className="mp-feature-icon-wrap" aria-hidden>
                  📈
                </div>
                <div className="mp-feature-card-inner">
                  <h3 className="mp-feature-card-title">Track progress with confidence</h3>
                  <p className="mp-feature-card-text">
                    See your weekly emissions at a glance and discover which habits deliver the biggest impact.
                  </p>
                </div>
              </div>
              <div className="mp-feature-card">
                <div className="mp-feature-icon-wrap" aria-hidden>
                  🧭
                </div>
                <div className="mp-feature-card-inner">
                  <h3 className="mp-feature-card-title">Guidance that fits your life</h3>
                  <p className="mp-feature-card-text">
                    We help you compare everyday choices and focus on actions that are sustainable, realistic, and meaningful.
                  </p>
                </div>
              </div>
              <div className="mp-feature-card">
                <div className="mp-feature-icon-wrap" aria-hidden>
                  🔒
                </div>
                <div className="mp-feature-card-inner">
                  <h3 className="mp-feature-card-title">Privacy by design</h3>
                  <p className="mp-feature-card-text">
                    Your personal footprint data stays private. Our goal is to support your journey, not sell your information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}

export default About;
