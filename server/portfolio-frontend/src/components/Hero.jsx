import { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { useIsMobile } from '../hooks/useIsMobile';
import './Hero.css';

const HeroScene = lazy(() => import('../three/HeroScene'));

const ROLES = [
  'Full-Stack Developer',
  'IoT & Cybersecurity Enthusiast',
  'Blockchain Explorer',
  'Problem Solver',
];

function useTypedRole() {
  const [text, setText] = useState('');
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setText(ROLES[0]);
      return;
    }
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;
    let timeoutId;

    const tick = () => {
      const role = ROLES[roleIndex];
      if (!deleting) {
        charIndex++;
        setText(role.slice(0, charIndex));
        if (charIndex === role.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1600);
          return;
        }
      } else {
        charIndex--;
        setText(role.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
        }
      }
      timeoutId = setTimeout(tick, deleting ? 40 : 75);
    };

    timeoutId = setTimeout(tick, 300);
    return () => clearTimeout(timeoutId);
  }, [reduced]);

  return text;
}

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } } };

export default function Hero() {
  const role = useTypedRole();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <section id="hero" className="hero">
      <div className="hero__canvas">
        {!(reduced || isMobile) && (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        )}
      </div>

      <motion.div className="hero__content" variants={container} initial="hidden" animate="show">
        <motion.p variants={item} className="hero__eyebrow">
          B.Tech CSE — IoT, Cybersecurity &amp; Blockchain
        </motion.p>

        <motion.h1 variants={item} className="hero__name">Pritam Chall</motion.h1>

        <motion.p variants={item} className="hero__role">
          {role}<span className="hero__caret">|</span>
        </motion.p>

        <motion.p variants={item} className="hero__bio">
          I build practical, connected software — from full-stack web apps to
          projects shaped by how I think about secure, connected systems.
          Currently working with React, Node.js, and the wider JavaScript
          ecosystem, and preparing for internships and software roles.
        </motion.p>

        <motion.div variants={item} className="hero__actions">
          <a href="#projects" className="btn btn--primary">View projects</a>
          <a href="#contact" className="btn btn--ghost">Get in touch</a>
        </motion.div>

        <motion.div variants={item} className="hero__stats">
          <div><span className="hero__stat-num">10+</span><span className="hero__stat-label">Projects built</span></div>
          <div><span className="hero__stat-num">MERN</span><span className="hero__stat-label">Full-stack dev</span></div>
          <div><span className="hero__stat-num">IoT</span><span className="hero__stat-label">+ Cybersecurity</span></div>
        </motion.div>
      </motion.div>

      <div className="hero__scroll-cue" aria-hidden="true"><span /></div>
    </section>
  );
}