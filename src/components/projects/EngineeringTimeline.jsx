import { Children } from 'react';

// Present the original chronology table cells as a vertical timeline. Links,
// qualifications and milestone wording remain the source Markdown's content.
export default function EngineeringTimeline({ children }) {
  const sections = Children.toArray(children);
  const header = Children.toArray(Children.toArray(sections[0]?.props.children)[0]?.props.children);
  const rows = Children.toArray(sections[1]?.props.children);
  return (
    <ol className="engineering-timeline" aria-label="Development milestones">
      {rows.map((row, index) => {
        const cells = Children.toArray(row.props.children);
        return <li key={index}>
          <div className="milestone-name">{cells[0]?.props.children}</div>
          <dl>{cells.slice(1).map((cell, column) => <div key={column}>
            <dt>{header[column + 1]?.props.children}</dt><dd>{cell.props.children}</dd>
          </div>)}</dl>
        </li>;
      })}
    </ol>
  );
}
