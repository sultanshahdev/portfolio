import { organizations } from './organizations.js';

export const learning = [
  {
    id: 'odin-full-stack',
    title: 'Full-Stack Development',
    organization: organizations.odin,
    kind: 'Self-directed learning program',
    period: 'October 2025–Present',
    description: 'Project-based study of web development, including JavaScript modules, application state, build tooling, and version control.',
    approach: 'Practical implementation, independent problem solving, and software development fundamentals.',
  },
];

// Intentional editorial order, independent of event dates.
export const community = [
  {
    id: 'lums-case-competition',
    title: 'Case Competition Participant',
    event: 'Case Competition at LUMS',
    organization: organizations.lums,
    category: 'Analysis & collaboration',
    icon: 'Presentation',
    period: 'February 2026',
    duration: '1 month',
    location: { city: 'Lahore', region: 'Punjab', country: 'Pakistan' },
    mode: 'On-site',
    description: 'Participated in the LUMS Case Competition alongside more than 200 teams from Pakistan and abroad during a four-day case challenge.',
    highlights: [
      'Worked collaboratively to analyze complex business scenarios and develop strategic recommendations under time constraints.',
      'Presented and defended the team’s solution before consulting professionals.',
    ],
  },
  {
    id: 'campus-ambassador',
    title: 'Campus Ambassador',
    organization: organizations.fast,
    organizationContext: 'Event host',
    kind: 'Part-time',
    category: 'Cross-campus representation',
    icon: 'Flag',
    period: 'January 2025 – February 2025',
    duration: '2 months',
    location: { city: 'Karachi', region: 'Sindh', country: 'Pakistan' },
    description: 'Served as an official Brand Ambassador of Sukkur IBA University at a national-level event organized by FAST-NUCES Karachi.',
    emphasis: { label: 'Representing', value: 'Sukkur IBA University' },
    highlights: [],
  },
  {
    id: 'technical-events',
    title: 'Technical Events & Hackathons Coordinator',
    organization: organizations.computerScience,
    kind: 'Part-time',
    category: 'Technical community',
    icon: 'Network',
    period: 'September 2025 – May 2026',
    duration: '9 months',
    location: { city: 'Sukkur', region: 'Sindh', country: 'Pakistan' },
    mode: 'On-site',
    description: 'Organized and executed hackathons, e-sports competitions, and technical events for student communities.',
    highlights: [
      'Introduced ideas and process improvements to strengthen event structure and participation.',
      'Collaborated with team members to deliver engaging, well-managed experiences and contributed to increasing student involvement in technology-driven initiatives.',
    ],
  },
  {
    id: 'public-speaking',
    title: 'MUN & Public Speaking Programs Organizer',
    organization: organizations.pslc,
    kind: 'Part-time',
    category: 'Speaking & dialogue',
    icon: 'Mic2',
    period: 'August 2025 – May 2026',
    duration: '10 months',
    location: { city: 'Sukkur', region: 'Sindh', country: 'Pakistan' },
    mode: 'On-site',
    description: 'Organized a province-level Model United Nations event, managing planning and logistics in coordination with multiple institutions.',
    highlights: [
      'Led sponsorship outreach, engaging companies for partnerships and event support.',
      'Contributed to public speaking competitions and book club initiatives encouraging communication and critical thinking.',
    ],
  },
];
