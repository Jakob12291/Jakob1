import React from "react";
import "../assets/styles.css";

function About() {
  const profileSrc = `${process.env.PUBLIC_URL || ""}/profile.jpg`;

  return (
    <div className="about-page">
      <header>
        <h1>Om mig</h1>
      </header>

      <div className="about-container">
        <main>
          <section>
            <h2>Hej, jag heter Jakob Daoud</h2>
            <img src={profileSrc} alt="Profilbild" />
            <p className="aboutText">
              Jag är intresserad av webbutveckling och att bygga sidor som fungerar bra på
              olika skärmar.
            </p>
          </section>
        </main>

        <aside>
          <h2>Snabbinfo</h2>
          <ul>
            <li>
              <strong>Namn:</strong> Jakob Daoud
            </li>
            <li>
              <strong>Fokus:</strong> Webb &amp; frontend
            </li>
            <li>
              <strong>Språk:</strong> HTML, CSS, JavaScript, React
            </li>
          </ul>
        </aside>
      </div>

      <footer>
        <p>&copy; {new Date().getFullYear()} Jakob Daoud</p>
      </footer>
    </div>
  );
}

export default About;
