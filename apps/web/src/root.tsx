import {
	isRouteErrorResponse,
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from 'react-router';
import type { Route } from './+types/root';
import stylesheet from '@/index.css?url';
import { Footer, Cookies } from '@/components/home/studio';
import { siteCopy } from '@/copy';
import { useState, useEffect } from 'react';

export const links: Route.LinksFunction = () => [
	{ rel: 'stylesheet', href: stylesheet, precedence: 'default' },
	{ rel: 'icon', href: '/favicon.png', type: 'image/png' },
	{ rel: 'preconnect', href: 'https://fonts.googleapis.com' },
	{
		rel: 'preconnect',
		href: 'https://fonts.gstatic.com',
		crossOrigin: 'anonymous',
	},
	{
		rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,300;0,400;0,500;1,300&display=swap',
	},
];

export default function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [theme, setTheme] = useState(() => {
		return localStorage.getItem('mosaico-theme') ?? 'light';
	});

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('mosaico-theme', theme);
	}, [theme]);

	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body suppressHydrationWarning>
				<div id="root">
					<header className="site-header">
						<div className="header-lines"></div>
      <a className="brand" href="/"><em>{siteCopy.header.brand}</em><span>®</span></a>
						<nav aria-label="Main navigation">
							<a href="/#work">{siteCopy.header.nav.work}</a>
							<a className="nav-contact" href="/#hello">{siteCopy.header.nav.about}</a>
							<button className="theme-toggle" aria-label="Toggle theme" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
								{theme === 'dark' ? (
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
								) : (
									<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
								)}
							</button>
							<button className="hamburger" aria-label="Menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
								<span /><span /><span />
							</button>
						</nav>
					</header>
					{menuOpen && (
						<div className="mobile-menu">
							<a href="/#work" onClick={() => setMenuOpen(false)}>{siteCopy.header.nav.work}</a>
							<a href="/#hello" onClick={() => setMenuOpen(false)}>{siteCopy.header.nav.about}</a>
						</div>
					)}
					<Outlet />
					<Footer />
					<Cookies />
				</div>
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
	const isClientErrorResponse = isRouteErrorResponse(error) && error.status < 500;

	if (import.meta.env.DEV && !isClientErrorResponse) {
		return null;
	}

	let message = 'Oops!';
	let details = 'An unexpected error occurred.';

	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? '404' : 'Error';
		details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
	}

	return (
		<main>
			<h1>{message}</h1>
			<p>{details}</p>
		</main>
	);
}
