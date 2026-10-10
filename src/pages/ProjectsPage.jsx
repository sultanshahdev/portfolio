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
    <>
      <PageMeta title="Projects" description="Applications, tools, and learning projects by Sultan Shah, with source-based engineering case studies." />
      <PageHeading title="Projects" description="A selection of applications, tools, and experiments. Notes on what they do, how they are structured, and what remains to improve." />
      <CategoryFilter categories={categories} selected={category} onChange={setCategory} />
      <p className="result-count" role="status">{filtered.length} {filtered.length === 1 ? 'project' : 'projects'}{category !== 'All' && ` in ${category}`}</p>
      <ProjectList projects={filtered} />
    </>
  );
}
