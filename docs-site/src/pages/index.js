import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';

const FONTS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=DM+Sans:wght@400;500;700&display=swap');
`;

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '4rem 2rem',
    fontFamily: "'DM Sans', system-ui, sans-serif",
    position: 'relative',
    overflow: 'hidden',
  },
  light: {
    background: '#FAF7F2',
    color: '#2D1B0E',
  },
  dark: {
    background: '#1A1A2E',
    color: '#E8E4DF',
  },
  grain: {
    position: 'absolute',
    inset: 0,
    opacity: 0.03,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
    pointerEvents: 'none',
  },
  inner: {
    maxWidth: '1100px',
    width: '100%',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '3rem',
    position: 'relative',
    zIndex: 1,
  },
  eyebrow: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: '0.8rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    marginBottom: '1rem',
    opacity: 0.6,
  },
  heading: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: 'clamp(2.8rem, 6vw, 5rem)',
    fontWeight: 700,
    lineHeight: 1.05,
    letterSpacing: '-0.03em',
    margin: '0 0 1.5rem 0',
  },
  accent: {
    light: { color: '#8B6914' },
    dark: { color: '#D4A574' },
  },
  description: {
    fontSize: '1.15rem',
    lineHeight: 1.7,
    maxWidth: '540px',
    margin: '0 0 2.5rem 0',
    opacity: 0.8,
  },
  cta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.9rem 2rem',
    borderRadius: '6px',
    fontSize: '1rem',
    fontWeight: 600,
    fontFamily: "'DM Sans', system-ui, sans-serif",
    textDecoration: 'none',
    transition: 'transform 0.15s ease, box-shadow 0.15s ease',
  },
  ctaLight: {
    background: '#2D1B0E',
    color: '#FAF7F2',
  },
  ctaDark: {
    background: '#D4A574',
    color: '#1A1A2E',
  },
  aside: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    paddingTop: '1rem',
  },
  card: {
    padding: '1.25rem 1.5rem',
    borderRadius: '8px',
    border: '1px solid',
    transition: 'transform 0.15s ease',
  },
  cardLight: {
    borderColor: 'rgba(45, 27, 14, 0.1)',
    background: 'rgba(255, 255, 255, 0.5)',
  },
  cardDark: {
    borderColor: 'rgba(232, 228, 223, 0.08)',
    background: 'rgba(255, 255, 255, 0.03)',
  },
  cardTitle: {
    fontFamily: "'Source Serif 4', Georgia, serif",
    fontSize: '1.1rem',
    fontWeight: 600,
    margin: '0 0 0.35rem 0',
    letterSpacing: '-0.01em',
  },
  cardDesc: {
    fontSize: '0.9rem',
    margin: 0,
    opacity: 0.65,
    lineHeight: 1.5,
  },
  decorLine: {
    width: '60px',
    height: '3px',
    marginBottom: '2rem',
    borderRadius: '2px',
  },
  decorLineLight: {
    background: '#D4A574',
  },
  decorLineDark: {
    background: '#D4A574',
    opacity: 0.6,
  },
};

const DIATAXIS = [
  { title: 'Tutorials', desc: 'Guided, hands-on learning experiences' },
  { title: 'How-to Guides', desc: 'Practical steps for specific tasks' },
  { title: 'Explanations', desc: 'Understanding concepts and context' },
  { title: 'Reference', desc: 'Lookup information and specifications' },
];

export default function Home() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDark(mql.matches);

    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.getAttribute('data-theme') === 'dark');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  const mode = isDark ? 'dark' : 'light';

  return (
    <>
      <Head>
        <style>{FONTS_CSS}</style>
      </Head>
      <main
        style={{
          ...styles.container,
          ...styles[mode],
        }}
      >
        <div style={styles.grain} />
        <div
          style={{
            ...styles.inner,
            gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)',
          }}
        >
          <div>
            <div style={styles.eyebrow}>Claude Code Learning Environment</div>
            <div
              style={{
                ...styles.decorLine,
                ...(isDark ? styles.decorLineDark : styles.decorLineLight),
              }}
            />
            <h1 style={styles.heading}>
              Learn{' '}
              <span style={styles.accent[mode]}>anything</span>
              <br />
              at your own pace
            </h1>
            <p style={styles.description}>
              A personalised curriculum generated by AI, structured using the
              Diataxis framework. Tutorials, explanations, how-to guides, and
              reference material — all tailored to what you want to learn.
            </p>
            <Link
              to="/docs/intro"
              style={{
                ...styles.cta,
                ...(isDark ? styles.ctaDark : styles.ctaLight),
              }}
            >
              Start learning
            </Link>
          </div>

          <div style={styles.aside}>
            {DIATAXIS.map((item) => (
              <div
                key={item.title}
                style={{
                  ...styles.card,
                  ...(isDark ? styles.cardDark : styles.cardLight),
                }}
              >
                <p style={{ ...styles.cardTitle, ...styles.accent[mode] }}>
                  {item.title}
                </p>
                <p style={styles.cardDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
