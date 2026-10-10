import PageMeta from '../components/layout/PageMeta.jsx';
import PageHeading from '../components/ui/PageHeading.jsx';
import TextLink from '../components/ui/TextLink.jsx';

export default function NotFoundPage() {
  return (
    <>
      <PageMeta title="Page not found" noIndex />
      <p className="section-label">404</p>
      <PageHeading title="This page isn’t here." description="The address may have changed, or the page may not exist yet." />
      <div className="inline-links"><TextLink to="/">Back to home</TextLink><TextLink to="/projects">Browse projects</TextLink></div>
    </>
  );
}
