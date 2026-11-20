import React, { useState } from 'react';
import { ArrowUpRight, AudioLines, Mail } from 'lucide-react';
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
 				<a href="#hello">{c.emptyState.ctaButton} <ArrowUpRight size={16}/></a>
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



export function Partners() {
	const c = siteCopy.partners;
	return (
		<section className="section partners" id="partners">
			<h2>{c.heading}</h2>
			<div className="partners-grid">
				{c.logos.map((name, i) => (
					<div className="partner-logo" key={i}>
						<span className="mono">{name}</span>
					</div>
				))}
		</div>
	</section>
	);
}

export function Hello() {
	const c = siteCopy.hello;
	return (
		<section className="section hello" id="hello">
			<h2>{c.heading}</h2>
			<p>{c.subheading}</p>
			<a className="hello-email" href={`mailto:${c.emailLink}`}>
				<Mail size={18} />
				<span>{c.emailLabel}</span>
				<ArrowUpRight size={16} />
			</a>
	</section>
	);
}

export function Footer() {
	const c = siteCopy.footer;
	return (
		<footer>
			<div className="footer-top">
				<a className="brand" href="/"><em>{c.brand}</em><span>®</span></a>
				<a href={`mailto:${c.email}`}><Mail size={14}/> {c.email}</a>
			</div>
			<div className="footer-bottom">
				<span className="mono">{c.tagline}</span>
				<button onClick={openCookiePreferences}>{c.cookieButton}</button>
				<span>{c.copyright}</span>
			</div>
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

