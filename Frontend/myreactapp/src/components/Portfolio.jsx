import React, { useEffect, useState } from "react";
import "../assets/styles.css";

const GITHUB_USER = "Jakob12291";
const GITHUB_REPOS = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=owner`;
const STATIC_JSON = `${process.env.PUBLIC_URL || ""}/portfolio-static.json`;

function Portfolio() {
  const [githubProjects, setGithubProjects] = useState([]);
  const [staticProjects, setStaticProjects] = useState([]);
  const [loadingGithub, setLoadingGithub] = useState(true);
  const [loadingStatic, setLoadingStatic] = useState(true);
  const [githubError, setGithubError] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoadingGithub(true);
    fetch(GITHUB_REPOS)
      .then((res) => {
        if (!res.ok) throw new Error("GitHub svarade med fel.");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data)) {
          const publicRepos = data.filter((r) => !r.private);
          setGithubProjects(publicRepos);
        }
      })
      .catch((err) => {
        console.error(err);
        if (!cancelled) setGithubError("Kunde inte hämta projekt från GitHub just nu.");
      })
      .finally(() => {
        if (!cancelled) setLoadingGithub(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    setLoadingStatic(true);
    fetch(STATIC_JSON)
      .then((res) => {
        if (!res.ok) throw new Error("Saknar portfolio-static.json");
        return res.json();
      })
      .then((data) => {
        if (!cancelled && Array.isArray(data)) setStaticProjects(data);
      })
      .catch(() => {
        if (!cancelled) setStaticProjects([]);
      })
      .finally(() => {
        if (!cancelled) setLoadingStatic(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const loading = loadingGithub || loadingStatic;

  return (
    <div className="portfolio-page">
      <header>
        <h1>Portfolio</h1>
        <p className="portfolio-lead">
          Publika projekt från GitHub samt tidigare skolprojekt.
        </p>
      </header>

      <main className="portfolio-main">
        {loading ? (
          <div className="portfolio-loading" role="status" aria-live="polite">
            <p className="loading-title">Laddar portfolio …</p>
            <ul className="loading-list">
              {loadingGithub ? (
                <li>Hämtar publika repon från GitHub …</li>
              ) : (
                <li>GitHub-projekt klara.</li>
              )}
              {loadingStatic ? (
                <li>Läser lokala projekt från portfolio-static.json …</li>
              ) : (
                <li>Lokala projekt klara.</li>
              )}
            </ul>
          </div>
        ) : null}

        {githubError ? (
          <p className="portfolio-error" role="alert">
            {githubError}
          </p>
        ) : null}

        {!loadingGithub && githubProjects.length > 0 ? (
          <section className="portfolio-block" aria-labelledby="gh-heading">
            <h2 id="gh-heading">GitHub ({GITHUB_USER})</h2>
            <div className="portfolio">
              {githubProjects.map((project) => (
                <div key={`gh-${project.id}`} className="project">
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <img
                      src={project.owner.avatar_url}
                      alt=""
                      width="120"
                      height="120"
                      className="project-thumb"
                    />
                    <h3>{project.name}</h3>
                  </a>
                  <p className="project-desc">
                    {project.description || "Ingen beskrivning i GitHub."}
                  </p>
                  <button
                    type="button"
                    className="info-button"
                    onClick={() => setHoveredId(`gh-${project.id}`)}
                  >
                    Mer info
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {!loadingStatic && staticProjects.length > 0 ? (
          <section className="portfolio-block" aria-labelledby="local-heading">
            <h2 id="local-heading">Övriga projekt</h2>
            <div className="portfolio">
              {staticProjects.map((project) => (
                <div key={project.id} className="project">
                  <div className="project-link project-link--static">
                    <img
                      src={`${process.env.PUBLIC_URL || ""}/${project.image}`}
                      alt=""
                      width="320"
                      height="200"
                      className="project-thumb project-thumb--wide"
                    />
                    <h3>{project.name}</h3>
                  </div>
                  <p className="project-desc">{project.description}</p>
                  <button
                    type="button"
                    className="info-button"
                    onClick={() => setHoveredId(`st-${project.id}`)}
                  >
                    Mer info
                  </button>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {!loading && githubProjects.length === 0 && staticProjects.length === 0 ? (
          <p>Inga projekt att visa.</p>
        ) : null}
      </main>

      {hoveredId && (
        <div
          className="portfolio-modal-overlay"
          role="presentation"
          onClick={() => setHoveredId(null)}
        >
          <div
            className="portfolio-hover-modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {githubProjects.map((project) =>
              hoveredId === `gh-${project.id}` ? (
                <div key={project.id}>
                  <button
                    type="button"
                    className="portfolio-close"
                    onClick={() => setHoveredId(null)}
                    aria-label="Stäng"
                  >
                    &times;
                  </button>
                  <h2>{project.name}</h2>
                  <p>
                    <strong>Beskrivning:</strong>{" "}
                    {project.description || "Ingen beskrivning tillgänglig."}
                  </p>
                  <p>
                    <strong>Skapat:</strong>{" "}
                    {project.created_at ? project.created_at.split("T")[0] : "—"}
                  </p>
                  <p>
                    <strong>Uppdaterad:</strong>{" "}
                    {project.updated_at ? project.updated_at.split("T")[0] : "—"}
                  </p>
                  <p>
                    <strong>Språk:</strong> {project.language || "—"}
                  </p>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                  >
                    Öppna på GitHub
                  </a>
                </div>
              ) : null
            )}
            {staticProjects.map((project) =>
              hoveredId === `st-${project.id}` ? (
                <div key={project.id}>
                  <button
                    type="button"
                    className="portfolio-close"
                    onClick={() => setHoveredId(null)}
                    aria-label="Stäng"
                  >
                    &times;
                  </button>
                  <h2>{project.name}</h2>
                  <p>{project.description}</p>
                </div>
              ) : null
            )}
          </div>
        </div>
      )}

      <footer className="portfolio-footer">
        <p>&copy; {new Date().getFullYear()} Jakob Daoud</p>
      </footer>
    </div>
  );
}

export default Portfolio;
