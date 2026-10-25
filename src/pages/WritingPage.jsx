import { writing } from '../data/writing.js';
import PageHeading from '../components/ui/PageHeading.jsx';
import PageMeta from '../components/layout/PageMeta.jsx';
import WritingEntry from '../components/writing/WritingEntry.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';

export default function WritingPage() {
  return (
    <div className="writing-page canvas-standard">
      <PageMeta title="Writing" description="A space for future notes on software engineering, architecture, and systems. Current entries are clearly labeled sample drafts." />
      <p className="section-label page-kicker">An open notebook</p>
      <PageHeading title="Writing" description="Notes on software, systems, and the decisions that connect them." />
      <p className="editorial-note">A space for work in progress. The entries below are sample drafts for this portfolio, not published articles.</p>
      {writing.length ? <div className="writing-list">{writing.map((article) => <WritingEntry article={article} key={article.slug} />)}</div> : <EmptyState>New writing will appear here.</EmptyState>}
    </div>
  );
}
