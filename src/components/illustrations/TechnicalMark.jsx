// Compact filled-and-outline companions to the larger hardware illustrations.
const marks = {
  Server: <><path d="M3 4h16l3 3v14H3Z" /><path d="M19 4v17M3 10h16M3 16h16" /><path d="M6 7h7m-7 6h7m-7 6h7" /><circle cx="16" cy="7" r="1" /><circle cx="16" cy="13" r="1" /></>,
  Database: <><path d="M4 5h15l2 3v12H4Z" /><path d="M4 5v15m15-15v15M4 11h15" /><rect x="7" y="7" width="4" height="2" /><rect x="7" y="14" width="8" height="3" /><path d="M1 8h3m-3 9h3m17-4h2" /></>,
  Cable: <><path d="M3 3h7v8H3Zm11 10h7v8h-7Z" /><path d="M5 3v4m3-4v4m9 10v4m2-4v4M6 11v5q0 3 4 3h4M10 7h4q4 0 4 6" /></>,
  Container: <><path d="m3 6 9-4 9 4v13l-9 3-9-3Z" /><path d="m3 6 9 3 9-3M12 9v13M6 9v8m3-7v8m6-7v7m3-8v7" /></>,
  Braces: <><path d="M3 3h18v17H3Z" /><path d="M3 7h18m-9 3v4H7v3m5-3h5v3" /><rect x="10" y="9" width="4" height="3" /><rect x="5" y="16" width="4" height="3" /><rect x="15" y="16" width="4" height="3" /></>,
  Workflow: <><path d="M3 3h6v6H3Zm12 12h6v6h-6ZM15 3h6v6h-6Z" /><path d="M9 6h6m3 3v6M6 9v9h9" /><circle cx="6" cy="18" r="2" /></>,
};
export const technicalMarkNames = Object.keys(marks);
export default function TechnicalMark({ name, className = '' }) {
  return <svg className={`technical-mark ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">{marks[name]}</svg>;
}
