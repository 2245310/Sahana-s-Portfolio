import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import { HERO_LETTERS } from '../../data/heroLetters';
import motif2Raw from '../../../Logo/motifs/motif-2.svg?raw';
import './HeroSection.css';

function extractPath(svgRaw) {
  const match = svgRaw.match(/\bd="([^"]+)"/);
  return match ? match[1] : '';
}

const motif2Path = extractPath(motif2Raw);

const HERO_SOFTWARES = [
  { name: 'Photoshop', count: 2 },
  { name: 'After Effects', count: 1 },
  { name: 'Illustrator', count: 3 },
  { name: 'Procreate', count: 2 },
  { name: 'Indesign', count: 3 },
  { name: 'Blender', count: 1 },
  { name: 'Premiere pro', count: 2 },
  { name: 'Audition', count: 1 },
  { name: 'Antigravity', count: 2 },
  { name: 'VS Code', count: 1 },
];

export default function HeroSection({ onNavigate }) {
  const [hoveredLetterId, setHoveredLetterId] = useState(null);

  return (
    <section className="hero-section" id="home">
      <Navbar activePage="home" onNavigate={onNavigate} />

      <div className="hero-inner">
        {/* Top Row: Left Softwares List + Right Bio Paragraphs (matching references/Hero.page.png) */}
        <div className="hero-top-row">
          {/* Top-Left: Softwares I work with (all using the black-and-white motif) */}
          <div className="hero-softwares-block">
            <h2 className="hero-softwares-heading">Softwares I work with</h2>
            <ul className="hero-softwares-list">
              {HERO_SOFTWARES.map((item) => (
                <li key={item.name} className="hero-software-row">
                  <span className="hero-software-name">{item.name}</span>
                  <span className="hero-software-motifs" aria-hidden="true">
                    {Array.from({ length: item.count }).map((_, idx) => (
                      <svg
                        key={idx}
                        viewBox="44.76 68.75 1375.89 1099.13"
                        xmlns="http://www.w3.org/2000/svg"
                        className="hero-software-motif-svg"
                      >
                        <rect
                          x="44.76"
                          y="68.75"
                          width="1375.89"
                          height="1099.13"
                          fill="var(--color-ivory)"
                        />
                        <path d={motif2Path} fill="var(--color-black)" />
                      </svg>
                    ))}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Top-Right: Two Bio Paragraphs */}
          <div className="hero-bio-block">
            <p className="hero-bio-paragraph">
              Hello! I am Sahana Ramesh, a Creative Practictioner focused on
              brand identity, publication, and packaging design based in
              Bengaluru, Karnataka. I work at the intersection of strategy, and
              visual storytelling, I really love taking concepts from rough
              scribbles to thoughtful, tactile outcomes. Nothing feels better
              than seeing my projects come to life, wether it’s a book, a top or
              even a bowl of pasta.
            </p>
            <p className="hero-bio-paragraph">
              When I’m not in front of a screen building visual systems, you’ll
              usually find me at my sewing machine, or on the floor starting new
              projects with a cat in my lap (hopefully).
            </p>
          </div>
        </div>

        {/* Middle Row: Six Individual Letter-Hover Image Boxes */}
        <div className="hero-boxes-row" aria-hidden="true">
          {HERO_LETTERS.map((item) => {
            const isHovered = hoveredLetterId === item.id;
            return (
              <div
                key={item.id}
                className={`hero-box-slot ${isHovered ? 'is-visible' : ''}`}
                style={{
                  width: `${item.widthPct}%`,
                  marginRight: `${item.gapAfterPct}%`,
                }}
              >
                {/* Floating caption emerges from behind the image and settles just above it */}
                <span className="hero-floating-caption">{item.hoverText}</span>

                {/* Image frame matching letter width, same height across all six boxes */}
                <div className="hero-image-box">
                  <img
                    src={item.hoverImage}
                    alt={item.hoverText}
                    className="hero-hover-img"
                    decoding="async"
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Row: Six Individual Interactive Letters forming "Sahana" */}
        <div className="hero-letters-row" aria-label="Sahana">
          {HERO_LETTERS.map((item) => {
            const isHovered = hoveredLetterId === item.id;
            return (
              <div
                key={item.id}
                className={`hero-letter-item ${isHovered ? 'is-hovered' : ''}`}
                style={{
                  width: `${item.widthPct}%`,
                  marginRight: `${item.gapAfterPct}%`,
                }}
                onMouseEnter={() => setHoveredLetterId(item.id)}
                onMouseLeave={() => setHoveredLetterId(null)}
              >
                {item.id === 'a1' && (
                  <span className="hero-hover-hint">hover over to know me!</span>
                )}
                <svg
                  viewBox={item.viewBox}
                  xmlns="http://www.w3.org/2000/svg"
                  className="hero-letter-svg"
                  aria-label={item.char}
                >
                  {item.paths.map((d, idx) => (
                    <path key={idx} d={d} fill="var(--color-ivory)" />
                  ))}
                </svg>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
