"use client";

import { useEffect, useMemo, useState } from "react";
import { activities, certifications, contactEmail, education, events, experience, githubRepositoriesUrl, linkedinUrl, presentation, projects, research, roleFocuses, skills, type Activity, type RoleFocus } from "@/data/portfolio";
import { FocusSelector } from "@/components/focus-selector";

const matches = (roles: RoleFocus[], focus: RoleFocus | null) => !focus || roles.includes(focus) || (focus === "ai-ml" && roles.includes("retrieval-research"));
const ordered = <T extends { roles: RoleFocus[] }>(items: T[], focus: RoleFocus | null) => focus ? [...items].sort((a, b) => Number(!matches(a.roles, focus)) - Number(!matches(b.roles, focus))) : items;
function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }
function Tags({ values }: { values: string[] }) { return values.length ? <div className="tag-row">{values.map((value) => <span key={value}>{value}</span>)}</div> : null; }
function Highlights({ values }: { values: string[] }) { return values.length ? <ul className="detail-list">{values.map((value) => <li key={value}>{value}</li>)}</ul> : null; }
function ActivityMedia({ item }: { item: Activity }) {
  const sources = item.images?.length ? item.images : item.image ? [item.image] : [];
  if (sources.length > 1) {
    return <div className={`activity-photo-collage ${item.event === "AWS AI Summer Camp" ? "aws-photo-collage" : "standard-photo-collage"}`} aria-label={`${item.event} photo gallery`}>{sources.map((source, index) => <div className="activity-photo-card" key={source}><img src={source} alt={`${item.imageAlt ?? item.event} ${index + 1}`} /></div>)}</div>;
  }
  if (sources[0]) {
    // Event images may be supplied later as local or externally hosted assets.
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="activity-feature-image" src={sources[0]} alt={item.imageAlt ?? item.event} />;
  }
  return <div className="activity-feature-placeholder" aria-label={`${item.event} image placeholder`}><span>{item.event}</span><small>Photo coming soon</small></div>;
}
function ActivityLinks({ item }: { item: Activity }) { return item.github || item.devpost ? <div className="activity-links">{item.github && <a href={item.github} target="_blank" rel="noreferrer" aria-label={`View ${item.event} GitHub repository`}>GitHub <Arrow /></a>}{item.devpost && <a href={item.devpost} target="_blank" rel="noreferrer" aria-label={`View ${item.event} Devpost project`}>Devpost <Arrow /></a>}</div> : null; }
function ActivityFeature({ item, index }: { item: Activity; index: number }) { const hasMedia = Boolean(item.image || item.images?.length); return <article className={`activity-feature-row ${hasMedia ? (index % 2 === 0 ? "media-left" : "media-right") : "no-media"}`}>{hasMedia && <div className="activity-feature-media"><ActivityMedia item={item} /></div>}<div className="activity-feature-copy"><div className="activity-feature-heading">{item.date && <span className="date">{item.date}</span>}<p className="activity-feature-event">{item.event}</p><h3>{item.title ?? item.event}</h3>{!hasMedia && <ActivityLinks item={item} />}</div><div className="activity-feature-details">{item.description ? <p className="activity-feature-description">{item.description}</p> : <p className="activity-placeholder-copy">Details coming soon.</p>}<Highlights values={item.highlights} />{item.reflection && <p className="activity-feature-reflection">{item.reflection}</p>}<Tags values={item.technologies} />{hasMedia && <ActivityLinks item={item} />}</div></div></article>; }

