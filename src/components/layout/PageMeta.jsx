import { useEffect } from 'react';
import { profile } from '../../data/profile.js';

export default function PageMeta({ title, description = profile.description, article = false, noIndex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${profile.name}` : `${profile.name} — ${profile.title}`;
    document.title = fullTitle;
    document.querySelector('meta[name="description"]').content = description;
    document.querySelector('meta[property="og:title"]').content = fullTitle;
    document.querySelector('meta[property="og:description"]').content = description;
    document.querySelector('meta[property="og:type"]').content = article ? 'article' : 'website';
    const robots = document.createElement('meta');
    robots.name = 'robots';
    robots.content = noIndex ? 'noindex, follow' : 'index, follow';
    document.head.append(robots);
    return () => robots.remove();
  }, [title, description, article, noIndex]);
  return null;
}
