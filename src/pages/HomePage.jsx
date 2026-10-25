import Intro from '../components/profile/Intro.jsx';
import EducationLearningSection from '../components/profile/EducationLearningSection.jsx';
import CommunityLeadershipSection from '../components/profile/CommunityLeadershipSection.jsx';
import TechnicalExpertise from '../components/profile/TechnicalExpertise.jsx';
import ContactLinks from '../components/profile/ContactLinks.jsx';
import ProjectList from '../components/projects/ProjectList.jsx';
import SectionHeading from '../components/ui/SectionHeading.jsx';
import TextLink from '../components/ui/TextLink.jsx';
import PageMeta from '../components/layout/PageMeta.jsx';
import MascotScene from '../components/mascots/MascotScene.jsx';
import { projects } from '../data/projects.js';

export default function HomePage() {
  return <>
    <PageMeta /><Intro />
    <section id="work" data-section className="home-section selected-work" aria-labelledby="selected-work">
      <SectionHeading id="selected-work" number="02" eyebrow="A few things I've built" action={<TextLink to="/projects" arrow>All projects</TextLink>}>Selected work</SectionHeading>
      <p className="work-introduction">Four different problems.<br /><em>One instinct to look beneath the surface.</em></p>
      <ProjectList projects={projects.filter(project => project.featured)} headingLevel={3} variant="showcase" />
    </section>
    <TechnicalExpertise /><EducationLearningSection /><CommunityLeadershipSection />
    <section id="contact" data-section data-mascot-scope className="home-section contact-section canvas-standard" aria-labelledby="get-in-touch" data-reveal>
      <div><SectionHeading id="get-in-touch" number="06" eyebrow="Keep the connection open">Get in touch</SectionHeading><p className="contact-closing">Something on your mind?<br /><em>Let’s connect the dots.</em></p><p>Always glad to talk about software, exchange ideas, or explore a project together.</p><ContactLinks /></div>
      <div className="contact-companion"><MascotScene /><span className="section-label">A new connection starts here.</span></div>
    </section>
  </>;
}
