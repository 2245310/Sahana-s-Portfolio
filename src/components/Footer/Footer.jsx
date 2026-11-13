import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import secondaryLogoRaw from '../../../Logo/secondary/secondary.svg?raw';
import motif3Raw from '../../../Logo/motifs/motif-3.svg?raw';
import motif4Raw from '../../../Logo/motifs/motif-4.svg?raw';
import './Footer.css';

gsap.registerPlugin(ScrollTrigger);

function extractPaths(svgRaw) {
  const matches = [...svgRaw.matchAll(/\bd="([^"]+)"/g)];
  return matches.map((m) => m[1]);
}

const secondaryLogoPaths = extractPaths(secondaryLogoRaw);
const leftMotifPath = extractPaths(motif4Raw)[0] || '';
const rightMotifPath = extractPaths(motif3Raw)[0] || '';

export default function Footer() {
  const footerRef = useRef(null);
  const leftTextRef = useRef(null);
  const rightTextRef = useRef(null);
  const leftMotifRef = useRef(null);
  const rightMotifRef = useRef(null);
  const tlRef = useRef(null);

  useEffect(() => {
    const footerEl = footerRef.current;
    const leftTextEl = leftTextRef.current;
    const rightTextEl = rightTextRef.current;
    const leftMotifEl = leftMotifRef.current;
    const rightMotifEl = rightMotifRef.current;

    if (
      !footerEl ||
      !leftTextEl ||
      !rightTextEl ||
      !leftMotifEl ||
      !rightMotifEl
    ) {
      return;
    }

    const buildTimeline = () => {
      if (tlRef.current) {
        tlRef.current.kill();
      }

      gsap.set([leftMotifEl, rightMotifEl], { x: 0 });

      const leftTextRect = leftTextEl.getBoundingClientRect();
      const rightTextRect = rightTextEl.getBoundingClientRect();
      const leftMotifRect = leftMotifEl.getBoundingClientRect();
      const rightMotifRect = rightMotifEl.getBoundingClientRect();

      // Calculate exact outward travel distance so each motif reaches and bounces off the stationary footer text
      const rawLeftGap = leftMotifRect.left - leftTextRect.right - 8;
      const rawRightGap = rightTextRect.left - rightMotifRect.right - 8;

      const leftTravel = -Math.max(24, rawLeftGap);
      const rightTravel = Math.max(24, rawRightGap);

      const tl = gsap.timeline({
        repeat: -1,
        repeatDelay: 1.5,
        paused: true,
      });

      // 1. Brief rest in original position
      tl.to({}, { duration: 0.35 });

      // 2. Move outwards away from each other toward the footer text
      tl.to(
        leftMotifEl,
        {
          x: leftTravel,
          duration: 0.68,
          ease: 'power2.in',
        },
        'moveOut'
      ).to(
        rightMotifEl,
        {
          x: rightTravel,
          duration: 0.68,
          ease: 'power2.in',
        },
        'moveOut'
      );

      // 3. Playful small bounce off the stationary footer text
      tl.to(
        leftMotifEl,
        {
          x: leftTravel * 0.78,
          duration: 0.22,
          ease: 'power2.out',
        },
        'bounce1'
      ).to(
        rightMotifEl,
        {
          x: rightTravel * 0.78,
          duration: 0.22,
          ease: 'power2.out',
        },
        'bounce1'
      );

      tl.to(
        leftMotifEl,
        {
          x: leftTravel * 0.95,
          duration: 0.16,
          ease: 'sine.in',
        },
        'bounce2'
      ).to(
        rightMotifEl,
        {
          x: rightTravel * 0.95,
          duration: 0.16,
          ease: 'sine.in',
        },
        'bounce2'
      );

      // 4. Return smoothly to their exact original positions
      tl.to(
        leftMotifEl,
        {
          x: 0,
          duration: 0.82,
          ease: 'power2.out',
        },
        'returnHome'
      ).to(
        rightMotifEl,
        {
          x: 0,
          duration: 0.82,
          ease: 'power2.out',
        },
        'returnHome'
      );

      tlRef.current = tl;
      return tl;
    };

    const ctx = gsap.context(() => {
      const tl = buildTimeline();

      ScrollTrigger.create({
        trigger: footerEl,
        start: 'top 98%',
        end: 'bottom top',
        onEnter: () => tl?.play(),
        onEnterBack: () => tl?.play(),
        onLeave: () => tl?.pause(0),
        onLeaveBack: () => tl?.pause(0),
      });
    }, footerEl);

    const handleResize = () => {
      const wasPlaying = tlRef.current?.isActive();
      const newTl = buildTimeline();
      if (wasPlaying) {
        newTl?.play();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (tlRef.current) {
        tlRef.current.kill();
      }
      ctx.revert();
    };
  }, []);

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="site-footer-inner">
        {/* Left Stationary Text */}
        <a
          ref={leftTextRef}
          href="mailto:hello.rsahana@gmail.com"
          className="footer-text footer-text-left"
        >
          hello.rsahana@gmail.com
        </a>

        {/* Center Brand Cluster: Left Motif + Secondary Logo + Right Motif */}
        <div className="footer-center-cluster" aria-hidden="true">
          <div ref={leftMotifRef} className="footer-motif footer-motif-left">
            <svg
              viewBox="44.76 68.75 1375.89 1099.13"
              xmlns="http://www.w3.org/2000/svg"
              className="footer-motif-svg"
            >
              <rect
                x="44.76"
                y="68.75"
                width="1375.89"
                height="1099.13"
                fill="var(--color-ivory)"
              />
              <path d={leftMotifPath} fill="var(--color-black)" />
            </svg>
          </div>

          <div className="footer-secondary-logo">
            <svg
              viewBox="236.3 395.9 992.8 402.7"
              xmlns="http://www.w3.org/2000/svg"
              className="footer-secondary-svg"
            >
              {secondaryLogoPaths.map((d, idx) => (
                <path key={idx} d={d} fill="var(--color-black)" />
              ))}
            </svg>
          </div>

          <div ref={rightMotifRef} className="footer-motif footer-motif-right">
            <svg
              viewBox="44.76 68.75 1375.89 1099.13"
              xmlns="http://www.w3.org/2000/svg"
              className="footer-motif-svg"
            >
              <rect
                x="44.76"
                y="68.75"
                width="1375.89"
                height="1099.13"
                fill="var(--color-black)"
              />
              <path d={rightMotifPath} fill="var(--color-orange)" />
            </svg>
          </div>
        </div>

        {/* Right Stationary Text */}
        <a
          ref={rightTextRef}
          href="https://www.instagram.com/sahanaxdesign"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-text footer-text-right"
        >
          @sahanaxdesign
        </a>
      </div>
    </footer>
  );
}
