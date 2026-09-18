"use client";

import { useEffect, useMemo, useState } from "react";
import { activities, certifications, contactEmail, education, events, experience, presentation, projects, research, roleFocuses, skills, type Activity, type RoleFocus } from "@/data/portfolio";
import { FocusSelector } from "@/components/focus-selector";

const matches = (roles: RoleFocus[], focus: RoleFocus | null) => !focus || roles.includes(focus) || (focus === "ai-ml" && roles.includes("retrieval-research"));
const ordered = <T extends { roles: RoleFocus[] }>(items: T[], focus: RoleFocus | null) => focus ? [...items].sort((a, b) => Number(!matches(a.roles, focus)) - Number(!matches(b.roles, focus))) : items;
function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }
function Tags({ values }: { values: string[] }) { return values.length ? <div className="tag-row">{values.map((value) => <span key={value}>{value}</span>)}</div> : null; }
function Highlights({ values }: { values: string[] }) { return values.length ? <ul className="detail-list">{values.map((value) => <li key={value}>{value}</li>)}</ul> : null; }
function ActivityMedia({ item }: { item: Activity }) {
  const source = item.image ?? item.images?.[0];
  if (source) {
    // Event images may be supplied later as local or externally hosted assets.
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="activity-feature-image" src={source} alt={item.imageAlt ?? item.event} />;
  }
  return <div className="activity-feature-placeholder" aria-label={`${item.event} image placeholder`}><span>{item.event}</span><small>Photo coming soon</small></div>;
}
function ActivityLinks({ item }: { item: Activity }) { return item.github || item.devpost ? <div className="activity-links">{item.github && <a href={item.github} target="_blank" rel="noreferrer" aria-label={`View ${item.event} GitHub repository`}>GitHub <Arrow /></a>}{item.devpost && <a href={item.devpost} target="_blank" rel="noreferrer" aria-label={`View ${item.event} Devpost project`}>Devpost <Arrow /></a>}</div> : null; }
function ActivityFeature({ item, index }: { item: Activity; index: number }) { return <article className={`activity-feature-row ${index % 2 === 0 ? "media-left" : "media-right"}`}><div className="activity-feature-media"><ActivityMedia item={item} /></div><div className="activity-feature-copy">{item.date && <span className="date">{item.date}</span>}<p className="activity-feature-event">{item.event}</p><h3>{item.title ?? item.event}</h3>{item.description ? <p className="activity-feature-description">{item.description}</p> : <p className="activity-placeholder-copy">Details coming soon.</p>}<Highlights values={item.highlights} />{item.reflection && <p className="activity-feature-reflection">{item.reflection}</p>}<Tags values={item.technologies} /><ActivityLinks item={item} /></div></article>; }

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
  return <main>
    <header className="site-header shell"><a className="wordmark" href="#top" aria-label="Yun Waddy Oo home">YWO</a><nav aria-label="Primary navigation"><a href="#research">Research</a><a href="#work">Work</a><a href="#contact">Contact</a></nav></header>
    <section id="top" className="hero shell"><div className="hero-copy"><p className="eyebrow">Computer Science · Cal Poly</p><h1>Yun Waddy Oo</h1><p className="hero-description">I&apos;m a fourth-year CS student interested in AI/ML, retrieval systems, and software engineering.</p><div className="hero-links"><a className="pill-button dark" href="#work">View Projects</a><a className="text-link" href={`mailto:${contactEmail}`}>Contact</a></div></div></section>
    <section id="research" className="section shell intro-section"><div className="section-label">01 / Research</div><div className="research-grid">{visibleResearch.map((item) => <article tabIndex={0} className={`research-card ${focus && matches(item.roles, focus) ? "is-relevant" : ""}`} key={item.project}><div className="research-card-inner"><div className="research-card-face research-card-front"><span className="date">{item.dates}</span><h3>{item.project}</h3><p className="research-role">{item.role} · {item.institution}</p><p className="research-summary">{item.summary}</p><p className="advisor">Advisor · {item.advisor}</p><Tags values={item.tags} /><span className="research-hint">Scroll into view to explore</span></div><div className="research-card-face research-card-back"><div className="research-detail-groups">{item.detailGroups.map((group) => <div className="research-detail-group" key={group.label}><h4>{group.label}</h4><ul className="detail-list">{group.items.map((value) => <li key={value}>{value}</li>)}</ul></div>)}</div></div></div></article>)}</div></section>
    <section className="section shell skills-section"><div className="section-label">02 / Skills</div><h2 className="skills-title">Skills</h2><div className="skills-grid">{visibleSkills.map((group, index) => <article className={`skill-card ${index % 2 === 0 ? "reveal-from-lower" : "reveal-from-higher"} ${focus && matches(group.roles, focus) ? "is-relevant" : ""}`} tabIndex={0} key={group.name}><span className="skill-card-number">0{index + 1}</span><h3>{group.name}</h3><div className="skill-card-list">{group.values.map((value) => <span key={value}>{value}</span>)}</div><span className="skill-card-arrow" aria-hidden="true">↗</span></article>)}</div></section>
    <section className="section shell experience-section"><div className="section-label">03 / Work experience</div>{visibleExperience.map((item) => <article className={`experience-item ${focus && matches(item.roles, focus) ? "is-relevant" : ""}`} key={item.role}><div><span className="date">{item.dates}</span><h3>{item.role}</h3><p className="research-role">{item.organization}</p></div><div><p className="lead">{item.summary}</p><Highlights values={item.highlights} /><Tags values={item.tags} /></div></article>)}</section>
    <section id="work" className="section shell work-section" aria-live="polite"><div className="section-label">04 / Projects</div><FocusSelector active={focus} onChange={setFocus} /><div id="portfolio-results">{["AI / Machine Learning", "Software Engineering"].map((category) => { const categoryProjects = visibleProjects.filter((project) => project.category === category); return categoryProjects.length ? <div className="project-category" key={category}><h3>{category}</h3><div className="project-grid">{categoryProjects.map((project) => <article className={`project-card ${focus && matches(project.roles, focus) ? "is-relevant" : ""}`} key={project.title}><div className="project-content"><h3>{project.title}</h3>{project.status && <span className="status">{project.status}</span>}<p>{project.description}</p><Highlights values={project.highlights} /><Tags values={project.technologies} />{project.github ? <a className="repository-link" href={project.github} aria-label={`View ${project.title} repository`} target="_blank" rel="noreferrer">View repository <Arrow /></a> : <span className="repository-placeholder">Repository link coming soon</span>}</div></article>)}</div></div> : null; })}</div></section>
    <section className="section shell activities-section"><div className="section-label">05 / Activities &amp; professional development</div><div className="activity-intro"><h2>Keep learning.<br /><span>Keep showing up.</span></h2><p>Technical events, programs, and collaborative work that continue shaping how I build.</p></div><div className="activity-group"><h3 className="activity-group-title">Hackathons &amp; Programs</h3><div className="activity-feature-list">{visibleActivities.map((item, index) => <ActivityFeature item={item} index={index} key={item.event} />)}</div></div><div className="activity-group"><h3 className="activity-group-title">Conferences &amp; Events</h3><div className="activity-feature-list">{visibleEvents.map((item, index) => <ActivityFeature item={item} index={index} key={item.event} />)}</div></div></section>
    <section className="section shell presentation-section"><div className="section-label">06 / Presentation</div><div className="presentation-card"><p className="date">{presentation.status}</p><h2>{presentation.title}</h2><p className="lead">{presentation.venue} · {presentation.location}</p><p className="muted">{presentation.authors.join(" · ")} · {presentation.manuscript}</p></div></section>
    <section className="section shell credentials-section"><div className="section-label">07 / Credentials</div><div className="credentials-grid"><div><h3>Certifications</h3>{certifications.map((item) => <article className="credential-item" key={item.title}><strong>{item.title}</strong><Tags values={item.topics} /></article>)}</div><div><h3>Education</h3><article className="education-card"><strong>{education.degree}</strong><p>{education.school}</p><p>{education.expectedGraduation} · GPA {education.gpa}</p><Tags values={education.affiliations} /></article></div></div></section>
    <footer id="contact" className="footer shell"><div className="section-label">08 / Contact</div><div className="footer-content"><h2>Let&apos;s connect.</h2><p className="lead">Yun Waddy Oo · Senior Computer Science student at Cal Poly.</p><a className="text-link footer-email" href={`mailto:${contactEmail}`}>{contactEmail}</a></div><div className="footer-bottom"><span>© 2026 Yun Waddy Oo</span><span><a href={`mailto:${contactEmail}`}>{contactEmail}</a></span></div></footer>
  </main>;
}
