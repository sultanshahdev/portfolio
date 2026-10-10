export default function SectionHeading({ id, children, action }) {
  return (
    <div className="section-heading">
      <h2 id={id} className="section-label">{children}</h2>
      {action}
    </div>
  );
}
