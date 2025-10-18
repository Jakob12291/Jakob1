import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/styles.css"; // Ser till att stilen laddas in

function Cv() {
  const [cvData, setCvData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/cv")
      .then((response) => {
        setCvData(response.data);
      })
      .catch((err) => {
        setError("Misslyckades att ladda CV-data.");
      });
  }, []);

  if (error) return <p>{error}</p>;
  if (!cvData) return <p>Laddar...</p>;

  return (
    <div className="cv-page">
      <header>
        <h1>Mitt CV</h1>
      </header>

      <main>
        <section className="cv-section">
          <h2>Utbildning</h2>
          <ul>
            {cvData.education.map((edu, index) => (
              <li key={index}>
                <h3>{edu.title}</h3>
                <p><strong>Institution:</strong> {edu.institution}</p>
                <p><strong>År:</strong> {edu.years}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className="cv-section">
          <h2>Arbetslivserfarenhet</h2>
          <ul>
            {cvData.experience.map((exp, index) => (
              <li key={index}>
                <h3>{exp.title}</h3>
                <p><strong>Företag:</strong> {exp.company}</p>
                <p><strong>År:</strong> {exp.years}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Mitt CV</p>
      </footer>
    </div>
  );
}

export default Cv;