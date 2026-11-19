import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowUpRight, ArrowDown, AudioLines, Play, Pause, Mail, Phone } from 'lucide-react';
import { useCookieBanner } from '@/hooks/use-cookie-banner';
import { openCookiePreferences } from '@/lib/cookie-consent';

// Static portfolio data - edit these to add your projects
const PORTFOLIO_PROJECTS = [
	{
		id: '1',
		title: 'Brand Campaign Audio',
		body: 'Complete sound design and mixing for a national advertising campaign.',
		category: 'Advertising',
		audio: null,
	},
	{
		id: '2',
		title: 'Short Film Score',
		body: 'Original score and dialogue editing for an award-winning short film.',
		category: 'Film',
		audio: null,
	},
	{
		id: '3',
		title: 'Mobile Game Sound',
		body: 'Interactive audio system and sound effects for a mobile puzzle game.',
		category: 'Games',
		audio: null,
	},
];

// Static journal articles - edit these to add your posts
const JOURNAL_ARTICLES = [
	{
		id: '1',
		title: 'The Art of Dialogue Editing',
		body: 'Dialogue editing is often invisible when done well. It\'s about preserving the performance while removing the distractions — room tone, mouth noise, plosives — without making the voice sound artificial.',
	},
	{
		id: '2',
		title: 'Sound Design for Interactive Media',
		body: 'Game sound design requires a different mindset than linear media. Every sound must respond to player input while maintaining atmosphere and clarity.',
	},
];

export function SonicScene() {
	const host = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const el = host.current;
		if (!el) return;
		let renderer: THREE.WebGLRenderer;
		try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }); } catch { return; }
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
		el.appendChild(renderer.domElement);
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
		camera.position.z = 8;
		const group = new THREE.Group();
		scene.add(group);
		const materials: THREE.Material[] = [];
		for (let i = 0; i < 64; i++) {
			const h = .3 + 2.5 * Math.pow(Math.sin(i * .19), 2) * Math.sin((i / 64) * Math.PI);
			const hue = (i / 64) * 0.8 + 0.1;
			const color = new THREE.Color().setHSL(hue % 1, 0.35, 0.75);
			const mat = new THREE.MeshStandardMaterial({ color, metalness: .9, roughness: .15 });
			materials.push(mat);
			const mesh = new THREE.Mesh(new THREE.CylinderGeometry(.018, .018, h, 8), mat);
			mesh.position.x = (i - 32) * .075;
			group.add(mesh);
		}
		group.rotation.z = -.28;
		group.rotation.y = .45;
		scene.add(new THREE.AmbientLight(0xffffff, 2));
		const light = new THREE.PointLight(0xff88aa, 70);
		light.position.set(2, 2, 3);
		scene.add(light);
		const light2 = new THREE.PointLight(0x88aaff, 50);
		light2.position.set(-2, -1, 2);
		scene.add(light2);
		const light3 = new THREE.PointLight(0x88ffaa, 40);
		light3.position.set(0, 3, -2);
		scene.add(light3);
		const resize = () => {
			renderer.setSize(el.clientWidth, el.clientHeight);
			camera.aspect = el.clientWidth / el.clientHeight;
			camera.updateProjectionMatrix();
		};
		const observer = new ResizeObserver(resize);
		observer.observe(el);
		resize();
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let frame = 0;
		const draw = (t: number) => {
			if (!reduced) group.rotation.y = .45 + Math.sin(t * .0003) * .3;
			renderer.render(scene, camera);
			frame = requestAnimationFrame(draw);
		};
		frame = requestAnimationFrame(draw);
		return () => {
			cancelAnimationFrame(frame);
			observer.disconnect();
			group.children.forEach(obj => { (obj as THREE.Mesh).geometry.dispose(); });
			materials.forEach(m => m.dispose());
			renderer.dispose();
			renderer.domElement.remove();
		};
	}, []);
	return <div className="sonic-scene" ref={host} aria-hidden="true" />;
}

// Sequential animation controller for the "feel" word
// Easy to tweak: add, remove, reorder effects or change durations
const FEEL_EFFECTS = [
	{ name: 'shiver', duration: 2000 },
	{ name: 'explode', duration: 2200 },
	{ name: 'font', duration: 2000 },
	{ name: 'typewriter', duration: 2000 },
];

