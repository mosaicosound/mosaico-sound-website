import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { JSX } from 'react';

type Language = 'en' | 'es' | 'fr' | 'pt';

interface Translations {
  lang: Language;
  t: typeof en;
}

const en = {
  // Nav
  navWork: 'Work',
  navServices: 'Services',
  navAbout: 'About',
  navNotes: 'Notes',
  navTalk: "Let's talk",
  // Hero
  heroEyebrow: 'INDEPENDENT SOUND PRACTICE ADVERTISING / FILM / GAMES',
  heroHeadline: 'Sound that makes you feel.',
  heroSubheadline: 'Precision in the edit. Emotion in the mix. Distinctive sound for stories, brands and worlds.',
  heroButton: 'Explore the work',
  heroCaption: 'MOSAICO SOUND — MULTIDISCIPLINARY AUDIO',
  heroScroll: 'SCROLL TO DISCOVER',
  heroSignal: 'LISTEN TO THE SIGNAL',
  heroSignalPlaying: 'MUTE SIGNAL',
  heroSignalNote: 'INTERACTIVE TONE / NOT PORTFOLIO AUDIO',
  // Services
  servicesLabel: '01 / THE PRACTICE',
  servicesHeadline: 'Different mediums. One attentive ear.',
  service1Title: 'Dialogue editing',
  service1Desc: 'Clear, natural voices. Thoughtful dialogue assembly, cleanup and restoration that keep the performance intact.',
  service1Tag: 'FILM / ADVERTISING',
  service2Title: 'Audio engineering',
  service2Desc: 'Recording, editing and mixing with technical care. A cohesive sound from the first take to the final delivery.',
  service2Tag: 'RECORDING / POST-PRODUCTION',
  service3Title: 'Video game sound design',
  service3Desc: 'Character, atmosphere and responsive sonic detail. Sound built to serve the player and bring a world to life.',
  service3Tag: 'INTERACTIVE / IMMERSIVE',
  // Portfolio
  portfolioLabel: '02 / LISTEN CLOSELY',
  portfolioHeadline: 'Made to be heard.',
  portfolioTag: 'HEADPHONES RECOMMENDED',
  portfolioAll: 'All',
  portfolioAdvertising: 'Advertising',
  portfolioFilm: 'Film',
  portfolioGames: 'Games',
  project1Title: 'Brand Campaign Audio',
  project1Desc: 'Complete sound design and mixing for a national advertising campaign.',
  project1Category: 'Advertising',
  project2Title: 'Short Film Score',
  project2Desc: 'Original score and dialogue editing for an award-winning short film.',
  project2Category: 'Film',
  project3Title: 'Mobile Game Sound',
  project3Desc: 'Interactive audio system and sound effects for a mobile puzzle game.',
  project3Category: 'Games',
  // About
  aboutLabel: '03 / BEHIND THE SOUND',
  aboutHeadline: 'A technical mind. An artistic instinct.',
  aboutLead: 'An independent sound artisan working at the intersection of storytelling, technology and listening.',
  aboutBody: 'From the smallest breath in a dialogue edit to the atmosphere of an interactive world, the approach is the same: understand the intention, find the detail, and give every sound a purpose.',
  aboutButton: "Let's make something resonate",
  // Journal
  journalLabel: '04 / STUDIO NOTES',
  journalHeadline: 'Thoughts from the listening side.',
  article1Title: 'The Art of Dialogue Editing',
  article1Body: 'Dialogue editing is often invisible when done well. It\'s about preserving the performance while removing the distractions — room tone, mouth noise, plosives — without making the voice sound artificial.',
  article2Title: 'Sound Design for Interactive Media',
  article2Body: 'Game sound design requires a different mindset than linear media. Every sound must respond to player input while maintaining atmosphere and clarity.',
  // Contact
  contactLabel: '05 / START A CONVERSATION',
  contactHeadline: 'Your next project. Let\'s hear it.',
  contactBody: 'Tell me what you\'re making, where you are in the process, and what you need from the sound.',
  contactTag: 'PROJECT ENQUIRIES / APPOINTMENT REQUESTS',
  contactInfo: 'Appointments are confirmed personally after your request. Project scope and payment arrangements are agreed before work begins.',
  contactEmailLabel: 'Email',
  contactPhoneLabel: 'Phone',
  // Newsletter
  newsletterHeadline: 'Stay in the loop.',
  newsletterSubtext: 'Occasional studio notes. New work. No noise.',
  newsletterInfo: 'For updates, follow on social media or contact directly:',
  // Footer
  footerBrand: 'mosaico sound',
  footerTagline: 'INDEPENDENT SOUND. INTENTIONAL IMPACT.',
  footerCopyright: '© 2026 MOSAICO SOUND',
  footerCookies: 'Cookie settings',
  // Cookies
  cookieTitle: 'A note on cookies',
  cookieDesc: 'Essential cookies keep the site working. Optional cookies help measure visits and advertising.',
  cookieAnalytics: 'Analytics — visitor statistics',
  cookieMarketing: 'Marketing — ad measurement',
  cookiePlatform: 'Platform analytics — Hostinger experience improvements',
  cookieReject: 'Reject optional',
  cookieAccept: 'Accept all',
  cookieCustomize: 'Customize',
  cookieSave: 'Save choices',
  // Language switcher
  langLabel: 'Language',
  langEn: 'English',
  langEs: 'Español',
  langFr: 'Français',
  langPt: 'Português',
} as const;

