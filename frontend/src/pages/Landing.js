import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import MarketingHeader from "../components/MarketingHeader";
import MarketingFooter from "../components/MarketingFooter";
import { HOME_FEATURES } from "../data/marketingContent";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./Landing.css";
import "./MarketingPages.css";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";
const HERO_EMISSIONS = [
  { name: "Mon", value: 22 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 24 },
  { name: "Thu", value: 20 },
  { name: "Fri", value: 16 },
  { name: "Sat", value: 14 },
  { name: "Sun", value: 18 },
];

function Landing() {
  const [heroEmissions, setHeroEmissions] = useState(HERO_EMISSIONS);
  const [counters, setCounters] = useState({ co2: 0, users: 0, score: 0 });

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    const formatLocalDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    };

    const buildUserChartData = (logs, today) => {
      const dailyMap = new Map();
      logs.forEach((log) => {
        const date = log.date || log["date"];
        const value = log.totalEmission || log["totalEmission"] || 0;
        dailyMap.set(date, Number(value));
      });

      const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
      const weekStart = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000);
      return labels.map((label, index) => {
        const current = new Date(weekStart.getTime() + index * 24 * 60 * 60 * 1000);
        const dateKey = formatLocalDate(current);
        return {
          name: label,
          value: dailyMap.has(dateKey) ? dailyMap.get(dateKey) : 0,
        };
      });
    };

    const loadPublicHeroEmissions = () => {
      axios
        .get(`${API_BASE}/api/carbon/public/hero-emissions`)
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setHeroEmissions(res.data);
          }
        })
        .catch(() => {
          // keep sample data if backend is unavailable
        });
    };

    const loadUserHeroEmissions = () => {
      const today = new Date();
      const endDate = formatLocalDate(today);
      const startDate = formatLocalDate(new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000));

      axios
        .get(`${API_BASE}/api/carbon/logs?from=${startDate}&to=${endDate}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          if (!Array.isArray(res.data)) {
            return;
          }

          setHeroEmissions(buildUserChartData(res.data, today));
        })
        .catch(() => {
          // keep sample data if backend is unavailable or user is not authenticated
        });
    };

    if (!token) {
      loadPublicHeroEmissions();
      return;
    }

    loadUserHeroEmissions();
  }, []);

  useEffect(() => {
    const target = { co2: 12000, users: 3500, score: 84 };
    let step = 0;
    const steps = 20;
    const timer = window.setInterval(() => {
      step += 1;
      setCounters({
        co2: Math.min(target.co2, Math.round((target.co2 * step) / steps)),
        users: Math.min(target.users, Math.round((target.users * step) / steps)),
        score: Math.min(target.score, Math.round((target.score * step) / steps)),
      });
      if (step >= steps) {
        window.clearInterval(timer);
      }
    }, 45);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="landing">
      <MarketingHeader />

      <main>
        <section className="landing-hero" aria-labelledby="landing-hero-title">
          <div className="landing-hero-inner">
            <p className="landing-eyebrow">Environmentally conscious tracking</p>
            <h1 id="landing-hero-title" className="landing-hero-title">
              Understand your footprint
              <span className="landing-hero-title-accent"> Act on what matters</span>
            </h1>
            <p className="landing-hero-lead">
              Personal Carbon Tracker helps you measure daily emissions, set reduction goals, and track progress so
              small changes add up to real impact.
            </p>
            <div className="landing-hero-actions">
              <Link to="/register" className="btn btn-primary landing-hero-btn-primary">
                Create free account
              </Link>
              <Link to="/login" className="btn btn-secondary landing-hero-btn-secondary">
                I already have an account
              </Link>
            </div>
            <ul className="landing-hero-points" aria-label="Highlights">
              <li>Personal dashboard &amp; trends</li>
              <li>Lifestyle survey &amp; carbon history</li>
              <li>Goals, badges &amp; leaderboard</li>
            </ul>
          </div>
          <div className="landing-hero-art-wrap">
            <div className="landing-hero-art">
              <article className="landing-dashboard-card landing-dashboard-card--overview">
                <div className="landing-dashboard-card-head">
                  <span>Weekly emissions</span>
                </div>
                <div className="landing-dashboard-chart">
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={heroEmissions} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35} />
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fill: "currentColor", fontSize: 12 }} />
                      <Tooltip cursor={{ stroke: "rgba(34,197,94,0.18)", strokeWidth: 2 }} />
                      <Area type="monotone" dataKey="value" stroke="#22c55e" fill="url(#heroGradient)" strokeWidth={3} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section id="features" className="landing-section mp-home-features">
          <div className="landing-section-inner">
            <h2 className="landing-section-title">Everything you need to track impact</h2>
            <p className="landing-section-sub">
              Built for clarity—see where your emissions come from and what to improve next.
            </p>
            <div className="mp-feature-grid">
              {HOME_FEATURES.map((f) => (
                <article key={f.title} className="mp-feature-card">
                  <div className="mp-feature-card-inner">
                    <div className="mp-feature-icon-wrap" aria-hidden>
                      {f.icon}
                    </div>
                    <h3 className="mp-feature-card-title">{f.title}</h3>
                    <p className="mp-feature-card-text">{f.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="landing-section landing-how">
          <div className="landing-section-inner">
            <h2 className="landing-section-title">How it works</h2>
            <p className="landing-section-sub">Three steps to a clearer footprint.</p>
            <ol className="landing-steps">
              <li className="landing-step">
                <span className="landing-step-num">1</span>
                <div>
                  <h3 className="landing-step-title">Sign up &amp; sign in</h3>
                  <p className="landing-step-text">
                    Create an account with email or sign in with Google or GitHub—your data stays
                    yours.
                  </p>
                </div>
              </li>
              <li className="landing-step">
                <span className="landing-step-num">2</span>
                <div>
                  <h3 className="landing-step-title">Complete your survey</h3>
                  <p className="landing-step-text">
                    Tell us about your habits—we turn that into an estimate you can refine over time.
                  </p>
                </div>
              </li>
              <li className="landing-step">
                <span className="landing-step-num">3</span>
                <div>
                  <h3 className="landing-step-title">Track, goal, improve</h3>
                  <p className="landing-step-text">
                    Review history, set goals, explore the marketplace, and watch your impact shift.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

      </main>

      <MarketingFooter />
    </div>
  );
}

export default Landing;
