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
      about: 'About',
    },
  },

  // ----------------------------------------------------------
  //  HERO (main landing section)
  // ----------------------------------------------------------
  hero: {
    eyebrow: '',
    headline: 'Sonic Artistry Across Mediums',
    subheading: 'Precision in the edit. Emotion in the mix. Distinctive sound for stories, brands and worlds.',
  },


  // ----------------------------------------------------------
  //  PORTFOLIO (02 / LISTEN CLOSELY)
  // ----------------------------------------------------------
  portfolio: {
    categories: ['All', 'Advertising', 'Film', 'Games', 'Branding'],
    emptyState: {
      title: 'The listening room is taking shape.',
      body: "Selected work will appear here.\nHave a project in mind? Say hello.",
      ctaButton: 'Say hello',
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
  //  PARTNERS (clients and collaborators)
  // ----------------------------------------------------------
  partners: {
    heading: 'A few of the voices behind the work.',
    logos: [
      'Client One',
      'Client Two',
      'Client Three',
      'Client Four',
      'Client Five',
      'Client Six',
    ],
  },

  // ----------------------------------------------------------
  //  HELLO (closing call-to-action, replaces Contact)
  // ----------------------------------------------------------
  hello: {
    heading: "Let's make something beautiful.",
    subheading: 'Have a project in mind? I\'d love to hear about it.',
    emailLink: 'hello@mosaicosound.com',
    emailLabel: 'Get in touch',
  },


  // ----------------------------------------------------------
  //  FOOTER
  // ----------------------------------------------------------
  footer: {
    brand: 'mosaico sound',
    tagline: 'INDEPENDENT SOUND. INTENTIONAL IMPACT.',
    cookieButton: 'Cookie settings',
    copyright: '© 2026 MOSAICO SOUND',
    email: 'hello@mosaicosound.com',
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
