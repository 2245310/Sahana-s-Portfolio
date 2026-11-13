import React from 'react';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import aboutMeImg from '../../Images/about.me.jpeg';
import './AboutPage.css';

export default function AboutPage({ onNavigate }) {
  return (
    <div className="about-page-wrapper">
      <section className="about-page" id="about">
        <Navbar activePage="about" onNavigate={onNavigate} />

        <div className="about-inner">
          {/* Left Column: Circular Portrait */}
          <div className="about-visual-col">
            <div className="about-portrait-frame">
              <img
                src={aboutMeImg}
                alt="Sahana Ramesh"
                className="about-portrait-img"
                decoding="async"
              />
            </div>
          </div>

          {/* Right Column: Editorial Bio Copy + Curved Arrow & Green Caption */}
          <div className="about-content-col">
            <div className="about-bio-block">
              <h1 className="about-heading">Get to know me a little :)</h1>

              <div className="about-paragraphs">
                <p>
                  If you ever walk into my room, you’ll probably find a sewing
                  machine in the corner, a drawer full of scrap fabric, a cat
                  somewhere it shouldn’t be, and me sitting a few inches away
                  from my screen with my headphones on.
                </p>

                <p>
                  I’m Sahana, a visual communication and strategic branding
                  student, and an enthusiastic collector of interests. I like
                  making things, taking things apart, putting them back together
                  and occasionally wondering why I started in the first place.
                  Whether it’s sewing something I saw online, experimenting with
                  a new recipe, making music or getting carried away with a
                  project, I’m almost always working on something.
                </p>

                <p>
                  As a designer, I’m drawn to the ideas behind things. I like
                  observing people, finding connections in everyday experiences
                  and questioning what we often take for granted. I enjoy taking
                  an idea from a passing thought to something people can see,
                  interact with and connect to. My work moves between branding,
                  publication and packaging, with conceptual thinking at the
                  centre of it all.
                </p>

                <p>
                  I believe good design should have a reason to exist. It should
                  understand the people it’s made for, communicate with clarity
                  and leave something behind. I’m still figuring out what my
                  practice will look like, but I know I want it to be driven by
                  curiosity, grounded in understanding and never short of
                  experimentation.
                </p>

                <p>
                  Outside of design, I’m usually finding another thing to make,
                  another song to listen to or another reason to cook pasta all
                  while covered in cat hair.
                </p>
              </div>

              {/* Curved Arrow & Brand Green Caption below bio paragraphs */}
              <div className="about-caption-group">
                <svg
                  viewBox="0 0 135 80"
                  xmlns="http://www.w3.org/2000/svg"
                  className="about-arrow-svg"
                  aria-hidden="true"
                >
                  {/* Swooping curved stem from bottom-right up-left to portrait */}
                  <path
                    d="M 128 54 C 96 82, 46 74, 16 19"
                    fill="none"
                    stroke="var(--color-ivory)"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  {/* Filled ivory arrowhead pointing up-left */}
                  <polygon
                    points="8,4 29,16 10,28"
                    fill="var(--color-ivory)"
                  />
                </svg>
                <p className="about-dragged-text">
                  This is who the cat dragged in
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