const es = {
  // Nav
  navWork: 'Trabajos',
  navServices: 'Servicios',
  navAbout: 'Acerca de',
  navNotes: 'Notas',
  navTalk: 'Hablemos',
  // Hero
  heroEyebrow: 'PRÁCTICA DE SONIDO INDEPENDIENTE PUBLICIDAD / CINE / VIDEOJUEGOS',
  heroHeadline: 'Sonido que te hace sentir.',
  heroSubheadline: 'Precisión en la edición. Emoción en la mezcla. Sonido distintivo para historias, marcas y mundos.',
  heroButton: 'Explorar el trabajo',
  heroCaption: 'MOSAICO SOUND — AUDIO MULTIDISCIPLINARIO',
  heroScroll: 'DESPLÁZATE PARA DESCUBRIR',
  heroSignal: 'ESCUCHA LA SEÑAL',
  heroSignalPlaying: 'SILENCIAR SEÑAL',
  heroSignalNote: 'TONO INTERACTIVO / NO ES AUDIO DEL PORTAFOLIO',
  // Services
  servicesLabel: '01 / LA PRÁCTICA',
  servicesHeadline: 'Diferentes medios. Un oído atento.',
  service1Title: 'Edición de diálogos',
  service1Desc: 'Voces claras y naturales. Ensamblaje, limpieza y restauración de diálogos que preservan la interpretación.',
  service1Tag: 'CINE / PUBLICIDAD',
  service2Title: 'Ingeniería de audio',
  service2Desc: 'Grabación, edición y mezcla con cuidado técnico. Un sonido cohesivo desde la primera toma hasta la entrega final.',
  service2Tag: 'GRABACIÓN / POSTPRODUCCIÓN',
  service3Title: 'Diseño de sonido para videojuegos',
  service3Desc: 'Personaje, atmósfera y detalle sonoro responsivo. Sonido construido para el jugador y para dar vida a un mundo.',
  service3Tag: 'INTERACTIVO / INMERSIVO',
  // Portfolio
  portfolioLabel: '02 / ESCUCHA DE CERCA',
  portfolioHeadline: 'Hecho para ser escuchado.',
  portfolioTag: 'AURICULARES RECOMENDADOS',
  portfolioAll: 'Todos',
  portfolioAdvertising: 'Publicidad',
  portfolioFilm: 'Cine',
  portfolioGames: 'Videojuegos',
  project1Title: 'Audio de Campaña de Marca',
  project1Desc: 'Diseño de sonido y mezcla completos para una campaña publicitaria nacional.',
  project1Category: 'Publicidad',
  project2Title: 'Banda Sonora de Cortometraje',
  project2Desc: 'Banda sonora original y edición de diálogos para un cortometraje premiado.',
  project2Category: 'Cine',
  project3Title: 'Sonido de Juego Móvil',
  project3Desc: 'Sistema de audio interactivo y efectos de sonido para un juego de puzzles móvil.',
  project3Category: 'Videojuegos',
  // About
  aboutLabel: '03 / DETRÁS DEL SONIDO',
  aboutHeadline: 'Una mente técnica. Un instinto artístico.',
  aboutLead: 'Un artesano del sonido independiente que trabaja en la intersección entre narrativa, tecnología y escucha.',
  aboutBody: 'Desde la respiración más pequeña en una edición de diálogo hasta la atmósfera de un mundo interactivo, el enfoque es el mismo: entender la intención, encontrar el detalle y dar un propósito a cada sonido.',
  aboutButton: 'Hagamos que algo resuene',
  // Journal
  journalLabel: '04 / NOTAS DEL ESTUDIO',
  journalHeadline: 'Pensamientos desde el lado de la escucha.',
  article1Title: 'El Arte de la Edición de Diálogos',
  article1Body: 'La edición de diálogos es a menudo invisible cuando se hace bien. Se trata de preservar la interpretación mientras se eliminan las distracciones — tono de ambiente, ruido de boca, oclusivas — sin que la voz suene artificial.',
  article2Title: 'Diseño de Sonido para Medios Interactivos',
  article2Body: 'El diseño de sonido para videojuegos requiere una mentalidad diferente a la de los medios lineales. Cada sonido debe responder a la entrada del jugador mientras mantiene la atmósfera y la claridad.',
  // Contact
  contactLabel: '05 / INICIA UNA CONVERSACIÓN',
  contactHeadline: 'Tu próximo proyecto. Hablemos.',
  contactBody: 'Cuéntame qué estás haciendo, en qué punto del proceso estás y qué necesitas del sonido.',
  contactTag: 'CONSULTAS DE PROYECTO / SOLICITUDES DE CITA',
  contactInfo: 'Las citas se confirman personalmente después de tu solicitud. El alcance del proyecto y los acuerdos de pago se definen antes de comenzar.',
  contactEmailLabel: 'Correo',
  contactPhoneLabel: 'Teléfono',
  // Newsletter
  newsletterHeadline: 'Mantente al día.',
  newsletterSubtext: 'Notas ocasionales del estudio. Nuevo trabajo. Sin ruido.',
  newsletterInfo: 'Para actualizaciones, sigue en redes sociales o contacta directamente:',
  // Footer
  footerBrand: 'mosaico sound',
  footerTagline: 'SONIDO INDEPENDIENTE. IMPACTO INTENCIONAL.',
  footerCopyright: '© 2026 MOSAICO SOUND',
  footerCookies: 'Configuración de cookies',
  // Cookies
  cookieTitle: 'Una nota sobre cookies',
  cookieDesc: 'Las cookies esenciales mantienen el sitio funcionando. Las cookies opcionales ayudan a medir visitas y publicidad.',
  cookieAnalytics: 'Analíticas — estadísticas de visitantes',
  cookieMarketing: 'Marketing — medición de anuncios',
  cookiePlatform: 'Analíticas de plataforma — mejoras de experiencia en Hostinger',
  cookieReject: 'Rechazar opcionales',
  cookieAccept: 'Aceptar todas',
  cookieCustomize: 'Personalizar',
  cookieSave: 'Guardar elección',
  // Language switcher
  langLabel: 'Idioma',
  langEn: 'English',
  langEs: 'Español',
  langFr: 'Français',
  langPt: 'Português',
} as const;

