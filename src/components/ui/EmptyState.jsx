export default function EmptyState({ children = 'Nothing here just yet. Check back for new work.' }) {
  return <p className="empty-state">{children}</p>;
}
