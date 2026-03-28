import React, { useEffect, useState } from "react";
import "../assets/styles.css";

const jsonUrl = `${process.env.PUBLIC_URL || ""}/cv-data.json`;

function Cv() {
  const [cvData, setCvData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(jsonUrl)
      .then((res) => {
        if (!res.ok) throw new Error("Kunde inte läsa CV-data.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled) setCvData(data);
      })
      .catch(() => {
        if (!cancelled) setError("Misslyckades att ladda CV-data (cv-data.json).");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="cv-page">
        <header>
          <h1>CV</h1>
        </header>
        <main>
          <p role="alert">{error}</p>
        </main>
      </div>
    );
  }

  if (!cvData) {
    return (
      <div className="cv-page">
        <header>
          <h1>CV</h1>
        </header>
        <main>
          <p className="loading-hint" aria-live="polite">
            Laddar CV från cv-data.json …
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="cv-page">
      <header>
        <h1>Mitt CV</h1>
      </header>

      <main>
        <section className="cv-section">
          <h2>Utbildning</h2>
          <ul className="cv-json-list">
            {cvData.education.map((edu, index) => (
              <li key={index}>
                <h3>{edu.title}</h3>
                <p>
                  <strong>Institution:</strong> {edu.institution}
                </p>
                <p>
                  <strong>År:</strong> {edu.years}
                </p>
                {edu.details ? <p>{edu.details}</p> : null}
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section">
          <h2>Arbetslivserfarenhet</h2>
          <ul className="cv-json-list">
            {cvData.experience.map((exp, index) => (
              <li key={index}>
                <h3>{exp.title}</h3>
                <p>
                  <strong>Företag / plats:</strong> {exp.company}
                </p>
                {exp.years ? (
                  <p>
                    <strong>År:</strong> {exp.years}
                  </p>
                ) : null}
                {exp.details ? <p>{exp.details}</p> : null}
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Jakob Daoud</p>
      </footer>
    </div>
  );
}

export default Cv;