export function FocusPortfolio() {
  const [focus, setFocus] = useState<RoleFocus | null>(null);
  useEffect(() => { const value = new URLSearchParams(window.location.search).get("focus") as RoleFocus | null; if (roleFocuses.some((item) => item.id === value)) setFocus(value); }, []);
  const visibleResearch = useMemo(() => ordered(research, focus), [focus]);
  const visibleExperience = useMemo(() => ordered(experience, focus), [focus]);
  const visibleProjects = useMemo(() => focus ? projects.filter((project) => matches(project.roles, focus)) : projects, [focus]);
  const visibleActivities = useMemo(() => ordered(activities, focus), [focus]);
  const visibleEvents = useMemo(() => ordered(events, focus), [focus]);
  const visibleSkills = useMemo(() => ordered(skills, focus), [focus]);
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".skill-card"));
    cards.forEach((card) => card.classList.add("reveal-ready"));
    if (!("IntersectionObserver" in window)) {
      cards.forEach((card) => card.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [visibleSkills.length]);
  useEffect(() => {
    const rows = Array.from(document.querySelectorAll<HTMLElement>(".activity-feature-row"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      rows.forEach((row) => row.classList.add("is-visible"));
      return;
    }
    if (!("IntersectionObserver" in window)) {
      rows.forEach((row) => row.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18, rootMargin: "0px 0px -10% 0px" });
    rows.forEach((row) => observer.observe(row));
    return () => observer.disconnect();
  }, [visibleActivities.length, visibleEvents.length]);
  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>(".scroll-reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [visibleExperience.length, visibleProjects.length]);
  const projectGroups = focus
    ? [{ key: focus, label: roleFocuses.find((role) => role.id === focus)?.label ?? "Projects", items: visibleProjects }]
    : ["AI / Machine Learning", "Software Engineering"].map((category) => ({ key: category, label: category, items: visibleProjects.filter((project) => project.category === category) }));
  return <main>
    <header className="site-header shell"><a className="wordmark" href="#top" aria-label="Yun Waddy Oo home">YWO</a><nav aria-label="Primary navigation"><a href="#research">Research</a><a href="#work">Work</a><a href="#contact">Contact</a></nav></header>
    <section id="top" className="hero shell"><div className="hero-copy"><p className="eyebrow">Computer Science · Cal Poly</p><h1>Yun Waddy Oo</h1><p className="hero-description">I&apos;m a fourth-year CS student interested in AI/ML, retrieval systems, and software engineering.</p><div className="hero-links"><a className="pill-button dark" href="#work">View Projects</a><a className="text-link" href={`mailto:${contactEmail}`}>Contact</a></div></div></section>
    <section id="research" className="section shell intro-section"><div className="section-label">01 / Research</div><div className="research-grid">{visibleResearch.map((item) => <article tabIndex={0} className={`research-card ${focus && matches(item.roles, focus) ? "is-relevant" : ""}`} key={item.project}><div className="research-card-inner"><div className="research-card-face research-card-front"><span className="date">{item.dates}</span><h3>{item.project}</h3><p className="research-role">{item.role} · {item.institution}</p><p className="research-summary">{item.summary}</p><p className="advisor">Advisor · {item.advisor}</p><Tags values={item.tags} /><span className="research-hint">Scroll into view to explore</span></div><div className="research-card-face research-card-back"><div className="research-detail-groups">{item.detailGroups.map((group) => <div className="research-detail-group" key={group.label}><h4>{group.label}</h4><ul className="detail-list">{group.items.map((value) => <li key={value}>{value}</li>)}</ul></div>)}</div></div></div></article>)}</div></section>
    <section className="section shell skills-section"><div className="section-label">02 / Skills</div><h2 className="skills-title">Skills</h2><div className="skills-grid">{visibleSkills.map((group, index) => <article className={`skill-card ${index % 2 === 0 ? "reveal-from-lower" : "reveal-from-higher"} ${focus && matches(group.roles, focus) ? "is-relevant" : ""}`} tabIndex={0} key={group.name}><span className="skill-card-number">0{index + 1}</span><h3>{group.name}</h3><div className="skill-card-list">{group.values.map((value) => <span key={value}>{value}</span>)}</div><span className="skill-card-arrow" aria-hidden="true">↗</span></article>)}</div></section>
    <section className="section shell experience-section"><div className="section-label">03 / Work experience</div>{visibleExperience.map((item) => <article className={`experience-item scroll-reveal ${focus && matches(item.roles, focus) ? "is-relevant" : ""}`} key={item.role}><div><span className="date">{item.dates}</span><h3>{item.role}</h3><p className="research-role">{item.organization}</p><Tags values={item.tags} /></div><div><p className="lead">{item.summary}</p><Highlights values={item.highlights} /></div></article>)}</section>
    <section id="work" className="section shell work-section" aria-live="polite"><div className="section-label">04 / Projects</div><FocusSelector active={focus} onChange={setFocus} /><div id="portfolio-results">{projectGroups.map(({ key, label, items }) => items.length ? <div className="project-category" key={key}><h3>{label}</h3><div className="project-grid">{items.map((project) => <article className={`project-card scroll-reveal ${focus && matches(project.roles, focus) ? "is-relevant" : ""}`} key={project.title}><div className="project-content"><h3>{project.title}</h3>{project.status && <span className="status">{project.status}</span>}<p>{project.description}</p><Highlights values={project.highlights} /><Tags values={project.technologies} />{project.github ? <a className="repository-link" href={project.github} aria-label={`View ${project.title} repository`} target="_blank" rel="noreferrer">View repository <Arrow /></a> : <span className="repository-placeholder">Repository link coming soon</span>}</div></article>)}</div></div> : null)}</div></section>
    <section className="section shell activities-section"><div className="activity-group"><h3 className="activity-group-title">Hackathons &amp; Programs</h3><div className="activity-feature-list">{visibleActivities.map((item, index) => <ActivityFeature item={item} index={index} key={item.event} />)}</div></div><div className="activity-group"><h3 className="activity-group-title">Conferences &amp; Events</h3><div className="activity-feature-list">{visibleEvents.map((item, index) => <ActivityFeature item={item} index={index} key={item.event} />)}</div></div></section>
    <section className="section shell presentation-section"><div className="section-label">06 / Presentation</div><div className="presentation-card"><p className="date">{presentation.status}</p><h2>{presentation.title}</h2><p className="lead">{presentation.venue} · {presentation.location}</p><p className="muted">{presentation.authors.join(" · ")} · {presentation.manuscript}</p></div></section>
    <section className="section shell credentials-section"><div className="section-label">07 / Credentials</div><div className="credentials-grid"><div><h3>Certifications</h3>{certifications.map((item) => <article className="credential-item" key={item.title}><strong>{item.title}</strong><Tags values={item.topics} /></article>)}</div><div><h3>Education</h3><article className="education-card"><strong>{education.degree}</strong><p>{education.school}</p><p>{education.expectedGraduation} · GPA {education.gpa}</p><Tags values={education.affiliations} /></article></div></div></section>
    <footer id="contact" className="footer shell"><div className="footer-content"><h2>Let&apos;s connect.</h2><div className="social-links" aria-label="Social links"><a className="social-link" href={linkedinUrl} target="_blank" rel="noreferrer" aria-label="Open LinkedIn profile"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5.1 8.2H1.4V22h3.7V8.2ZM3.2 2A2.2 2.2 0 1 0 3.2 6.4 2.2 2.2 0 0 0 3.2 2ZM8 8.2V22h3.7v-6.8c0-1.8.3-3.6 2.6-3.6 2.2 0 2.2 2.1 2.2 3.7V22H20v-7.4c0-3.6-.8-6.4-5-6.4-2 0-3.3 1.1-3.8 2.1h-.1V8.2H8Z" /></svg><span>LinkedIn</span></a><a className="social-link" href={`mailto:${contactEmail}`} aria-label="Send an email"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.5 5.5h19v13h-19v-13Zm1.8 1.8v.3l7.7 5.7 7.7-5.7v-.3H4.3Zm15.4 9.4V9.9L12 15.2 4.3 9.9v6.8h15.4Z" /></svg><span>Email</span></a><a className="social-link" href={githubRepositoriesUrl} target="_blank" rel="noreferrer" aria-label="Open GitHub repositories"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5a10.5 10.5 0 0 0-3.3 20.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.7-1.3-2.3-.3-4.8-1.1-4.8-5.1 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c2-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 4-2.5 4.8-4.8 5.1.4.3.7 1 .7 1.9v2.7c0 .3.2.6.7.5A10.5 10.5 0 0 0 12 1.5Z" /></svg><span>GitHub</span></a></div></div></footer>
  </main>;
}
