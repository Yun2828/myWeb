"use client";

import { useEffect, useMemo, useState } from "react";
import { activities, certifications, education, events, experience, presentation, projects, research, roleFocuses, skills, type RoleFocus } from "@/data/portfolio";
import { FocusSelector } from "@/components/focus-selector";

const matches = (roles: RoleFocus[], focus: RoleFocus | null) => !focus || roles.includes(focus);
const ordered = <T extends { roles: RoleFocus[] }>(items: T[], focus: RoleFocus | null) => focus ? [...items].sort((a, b) => Number(!matches(a.roles, focus)) - Number(!matches(b.roles, focus))) : items;
function Arrow() { return <span aria-hidden="true" className="arrow">↗</span>; }
function Tags({ values }: { values: string[] }) { return values.length ? <div className="tag-row">{values.map((value) => <span key={value}>{value}</span>)}</div> : null; }
function Highlights({ values }: { values: string[] }) { return values.length ? <ul className="detail-list">{values.map((value) => <li key={value}>{value}</li>)}</ul> : null; }

export function FocusPortfolio() {
  const [focus, setFocus] = useState<RoleFocus | null>(null);
  useEffect(() => { const value = new URLSearchParams(window.location.search).get("focus") as RoleFocus | null; if (roleFocuses.some((item) => item.id === value)) setFocus(value); }, []);
  const visibleResearch = useMemo(() => ordered(research, focus), [focus]);
  const visibleExperience = useMemo(() => ordered(experience, focus), [focus]);
  const visibleProjects = useMemo(() => focus ? projects.filter((project) => matches(project.roles, focus)) : projects, [focus]);
  const visibleActivities = useMemo(() => ordered(activities, focus), [focus]);
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
  return <main>
    <header className="site-header shell"><a className="wordmark" href="#top" aria-label="Yun Waddy Oo home">YW<span>.</span></a><nav aria-label="Primary navigation"><a href="#research">Research</a><a href="#work">Work</a><a href="#contact">Contact</a></nav><a className="header-cta" href="#focus">Find a focus <Arrow /></a></header>
    <section id="top" className="hero shell"><div className="hero-copy"><p className="eyebrow">Computer science · Research · Building with intent</p><h1>Yun Waddy<br /><em>Oo.</em></h1><p className="hero-description">Computer Science student at Cal Poly working across AI/ML, information retrieval, and software engineering.</p><div className="hero-links"><a className="pill-button dark" href="#work">View projects <Arrow /></a><a className="text-link" href="#contact">Contact <Arrow /></a></div></div><div className="hero-meta"><span>Cal Poly · Class of May 2027</span><span>Research and engineering</span></div></section>
    <section id="research" className="section shell intro-section"><div className="section-label">01 / Research</div><div className="research-grid">{visibleResearch.map((item) => <article tabIndex={0} className={`research-card ${focus && matches(item.roles, focus) ? "is-relevant" : ""}`} key={item.project}><div className="research-overview"><span className="date">{item.dates}</span><h3>{item.project}</h3><p className="research-role">{item.role} · {item.institution}</p><p className="muted">{item.summary}</p><p className="advisor">Advisor · {item.advisor}</p><Tags values={item.tags} /><span className="research-hint">Hover or focus to explore</span></div><div className="research-details">{item.detailGroups.map((group) => <div className="research-detail-group" key={group.label}><h4>{group.label}</h4><ul className="detail-list">{group.items.map((value) => <li key={value}>{value}</li>)}</ul></div>)}</div></article>)}</div></section>
    <section className="section shell skills-section"><div className="section-label">02 / Skills</div><div className="skills-grid">{visibleSkills.map((group, index) => <article className={`skill-card ${index % 2 === 0 ? "reveal-from-lower" : "reveal-from-higher"} ${focus && matches(group.roles, focus) ? "is-relevant" : ""}`} tabIndex={0} key={group.name}><span className="skill-card-number">0{index + 1}</span><h3>{group.name}</h3><div className="skill-card-list">{group.values.map((value) => <span key={value}>{value}</span>)}</div><span className="skill-card-arrow" aria-hidden="true">↗</span></article>)}</div></section>
    <section className="section shell experience-section"><div className="section-label">03 / Work experience</div>{visibleExperience.map((item) => <article className={`experience-item ${focus && matches(item.roles, focus) ? "is-relevant" : ""}`} key={item.role}><div><span className="date">{item.dates}</span><h3>{item.role}</h3><p className="research-role">{item.organization}</p></div><div><p className="lead">{item.summary}</p><Highlights values={item.highlights} /><Tags values={item.tags} /></div></article>)}</section>
    <section id="work" className="section shell work-section" aria-live="polite"><div className="section-label">04 / Projects</div><FocusSelector active={focus} onChange={setFocus} /><div className="section-heading"><h2>Ideas, made <span>real.</span></h2><p>{focus ? "Showing projects related to your selected focus." : "Projects grouped by the kind of work they represent."}</p></div><div id="portfolio-results">{["AI, ML & Retrieval", "Software Engineering", "Open Source & Systems"].map((category) => { const categoryProjects = visibleProjects.filter((project) => project.category === category); return categoryProjects.length ? <div className="project-category" key={category}><h3>{category}</h3><div className="project-grid">{categoryProjects.map((project) => <article className="project-card is-relevant" key={project.title}><div className="project-content"><h3>{project.title}</h3>{project.status && <span className="status">{project.status}</span>}<p>{project.description}</p><Highlights values={project.highlights} /><Tags values={project.technologies} />{project.github && <a className="repository-link" href={project.github} aria-label={`View ${project.title} repository`} target="_blank" rel="noreferrer">View repository <Arrow /></a>}</div></article>)}</div></div> : null; })}</div></section>
    <section className="section shell activities-section"><div className="section-label">05 / Activities &amp; hackathons</div><div className="activity-layout"><h2>Keep learning.<br /><span>Keep showing up.</span></h2><div className="activity-list">{visibleActivities.map((item) => <div className={focus && matches(item.roles, focus) ? "is-relevant" : ""} key={item.event}><span>{item.event}</span><strong>{item.title || item.event}</strong>{item.description && <p>{item.description}</p>}</div>)}{events.map((event) => <div key={event}><span>Event</span><strong>{event}</strong><p>Professional development · Technical community</p></div>)}</div></div></section>
    <section className="section shell presentation-section"><div className="section-label">06 / Presentation</div><div className="presentation-card"><p className="date">{presentation.status}</p><h2>{presentation.title}</h2><p className="lead">{presentation.venue} · {presentation.location}</p><p className="muted">{presentation.authors.join(" · ")} · {presentation.manuscript}</p></div></section>
    <section className="section shell credentials-section"><div className="section-label">07 / Credentials</div><div className="credentials-grid"><div><h3>Certifications</h3>{certifications.map((item) => <article className="credential-item" key={item.title}><strong>{item.title}</strong><Tags values={item.topics} /></article>)}</div><div><h3>Education</h3><article className="education-card"><strong>{education.degree}</strong><p>{education.school}</p><p>{education.expectedGraduation} · GPA {education.gpa}</p><Tags values={education.affiliations} /></article></div></div></section>
    <footer id="contact" className="footer shell"><div className="section-label">08 / Contact</div><div className="footer-content"><h2>Let&apos;s connect.</h2><p className="lead">Yun Waddy Oo · Senior Computer Science student at Cal Poly.</p></div><div className="footer-bottom"><span>© 2026 Yun Waddy Oo</span><span>Resume and contact links coming soon</span></div></footer>
  </main>;
}
