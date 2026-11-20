# Mosaico Sound — Copy Editing Guide

All text on the website lives in one file:

```
apps/web/src/copy.ts
```

Open this file in your code editor and change the text inside the quotes.

---

## Quick Start

1. Open `apps/web/src/copy.ts`
2. Find the section you want to change (use the labels below)
3. Change the text inside the quotes `"..."`
4. Save the file — the preview updates automatically

**Important rules:**
- Keep the quotes, commas, and colons — only change what's **inside** the quotes
- Don't delete field names (the words before the colon)
- For line breaks in longer text, use `\\n`

---

## Sections at a Glance

### HEADER (top navigation)
| What you see | Field to edit |
|---|---|
| `mosaico sound` (logo) | `header.brand` |
| `Work` (nav link) | `header.nav.work` |
| `Services` (nav link) | `header.nav.services` |
| `About` (nav link) | `header.nav.about` |
| `Let's talk ↗` (nav link) | `header.nav.contact` |

### HERO (main landing section)
| What you see | Field to edit |
|---|---|
| `INDEPENDENT SOUND PRACTICE...` (small text above) | `hero.eyebrow` |
| `Sonic Artistry` (big plain text) | `hero.headline` |
| `Across Mediums` (colored gradient text) | `hero.headlineEmphasis` |
| `Precision in the edit...` (paragraph below) | `hero.subheading` |

### SERVICES (01 / THE PRACTICE)
| What you see | Field to edit |
|---|---|
| `01 / THE PRACTICE` (section label) | `services.label` |
| `Different mediums...` (section heading) | `services.heading` |
| Service titles and descriptions | `services.list[0]`, `[1]`, `[2]` |

Each service has three fields:
- `title` — the service name
- `body` — the description paragraph
- `tag` — the category label (e.g. "FILM / ADVERTISING")

### PORTFOLIO (02 / LISTEN CLOSELY)
| What you see | Field to edit |
|---|---|
| Filter buttons (All, Advertising, Film, Games) | `portfolio.categories` |
| Empty state text (when no projects) | `portfolio.emptyState.*` |
| Project titles and descriptions | `portfolio.projects[0]`, `[1]`, `[2]` |

Each project has:
- `id` — unique number (don't change)
- `title` — project name
- `body` — description
- `category` — must match one of the categories above
- `audio` — file path or `null`

### ABOUT (03 / BEHIND THE SOUND)
| What you see | Field to edit |
|---|---|
| `03 / BEHIND THE SOUND` | `about.label` |
| Section heading | `about.heading` |
| Large italic quote | `about.largeCopy` |
| Body paragraph | `about.body` |
| CTA button text | `about.ctaButton` |

### CONTACT (05 / START A CONVERSATION)
| What you see | Field to edit |
|---|---|
| Section label | `contact.label` |
| Section heading | `contact.heading` |
| Subheading paragraph | `contact.subheading` |
| Email address | `contact.email.address` |
| Phone number | `contact.phone.number` |

### NEWSLETTER
| What you see | Field to edit |
|---|---|
| Heading | `newsletter.heading` |
| Subheading | `newsletter.subheading` |
| Info text | `newsletter.info` |
| Email shown | `newsletter.email` |

### FOOTER
| What you see | Field to edit |
|---|---|
| Brand name | `footer.brand` |
| Tagline | `footer.tagline` |
| Cookie settings button | `footer.cookieButton` |
| Copyright text | `footer.copyright` |

### COOKIES DIALOG
| What you see | Field to edit |
|---|---|
| Dialog heading | `cookies.heading` |
| Body text | `cookies.body` |
| Cookie category labels | `cookies.labels` |
| Button texts | `cookies.reject`, `cookies.accept`, `cookies.customize`, `cookies.save` |

---

## Example: Changing the Hero Headline

**Before:**
```
headline: 'Sonic Artistry',
headlineEmphasis: 'Across Mediums',
```

**After:**
```
headline: 'Sound Design',
headlineEmphasis: 'That Moves People',
```

---

## Adding a New Portfolio Project

Find the `portfolio.projects` array and add a new block:

```
{
  id: '4',
  title: 'My New Project',
  body: 'Description of the project.',
  category: 'Film',
  audio: null,
},
```

Make sure the `category` matches one of the filter categories.

---

## Need Help?

Just ask — I can make any copy change for you.