function useFeelSequencer(ref: React.RefObject<HTMLElement | null>) {
	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		// Respect reduced motion preference
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (reduced) return;

		let index = 0;

		function applyNextEffect() {
			// Clear all effect classes
			el.classList.remove('feel-shiver', 'feel-explode', 'feel-font', 'feel-typewriter', 'done');

			const effect = FEEL_EFFECTS[index];
			el.classList.add(`feel-${effect.name}`);

			// Move to next effect for the next call
			index = (index + 1) % FEEL_EFFECTS.length;

			// Schedule the next effect after the current one's duration
			const nextTimer = window.setTimeout(applyNextEffect, effect.duration);
			timers.push(nextTimer);
		}

		const timers: number[] = [];

		// Start the sequence: apply first effect immediately
		applyNextEffect();

		return () => {
			timers.forEach(clearTimeout);
			el.classList.remove('feel-shiver', 'feel-explode', 'feel-font', 'feel-typewriter', 'done');
		};
	}, []);
}

export function Hero() {
	const feelRef = useRef<HTMLElement>(null);
	// TODO: re-enable animations — useFeelSequencer(feelRef);
	// useFeelSequencer(feelRef);

	return (
		<section className="hero">
			<SonicScene />
			<div className="eyebrow">INDEPENDENT SOUND PRACTICE ADVERTISING / FILM / GAMES</div>
			<h1>Sonic Artistry<br/><em>Across</em> <em>Mediums</em></h1>
			<div className="hero-bottom">
				<p>Precision in the edit. Emotion in the mix. Distinctive sound for stories, brands and worlds.</p>
				<a className="primary" href="#work">Explore the work <ArrowUpRight size={18}/></a>
			</div>
			<div className="hero-caption">
    <span>MOSAICO SOUND — MULTIDISCIPLINARY AUDIO</span>
				<a href="#services">SCROLL TO DISCOVER <ArrowDown size={14}/></a>
			</div>
		</section>
	);
}

export function Services() {
	return (
		<section id="services" className="section">
			<div className="shimmer-line"></div>
			<div className="section-label">01 / THE PRACTICE</div>
			<h2>Different mediums. One attentive ear.</h2>
			<div className="service-list">
				{[["Dialogue editing", "Clear, natural voices. Thoughtful dialogue assembly, cleanup and restoration that keep the performance intact.", "FILM / ADVERTISING"],
				["Audio engineering", "Recording, editing and mixing with technical care. A cohesive sound from the first take to the final delivery.", "RECORDING / POST-PRODUCTION"],
				["Video game sound design", "Character, atmosphere and responsive sonic detail. Sound built to serve the player and bring a world to life.", "INTERACTIVE / IMMERSIVE"]].map(([title, body, tag], i) => (
					<a href="#contact" className="service" key={String(title)}>
						<span className="mono">0{i + 1}</span>
						<div>
							<h3>{title}</h3>
							<p>{body}</p>
						</div>
						<span className="mono">{tag}</span>
						<ArrowUpRight />
					</a>
				))}
			</div>
		</section>
	);
}

