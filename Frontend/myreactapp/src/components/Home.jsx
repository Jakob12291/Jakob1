function toggleMenu() {
  const navLinks = document.getElementById('navLinks');
  navLinks.classList.toggle('active');
}

import React from 'react';
import '../assets/styles.css';

function Home() {
  return (
    <div className="home-page">

      {/* Header */}
      <header>
        <h1>Välkommen till mitt CV</h1>
      </header>

      {/* Main Content */}
      <main>
        <section className="homeText">
          <h2>Hej!</h2>
          <p>Välkommen till min personliga webbplats. Här hittar du information om mig, mitt CV och min portfolio.</p>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Mitt CV</p>
      </footer>
    </div>
  );
}


export default Home;