const fr = {
  // Nav
  navWork: 'Travaux',
  navServices: 'Services',
  navAbout: 'À propos',
  navNotes: 'Notes',
  navTalk: 'Discutons',
  // Hero
  heroEyebrow: 'PRATIQUE SONORE INDÉPENDENTE PUBLICITÉ / CINÉMA / JEUX VIDÉO',
  heroHeadline: 'Un son qui vous fait ressentir.',
  heroSubheadline: 'Précision dans le montage. Émotion dans le mixage. Un son distinctif pour les histoires, les marques et les mondes.',
  heroButton: 'Explorer le travail',
  heroCaption: 'MOSAICO SOUND — AUDIO MULTIDISCIPLINAIRE',
  heroScroll: 'FAITES DÉFILER POUR DÉCOUVRIR',
  heroSignal: 'ÉCOUTER LE SIGNAL',
  heroSignalPlaying: 'COUPER LE SIGNAL',
  heroSignalNote: 'TON INTERACTIF / PAS D\'AUDIO DE PORTFEUILLE',
  // Services
  servicesLabel: '01 / LA PRATIQUE',
  servicesHeadline: 'Différents médias. Une oreille attentive.',
  service1Title: 'Montage de dialogues',
  service1Desc: 'Des voix claires et naturelles. Assemblage, nettoyage et restauration de dialogues qui préservent la performance.',
  service1Tag: 'CINÉMA / PUBLICITÉ',
  service2Title: 'Ingénierie du son',
  service2Desc: 'Enregistrement, montage et mixage avec soin technique. Un son cohérent de la première prise à la livraison finale.',
  service2Tag: 'ENREGISTREMENT / POST-PRODUCTION',
  service3Title: 'Design sonore pour jeux vidéo',
  service3Desc: 'Personnage, atmosphère et détails sonores réactifs. Un son conçu pour le joueur et pour donner vie à un monde.',
  service3Tag: 'INTERACTIF / IMMERSIF',
  // Portfolio
  portfolioLabel: '02 / ÉCOUTEZ DE PRÈS',
  portfolioHeadline: 'Fait pour être entendu.',
  portfolioTag: 'CASQUE RECOMMANDÉ',
  portfolioAll: 'Tout',
  portfolioAdvertising: 'Publicité',
  portfolioFilm: 'Cinéma',
  portfolioGames: 'Jeux vidéo',
  project1Title: 'Audio de Campagne de Marque',
  project1Desc: 'Design sonore et mixage complets pour une campagne publicitaire nationale.',
  project1Category: 'Publicité',
  project2Title: 'Bande-son de Court-Métrage',
  project2Desc: 'Bande-son originale et montage de dialogues pour un court-métrage primé.',
  project2Category: 'Cinéma',
  project3Title: 'Son de Jeu Mobile',
  project3Desc: 'Système audio interactif et effets sonores pour un jeu de puzzles mobile.',
  project3Category: 'Jeux vidéo',
  // About
  aboutLabel: '03 / DERRIÈRE LE SON',
  aboutHeadline: 'Un esprit technique. Un instinct artistique.',
  aboutLead: 'Un artisan du son indépendant travaillant à l\'intersection du récit, de la technologie et de l\'écoute.',
  aboutBody: 'Du souffle le plus petit dans un montage de dialogue à l\'atmosphère d\'un monde interactif, l\'approche est la même : comprendre l\'intention, trouver le détail et donner un but à chaque son.',
  aboutButton: 'Faisons résonner quelque chose',
  // Journal
  journalLabel: '04 / NOTES DE STUDIO',
  journalHeadline: 'Réflexions du côté de l\'écoute.',
  article1Title: 'L\'Art du Montage de Dialogues',
  article1Body: 'Le montage de dialogues est souvent invisible quand il est bien fait. Il s\'agit de préserver la performance tout en éliminant les distractions — ton ambiant, bruit de bouche, plosives — sans que la voix sonne artificielle.',
  article2Title: 'Design Sonore pour Médias Interactifs',
  article2Body: 'Le design sonore pour jeux vidéo nécessite une mentalité différente des médias linéaires. Chaque son doit répondre aux actions du joueur tout en maintenant l\'atmosphère et la clarté.',
  // Contact
  contactLabel: '05 / AMORCEZ UNE CONVERSATION',
  contactHeadline: 'Votre prochain projet. Discutons.',
  contactBody: 'Dites-moi ce que vous créez, où vous en êtes dans le processus et ce dont vous avez besoin du son.',
  contactTag: 'DEMANDES DE PROJET / DEMANDES DE RENDEZ-VOUS',
  contactInfo: 'Les rendez-vous sont confirmés personnellement après votre demande. La portée du projet et les arrangements de paiement sont convenus avant le début des travaux.',
  contactEmailLabel: 'Courriel',
  contactPhoneLabel: 'Téléphone',
  // Newsletter
  newsletterHeadline: 'Restez informé.',
  newsletterSubtext: 'Notes occasionnelles du studio. Nouveau travail. Pas de bruit.',
  newsletterInfo: 'Pour les mises à jour, suivez-nous sur les réseaux sociaux ou contactez-nous directement :',
  // Footer
  footerBrand: 'mosaico sound',
  footerTagline: 'SON INDÉPENDANT. IMPACT INTENTIONNEL.',
  footerCopyright: '© 2026 MOSAICO SOUND',
  footerCookies: 'Paramètres des cookies',
  // Cookies
  cookieTitle: 'Une note sur les cookies',
  cookieDesc: 'Les cookies essentiels maintiennent le site fonctionnel. Les cookies optionnels aident à mesurer les visites et la publicité.',
  cookieAnalytics: 'Analytique — statistiques des visiteurs',
  cookieMarketing: 'Marketing — mesure de la publicité',
  cookiePlatform: 'Analytique de plateforme — améliorations de l\'expérience Hostinger',
  cookieReject: 'Rejeter les optionnels',
  cookieAccept: 'Tout accepter',
  cookieCustomize: 'Personnaliser',
  cookieSave: 'Sauvegarder',
  // Language switcher
  langLabel: 'Langue',
  langEn: 'English',
  langEs: 'Español',
  langFr: 'Français',
  langPt: 'Português',
} as const;

