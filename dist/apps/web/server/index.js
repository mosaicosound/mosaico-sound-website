import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@react-router/node";
import { isbot } from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { Links, Meta, Outlet, Scripts, ScrollRestoration, ServerRouter, UNSAFE_withComponentProps, UNSAFE_withErrorBoundaryProps, isRouteErrorResponse } from "react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useState } from "react";
// \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
// src/entry.server.tsx
var entry_server_exports = /* @__PURE__ */ __exportAll({
	default: () => handleRequest,
	streamTimeout: () => streamTimeout
});
var streamTimeout = 5e3;
function appendComponentStack(error, errorInfo) {
	const componentStack = errorInfo?.componentStack;
	if (!(error instanceof Error) || !componentStack || error.stack?.includes(componentStack)) return;
	const separator = componentStack.startsWith("\n") ? "" : "\n";
	try {
		error.stack = `${error.stack ?? `${error.name}: ${error.message}`}${separator}${componentStack}`;
	} catch {}
}
function handleRequest(request, responseStatusCode, responseHeaders, routerContext, loadContext) {
	if (request.method.toUpperCase() === "HEAD") return new Response(null, {
		status: responseStatusCode,
		headers: responseHeaders
	});
	return new Promise((resolve, reject) => {
		let shellRendered = false;
		const userAgent = request.headers.get("user-agent");
		const readyOption = userAgent && isbot(userAgent) || routerContext.isSpaMode ? "onAllReady" : "onShellReady";
		let timeoutId = setTimeout(() => abort(), 6e3);
		const { pipe, abort } = renderToPipeableStream(/* @__PURE__ */ jsx(ServerRouter, {
			context: routerContext,
			url: request.url
		}), {
			[readyOption]() {
				shellRendered = true;
				const body = new PassThrough({ final(callback) {
					clearTimeout(timeoutId);
					timeoutId = void 0;
					callback();
				} });
				const stream = createReadableStreamFromReadable(body);
				responseHeaders.set("Content-Type", "text/html");
				pipe(body);
				resolve(new Response(stream, {
					headers: responseHeaders,
					status: responseStatusCode
				}));
			},
			onShellError(error) {
				reject(error);
			},
			onError(error, errorInfo) {
				appendComponentStack(error, errorInfo);
				responseStatusCode = 500;
				if (shellRendered) console.error(error);
			}
		});
	});
}
// src/index.css?url
var src_default = "/assets/index-CowcBfyo.css";
// src/lib/cookie-consent.ts
var CONSENT_COOKIE = "cc_cookie";
var CONSENT_MAX_AGE_SECONDS = 15724800;
var CONSENT_EVENT = "cc:onConsent";
var CONSENT_CHANGE_EVENT = "cc:onChange";
var PREFERENCES_REQUESTED_EVENT = "horizons:cookie-preferences-requested";
/**
* Cookie categories the visitor chooses between. `Necessary` is always granted.
* The store's Google Analytics stores cookies only with `Analytics`, its Meta Pixel
* loads only with `Marketing`, and checkout lets Hostinger's own analytics
* (Amplitude) use cookies only with `PlatformAnalytics`. Gate any script you add
* the same way.
*/
var CookieConsentCategory = {
	Necessary: "necessary",
	Analytics: "analytics",
	Marketing: "marketing",
	PlatformAnalytics: "platformAnalytics"
};
/** The categories the visitor accepted, or `null` before they have chosen. Browser only. */
function getConsentCategories() {
	if (typeof document === "undefined") return null;
	const prefix = `${CONSENT_COOKIE}=`;
	const cookie = document.cookie.split("; ").find((entry) => entry.startsWith(prefix));
	try {
		const categories = cookie ? JSON.parse(decodeURIComponent(cookie.slice(prefix.length))).categories : null;
		return Array.isArray(categories) ? categories : null;
	} catch {
		return null;
	}
}
function hasConsentDecision() {
	return getConsentCategories() !== null;
}
function isConsentGranted(category) {
	return !!getConsentCategories()?.includes(category);
}
/** Stores the visitor's choice and tells the platform's tracking about it. */
function saveConsent({ analytics, marketing, platformAnalytics }) {
	const isFirstDecision = !hasConsentDecision();
	const categories = [
		CookieConsentCategory.Necessary,
		...analytics ? [CookieConsentCategory.Analytics] : [],
		...marketing ? [CookieConsentCategory.Marketing] : [],
		...platformAnalytics ? [CookieConsentCategory.PlatformAnalytics] : []
	];
	const value = encodeURIComponent(JSON.stringify({
		categories,
		consentTimestamp: (/* @__PURE__ */ new Date()).toISOString()
	}));
	document.cookie = `${CONSENT_COOKIE}=; max-age=0; path=/`;
	document.cookie = `${CONSENT_COOKIE}=${value}; max-age=${CONSENT_MAX_AGE_SECONDS}; path=/; SameSite=None; Secure; Partitioned`;
	window.dispatchEvent(new CustomEvent(isFirstDecision ? CONSENT_EVENT : CONSENT_CHANGE_EVENT, { detail: { categories } }));
}
function acceptAllCookies() {
	saveConsent({
		analytics: true,
		marketing: true,
		platformAnalytics: true
	});
}
function rejectOptionalCookies() {
	saveConsent({
		analytics: false,
		marketing: false,
		platformAnalytics: false
	});
}
/** Reopens the preferences for a "Cookie settings" link, typically in the footer. */
function openCookiePreferences() {
	window.dispatchEvent(new Event(PREFERENCES_REQUESTED_EVENT));
}
/** Lets the banner react to `openCookiePreferences`. Returns the unsubscribe function. */
function onCookiePreferencesRequested(callback) {
	window.addEventListener(PREFERENCES_REQUESTED_EVENT, callback);
	return () => window.removeEventListener(PREFERENCES_REQUESTED_EVENT, callback);
}
// src/hooks/use-cookie-banner.ts
var NO_OPTIONAL_COOKIES = {
	analytics: false,
	marketing: false,
	platformAnalytics: false
};
var grantedChoices = () => ({
	analytics: isConsentGranted(CookieConsentCategory.Analytics),
	marketing: isConsentGranted(CookieConsentCategory.Marketing),
	platformAnalytics: isConsentGranted(CookieConsentCategory.PlatformAnalytics)
});
/**
* Everything the site's cookie banner does, and nothing about how it looks:
* render whatever markup fits the site from these values.
*
* - `isOpen` is false on the server and during hydration, then true until the
*   visitor decides, so the banner never flashes for someone who already chose.
* - A footer "Cookie settings" link calling `openCookiePreferences()` from
*   `@/lib/cookie-consent` reopens it with `isCustomizing` true and the toggles
*   pre-filled from what the visitor granted before.
* - Toggles start unticked: never pre-tick an optional category.
*
*   const banner = useCookieBanner();
*   if (!banner.isOpen) return null;
*   // banner.acceptAll, banner.rejectOptional, banner.customize,
*   // banner.choices + banner.setChoice('analytics', checked), banner.saveChoices
*/
function useCookieBanner() {
	const [isOpen, setIsOpen] = useState(false);
	const [isCustomizing, setIsCustomizing] = useState(false);
	const [choices, setChoices] = useState(NO_OPTIONAL_COOKIES);
	useEffect(() => {
		setIsOpen(!hasConsentDecision());
		return onCookiePreferencesRequested(() => {
			setChoices(grantedChoices());
			setIsCustomizing(true);
			setIsOpen(true);
		});
	}, []);
	const finish = useCallback((save) => {
		save();
		setIsCustomizing(false);
		setIsOpen(false);
	}, []);
	return {
		isOpen,
		isCustomizing,
		choices,
		setChoice: useCallback((category, isGranted) => {
			setChoices((current) => ({
				...current,
				[category]: isGranted
			}));
		}, []),
		customize: useCallback(() => {
			setChoices(grantedChoices());
			setIsCustomizing(true);
		}, []),
		acceptAll: useCallback(() => finish(acceptAllCookies), [finish]),
		rejectOptional: useCallback(() => finish(rejectOptionalCookies), [finish]),
		saveChoices: useCallback(() => finish(() => saveConsent(choices)), [finish, choices])
	};
}
// src/components/home/studio.tsx
function Footer() {
	return /* @__PURE__ */ jsxs("footer", { children: [
		/* @__PURE__ */ jsxs("a", {
			className: "brand",
			href: "/",
			children: [/* @__PURE__ */ jsx("em", { children: "mosaico sound" }), /* @__PURE__ */ jsx("span", { children: "®" })]
		}),
		/* @__PURE__ */ jsx("span", {
			className: "mono",
			children: "INDEPENDENT SOUND. INTENTIONAL IMPACT."
		}),
		/* @__PURE__ */ jsx("button", {
			onClick: openCookiePreferences,
			children: "Cookie settings"
		}),
		/* @__PURE__ */ jsx("span", { children: "© 2026 MOSAICO SOUND" })
	] });
}
function Cookies() {
	const b = useCookieBanner();
	if (!b.isOpen) return null;
	const cookieLabels = [
		"Analytics — visitor statistics",
		"Marketing — ad measurement",
		"Platform analytics — Hostinger experience improvements"
	];
	return /* @__PURE__ */ jsxs("section", {
		className: "cookies",
		role: "dialog",
		"aria-label": "Cookie preferences",
		children: [
			/* @__PURE__ */ jsx("h3", { children: "A note on cookies" }),
			/* @__PURE__ */ jsx("p", { children: "Essential cookies keep the site working. Optional cookies help measure visits and advertising." }),
			b.isCustomizing && /* @__PURE__ */ jsx("div", { children: [
				"analytics",
				"marketing",
				"platformAnalytics"
			].map((key, i) => /* @__PURE__ */ jsxs("label", { children: [/* @__PURE__ */ jsx("input", {
				type: "checkbox",
				checked: b.choices[key],
				onChange: (e) => b.setChoice(key, e.target.checked)
			}), cookieLabels[i]] }, key)) }),
			/* @__PURE__ */ jsxs("div", {
				className: "chips",
				children: [
					/* @__PURE__ */ jsx("button", {
						onClick: b.rejectOptional,
						children: "Reject optional"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: b.acceptAll,
						children: "Accept all"
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: b.isCustomizing ? b.saveChoices : b.customize,
						children: b.isCustomizing ? "Save choices" : "Customize"
					})
				]
			})
		]
	});
}
// src/root.tsx
var root_exports = /* @__PURE__ */ __exportAll({
	ErrorBoundary: () => ErrorBoundary,
	default: () => root_default,
	links: () => links
});
var links = () => [
	{
		rel: "stylesheet",
		href: src_default,
		precedence: "default"
	},
	{
		rel: "icon",
		href: "/favicon.png",
		type: "image/png"
	},
	{
		rel: "preconnect",
		href: "https://fonts.googleapis.com"
	},
	{
		rel: "preconnect",
		href: "https://fonts.gstatic.com",
		crossOrigin: "anonymous"
	},
	{
		rel: "stylesheet",
		href: "https://fonts.googleapis.com/css2?family=Architects+Daughter&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
	}
];
var root_default = UNSAFE_withComponentProps(function App() {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ jsxs("head", { children: [
			/* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
			/* @__PURE__ */ jsx("meta", {
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			}),
			/* @__PURE__ */ jsx(Meta, {}),
			/* @__PURE__ */ jsx(Links, {})
		] }), /* @__PURE__ */ jsxs("body", {
			suppressHydrationWarning: true,
			children: [
				/* @__PURE__ */ jsxs("div", {
					id: "root",
					children: [
						/* @__PURE__ */ jsxs("header", {
							className: "site-header",
							children: [
								/* @__PURE__ */ jsx("div", { className: "header-lines" }),
								/* @__PURE__ */ jsxs("a", {
									className: "brand",
									href: "/",
									children: [/* @__PURE__ */ jsx("em", { children: "mosaico sound" }), /* @__PURE__ */ jsx("span", { children: "®" })]
								}),
								/* @__PURE__ */ jsxs("nav", {
									"aria-label": "Main navigation",
									children: [
										/* @__PURE__ */ jsx("a", {
											href: "/#work",
											children: "Work"
										}),
										/* @__PURE__ */ jsx("a", {
											href: "/#services",
											children: "Services"
										}),
										/* @__PURE__ */ jsx("a", {
											href: "/#about",
											children: "About"
										}),
										/* @__PURE__ */ jsx("a", {
											href: "/#journal",
											children: "Notes"
										}),
										/* @__PURE__ */ jsx("a", {
											className: "nav-contact",
											href: "/#contact",
											children: "Let's talk ↗"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ jsx(Outlet, {}),
						/* @__PURE__ */ jsx(Footer, {}),
						/* @__PURE__ */ jsx(Cookies, {})
					]
				}),
				/* @__PURE__ */ jsx(ScrollRestoration, {}),
				/* @__PURE__ */ jsx(Scripts, {})
			]
		})]
	});
});
var ErrorBoundary = UNSAFE_withErrorBoundaryProps(function ErrorBoundary({ error }) {
	isRouteErrorResponse(error) && error.status;
	let message = "Oops!";
	let details = "An unexpected error occurred.";
	if (isRouteErrorResponse(error)) {
		message = error.status === 404 ? "404" : "Error";
		details = error.status === 404 ? "The requested page could not be found." : error.statusText || details;
	}
	return /* @__PURE__ */ jsxs("main", { children: [/* @__PURE__ */ jsx("h1", { children: message }), /* @__PURE__ */ jsx("p", { children: details })] });
});
// \0virtual:react-router/server-manifest
var server_manifest_default = {
	"entry": {
		"module": "/assets/entry.client-BeDUZwfJ.js",
		"imports": ["/assets/jsx-runtime-CvX5G2ys.js"],
		"css": []
	},
	"routes": {
		"root": {
			"id": "root",
			"parentId": void 0,
			"path": "",
			"index": void 0,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": true,
			"module": "/assets/root-D5RQtCkb.js",
			"imports": ["/assets/jsx-runtime-CvX5G2ys.js", "/assets/studio-BLtz2ByN.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		},
		"routes/home": {
			"id": "routes/home",
			"parentId": "root",
			"path": void 0,
			"index": true,
			"caseSensitive": void 0,
			"hasAction": false,
			"hasLoader": false,
			"hasClientAction": false,
			"hasClientLoader": false,
			"hasClientMiddleware": false,
			"hasDefaultExport": true,
			"hasErrorBoundary": false,
			"module": "/assets/home-BA21J2cD.js",
			"imports": ["/assets/jsx-runtime-CvX5G2ys.js", "/assets/studio-BLtz2ByN.js"],
			"css": [],
			"clientActionModule": void 0,
			"clientLoaderModule": void 0,
			"clientMiddlewareModule": void 0,
			"hydrateFallbackModule": void 0
		}
	},
	"url": "/assets/manifest-1699d051.js",
	"version": "1699d051",
	"sri": void 0
};
// \0virtual:react-router/server-build
var route1 = { default: () => null };
var assetsBuildDirectory = "../../dist/apps/web/client";
var basename = "/";
var future = {
	"unstable_customRouteDiscovery": false,
	"unstable_enableNodeReadableStream": false,
	"unstable_optimizeDeps": false
};
var ssr = false;
var unstable_apiOnly = false;
var unstable_apiServerOrigin = void 0;
var isSpaMode = true;
var prerender = [];
var routeDiscovery = { "mode": "initial" };
var publicPath = "/";
var entry = { module: entry_server_exports };
var routes = {
	"root": {
		id: "root",
		parentId: void 0,
		path: "",
		index: void 0,
		caseSensitive: void 0,
		module: root_exports
	},
	"routes/home": {
		id: "routes/home",
		parentId: "root",
		path: void 0,
		index: true,
		caseSensitive: void 0,
		module: route1
	}
};
var allowedActionOrigins = false;
export { allowedActionOrigins, server_manifest_default as assets, assetsBuildDirectory, basename, entry, future, isSpaMode, prerender, publicPath, routeDiscovery, routes, ssr, unstable_apiOnly, unstable_apiServerOrigin };
