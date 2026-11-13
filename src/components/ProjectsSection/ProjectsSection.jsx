import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, FOREGROUND_MOTIFS } from '../../data/projects';
import './ProjectsSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection({ onSelectProject }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const [gridSettled, setGridSettled] = useState(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const cardEls = cardsRef.current.filter(Boolean);
    if (!sectionEl || cardEls.length !== PROJECTS.length) return;

    // Pre-decode project images for smooth 3D GPU rasterization
    const imgs = sectionEl.querySelectorAll('img');
    imgs.forEach((img) => {
      if (img.decode) {
        img.decode().catch(() => {});
      }
    });

    const ctx = gsap.context(() => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      const depthFactor = isMobile ? 0.45 : 1;
      const rotFactor = isMobile ? 0.5 : 1;

      // Phase 1: Empty start — all 6 cards invisible, pushed back in 3D space
      cardEls.forEach((el, i) => {
        const { start3D } = PROJECTS[i];
        gsap.set(el, {
          opacity: 0,
          xPercent: start3D.xPercent * rotFactor,
          yPercent: start3D.yPercent * rotFactor,
          z: start3D.z * depthFactor,
          scale: start3D.scale,
          rotationX: start3D.rotateX * rotFactor,
          rotationY: start3D.rotateY * rotFactor,
          rotationZ: start3D.rotateZ * rotFactor,
          transformOrigin: '50% 50%',
          force3D: true,
        });
      });

      // Pinned ScrollTrigger: locks the projects section in place while the 5-phase
      // 3D card animation plays from start to final grid, then releases naturally
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top top',
          end: '+=185%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            setGridSettled(self.progress >= 0.88);
          },
        },
      });

      PROJECTS.forEach((proj, i) => {
        const el = cardEls[i];
        const { scatter3D, timing } = proj;
        const { emergeStart, emergeEnd, settleStart, settleEnd } = timing;
        const driftDuration = settleStart - emergeEnd;
        const settleDuration = settleEnd - settleStart;

        // Phase 2 & 3: Staggered emergence from deep 3D space into 3D scatter pose
        tl.to(
          el,
          {
            opacity: 0.44,
            xPercent: scatter3D.xPercent * rotFactor,
            yPercent: scatter3D.yPercent * rotFactor,
            z: scatter3D.z * depthFactor,
            scale: scatter3D.scale,
            rotationX: scatter3D.rotateX * rotFactor,
            rotationY: scatter3D.rotateY * rotFactor,
            rotationZ: scatter3D.rotateZ * rotFactor,
            duration: emergeEnd - emergeStart,
            ease: 'sine.out',
          },
          emergeStart
        );

        // Continuous 3D float/drift while remaining staggered cards emerge
        if (driftDuration > 0) {
          tl.to(
            el,
            {
              opacity: 0.65,
              xPercent: scatter3D.xPercent * 0.68 * rotFactor,
              yPercent: scatter3D.yPercent * 0.68 * rotFactor,
              z: scatter3D.z * 0.72 * depthFactor,
              scale: scatter3D.scale + 0.08,
              rotationX: scatter3D.rotateX * 0.72 * rotFactor,
              rotationY: scatter3D.rotateY * 0.72 * rotFactor,
              rotationZ: scatter3D.rotateZ * 0.72 * rotFactor,
              duration: driftDuration,
              ease: 'none',
            },
            emergeEnd
          );
        }

        // Phase 4 & 5: Move forward toward viewer, straighten, brighten, and settle into 3x2 grid
        tl.to(
          el,
          {
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            z: 0,
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            duration: settleDuration,
            ease: 'power2.inOut',
          },
          settleStart
        );
      });

      // Brief hold at the end (0.90 -> 1.00) so the user clearly sees the settled final grid
      // before the pinned section releases naturally
      tl.to({}, { duration: 0.1 }, 0.9);
    }, sectionEl);

    const refreshTimer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(refreshTimer);
      ctx.revert();
    };
  }, []);

  const handleCardClick = (project) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else {
      window.location.hash = `#${project.id}`;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`projects-section ${gridSettled ? 'is-settled' : ''}`}
      id="projects"
    >
      {/* Shared 3D Perspective Stage */}
      <div className="projects-3d-stage">
        {PROJECTS.map((project, index) => (
          <div key={project.id} className="project-grid-cell">
            <a
              href={`#${project.id}`}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="project-card"
              onClick={(e) => {
                e.preventDefault();
                handleCardClick(project);
              }}
              aria-label={project.title}
            >
              <div className="project-card-inner">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-img"
                  decoding="async"
                />
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Stationary Foreground Brand Motifs */}
      <div className="projects-foreground-layer" aria-hidden="true">
        {FOREGROUND_MOTIFS.map((motif) => (
          <div key={motif.id} className={motif.className}>
            <svg
              viewBox={motif.viewBox}
              xmlns="http://www.w3.org/2000/svg"
              className="project-motif-svg"
            >
              <rect
                x="44.76"
                y="68.75"
                width="1375.89"
                height="1099.13"
                fill={motif.rectFill}
              />
              <path d={motif.pathD} fill={motif.pathFill} />
            </svg>
          </div>
        ))}
      </div>
    </section>
  );
}
