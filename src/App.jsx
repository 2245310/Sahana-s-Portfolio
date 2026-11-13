import React, { useEffect, useState } from 'react';
import HeroSection from './components/HeroSection/HeroSection';
import ProjectsSection from './components/ProjectsSection/ProjectsSection';
import Footer from './components/Footer/Footer';
import AboutPage from './pages/AboutPage';
import TomfooleryPage from './pages/TomfooleryPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import { PROJECTS } from './data/projects';

const PROJECT_IDS = new Set(PROJECTS.map((p) => p.id));

function getPageFromHash() {
  const hash = window.location.hash.replace('#', '').toLowerCase();
  if (hash === 'about') return 'about';
  if (hash === 'tomfoolery') return 'tomfoolery';
  if (PROJECT_IDS.has(hash)) return hash;
  return 'home';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash);

  useEffect(() => {
    const onHashChange = () => {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (page) => {
    const targetHash =
      page === 'about'
        ? '#about'
        : page === 'tomfoolery'
          ? '#tomfoolery'
          : PROJECT_IDS.has(page)
            ? `#${page}`
            : '#home';

    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  const handleSelectProject = (project) => {
    if (!project?.id) return;
    handleNavigate(project.id);
  };

  const isProjectPage = PROJECT_IDS.has(currentPage);

  return (
    <main className="app-root">
      {currentPage === 'about' && <AboutPage onNavigate={handleNavigate} />}
      {currentPage === 'tomfoolery' && (
        <TomfooleryPage onNavigate={handleNavigate} />
      )}
      {isProjectPage && (
        <ProjectDetailPage
          projectId={currentPage}
          onNavigate={handleNavigate}
          onSelectProject={handleSelectProject}
        />
      )}
      {currentPage === 'home' && (
        <>
          <HeroSection onNavigate={handleNavigate} />
          <ProjectsSection onSelectProject={handleSelectProject} />
          <Footer />
        </>
      )}
    </main>
  );
}
