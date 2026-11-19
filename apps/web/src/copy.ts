// ============================================================
//  WEBSITE COPY — Edit this file to change all text on the site
// ============================================================
//
//  HOW TO USE:
//  1. Change the text inside the quotes ("...")
//  2. Save the file
//  3. The website updates automatically
//
//  TIPS:
//  - Keep the quotes and commas — only change what's inside the quotes
//  - For line breaks in longer text, use two backslashes: \\n
//  - For empty lines between paragraphs, use: \\n\\n
//  - Do NOT delete the field names (the words before the colon)
//
// ============================================================

export const siteCopy = {

  // ----------------------------------------------------------
  //  HEADER (top navigation bar)
  // ----------------------------------------------------------
  header: {
    brand: 'mosaico sound',
    nav: {
      work: 'Work',
      services: 'Services',
      about: 'About',
      contact: "Let's talk ↗",
    },
  },

  // ----------------------------------------------------------
  //  HERO (main landing section)
  // ----------------------------------------------------------
  hero: {
    eyebrow: 'INDEPENDENT SOUND PRACTICE ADVERTISING / FILM / GAMES',
    headline: 'Sonic Artistry',          // plain text part
    headlineEmphasis: 'Across Mediums',  // colored gradient part
    subheading: 'Precision in the edit. Emotion in the mix. Distinctive sound for stories, brands and worlds.',
  },

  // ----------------------------------------------------------
  //  SERVICES (01 / THE PRACTICE)
  // ----------------------------------------------------------
  services: {
    label: '01 / THE PRACTICE',
    heading: 'Different mediums. One attentive ear.',
    list: [
      {
        title: 'Dialogue editing',
        body: 'Clear, natural voices. Thoughtful dialogue assembly, cleanup and restoration that keep the performance intact.',
        tag: 'FILM / ADVERTISING',
      },
      {
        title: 'Audio engineering',
        body: 'Recording, editing and mixing with technical care. A cohesive sound from the first take to the final delivery.',
        tag: 'RECORDING / POST-PRODUCTION',
      },
      {
        title: 'Video game sound design',
        body: 'Character, atmosphere and responsive sonic detail. Sound built to serve the player and bring a world to life.',
        tag: 'INTERACTIVE / IMMERSIVE',
      },
    ],
  },

  // ----------------------------------------------------------
  //  PORTFOLIO (02 / LISTEN CLOSELY)
  // ----------------------------------------------------------
  portfolio: {
    categories: ['All', 'Advertising', 'Film', 'Games'],
    emptyState: {
      title: 'The listening room is taking shape.',
      body: "Selected audio work will appear here.\nHave a project in mind? Let's talk about its sound.",
      ctaButton: 'Start a conversation',
    },
    // To add a project, copy one of these blocks and change the values:
    projects: [
      {
        id: '1',
        title: 'Brand Campaign Audio',
        body: 'Complete sound design and mixing for a national advertising campaign.',
        category: 'Advertising',
        audio: null,  // put a file path like '/audio/project.mp3' or keep null
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
    ],
  },

  // ----------------------------------------------------------
  //  ABOUT (03 / BEHIND THE SOUND)
  // ----------------------------------------------------------
  about: {
    label: '03 / BEHIND THE SOUND',
    heading: 'A technical mind. An artistic instinct.',
    largeCopy: 'An independent sound artisan working at the intersection of storytelling, technology and listening.',
    body: 'From the smallest breath in a dialogue edit to the atmosphere of an interactive world, the approach is the same: understand the intention, find the detail, and give every sound a purpose.',
    ctaButton: "Let's make something resonate",
  },


  // ----------------------------------------------------------
  //  CONTACT (05 / START A CONVERSATION)
  // ----------------------------------------------------------
  contact: {
    label: '05 / START A CONVERSATION',
    heading: "Your next project. Let's hear it.",
    subheading: "Tell me what you're making, where you are in the process, and what you need from the sound.",
    sublabel: 'PROJECT ENQUIRIES / APPOINTMENT REQUESTS',
    note: 'Appointments are confirmed personally after your request. Project scope and payment arrangements are agreed before work begins.',
    email: {
      label: 'Email',
      address: 'hello@mosaicosound.com',
    },
    phone: {
      label: 'Phone',
      number: '+1 (234) 567-890',
    },
  },

  // ----------------------------------------------------------
  //  NEWSLETTER
  // ----------------------------------------------------------
  newsletter: {
    heading: 'Stay in the loop.',
    subheading: 'Occasional studio notes. New work. No noise.',
    info: 'For updates, follow on social media or contact directly:',
    email: 'hello@mosaicosound.com',
  },

  // ----------------------------------------------------------
  //  FOOTER
  // ----------------------------------------------------------
  footer: {
    brand: 'mosaico sound',
    tagline: 'INDEPENDENT SOUND. INTENTIONAL IMPACT.',
    cookieButton: 'Cookie settings',
    copyright: '© 2026 MOSAICO SOUND',
  },

  // ----------------------------------------------------------
  //  COOKIES DIALOG
  // ----------------------------------------------------------
  cookies: {
    heading: 'A note on cookies',
    body: 'Essential cookies keep the site working. Optional cookies help measure visits and advertising.',
    labels: [
      'Analytics — visitor statistics',
      'Marketing — ad measurement',
      'Platform analytics — Hostinger experience improvements',
    ],
    reject: 'Reject optional',
    accept: 'Accept all',
    customize: 'Customize',
    save: 'Save choices',
  },

};
