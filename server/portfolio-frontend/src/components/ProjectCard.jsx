import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import './ProjectCard.css';

export default function ProjectCard({ index, name, description, tags, link, linkLabel, featured }) {
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 200, damping: 20 });

  function handleMove(e) {
    const rect = ref.current.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }
  function handleLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <motion.article
      ref={ref}
      className={`project-card ${featured ? 'is-featured' : ''}`}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.05 }}
    >
      <div className="project-card__inner">
        <div className="project-card__top">
          <span className="project-card__index">0{index + 1}</span>
          {featured && <span className="project-card__badge">Featured</span>}
        </div>
        <h3 className="project-card__name">{name}</h3>
        <p className="project-card__desc">{description}</p>
        <div className="project-card__tags">
          {tags.map((t) => <span key={t} className="project-card__tag">{t}</span>)}
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="project-card__link">
          {linkLabel} <span aria-hidden="true">↗</span>
        </a>
      </div>
    </motion.article>
  );
}