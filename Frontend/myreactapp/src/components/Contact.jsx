import React from "react";
import "../assets/styles.css";

function Contact() {
  return (
    <div className="contact-page">
      <header>
        <h1>Kontakt</h1>
      </header>

      <main>
        <section className="contactText">
          <h2>Kontakta mig</h2>
          <p>
            <strong>E-post:</strong>{" "}
            <a href="mailto:jakob@example.com">jakob@example.com</a>
          </p>
          <p>
            <strong>Tel:</strong> 070-000 00 00
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Jakob Daoud</p>
      </footer>
    </div>
  );
}

export default Contact;
