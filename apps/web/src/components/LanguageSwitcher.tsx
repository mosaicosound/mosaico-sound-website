import { useState, useRef, useEffect } from 'react';
import { useTranslations } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const { lang, t } = useTranslations();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, [open]);

  const switchLang = (l: 'en' | 'es' | 'fr' | 'pt') => {
    localStorage.setItem('mosaico-lang', l);
    window.location.reload();
  };

  const flagMap = { en: '🇨🇦', es: '🇨🇴', fr: '🇨🇦', pt: '🇧🇷' };
  const flagEmoji = flagMap[lang] || '🇨🇦';

  return (
    <div className="lang-switcher" ref={ref}>
      <button
        className="lang-toggle"
        onClick={() => setOpen(!open)}
        aria-label={t.langLabel}
        aria-expanded={open}
      >
        <span className="lang-flag">{flagEmoji}</span>
        <span className="lang-code">{lang.toUpperCase()}</span>
        <span className="lang-arrow">▾</span>
      </button>
      {open && (
        <div className="lang-dropdown">
          <button
            className={lang === 'en' ? 'active' : ''}
            onClick={() => switchLang('en')}
          >
            <span className="lang-flag">🇨🇦</span>
            <span>{t.langEn}</span>
          </button>
          <button
            className={lang === 'fr' ? 'active' : ''}
            onClick={() => switchLang('fr')}
          >
            <span className="lang-flag">🇨🇦</span>
            <span>{t.langFr}</span>
          </button>
          <button
            className={lang === 'pt' ? 'active' : ''}
            onClick={() => switchLang('pt')}
          >
            <span className="lang-flag">🇧🇷</span>
            <span>{t.langPt}</span>
          </button>
          <button
            className={lang === 'es' ? 'active' : ''}
            onClick={() => switchLang('es')}
          >
            <span className="lang-flag">🇨🇴</span>
            <span>{t.langEs}</span>
          </button>
        </div>
      )}
    </div>
  );
}