const pt = {
  // Nav
  navWork: 'Trabalhos',
  navServices: 'Serviços',
  navAbout: 'Sobre',
  navNotes: 'Notas',
  navTalk: 'Vamos conversar',
  // Hero
  heroEyebrow: 'PRÁTICA DE SOM INDEPENDENTE PUBLICIDADE / CINEMA / JOGOS',
  heroHeadline: 'Som que faz você sentir.',
  heroSubheadline: 'Precisão na edição. Emoção na mixagem. Som distinto para histórias, marcas e mundos.',
  heroButton: 'Explorar o trabalho',
  heroCaption: 'MOSAICO SOUND — ÁUDIO MULTIDISCIPLINAR',
  heroScroll: 'ROLE PARA DESCOBRIR',
  heroSignal: 'OUVIR O SINAL',
  heroSignalPlaying: 'SILENCIAR SINAL',
  heroSignalNote: 'TONO INTERATIVO / NÃO É ÁUDIO DO PORTFÓLIO',
  // Services
  servicesLabel: '01 / A PRÁTICA',
  servicesHeadline: 'Diferentes meios. Um ouvido atento.',
  service1Title: 'Edição de diálogos',
  service1Desc: 'Vozes claras e naturais. Montagem, limpeza e restauração de diálogos que preservam a performance.',
  service1Tag: 'CINEMA / PUBLICIDADE',
  service2Title: 'Engenharia de áudio',
  service2Desc: 'Gravação, edição e mixagem com cuidado técnico. Um som coeso desde a primeira tomada até a entrega final.',
  service2Tag: 'GRAVAÇÃO / PÓS-PRODUÇÃO',
  service3Title: 'Design de som para jogos',
  service3Desc: 'Personagem, atmosfera e detalhes sonoros responsivos. Som construído para o jogador e para dar vida a um mundo.',
  service3Tag: 'INTERATIVO / IMERSIVO',
  // Portfolio
  portfolioLabel: '02 / OUÇA DE PERTO',
  portfolioHeadline: 'Feito para ser ouvido.',
  portfolioTag: 'FONE RECOMENDADO',
  portfolioAll: 'Todos',
  portfolioAdvertising: 'Publicidade',
  portfolioFilm: 'Cinema',
  portfolioGames: 'Jogos',
  project1Title: 'Áudio de Campanha de Marca',
  project1Desc: 'Design de som e mixagem completos para uma campanha publicitária nacional.',
  project1Category: 'Publicidade',
  project2Title: 'Trilha Sonora de Curta-Metragem',
  project2Desc: 'Trilha sonora original e edição de diálogos para um curta-metragem premiado.',
  project2Category: 'Cinema',
  project3Title: 'Som de Jogo Mobile',
  project3Desc: 'Sistema de áudio interativo e efeitos sonoros para um jogo de quebra-cabeça mobile.',
  project3Category: 'Jogos',
  // About
  aboutLabel: '03 / POR TRÁS DO SOM',
  aboutHeadline: 'Uma mente técnica. Um instinto artístico.',
  aboutLead: 'Um artesão do som independente trabalhando na interseção entre narrativa, tecnologia e escuta.',
  aboutBody: 'Da menor respiração em uma edição de diálogo à atmosfera de um mundo interativo, a abordagem é a mesma: entender a intenção, encontrar o detalhe e dar um propósito a cada som.',
  aboutButton: 'Vamos fazer algo ressoar',
  // Journal
  journalLabel: '04 / NOTAS DO ESTÚDIO',
  journalHeadline: 'Pensamentos do lado da escuta.',
  article1Title: 'A Arte da Edição de Diálogos',
  article1Body: 'A edição de diálogos é muitas vezes invisível quando bem feita. Trata-se de preservar a performance enquanto remove as distrações — tom ambiente, ruído de boca, oclusivas — sem que a voz soe artificial.',
  article2Title: 'Design de Som para Mídia Interativa',
  article2Body: 'O design de som para jogos requer uma mentalidade diferente da mídia linear. Cada som deve responder à entrada do jogador enquanto mantém a atmosfera e a clareza.',
  // Contact
  contactLabel: '05 / INICIE UMA CONVERSA',
  contactHeadline: 'Seu próximo projeto. Vamos conversar.',
  contactBody: 'Me conte o que você está criando, em que ponto do processo está e o que precisa do som.',
  contactTag: 'CONSULTAS DE PROJETO / SOLICITAÇÕES DE ENCONTRO',
  contactInfo: 'Os encontros são confirmados pessoalmente após sua solicitação. O escopo do projeto e os acordos de pagamento são definidos antes de começar.',
  contactEmailLabel: 'E-mail',
  contactPhoneLabel: 'Telefone',
  // Newsletter
  newsletterHeadline: 'Fique por dentro.',
  newsletterSubtext: 'Notas ocasionais do estúdio. Novo trabalho. Sem ruído.',
  newsletterInfo: 'Para atualizações, siga nas redes sociais ou entre em contato diretamente:',
  // Footer
  footerBrand: 'mosaico sound',
  footerTagline: 'SOM INDEPENDENTE. IMPACTO INTENCIONAL.',
  footerCopyright: '© 2026 MOSAICO SOUND',
  footerCookies: 'Configurações de cookies',
  // Cookies
  cookieTitle: 'Uma nota sobre cookies',
  cookieDesc: 'Cookies essenciais mantêm o site funcionando. Cookies opcionais ajudam a medir visitas e publicidade.',
  cookieAnalytics: 'Análise — estatísticas de visitantes',
  cookieMarketing: 'Marketing — medição de anúncios',
  cookiePlatform: 'Análise de plataforma — melhorias de experiência no Hostinger',
  cookieReject: 'Rejeitar opcionais',
  cookieAccept: 'Aceitar todos',
  cookieCustomize: 'Personalizar',
  cookieSave: 'Salvar escolha',
  // Language switcher
  langLabel: 'Idioma',
  langEn: 'English',
  langEs: 'Español',
  langFr: 'Français',
  langPt: 'Português',
} as const;

const translations = { en, es, fr, pt };

const I18nContext = createContext<Translations>({ lang: 'en', t: en });

export function useTranslations(): Translations {
  return useContext(I18nContext);
}

export function getInitialLanguage(): Language {
  try {
    const stored = localStorage.getItem('mosaico-lang');
    if (stored === 'es') return 'es';
    if (stored === 'fr') return 'fr';
    if (stored === 'pt') return 'pt';
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('pt')) return 'pt';
  } catch {
    // SSR or no localStorage
  }
  return 'en';
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    // Try to get from localStorage or browser locale
    const stored = localStorage.getItem('mosaico-lang');
    if (stored === 'es') return 'es';
    if (stored === 'fr') return 'fr';
    if (stored === 'pt') return 'pt';
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('fr')) return 'fr';
    if (browserLang.startsWith('pt')) return 'pt';
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('mosaico-lang', lang);
  }, [lang]);

  return (
    <I18nContext.Provider value={{ lang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}
