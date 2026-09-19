import ProjectCard from './ProjectCard';
import './Projects.css';

const PROJECTS = [
  {
    name: 'BikersHub',
    description: 'A full-stack motorcycle discovery platform (inspired by BikeWale) for exploring, comparing, and reviewing bikes across every category. Combines a searchable catalog, AI-powered recommendations, financial calculators, a community forum, and a used-bike marketplace — with a full admin panel for content and analytics.',
    tags: ['Next.js', 'Node.js', 'MongoDB', 'Socket.io', 'JWT Auth', 'Groq AI'],
    link: 'https://github.com/pritamchall123-cell/bikershub',
    linkLabel: 'View on GitHub',
    featured: true,
  },
  {
    name: 'Gym Website',
    description: 'A fully responsive gym website featuring workout plans, membership info, and a clean modern UI. Demonstrates strong frontend development and layout skills.',
    tags: ['HTML', 'CSS', 'JavaScript', 'Responsive'],
    link: 'https://github.com/pritamchall123-cell',
    linkLabel: 'View on GitHub',
  },
  {
    name: 'More on GitHub',
    description: "Explore all my repositories, contributions, and side projects. I'm constantly building, experimenting, and shipping — check GitHub for the latest work.",
    tags: ['Open Source', 'Experiments', 'Learning'],
    link: 'https://github.com/pritamchall123-cell',
    linkLabel: 'Visit GitHub',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="projects">
      <div className="projects__inner">
        <div className="projects__header">
          <span className="eyebrow">Projects</span>
          <h2 className="projects__title">What I've built</h2>
        </div>
        <div className="projects__grid">
          {PROJECTS.map((p, i) => <ProjectCard key={p.name} index={i} {...p} />)}
        </div>
      </div>
    </section>
  );
}