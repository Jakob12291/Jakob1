import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/styles.css'; // Ensure correct path

function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState(null);

  useEffect(() => {
    axios.get('https://api.github.com/users/AlexanderG-CA/repos')
      .then(response => {
        setProjects(response.data);
        setLoading(false);
      })
      .catch(error => console.error('Error fetching GitHub projects', error));
  }, []);

  return (
    <div className="portfolio-page">
      <header>
        <h1>Portfolio</h1>
      </header>

      <main className="portfolio-main">
        <section className="portfolio">
          {loading ? (
            <p>Laddar projekt...</p>
          ) : (
            projects.map((project) => (
              <div key={project.id} className="project">
                <a 
                  href={project.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="project-link"
                >
                  <img src={project.owner.avatar_url} alt={project.name} />
                  <h3>{project.name}</h3>
                </a>
                {/* knapp för att trigga modal */}
                <button 
                  className="info-button" 
                  onClick={() => setHoveredProject(project.id)}
                >
                  Mer info
                </button>
              </div>
            ))
          )}
        </section>
      </main>

      {/* Modal Overlay */}
      {hoveredProject && (
        <div className="portfolio-modal-overlay" onClick={() => setHoveredProject(null)}>
          <div className="portfolio-hover-modal" onClick={(e) => e.stopPropagation()}>
            {projects.map((project) => (
              hoveredProject === project.id && (
                <div key={project.id}>
                  <span className="portfolio-close" onClick={() => setHoveredProject(null)}>&times;</span>
                  <h2>{project.name}</h2>
                  <p><strong>Beskrivning:</strong> {project.description || 'Ingen beskrivning tillgänglig.'}</p>
                  <p><strong>Skapat:</strong> {project.created_at ? project.created_at.split('T')[0] : 'Okänt'}</p>
                  <p><strong>Senast uppdaterad:</strong> {project.updated_at ? project.updated_at.split('T')[0] : 'Okänt'}</p>
                  <p><strong>Stjärnor:</strong> ⭐ {project.stargazers_count || 0}</p>
                  <p><strong>Språk:</strong> {project.language || 'Ej angivet'}</p>
                  <a href={project.html_url} target="_blank" rel="noopener noreferrer" className="github-link">
                    Besök GitHub-repo
                  </a>
                </div>
              )
            ))}
          </div>
        </div>
      )}

      <footer className="portfolio-footer">
        <p>&copy; 2025 Mitt CV</p>
      </footer>
    </div>
  );
}

export default Portfolio;
