import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import './TomfooleryPage.css';

gsap.registerPlugin(ScrollTrigger);

// Exact free-flowing gallery geometry measured from references/tomfoolery.page.png
// (W = 1674, H = 1044; y below navbar normalized to vw units to preserve exact aspect ratios)
const TOMFOOLERY_ITEMS = [
  {
    id: 'tf-1',
    left: '47.49%',
    topVw: 2.69,
    width: '24.97%',
    aspectRatio: '418 / 663',
    delay: 0.05,
  },
  {
    id: 'tf-2',
    left: '4.24%',
    topVw: 3.41,
    width: '10.75%',
    aspectRatio: '180 / 153',
    delay: 0.0,
  },
  {
    id: 'tf-3',
    left: '77.00%',
    topVw: 4.12,
    width: '15.35%',
    aspectRatio: '257 / 187',
    delay: 0.1,
  },
  {
    id: 'tf-4',
    left: '11.95%',
    topVw: 16.73,
    width: '30.35%',
    aspectRatio: '508 / 123',
    delay: 0.14,
  },
  {
    id: 'tf-5',
    left: '6.09%',
    topVw: 27.12,
    width: '18.82%',
    aspectRatio: '315 / 422',
    delay: 0.0,
  },
  {
    id: 'tf-6',
    left: '84.17%',
    topVw: 28.26,
    width: '10.45%',
    aspectRatio: '175 / 213',
    delay: 0.08,
  },
  {
    id: 'tf-7',
    left: '33.45%',
    topVw: 33.51,
    width: '10.45%',
    aspectRatio: '175 / 213',
    delay: 0.04,
  },
  {
    id: 'tf-8',
    left: '66.85%',
    topVw: 45.04,
    width: '18.04%',
    aspectRatio: '302 / 167',
    delay: 0.06,
  },
  {
    id: 'tf-9',
    left: '51.73%',
    topVw: 50.96,
    width: '10.51%',
    aspectRatio: '176 / 150',
    delay: 0.1,
  },
  // Second scroll wave continuing the exact free-flowing visual rhythm
  {
    id: 'tf-10',
    left: '14.20%',
    topVw: 66.5,
    width: '24.97%',
    aspectRatio: '418 / 520',
    delay: 0.0,
  },
  {
    id: 'tf-11',
    left: '52.40%',
    topVw: 68.8,
    width: '30.35%',
    aspectRatio: '508 / 140',
    delay: 0.06,
  },
  {
    id: 'tf-12',
    left: '76.50%',
    topVw: 82.0,
    width: '15.35%',
    aspectRatio: '257 / 210',
    delay: 0.04,
  },
  {
    id: 'tf-13',
    left: '44.80%',
    topVw: 86.4,
    width: '18.82%',
    aspectRatio: '315 / 380',
    delay: 0.08,
  },
  {
    id: 'tf-14',
    left: '6.09%',
    topVw: 103.5,
    width: '18.04%',
    aspectRatio: '302 / 167',
    delay: 0.02,
  },
];

export default function TomfooleryPage({ onNavigate }) {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const containerEl = containerRef.current;
    const itemEls = itemsRef.current.filter(Boolean);
    if (!containerEl || itemEls.length === 0) return;

    const ctx = gsap.context(() => {
      itemEls.forEach((el, index) => {
        const delay = TOMFOOLERY_ITEMS[index]?.delay || 0;

        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 44,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 92%',
              end: 'top 60%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerEl);

    return () => ctx.revert();
  }, []);

  return (
    <div className="tomfoolery-page-wrapper">
      <section className="tomfoolery-page" id="tomfoolery" ref={containerRef}>
        <Navbar activePage="tomfoolery" onNavigate={onNavigate} />

        <div className="tomfoolery-canvas">
          {TOMFOOLERY_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              ref={(el) => {
                itemsRef.current[idx] = el;
              }}
              className="tomfoolery-item"
              style={{
                left: item.left,
                top: `${item.topVw}vw`,
                width: item.width,
                aspectRatio: item.aspectRatio,
              }}
            >
              {item.image && (
                <img
                  src={item.image}
                  alt=""
                  className="tomfoolery-item-img"
                  decoding="async"
                />
              )}
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
