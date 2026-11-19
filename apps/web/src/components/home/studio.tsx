import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, AudioLines, Play, Pause, Mail, Phone } from 'lucide-react';
import { useCookieBanner } from '@/hooks/use-cookie-banner';
import { openCookiePreferences } from '@/lib/cookie-consent';
import { siteCopy } from '@/copy';

// DAW session sketch — hand-drawn audio track lanes in playback mode
export function SonicScene() {
	const host = useRef<HTMLDivElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const reducedMotion = useRef(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		let frame: number;

		const resize = () => {
			const parent = canvas.parentElement;
			if (parent) {
				canvas.width = parent.clientWidth * window.devicePixelRatio;
				canvas.height = parent.clientHeight * window.devicePixelRatio;
				ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
			}
		};
		const observer = new ResizeObserver(resize);
		observer.observe(canvas.parentElement!);
		resize();

		// Typewriter sync: match the 12s CSS typewriter animation — smooth ease-out progress
		const typewriterCycle = (time: number) => {
			const cycle = 12000;
			const t = (time % cycle) / cycle;
			// Smooth ease-out during typing (0-80%), hold (80-92%), reset (92-100%)
			if (t < 0.80) {
				const raw = t / 0.80;
				// Ease-out curve: starts fast, slows down — matches CSS ease-out
				return 1 - Math.pow(1 - raw, 3);
			} else if (t < 0.92) {
				return 1; // hold at end
			} else {
				return 0; // reset for next cycle
			}
		};

		// Pastel palette matching the site
		const pastelColors = [
			{ r: 201, g: 160, b: 220 }, // purple
			{ r: 136, g: 170, b: 255 }, // blue
			{ r: 136, g: 255, b: 170 }, // green
			{ r: 255, g: 204, b: 136 }, // amber
			{ r: 255, g: 136, b: 170 }, // pink
		];

		// Seeded random for consistent waveforms
		const seededRandom = (seed: number) => {
			const x = Math.sin(seed) * 10000;
			return x - Math.floor(x);
		};

		// DAW session sketch — ultra-subtle, consistent with scratch-off aesthetic
		const drawDAWSketch = (ctx: CanvasRenderingContext2D, w: number, h: number, time: number, progress: number) => {
			ctx.clearRect(0, 0, w, h);

			const trackCount = 3;
			const trackH = h / trackCount;
			const padding = 30;

			// Playhead follows typewriter progress — linear left-to-right
			const playheadX = padding + progress * (w - padding * 2);
			const headIntensity = progress;

			// --- 3 subtle waveform tracks ---
			for (let track = 0; track < trackCount; track++) {
				const trackY = track * trackH;
				const trackCenterY = trackY + trackH / 2;
				const color = pastelColors[track % pastelColors.length];
				const seed = track * 1000 + 42;

				// Draw a single thin waveform line per track
				const baseAlpha = 0.04 + headIntensity * 0.06;
				ctx.strokeStyle = `rgba(${color.r},${color.g},${color.b},${baseAlpha})`;
				ctx.lineWidth = 0.5;
				ctx.beginPath();

				for (let i = 0; i < w - padding * 2; i += 3) {
					const x = padding + i;
					const normalizedX = i / (w - padding * 2);

					// Simple, organic waveform
					const wave = Math.sin(normalizedX * Math.PI * (4 + track * 2) + seed * 0.01) * 0.3
						+ Math.sin(normalizedX * Math.PI * (7 + track) + seed * 0.03) * 0.2
						+ seededRandom(seed + i) * 0.15;

					// Envelope — fade at edges
					const envelope = Math.sin(normalizedX * Math.PI);
					const amplitude = wave * envelope * (trackH * 0.3);

					const y = trackCenterY + amplitude;
					if (i === 0) ctx.moveTo(x, y);
					else ctx.lineTo(x, y);
				}
				ctx.stroke();
			}

			// --- Playhead — thin line, subtle glow ---
			if (headIntensity > 0.1) {
				// Very subtle glow
				const glowWidth = 40;
				const gradient = ctx.createLinearGradient(
					playheadX - glowWidth, 0,
					playheadX, 0,
					playheadX + glowWidth, 0
				);
				gradient.addColorStop(0, `rgba(255,255,255,0)`);
				gradient.addColorStop(0.5, `rgba(255,255,255,${headIntensity * 0.04})`);
				gradient.addColorStop(1, `rgba(255,255,255,0)`);
				ctx.fillStyle = gradient;
				ctx.fillRect(playheadX - glowWidth, 0, glowWidth * 2, h);

				// Thin playhead line
				ctx.strokeStyle = `rgba(255,255,255,${headIntensity * 0.25})`;
				ctx.lineWidth = 0.5;
				ctx.beginPath();
				ctx.moveTo(playheadX, 0);
				ctx.lineTo(playheadX, h);
				ctx.stroke();
			}
		};

		const draw = (t: number) => {
			const w = canvas.width / window.devicePixelRatio;
			const h = canvas.height / window.devicePixelRatio;
			const progress = typewriterCycle(t);

			if (!reducedMotion.current) {
				drawDAWSketch(ctx, w, h, t, progress);
			}

			frame = requestAnimationFrame(draw);
		};

		frame = requestAnimationFrame(draw);

		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
		};
	}, []);

	return (
		<div className="sonic-scene" ref={host} aria-hidden="true">
			<canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
		</div>
	);
}

export function Hero() {
	const c = siteCopy.hero;
	return (
		<section className="hero">
			<SonicScene />
			<div className="eyebrow">{c.eyebrow}</div>
			<h1>{c.headline}<br/><em>{c.headlineEmphasis}</em></h1>
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

export function SignalDemo() {
	const [active, setActive] = useState(false);
	const sound = useRef<AudioContext | null>(null);
	const c = siteCopy.signal;
	function toggle() {
		if (sound.current) {
			void sound.current.close();
			sound.current = null;
			setActive(false);
			return;
		}
		const context = new AudioContext();
		const oscillator = context.createOscillator();
		const gain = context.createGain();
		oscillator.type = 'sine';
		oscillator.frequency.value = 110;
		gain.gain.value = .035;
		oscillator.connect(gain);
		gain.connect(context.destination);
		oscillator.start();
		sound.current = context;
		setActive(true);
	}
	useEffect(() => () => { void sound.current?.close(); }, []);
	return (
		<button className="signal-button" onClick={toggle}>
			{active ? <Pause size={14} /> : <Play size={14} />}
			{active ? c.mute : c.play}
			<span>{c.note}</span>
		</button>
	);
}
