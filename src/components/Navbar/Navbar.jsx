import React, { useState } from 'react';
import secondaryLogoRaw from '../../../Logo/secondary/secondary.svg?raw';
import './Navbar.css';

const secondaryPaths = [...secondaryLogoRaw.matchAll(/\bd="([^"]+)"/g)].map(
  (m) => m[1]
);

export default function Navbar({ activePage = 'home', onNavigate }) {
  const [contactOpen, setContactOpen] = useState(false);

  const handleNavClick = (e, page) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(page);
    } else {
      window.location.hash = `#${page}`;
    }
  };

  return (
    <header className="site-navbar">
      <a
        href="#home"
        onClick={(e) => handleNavClick(e, 'home')}
        className={`nav-item nav-home ${activePage === 'home' ? 'is-active' : ''}`}
      >
        HOME
      </a>

      <a
        href="#about"
        onClick={(e) => handleNavClick(e, 'about')}
        className={`nav-item nav-about ${activePage === 'about' ? 'is-active' : ''}`}
      >
        ABOUT
      </a>

      <a
        href="#home"
        onClick={(e) => handleNavClick(e, 'home')}
        className="nav-logo"
        aria-label="Sahana Ramesh"
      >
        <svg
          viewBox="236.3 395.9 992.8 402.7"
          xmlns="http://www.w3.org/2000/svg"
          className="nav-logo-svg"
        >
          {secondaryPaths.map((d, i) => (
            <path key={i} d={d} fill="var(--color-green)" />
          ))}
        </svg>
      </a>

      <a
        href="#tomfoolery"
        onClick={(e) => handleNavClick(e, 'tomfoolery')}
        className={`nav-item nav-tomfoolery ${activePage === 'tomfoolery' ? 'is-active' : ''}`}
      >
        TOMFOOLERY
      </a>

      <div
        className="nav-contact-wrapper"
        onMouseEnter={() => setContactOpen(true)}
        onMouseLeave={() => setContactOpen(false)}
      >
        <button
          type="button"
          className={`nav-item nav-contact ${contactOpen ? 'is-open' : ''}`}
          aria-expanded={contactOpen}
        >
          CONTACT
        </button>

        {contactOpen && (
          <div className="nav-contact-dropdown" role="menu">
            <a
              href="mailto:hello.rsahana@gmail.com"
              className="nav-dropdown-link"
              role="menuitem"
            >
              Email: hello.rsahana@gmail.com
            </a>
            <a
              href="https://www.instagram.com/sahanaxdesign"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-dropdown-link"
              role="menuitem"
            >
              Instagram: @sahanaxdesign
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
