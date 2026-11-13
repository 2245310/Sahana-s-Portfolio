import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import { PROJECTS } from '../data/projects';
import { PROJECT_DETAILS } from '../data/projectDetails';
import './ProjectDetailPage.css';

export default function ProjectDetailPage({
  projectId,
  onNavigate,
  onSelectProject,
}) {
  const pageRef = useRef(null);
  const stageRef = useRef(null);
  const scatterItemsRef = useRef([]);
  const topZRef = useRef(20);
  const dragSessionRef = useRef(null);

  const currentIndex = PROJECTS.findIndex((p) => p.id === projectId);
  const resolvedIndex = currentIndex >= 0 ? currentIndex : 0;
  const project = PROJECTS[resolvedIndex];
  const detail = PROJECT_DETAILS[project.id] || PROJECT_DETAILS['project-01'];
  const nextIndex = (resolvedIndex + 1) % PROJECTS.length;
  const nextProject = PROJECTS[nextIndex];

  // Per-sticker state: { [id]: { dx: 0, dy: 0, zIndex: number } }
  const [stickerState, setStickerState] = useState(() => {
    const initial = {};
    detail.explorations.forEach((item, idx) => {
      initial[item.id] = { dx: 0, dy: 0, zIndex: idx + 2 };
    });
    return initial;
  });
  const [activeStickerId, setActiveStickerId] = useState(null);

  // Reset sticker positions to initial scattered arrangement when switching projects
  useEffect(() => {
    const initial = {};
    detail.explorations.forEach((item, idx) => {
      initial[item.id] = { dx: 0, dy: 0, zIndex: idx + 2 };
    });
    topZRef.current = detail.explorations.length + 10;
    setStickerState(initial);
    setActiveStickerId(null);
    dragSessionRef.current = null;
  }, [detail]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });

    const pageEl = pageRef.current;
    if (!pageEl) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-detail-top-box, .project-detail-box',
        { opacity: 0, y: 18 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.06,
          ease: 'power2.out',
        }
      );

      const validScatter = scatterItemsRef.current.filter(Boolean);
      if (validScatter.length > 0) {
        gsap.fromTo(
          validScatter,
          { opacity: 0 },
          {
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
            delay: 0.12,
            ease: 'power2.out',
          }
        );
      }
    }, pageEl);

    return () => ctx.revert();
  }, [project.id]);

  const handleStickerPointerDown = (e, item) => {
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();

    const stickerEl = e.currentTarget;
    const stageEl = stageRef.current;
    if (!stickerEl || !stageEl) return;

    if (stickerEl.setPointerCapture) {
      try {
        stickerEl.setPointerCapture(e.pointerId);
      } catch {
        // Ignore if pointer capture is unavailable
      }
    }

    const stageRect = stageEl.getBoundingClientRect();
    const stickerRect = stickerEl.getBoundingClientRect();
    const current = stickerState[item.id] || { dx: 0, dy: 0, zIndex: 2 };
    const nextZ = ++topZRef.current;

    // Calculate bounds so the sticker stays inside the designated exploration box
    const minDeltaX = stageRect.left - stickerRect.left;
    const maxDeltaX = stageRect.right - stickerRect.right;
    const minDeltaY = stageRect.top - stickerRect.top;
    const maxDeltaY = stageRect.bottom - stickerRect.bottom;

    dragSessionRef.current = {
      id: item.id,
      pointerId: e.pointerId,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startDx: current.dx,
      startDy: current.dy,
      minDeltaX: Math.min(0, minDeltaX),
      maxDeltaX: Math.max(0, maxDeltaX),
      minDeltaY: Math.min(0, minDeltaY),
      maxDeltaY: Math.max(0, maxDeltaY),
      zIndex: nextZ,
    };

    setActiveStickerId(item.id);
    setStickerState((prev) => ({
      ...prev,
      [item.id]: {
        ...(prev[item.id] || { dx: 0, dy: 0 }),
        zIndex: nextZ,
      },
    }));
  };

  const handleStickerPointerMove = (e, item) => {
    const session = dragSessionRef.current;
    if (!session || session.id !== item.id || session.pointerId !== e.pointerId) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();

    const rawDeltaX = e.clientX - session.startClientX;
    const rawDeltaY = e.clientY - session.startClientY;

    const clampedDeltaX = Math.min(
      Math.max(rawDeltaX, session.minDeltaX),
      session.maxDeltaX
    );
    const clampedDeltaY = Math.min(
      Math.max(rawDeltaY, session.minDeltaY),
      session.maxDeltaY
    );

    const nextDx = session.startDx + clampedDeltaX;
    const nextDy = session.startDy + clampedDeltaY;

    setStickerState((prev) => ({
      ...prev,
      [item.id]: {
        dx: nextDx,
        dy: nextDy,
        zIndex: session.zIndex,
      },
    }));
  };

  const handleStickerPointerUp = (e, item) => {
    const session = dragSessionRef.current;
    if (!session || session.id !== item.id) return;

    e.preventDefault();
    e.stopPropagation();

    if (e.currentTarget?.releasePointerCapture) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if not captured
      }
    }

    dragSessionRef.current = null;
    setActiveStickerId(null);
  };

  const handleNextProject = () => {
    if (onSelectProject) {
      onSelectProject(nextProject);
    } else {
      window.location.hash = `#${nextProject.id}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  return (
    <div className="project-detail-wrapper" ref={pageRef}>
      <article className="project-detail-page" id={project.id}>
        <Navbar activePage="home" onNavigate={onNavigate} />

        <div className="project-detail-inner">
          {/* Top Section: Three Project Imagery Boxes */}
          <div className="project-detail-top-grid">
            {detail.topImages.map((imgSrc, idx) => (
              <div key={idx} className="project-detail-top-box">
                <img
                  src={imgSrc}
                  alt={`${detail.title} image ${idx + 1}`}
                  className="project-detail-top-img"
                  decoding="async"
                />
              </div>
            ))}
          </div>

          {/* Middle Section: Metadata Box (Left) + Project Brief Box (Right) */}
          <div className="project-detail-middle-grid">
            <div className="project-detail-box project-meta-box">
              <div className="project-field-row">
                <span className="project-field-label">Year:</span>
                <span className="project-field-value">{detail.year}</span>
              </div>
              <div className="project-field-row">
                <span className="project-field-label">For:</span>
                <span className="project-field-value">{detail.forText}</span>
              </div>
              <div className="project-field-row">
                <span className="project-field-label">
                  Project description:
                </span>
                <span className="project-field-value">
                  {detail.projectType}
                </span>
              </div>
            </div>

            <div className="project-detail-box project-brief-box">
              <div className="project-brief-section">
                <span className="project-field-label">Project brief:</span>
                <p className="project-field-copy">{detail.brief}</p>
              </div>

              {detail.reflection && (
                <div className="project-brief-section">
                  <span className="project-field-label">Reflection:</span>
                  <p className="project-field-copy">{detail.reflection}</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Section: Strategy Breakdown Box (Left) + Process / Explorations Box (Right) */}
          <div className="project-detail-bottom-grid">
            <div className="project-detail-box project-breakdown-box">
              <div className="project-breakdown-item">
                <span className="project-field-label">Starting point:</span>
                <p className="project-field-copy">{detail.startingPoint}</p>
              </div>
              <div className="project-breakdown-item">
                <span className="project-field-label">My observations:</span>
                <p className="project-field-copy">{detail.observation}</p>
              </div>
              <div className="project-breakdown-item">
                <span className="project-field-label">The insight:</span>
                <p className="project-field-copy">{detail.insight}</p>
              </div>
              <div className="project-breakdown-item">
                <span className="project-field-label">The concept:</span>
                <p className="project-field-copy">{detail.concept}</p>
              </div>
              <div className="project-breakdown-item">
                <span className="project-field-label">The strategy:</span>
                <p className="project-field-copy">{detail.designProcess}</p>
              </div>
              <div className="project-breakdown-item">
                <span className="project-field-label">The outcome:</span>
                <p className="project-field-copy">{detail.outcome}</p>
              </div>
            </div>

            {/* Designated Box/Area for Iterations and Explorations (Draggable PNG Stickers) */}
            <div className="project-detail-box project-process-box">
              <span className="project-field-label project-process-heading">
                Process:
              </span>

              <div
                ref={stageRef}
                className="project-process-scatter-stage"
                aria-label={`${detail.title} iterations and explorations`}
              >
                {detail.explorations.map((item, idx) => {
                  const pos = stickerState[item.id] || {
                    dx: 0,
                    dy: 0,
                    zIndex: idx + 2,
                  };
                  const isDragging = activeStickerId === item.id;

                  return (
                    <div
                      key={item.id}
                      ref={(el) => {
                        scatterItemsRef.current[idx] = el;
                      }}
                      className={`project-scatter-card ${
                        isDragging ? 'is-dragging' : ''
                      }`}
                      style={{
                        left: `${item.leftPct}%`,
                        top: `${item.topPct}%`,
                        width: `${item.widthPct}%`,
                        zIndex: pos.zIndex,
                        transform: `translate3d(${pos.dx}px, ${pos.dy}px, 0) rotate(${item.rotate}deg)`,
                      }}
                      onPointerDown={(e) => handleStickerPointerDown(e, item)}
                      onPointerMove={(e) => handleStickerPointerMove(e, item)}
                      onPointerUp={(e) => handleStickerPointerUp(e, item)}
                      onPointerCancel={(e) => handleStickerPointerUp(e, item)}
                      onDragStart={(e) => e.preventDefault()}
                    >
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="project-scatter-img"
                        draggable={false}
                        decoding="async"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Next Project Navigation Button */}
          <div className="project-next-nav">
            <button
              type="button"
              className="project-next-btn"
              onClick={handleNextProject}
              aria-label={`Next project: ${nextProject.title}`}
            >
              <span>Next</span>
              <span className="project-next-arrow" aria-hidden="true">
                →
              </span>
            </button>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}
