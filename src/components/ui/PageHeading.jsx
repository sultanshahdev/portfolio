export default function PageHeading({ title, description, children }) {
  return (
    <header className="page-heading">
      <h1>{title}</h1>
      {description && <p>{description}</p>}
      {children}
    </header>
  );
}
