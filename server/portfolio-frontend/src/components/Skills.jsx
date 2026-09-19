import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import './Skills.css';

const GROUPS = [
  { id: 'core', label: 'Core Stack', tags: ['JavaScript', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'HTML5', 'CSS3', 'Tailwind CSS', 'REST APIs'] },
  { id: 'spec', label: 'IoT, Security & Blockchain', tags: ['IoT Systems', 'Cybersecurity Fundamentals', 'Blockchain Concepts', 'Secure System Design'] },
  { id: 'working', label: 'Working Knowledge', tags: ['Java', 'Python', 'MySQL', 'Next.js'] },
  { id: 'learning', label: 'Learning & Exploring', tags: ['C', 'Machine Learning', 'Data Analytics'] },
  { id: 'cs', label: 'Core CS', tags: ['Data Structures', 'Algorithms', 'Problem Solving', 'OOP'] },
  { id: 'soft', label: 'Soft Skills', tags: ['Logical Thinking', 'Project Building', 'Backend Dev', 'API Design'] },
];

function OrbitLayout({ active, setActive }) {
  const n = GROUPS.length;
  return (
    <div className="skills__orbit">
      <div className="skills__core"><span>Tech</span><span>Stack</span></div>
      {GROUPS.map((g, i) => {
        const angle = (360 / n) * i - 90;
        return (
          <button
            key={g.id}
            className={`skills__node ${active === g.id ? 'is-active' : ''}`}
            style={{ '--angle': `${angle}deg` }}
            onClick={() => setActive(active === g.id ? null : g.id)}
          >
            {g.label}
          </button>
        );
      })}
    </div>
  );
}

function AccordionLayout({ active, setActive }) {
  return (
    <div className="skills__accordion">
      {GROUPS.map((g) => (
        <div key={g.id} className="skills__accordion-item">
          <button
            className={`skills__accordion-head ${active === g.id ? 'is-active' : ''}`}
            onClick={() => setActive(active === g.id ? null : g.id)}
          >
            {g.label}
            <span>{active === g.id ? '−' : '+'}</span>
          </button>
          <AnimatePresence initial={false}>
            {active === g.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="skills__accordion-body"
              >
                <div className="skills__tags">
                  {g.tags.map((t) => <span key={t} className="skills__tag">{t}</span>)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState('core');
  const isMobile = useIsMobile();
  const activeGroup = GROUPS.find((g) => g.id === active);

  return (
    <section id="skills" className="skills">
      <div className="skills__inner">
        <div className="skills__header">
          <span className="eyebrow">Skills &amp; stack</span>
          <h2 className="skills__title">What I build with</h2>
          <p className="skills__hint">
            {isMobile ? 'Tap a group to see the tools.' : 'Click a node to see what it covers.'}
          </p>
        </div>

        {isMobile ? (
          <AccordionLayout active={active} setActive={setActive} />
        ) : (
          <div className="skills__layout">
            <OrbitLayout active={active} setActive={setActive} />
            <div className="skills__panel">
              <AnimatePresence mode="wait">
                {activeGroup ? (
                  <motion.div
                    key={activeGroup.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <h3>{activeGroup.label}</h3>
                    <div className="skills__tags">
                      {activeGroup.tags.map((t) => <span key={t} className="skills__tag">{t}</span>)}
                    </div>
                  </motion.div>
                ) : (
                  <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="skills__empty">
                    Select a group to explore.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}