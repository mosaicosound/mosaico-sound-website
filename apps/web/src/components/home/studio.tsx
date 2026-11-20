import React, { useState } from 'react';
import { ArrowUpRight, AudioLines, Mail, Phone } from 'lucide-react';
import { useCookieBanner } from '@/hooks/use-cookie-banner';
import { openCookiePreferences } from '@/lib/cookie-consent';
import { siteCopy } from '@/copy';

export function Hero() {
	const c = siteCopy.hero;
	return (
		<section className="hero">
			<div className="eyebrow">{c.eyebrow}</div>
			<h1>{c.headline}</h1>
			<div className="hero-bottom">
				<p>{c.subheading}</p>
			</div>
		</section>
	);
}

export function Services() {
	const c = siteCopy.services;
		return (
			<section id="services" className="section">
				<div className="section-label">{c.label}</div>
			<h2>{c.heading}</h2>
			<div className="service-list">
				{c.list.map((item, i) => (
					<a href="#contact" className="service" key={String(item.title)}>
						<span className="mono">0{i + 1}</span>
						<div>
							<h3>{item.title}</h3>
							<p>{item.body}</p>
						</div>
						<span className="mono">{item.tag}</span>
						<ArrowUpRight />
					</a>
				))}
			</div>
		</section>
	);
}

export function Portfolio() {
	const c = siteCopy.portfolio;
	const [category, setCategory] = useState('All');

	const filtered = c.projects.filter(p => category === 'All' || p.category === category);
		return (
			<section className="section" id="work">
				<div className="chips">
				{c.categories.map(cat => (
					<button key={cat} aria-pressed={cat === category} onClick={() => setCategory(cat)}>{cat}</button>
				))}
			</div>
			{filtered.length === 0 ? (
				<div className="empty">
					<AudioLines size={40} />
					<h3>{c.emptyState.title}</h3>
					<p>{c.emptyState.body.split('\n').map((line, i) => (
						<React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>
					))}</p>
					<a href="#contact">{c.emptyState.ctaButton} <ArrowUpRight size={16}/></a>
				</div>
			) : (
				filtered.map(p => (
					<article className="audio-project" key={p.id}>
						<span className="mono">{p.category}</span>
						<h3>{p.title}</h3>
						<p>{p.body}</p>
						{p.audio && <audio controls preload="none" src={p.audio} />}
					</article>
				))
			)}
		</section>
	);
}

export function About() {
	const c = siteCopy.about;
		return (
			<section className="about section" id="about">
				<div className="section-label">{c.label}</div>
			<div>
				<h2>{c.heading}</h2>
    <p className="large-copy">{c.largeCopy}</p>
				<p>{c.body}</p>
				<a href="#contact">{c.ctaButton} <ArrowUpRight size={17}/></a>
			</div>
		</section>
	);
}


export function Contact() {
	const c = siteCopy.contact;
		return (
			<section className="section contact" id="contact">
				<div>
				<div className="section-label">{c.label}</div>
				<h2>{c.heading}</h2>
				<p>{c.subheading}</p>
				<span className="mono">{c.sublabel}</span>
				<p className="muted">{c.note}</p>
			</div>
			<div className="contact-info">
				<div className="contact-item">
					<Mail size={20} />
					<div>
						<h4>{c.email.label}</h4>
      <a href={`mailto:${c.email.address}`}>{c.email.address}</a>
					</div>
				</div>
				<div className="contact-item">
					<Phone size={20} />
					<div>
						<h4>{c.phone.label}</h4>
						<a href={`tel:${c.phone.number.replace(/[^+0-9]/g, '')}`}>{c.phone.number}</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export function Newsletter() {
	const c = siteCopy.newsletter;
		return (
			<section className="newsletter">
				<div>
				<h3>{c.heading}</h3>
				<p>{c.subheading}</p>
			</div>
			<div className="newsletter-info">
				<p>{c.info}</p>
	 <a href={`mailto:${c.email}`}><Mail size={16}/> {c.email}</a>
			</div>
		</section>
	);
}

export function Footer() {
	const c = siteCopy.footer;
	return (
		<footer>
   <a className="brand" href="/"><em>{c.brand}</em><span>®</span></a>
			<span className="mono">{c.tagline}</span>
			<button onClick={openCookiePreferences}>{c.cookieButton}</button>
			<span>{c.copyright}</span>
		</footer>
	);
}

export function Cookies() {
	const b = useCookieBanner();
	const c = siteCopy.cookies;
	if (!b.isOpen) return null;
	return (
		<section className="cookies" role="dialog" aria-label="Cookie preferences">
			<h3>{c.heading}</h3>
			<p>{c.body}</p>
			{b.isCustomizing && (
				<div>
					{(['analytics', 'marketing', 'platformAnalytics'] as const).map((key, i) => (
						<label key={key}>
							<input type="checkbox" checked={b.choices[key]} onChange={e => b.setChoice(key, e.target.checked)} />
							{c.labels[i]}
						</label>
					))}
				</div>
			)}
			<div className="chips">
				<button onClick={b.rejectOptional}>{c.reject}</button>
				<button onClick={b.acceptAll}>{c.accept}</button>
				<button onClick={b.isCustomizing ? b.saveChoices : b.customize}>
					{b.isCustomizing ? c.save : c.customize}
				</button>
			</div>
		</section>
	);
}

