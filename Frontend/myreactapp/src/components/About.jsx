import React from 'react';
import '../assets/styles.css';

function About() {
  return (
    <div className="about-page">

      <header>
        <h1>Om mig</h1>
      </header>

      <div className="about-container">
        <main>
          <section>
            <h2>Hej, jag heter Jakob Daoud</h2>
            <img src="/profile.jpg" alt="Profilbild" />
            <p className="aboutText">
              Jag är 23 år och en passionerad utvecklare. 
              Jag älskar att skapa webbplatser.
            </p>
          </section>
        </main>

        <aside>
          <h2>info</h2>
          <ul>
            <li><strong>Namn:</strong> Jakob Daoud</li>
            <li><strong>Yrke:</strong> Webbutvecklare</li>
            <li><strong>Erfarenhet:</strong> 2+ år</li>
            <li><strong>Favorit-språk:</strong> HTML, CSS, JavaScript, React</li>
          </ul>
        </aside>
      </div>

      <footer>
        <p>&copy; 2025 Mitt CV</p>
      </footer>
    </div>
  );
}

function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

export default About;