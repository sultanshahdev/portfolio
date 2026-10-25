import { organizations } from './organizations.js';

export const profile = {
  name: 'Sultan Shah',
  title: 'Software Engineer · Frontend Engineer',
  biographySubtitle: 'Software Engineer · Frontend Engineer',
  headline: ['From thoughtful', 'interfaces to', 'resilient systems.'],
  architectureFocus: 'Systems Architecture',
  disciplines: [
    { id: 'frontend', label: 'Frontend Engineering', description: 'Thoughtful interfaces, clear interactions, and the experience of using software.' },
    { id: 'backend', label: 'Backend Engineering', description: 'Application logic, data, and the services behind the interface.' },
    { id: 'distributed', label: 'Distributed Systems', description: 'How components communicate, coordinate, and recover from failure.' },
    { id: 'security', label: 'Networking & Security', description: 'The connections and trust boundaries that hold a system together.' },
  ],
  location: 'Karachi, Sindh, Pakistan',
  description: 'My work span backend development, software architecture, and system design. I’m curious about how components communicate, how applications are structured, and what makes software reliable and maintainable.',
   biography: [
  [
    'I’m a Software Engineer focused on backend and distributed systems, with a systems-first approach to architecture, reliability, performance, and security.',
  ],
  [
    'My technical focus spans Backend Engineering, Distributed Systems, System Design, Software Architecture, Linux, Networking, and Network Security. I see these disciplines as interconnected layers of a larger system.',
  ],
  [
    'I’m drawn to engineering challenges involving architectural trade-offs, performance bottlenecks, concurrency, and fault tolerance, with an emphasis on building systems that remain scalable, maintainable, and secure.',
  ],
],
  contactIntroduction: 'For a conversation about software, a project, or a learning opportunity, you can find me on LinkedIn. My code and ongoing experiments live on GitHub.',
  socials: [
    { label: 'GitHub', url: 'https://github.com/sultanshahdev', detail: 'Code, projects, and experiments', handle: '@sultanshahdev' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/sultan-shah-dev/', detail: 'Professional background and conversations', handle: 'sultan-shah-dev' },
  ],
  // Explicitly opt in with a public email address and a reviewed, public résumé.
  email: 'sultanshah.bscsf24@iba-suk.edu.pk',
  resumeUrl: null,
  portrait: { src: '/images/profile-img.png', objectPosition: 'center' },
  education: [
    {
      id: 'bs-computer-science',
      organization: organizations.sukkurIba,
      qualification: 'Bachelor of Science in Computer Science',
      kind: 'Formal education',
      period: '2024–2028',
      note: 'In progress · Expected 2028',
      location: { city: 'Sukkur', region: 'Sindh', country: 'Pakistan' },
    },
  ],
};
