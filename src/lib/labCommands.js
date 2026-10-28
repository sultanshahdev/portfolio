import { projects } from '../data/projects.js';
import { technicalExpertise } from '../data/skills.js';
import { profile } from '../data/profile.js';

export const consoleCommands = ['help', 'projects', 'skills', 'architecture', 'about', 'clear'];

// An exact whitelist, not a shell: no evaluation, interpolation, fetching or execution.
export function runLabCommand(input) {
  const command = input.trim().toLowerCase();
  switch (command) {
    case '': return { lines: [] };
    case 'clear': return { lines: [], clear: true };
    case 'help': return { lines: ['Available commands:', 'help          Show this guide', 'projects      List the four project studies', 'skills        Inspect the skills index', 'architecture  How this portfolio is built', 'about         Meet the engineer', 'clear         Clear this console'] };
    case 'projects': return { lines: projects.map(project => `${project.title} — ${project.subtitle}`) };
    case 'skills': return { lines: [`${technicalExpertise.length} categories / ${technicalExpertise.reduce((total, category) => total + category.skills.length, 0)} listed skills`, ...technicalExpertise.map(category => `${category.title} (${category.skills.length})`)] };
    case 'architecture': return { lines: ['React + Vite → static build → GitHub Pages', 'HashRouter resolves routes under /portfolio/.', 'Pages compose reusable components and local data.', 'Case-study documents and this workbench load on demand.', 'SVG + CSS draw the machines; native streams compute gzip.', 'No backend service is needed by this portfolio.'] };
    case 'about': return { lines: [profile.name, profile.biographySubtitle, ...profile.biography[0]] };
    default: return { lines: ['Unknown command. Type help to see the available commands.'] };
  }
}
