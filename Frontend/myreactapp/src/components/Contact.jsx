import React from 'react';
import '../assets/styles.css';

function Contact() {
  return (
    <div className="contact-page">
      <header>
        <h1>Kontakt</h1>
      </header>

      <main>
        <section className="contactText">
          <h2>Kontakta mig</h2>
          <p><strong>Du kan nå mig via e-post:</strong> <a href="mailto:example@example.com">example@example.com</a></p>
          <p><strong>Tel Nr:</strong> 123456789</p>
        </section>
      </main>

      <footer>
        <p>&copy; 2025 Mitt CV</p>
      </footer>
      
    </div>
  );
}

export default Contact;
