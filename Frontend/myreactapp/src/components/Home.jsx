import React from "react";
import "../assets/styles.css";

function Home() {
  return (
    <div className="home-page">
      <header>
        <h1>Välkommen till mitt CV</h1>
      </header>

      <main>
        <section className="homeText">
          <h2>Hej!</h2>
          <p>
            Välkommen till min personliga webbplats. Här hittar du information om mig,
            mitt CV och min portfolio.
          </p>
        </section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Jakob Daoud</p>
      </footer>
    </div>
  );
}

export default Home;
