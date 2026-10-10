import { profile } from '../../data/profile.js';
import TextLink from '../ui/TextLink.jsx';

export default function About() {
  return profile.biography.map((paragraph, index) => (
    <p key={index}>
      {paragraph.map((part, partIndex) => typeof part === 'string'
        ? part
        : <TextLink key={partIndex} href={part.href} target="_blank" rel="noopener noreferrer">{part.text}</TextLink>)}
    </p>
  ));
}
