export default function SectionHeading({ id, children, action, number, eyebrow }) {
  return <div className="section-heading" data-reveal>
    <div>{eyebrow && <p className="section-label section-kicker">{number && <span>{number} / </span>}{eyebrow}</p>}<h2 id={id}>{children}</h2></div>
    {action}
  </div>;
}
