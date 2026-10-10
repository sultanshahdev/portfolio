export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <fieldset className="category-filter">
      <legend className="sr-only">Filter projects by category</legend>
      {['All', ...categories].map((category) => (
        <button key={category} type="button" aria-pressed={selected === category} onClick={() => onChange(category)}>
          {category}
        </button>
      ))}
    </fieldset>
  );
}
