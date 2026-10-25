import { useState } from 'react';
import { projects, projectCategories } from '../data/projects.js';
import PageHeading from '../components/ui/PageHeading.jsx';
import CategoryFilter from '../components/ui/CategoryFilter.jsx';
import ProjectList from '../components/projects/ProjectList.jsx';
import PageMeta from '../components/layout/PageMeta.jsx';

export default function ProjectsPage() {
  const [category, setCategory] = useState('All');
  const categories = projectCategories.filter((item) => projects.some((project) => project.category === item));
  const filtered = projects.filter((project) => category === 'All' || project.category === category);
  return (
    <div className="archive-page">
      <PageMeta title="Projects" description="Four engineering case studies by Sultan Shah: replicated editing, database internals, security workflows, and local source intelligence." />
      <p className="section-label page-kicker">The project archive / 01—04</p>
      <PageHeading title="Projects" description="Four engineering studies. From replicated documents to source intelligence: the problems, the systems built to address them, and the evidence behind each decision." />
      <CategoryFilter categories={categories} selected={category} onChange={setCategory} />
      <p className="result-count" role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}{category !== 'All' && ` in ${category}`}</p>
      <ProjectList projects={filtered} />
    </div>
  );
}
