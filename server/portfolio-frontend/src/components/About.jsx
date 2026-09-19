import { motion } from 'framer-motion';
import './About.css';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

const PROFILE = [
  ['Name', 'Pritam Chall'],
  ['Role', 'Full-Stack Developer'],
  ['Degree', 'B.Tech — CSE (Ongoing)'],
  ['Specialization', 'IoT & Cybersecurity with Blockchain'],
  ['Location', 'West Bengal, India'],
  ['Status', 'Available for work'],
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about__inner">
        <motion.div
          className="about__header"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <span className="eyebrow">About</span>
          <h2 className="about__title">
            Curious about how things<br />connect &amp; hold up.
          </h2>
        </motion.div>

        <div className="about__grid">
          <motion.div
            className="about__text"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <p>
              I'm a Computer Science Engineering student specializing in
              IoT and Cybersecurity with Blockchain. That specialization
              shapes how I think about the systems I build — with an eye
              toward how connected devices, data, and networks can be made
              more secure and reliable.
            </p>
            <p>
              Alongside that, I'm building strong full-stack development
              skills — working with React.js, Node.js, Express.js, and
              MongoDB to turn ideas into working applications. It's the
              practical, hands-on complement to what I'm learning around
              secure and connected technologies.
            </p>
            <p>
              I believe in learning by doing. Every project is a new
              lesson, every bug a teacher — and I'm actively preparing for
              internships and software development roles where I can keep
              building on both fronts.
            </p>
          </motion.div>

          <motion.div
            className="about__card"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
          >
            <span className="about__card-label">Profile</span>
            <dl className="about__rows">
              {PROFILE.map(([k, v]) => (
                <div className="about__row" key={k}>
                  <dt>{k}</dt>
                  <dd className={k === 'Status' ? 'is-available' : ''}>{v}</dd>
                </div>
              ))}
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}