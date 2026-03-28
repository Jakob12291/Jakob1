import "./assets/styles.css";
import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

import Home from "./components/Home.jsx";
import About from "./components/About.jsx";
import Cv from "./components/Cv.jsx";
import Portfolio from "./components/Portfolio.jsx";
import Contact from "./components/Contact.jsx";
import NotFound from "./components/NotFound.jsx";

const publicUrl = process.env.PUBLIC_URL || "";

function App() {
  const [menuActive, setMenuActive] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [leetOpen, setLeetOpen] = useState(false);
  const leetBuffer = useRef("");

  const toggleMenu = () => {
    if (!leetOpen) {
      setMenuActive((v) => !v);
    }
  };

  const handleLogoClick = () => {
    setEasterEggActive((v) => !v);
  };

  useEffect(() => {
    const bg = easterEggActive
      ? `linear-gradient(135deg, rgba(26,35,126,0.9), rgba(74,20,140,0.85)), url(${publicUrl}/profile.jpg)`
      : "";
    document.body.style.backgroundImage = bg;
    document.body.style.backgroundSize = easterEggActive ? "cover" : "";
    document.body.style.backgroundAttachment = easterEggActive ? "fixed" : "";
    return () => {
      document.body.style.backgroundImage = "";
      document.body.style.backgroundSize = "";
      document.body.style.backgroundAttachment = "";
    };
  }, [easterEggActive]);

  useEffect(() => {
    const secretCode = "1337";

    const handleKeyDown = (event) => {
      if (leetOpen) return;
      if (event.ctrlKey || event.metaKey || event.altKey) return;
      if (event.key.length !== 1) return;
      leetBuffer.current = (leetBuffer.current + event.key).slice(-8);
      if (leetBuffer.current.includes(secretCode)) {
        setLeetOpen(true);
        leetBuffer.current = "";
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [leetOpen]);

  const navClass = ({ isActive }) => (isActive ? "active" : "");

  return (
    <Router basename={publicUrl || "/"}>
      <nav>
        <div className="nav-container">
          <button
            type="button"
            className="logo logo-button"
            onClick={handleLogoClick}
          >
            Jakob Daoud
          </button>

          <button
            type="button"
            className="hamburger"
            onClick={toggleMenu}
            aria-expanded={menuActive}
            aria-label="Öppna meny"
          >
            ☰
          </button>

          <ul className={`nav-links ${menuActive ? "active" : ""}`}>
            <li>
              <NavLink to="/" end className={navClass} onClick={() => setMenuActive(false)}>
                Hem
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={navClass} onClick={() => setMenuActive(false)}>
                Om mig
              </NavLink>
            </li>
            <li>
              <NavLink to="/cv" className={navClass} onClick={() => setMenuActive(false)}>
                CV
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/portfolio"
                className={navClass}
                onClick={() => setMenuActive(false)}
              >
                Portfolio
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={navClass} onClick={() => setMenuActive(false)}>
                Kontakt
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/cv" element={<Cv />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {leetOpen ? (
        <div
          className="leet-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="leet-title"
        >
          <div className="leet-box">
            <button
              type="button"
              className="leet-close"
              onClick={() => setLeetOpen(false)}
              aria-label="Stäng"
            >
              &times;
            </button>
            <p id="leet-title">Grattis – du skrev 1337!</p>
            <p>Du är officiellt elite. Virtuell high-five.</p>
          </div>
        </div>
      ) : null}
    </Router>
  );
}

export default App;
