import { motion } from 'framer-motion';
import './Education.css';

const TIMELINE = [
  {
    year: 'Present',
    school: 'B.Tech — Computer Science Engineering',
    detail: 'Specializing in IoT & Cybersecurity with Blockchain',
    badge: 'Currently pursuing',
    current: true,
  },
  {
    year: 'Class XII',
    school: 'Jogamaya Memorial Institute',
    detail: 'Higher Secondary — Hooghly, West Bengal',
    badge: 'Completed',
  },
  {
    year: 'Class X',
    school: 'The Don Bosco High School',
    detail: 'Secondary — Mumbai, Maharashtra',
    badge: 'Completed',
  },
];

const fadeIn = {
  hidden: { opacity: 0, x: -24 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export default function Education() {
  return (
    <section id="education" className="education">
      <div className="education__inner">
        <div className="education__header">
          <span className="eyebrow">Education</span>
          <h2 className="education__title">Academic journey</h2>
        </div>

        <div className="education__timeline">
          <div className="education__rail" aria-hidden="true" />
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.school}
              className="education__item"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              variants={fadeIn}
              transition={{ delay: i * 0.08 }}
            >
              <span className={`education__dot ${t.current ? 'is-current' : ''}`} />
              <span className="education__year">{t.year}</span>
              <h3 className="education__school">{t.school}</h3>
              <p className="education__detail">{t.detail}</p>
              <span className={`education__badge ${t.current ? 'is-current' : ''}`}>{t.badge}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}