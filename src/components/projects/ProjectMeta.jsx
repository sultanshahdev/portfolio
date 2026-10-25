export default function ProjectMeta({ project, detailed = false }) {
  return (
    <div className="project-meta">
      <span>{project.category}</span>
      <span aria-hidden="true">·</span>
      <span>{project.year}</span>
      {detailed && <><span aria-hidden="true">·</span><span>{project.status}</span></>}
    </div>
  );
}
