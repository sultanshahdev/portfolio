import Intro from '../components/profile/Intro.jsx';
import Experience from '../components/profile/Experience.jsx';
import Education from '../components/profile/Education.jsx';
import TechnicalExpertise from '../components/profile/TechnicalExpertise.jsx';
import ContactLinks from '../components/profile/ContactLinks.jsx';
import ProjectList from '../components/projects/ProjectList.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import TextLink from '../components/ui/TextLink.jsx';
import PageMeta from '../components/layout/PageMeta.jsx';
import { projects } from '../data/projects.js';
import { experience, community } from '../data/experience.js';

export default function HomePage() {
  return (
    <>
      <PageMeta />
      <Intro />
      <section className="home-section" aria-labelledby="selected-work">
        <SectionHeading id="selected-work" action={<TextLink to="/projects" arrow>All projects</TextLink>}>Selected work</SectionHeading>
        <ProjectList projects={projects.filter((project) => project.featured)} headingLevel={3} />
      </section>
      <TechnicalExpertise />
      <Experience entries={experience} />
      <Education />
      <Experience entries={community} title="Community & leadership" id="community" />
      <section className="home-section contact-section" aria-labelledby="get-in-touch">
        <SectionHeading id="get-in-touch">Get in touch</SectionHeading>
        <p>Always glad to talk about software, exchange ideas, or explore a project together.</p>
        <ContactLinks />
      </section>
    </>
  );
}