export function Portfolio() {
	const [category, setCategory] = useState('All');
	const categories = ['All', 'Advertising', 'Film', 'Games'];
	const filtered = PORTFOLIO_PROJECTS.filter(p => category === 'All' || p.category === category);
	return (
		<section className="section" id="work">
			<div className="shimmer-line"></div>
			<div className="section-label">02 / LISTEN CLOSELY</div>
			<div className="section-heading">
				<h2>Made to be heard.</h2>
				<span className="mono">HEADPHONES RECOMMENDED</span>
			</div>
			<div className="chips">
				{categories.map(c => (
					<button key={c} aria-pressed={c === category} onClick={() => setCategory(c)}>{c}</button>
				))}
			</div>
			{filtered.length === 0 ? (
				<div className="empty">
					<AudioLines size={40} />
					<h3>The listening room is taking shape.</h3>
					<p>Selected audio work will appear here.<br/>Have a project in mind? Let's talk about its sound.</p>
					<a href="#contact">Start a conversation <ArrowUpRight size={16}/></a>
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
	return (
		<section className="about section" id="about">
			<div className="shimmer-line"></div>
			<div className="section-label">03 / BEHIND THE SOUND</div>
			<div>
				<h2>A technical mind. An artistic instinct.</h2>
    <p className="large-copy">An independent sound artisan working at the intersection of storytelling, technology and listening.</p>
				<p>From the smallest breath in a dialogue edit to the atmosphere of an interactive world, the approach is the same: understand the intention, find the detail, and give every sound a purpose.</p>
				<a href="#contact">Let's make something resonate <ArrowUpRight size={17}/></a>
			</div>
		</section>
	);
}

export function Journal() {
	return (
		<section className="section" id="journal">
			<div className="shimmer-line"></div>
			<div className="section-label">04 / STUDIO NOTES</div>
			<h2>Thoughts from the listening side.</h2>
			{JOURNAL_ARTICLES.length === 0 ? (
				<p className="muted">New writing on sound, process and creative practice will be published here.</p>
			) : (
				JOURNAL_ARTICLES.map(a => (
					<details className="service" key={a.id}>
						<summary>{a.title}</summary>
						<p style={{ whiteSpace: 'pre-wrap' }}>{a.body}</p>
					</details>
				))
			)}
		</section>
	);
}

export function Contact() {
	return (
		<section className="section contact" id="contact">
			<div className="shimmer-line"></div>
			<div>
				<div className="section-label">05 / START A CONVERSATION</div>
				<h2>Your next project. Let's hear it.</h2>
				<p>Tell me what you're making, where you are in the process, and what you need from the sound.</p>
				<span className="mono">PROJECT ENQUIRIES / APPOINTMENT REQUESTS</span>
				<p className="muted">Appointments are confirmed personally after your request. Project scope and payment arrangements are agreed before work begins.</p>
			</div>
			<div className="contact-info">
				<div className="contact-item">
					<Mail size={20} />
					<div>
						<h4>Email</h4>
      <a href="mailto:hello@mosaicosound.com">hello@mosaicosound.com</a>
					</div>
				</div>
				<div className="contact-item">
					<Phone size={20} />
					<div>
						<h4>Phone</h4>
						<a href="tel:+1234567890">+1 (234) 567-890</a>
					</div>
				</div>
			</div>
		</section>
	);
}

export function Newsletter() {
	return (
		<section className="newsletter">
			<div className="shimmer-line"></div>
			<div>
				<h3>Stay in the loop.</h3>
				<p>Occasional studio notes. New work. No noise.</p>
			</div>
			<div className="newsletter-info">
				<p>For updates, follow on social media or contact directly:</p>
		 <a href="mailto:hello@mosaicosound.com"><Mail size={16}/> hello@mosaicosound.com</a>
			</div>
		</section>
	);
}

export function Footer() {
	return (
		<footer>
   <a className="brand" href="/"><em>mosaico sound</em><span>®</span></a>
			<span className="mono">INDEPENDENT SOUND. INTENTIONAL IMPACT.</span>
			<button onClick={openCookiePreferences}>Cookie settings</button>
			<span>© 2026 MOSAICO SOUND</span>
		</footer>
	);
}

export function Cookies() {
	const b = useCookieBanner();
	if (!b.isOpen) return null;
	const cookieLabels = ['Analytics — visitor statistics', 'Marketing — ad measurement', 'Platform analytics — Hostinger experience improvements'];
	return (
		<section className="cookies" role="dialog" aria-label="Cookie preferences">
			<h3>A note on cookies</h3>
			<p>Essential cookies keep the site working. Optional cookies help measure visits and advertising.</p>
			{b.isCustomizing && (
				<div>
					{(['analytics', 'marketing', 'platformAnalytics'] as const).map((key, i) => (
						<label key={key}>
							<input type="checkbox" checked={b.choices[key]} onChange={e => b.setChoice(key, e.target.checked)} />
							{cookieLabels[i]}
						</label>
					))}
				</div>
			)}
			<div className="chips">
				<button onClick={b.rejectOptional}>Reject optional</button>
				<button onClick={b.acceptAll}>Accept all</button>
				<button onClick={b.isCustomizing ? b.saveChoices : b.customize}>
					{b.isCustomizing ? 'Save choices' : 'Customize'}
				</button>
			</div>
		</section>
	);
}

export function SignalDemo() {
	const [active, setActive] = useState(false);
	const sound = useRef<AudioContext | null>(null);
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
			{active ? 'MUTE SIGNAL' : 'LISTEN TO THE SIGNAL'}
			<span>INTERACTIVE TONE / NOT PORTFOLIO AUDIO</span>
		</button>
	);
}
