import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Certifications", "Contact"];

const SKILLS = {
  Languages: ["Java", "JavaScript"],
  Frontend: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "React.js", "Responsive Design"],
  Backend: ["Node.js", "MySQL", "MongoDB", "RESTful APIs"],
  "Tools & Deployment": ["Linux", "VS Code", "Git", "GitHub", "GitLab", "Jenkins", "Figma", "Miro", "Postman", "Render", "Vercel", "Netlify", "MongoDB Atlas"],
};

const PROJECTS = [
  {
    name: "SHOPWAVE",
    tag: "Full Stack · E-Commerce Platform",
    emoji: "🛒",
    desc: "A complete e-commerce platform with product catalog, shopping cart, wishlist, and admin dashboard. Features JWT authentication, bcrypt password hashing, and RESTful APIs.",
    stack: ["Node.js", "MongoDB", "JWT", "HTML5", "CSS3", "JavaScript", "Render"],
    color: "#a8edea",
    link: "https://shopwave-2wet.onrender.com/",
  },
  {
    name: "PORTRAIT VIEW",
    tag: "Web Development · Frontend",
    emoji: "🖼️",
    desc: "A responsive image web application built with HTML, CSS, Bootstrap, and JavaScript — designed to enhance user engagement and visual storytelling.",
    stack: ["HTML5", "CSS3", "Bootstrap", "JavaScript"],
    color: "#b8f5d0",
    link: "https://github.com/Kanimitha-S/Kanimitha-S/tree/Kanimitha-S-portrait-view",
  },
  {
    name: "FLIXIFY",
    tag: "UI/UX Design · Frontend",
    emoji: "🎬",
    desc: "A movie streaming app interface inspired by Hotstar and Netflix, prototyped with high-fidelity designs in Figma and Miro.",
    stack: ["Figma", "Miro", "UI/UX"],
    color: "#ffd6a5",
    link: "https://github.com/Kanimitha-S/Kanimitha-S/tree/Kanimitha-S-UI%26UX-Design",
  },
  {
    name: "HEXNET",
    tag: "Cyber Security",
    emoji: "🛡️",
    desc: "A cybersecurity web application housing RAMPART — an intrusion detection system built with Python and deep learning to identify network threats.",
    stack: ["Python", "Deep Learning", "Security"],
    color: "#c9b8f5",
    link: "https://github.com/Kanimitha-S/Kanimitha-S/tree/Kanimitha-S-Hexnet",
  },
];

const CERTS = [
  { title: "OOPS in Java", org: "Great Learning Academy", icon: "☕" },
  { title: "Web Development", org: "Techvolt Software", icon: "🌐" },
  { title: "Fortinet Certified Associate in Cybersecurity", org: "FORTINET", icon: "🔐" },
  { title: "Fortinet Certified Fundamentals in Cybersecurity", org: "FORTINET", icon: "🔒" },
  { title: "Java Programming", org: "Simplilearn", icon: "💻" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Section({ id, children, style }) {
  const [ref, visible] = useInView();
  return (
    <section
      id={id}
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(36px)",
        transition: "opacity 0.7s ease, transform 0.7s ease",
        ...style,
      }}
    >
      {children}
    </section>
  );
}

export default function Portfolio() {
  const [active, setActive] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const roles = ["Full Stack Developer", "UI/UX Designer", "Java Developer"];
  const roleIdx = useRef(0);
  const charIdx = useRef(0);
  const deleting = useRef(false);

  useEffect(() => {
    let timeout;
    const tick = () => {
      const current = roles[roleIdx.current];
      if (!deleting.current) {
        setTyped(current.slice(0, charIdx.current + 1));
        charIdx.current++;
        if (charIdx.current === current.length) { deleting.current = true; timeout = setTimeout(tick, 1400); return; }
      } else {
        setTyped(current.slice(0, charIdx.current - 1));
        charIdx.current--;
        if (charIdx.current === 0) { deleting.current = false; roleIdx.current = (roleIdx.current + 1) % roles.length; }
      }
      timeout = setTimeout(tick, deleting.current ? 60 : 90);
    };
    timeout = setTimeout(tick, 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const handler = () => {
      const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()));
      const scrollY = window.scrollY + 100;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) { setActive(NAV_LINKS[i]); break; }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const s = styles;

  return (
    <div style={s.root}>
      {/* Grain overlay */}
      <div style={s.grain} />

      {/* Blobs */}
      <div style={{ ...s.blob, top: "-120px", left: "-80px", background: "radial-gradient(circle, #a8edea88 0%, transparent 70%)" }} />
      <div style={{ ...s.blob, bottom: "10%", right: "-100px", background: "radial-gradient(circle, #fed6e388 0%, transparent 70%)" }} />
      <div style={{ ...s.blob, top: "40%", left: "30%", background: "radial-gradient(circle, #c9b8f540 0%, transparent 70%)", width: 400, height: 400 }} />

      {/* NAV */}
      <nav style={s.nav}>
        <span style={s.navLogo}>KS</span>
        <div style={s.navLinks}>
          {NAV_LINKS.map(n => (
            <button key={n} onClick={() => scrollTo(n)} style={{ ...s.navBtn, ...(active === n ? s.navBtnActive : {}) }}>
              {n}
              {active === n && <span style={s.navDot} />}
            </button>
          ))}
        </div>
        <button style={s.hamburger} onClick={() => setMenuOpen(m => !m)}>
          <span style={{ ...s.bar, transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
          <span style={{ ...s.bar, opacity: menuOpen ? 0 : 1 }} />
          <span style={{ ...s.bar, transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
        </button>
      </nav>
      {menuOpen && (
        <div style={s.mobileMenu}>
          {NAV_LINKS.map(n => <button key={n} onClick={() => scrollTo(n)} style={s.mobileBtn}>{n}</button>)}
        </div>
      )}

      <main style={s.main}>
        {/* HERO */}
        <section id="about" style={s.hero}>
          <div style={s.heroText}>
            <p style={s.heroGreet}>Hello, I'm</p>
            <h1 style={s.heroName}>Kanimitha S</h1>
            <div style={s.heroRole}>
              <span style={s.roleText}>{typed}</span>
              <span style={s.cursor}>|</span>
            </div>
            <p style={s.heroBio}>
              A responsible and disciplined engineer who values organization and efficiency —
              looking for a challenging role to apply technical skills, contribute to growth, and keep evolving.
            </p>
            <div style={s.heroCtas}>
              <button onClick={() => scrollTo("Projects")} style={s.ctaPrimary}>View My Work</button>
              <button onClick={() => scrollTo("Contact")} style={s.ctaSecondary}>Get In Touch</button>
            </div>
            <div style={s.heroMeta}>
              <span style={s.metaChip}>📍 Coimbatore, India</span>
              <span style={s.metaChip}>🎓 B.E. CSE 2025</span>
              <span style={s.metaChip}>⭐ CGPA 8.66</span>
            </div>
          </div>
          <div style={s.heroVisual}>
            <div style={s.avatarRing}>
              <div style={s.avatarInner}>
                <span style={{ fontSize: 72 }}>👩‍💻</span>
              </div>
            </div>
            <div style={s.floatBadge1}>☕ Java</div>
            <div style={s.floatBadge2}>🛡️ Security</div>
            <div style={s.floatBadge3}>🎨 UI/UX</div>
          </div>
        </section>

        {/* SKILLS */}
        <Section id="skills" style={s.sectionWrap}>
          <h2 style={s.sectionTitle}>Technical <span style={s.accent}>Skills</span></h2>
          <p style={s.sectionSub}>Technologies and tools I work with</p>
          <div style={s.skillsGrid}>
            {Object.entries(SKILLS).map(([cat, items]) => (
              <div key={cat} style={s.skillCard}>
                <h3 style={s.skillCat}>{cat}</h3>
                <div style={s.skillTags}>
                  {items.map(it => <span key={it} style={s.skillTag}>{it}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* EXPERIENCE */}
        <Section id="experience" style={s.sectionWrap}>
          <h2 style={s.sectionTitle}>Technical <span style={s.accent}>Experience</span></h2>
          <p style={s.sectionSub}>Where I've built and learned</p>
          <div style={s.timeline}>
            <div style={s.timelineLine} />
            <div style={s.timelineItem}>
              <div style={s.timelineDot} />
              <div style={s.timelineCard}>
                <div style={s.timelineHeader}>
                  <div>
                    <h3 style={s.timelineRole}>Full Stack Development Intern</h3>
                    <p style={s.timelineOrg}>Techvolt Software Pvt. Ltd</p>
                  </div>
                  <span style={s.timelineBadge}>Internship</span>
                </div>
                <p style={s.timelineDesc}>
                  Gained hands-on experience in full stack development, working with frontend technologies and backend frameworks. Contributed to real-world projects spanning web development.
                </p>
                <div style={s.skillTags}>
                  {["HTML", "CSS", "JavaScript", "Java", "Node.js", "MySQL"].map(t => <span key={t} style={s.skillTag}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
          <div style={s.eduCard}>
            <div style={s.eduIcon}>🎓</div>
            <div>
              <h3 style={s.eduTitle}>B.E. Computer Science & Engineering</h3>
              <p style={s.eduOrg}>V.S.B College of Engineering Technical Campus, Coimbatore</p>
              <div style={s.eduMeta}>
                <span style={s.metaChip}>2021 – 2025</span>
                <span style={{ ...s.metaChip, background: "#b8f5d0", color: "#1a7a4a" }}>CGPA: 8.66</span>
              </div>
            </div>
          </div>
        </Section>

        {/* PROJECTS */}
        <Section id="projects" style={s.sectionWrap}>
          <h2 style={s.sectionTitle}>Featured <span style={s.accent}>Projects</span></h2>
          <p style={s.sectionSub}>Things I've built and shipped</p>
          <div style={s.projectsGrid}>
            {PROJECTS.map((p, i) => (
              <div key={i} style={{ ...s.projectCard, animationDelay: `${i * 0.1}s` }}>
                <div style={{ ...s.projectTop, background: p.color }}>
                  <span style={s.projectEmoji}>{p.emoji}</span>
                </div>
                <div style={s.projectBody}>
                  <span style={s.projectTag}>{p.tag}</span>
                  <a href={p.link} target="_blank" rel="noreferrer" style={s.projectNameLink}>
  {p.name} <span style={{ fontSize: 14 }}>↗</span>
</a>
                  <p style={s.projectDesc}>{p.desc}</p>
                  <div style={s.skillTags}>
                    {p.stack.map(t => <span key={t} style={s.skillTag}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CERTIFICATIONS */}
        <Section id="certifications" style={s.sectionWrap}>
          <h2 style={s.sectionTitle}>Certifi<span style={s.accent}>cations</span></h2>
          <p style={s.sectionSub}>Credentials and achievements</p>
          <div style={s.certsGrid}>
            {CERTS.map((c, i) => (
              <div key={i} style={s.certCard}>
                <span style={s.certIcon}>{c.icon}</span>
                <div>
                  <h4 style={s.certTitle}>{c.title}</h4>
                  <p style={s.certOrg}>{c.org}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* CONTACT */}
        <Section id="contact" style={{ ...s.sectionWrap, marginBottom: 0 }}>
          <h2 style={s.sectionTitle}>Get In <span style={s.accent}>Touch</span></h2>
          <p style={s.sectionSub}>Let's build something great together</p>
          <div style={s.contactBox}>
            <div style={s.contactLinks}>
              <a href="mailto:kani354sk@gmail.com" style={s.contactCard}>
                <span style={s.contactIcon}>✉️</span>
                <div>
                  <p style={s.contactLabel}>Email</p>
                  <p style={s.contactVal}>kani354sk@gmail.com</p>
                </div>
              </a>
              <a href="tel:6385424510" style={s.contactCard}>
                <span style={s.contactIcon}>📱</span>
                <div>
                  <p style={s.contactLabel}>Phone</p>
                  <p style={s.contactVal}>+91 6385424510</p>
                </div>
              </a>
              <a href="https://github.com/Kanimitha-S/Kanimitha-S" target="_blank" rel="noreferrer" style={s.contactCard}>
                <svg style={{ width: 28, height: 28, flexShrink: 0 }} viewBox="0 0 24 24" fill="#1a1a2e" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                <div>
                  <p style={s.contactLabel}>GitHub</p>
                  <p style={s.contactVal}>Kanimitha-S</p>
                </div>
              </a>
              <div style={s.contactCard}>
                <span style={s.contactIcon}>📍</span>
                <div>
                  <p style={s.contactLabel}>Location</p>
                  <p style={s.contactVal}>Coimbatore, India</p>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </main>

      <footer style={s.footer}>
        <p>Designed & Built by <strong>Kanimitha S</strong> · 2025</p>
      </footer>
    </div>
  );
}

// ─── STYLES ────────────────────────────────────────────────────────────────────
const styles = {
  root: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#f7f5f0", color: "#1a1a2e", minHeight: "100vh", width: "100%", position: "relative", overflowX: "hidden", margin: 0, padding: 0 },
  grain: { position: "fixed", inset: 0, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E\")", pointerEvents: "none", zIndex: 0, opacity: 0.4 },
  blob: { position: "fixed", width: 500, height: 500, borderRadius: "50%", filter: "blur(80px)", pointerEvents: "none", zIndex: 0 },

  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 40px", background: "rgba(247,245,240,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(0,0,0,0.06)" },
  navLogo: { fontWeight: 900, fontSize: 32, letterSpacing: "-0.5px", background: "linear-gradient(135deg,#a8edea,#fed6e3)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  navLinks: { display: "flex", gap: 4, "@media(max-width:768px)": { display: "none" } },
  navBtn: { background: "none", border: "none", cursor: "pointer", padding: "6px 14px", fontSize: 14, fontWeight: 500, color: "#555", borderRadius: 20, transition: "all 0.2s", position: "relative" },
  navBtnActive: { color: "#1a1a2e", background: "rgba(168,237,234,0.3)" },
  navDot: { position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 4, height: 4, borderRadius: "50%", background: "#a8edea", display: "block" },
  hamburger: { display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 4 },
  bar: { display: "block", width: 24, height: 2, background: "#1a1a2e", borderRadius: 2, transition: "all 0.3s" },
  mobileMenu: { position: "fixed", top: 64, left: 0, right: 0, background: "rgba(247,245,240,0.97)", backdropFilter: "blur(12px)", zIndex: 99, display: "flex", flexDirection: "column", padding: "16px 24px", gap: 4, borderBottom: "1px solid rgba(0,0,0,0.08)" },
  mobileBtn: { background: "none", border: "none", textAlign: "left", padding: "12px 8px", fontSize: 16, fontWeight: 500, cursor: "pointer", color: "#1a1a2e" },

  main: { maxWidth: 1100, margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1, boxSizing: "border-box" },

  hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 40, paddingTop: 80, flexWrap: "wrap", boxSizing: "border-box", width: "100%" },
  heroText: { flex: "1 1 400px", maxWidth: 560 },
  heroGreet: { fontSize: 16, fontWeight: 600, letterSpacing: 3, textTransform: "uppercase", color: "#888", marginBottom: 8 },
  heroName: { fontSize: "clamp(42px, 7vw, 76px)", fontWeight: 900, lineHeight: 1.05, letterSpacing: "-2px", margin: "0 0 16px", background: "linear-gradient(135deg, #1a1a2e 60%, #5a4a8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroRole: { fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 600, color: "#4a4a6a", marginBottom: 20, minHeight: 36, display: "flex", alignItems: "center", gap: 2 },
  roleText: { color: "#6b5ce7" },
  cursor: { color: "#a8edea", animation: "blink 1s step-end infinite", fontWeight: 300 },
  heroBio: { fontSize: 16, lineHeight: 1.8, color: "#666", marginBottom: 32, maxWidth: 480 },
  heroCtas: { display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 28 },
  ctaPrimary: { padding: "13px 28px", background: "linear-gradient(135deg, #a8edea, #6ee8d2)", border: "none", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer", color: "#1a1a2e", boxShadow: "0 4px 20px rgba(168,237,234,0.5)", transition: "transform 0.2s, box-shadow 0.2s" },
  ctaSecondary: { padding: "13px 28px", background: "transparent", border: "2px solid #1a1a2e", borderRadius: 50, fontWeight: 700, fontSize: 15, cursor: "pointer", color: "#1a1a2e", transition: "all 0.2s" },
  heroMeta: { display: "flex", gap: 10, flexWrap: "wrap" },
  metaChip: { fontSize: 13, padding: "5px 12px", background: "rgba(26,26,46,0.06)", borderRadius: 20, fontWeight: 500, color: "#444" },

  heroVisual: { flex: "0 0 auto", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: 280, height: 280 },
  avatarRing: { width: 220, height: 220, borderRadius: "50%", background: "linear-gradient(135deg, #a8edea, #fed6e3, #c9b8f5)", padding: 4, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 20px 60px rgba(168,237,234,0.4)", animation: "float 4s ease-in-out infinite" },
  avatarInner: { width: "100%", height: "100%", borderRadius: "50%", background: "#f7f5f0", display: "flex", alignItems: "center", justifyContent: "center" },
  floatBadge1: { position: "absolute", top: 10, right: -20, background: "#fff", padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", animation: "float 3s ease-in-out infinite" },
  floatBadge2: { position: "absolute", bottom: 30, right: -30, background: "#fff", padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", animation: "float 3.5s ease-in-out infinite 0.5s" },
  floatBadge3: { position: "absolute", bottom: 0, left: -20, background: "#fff", padding: "6px 12px", borderRadius: 20, fontSize: 13, fontWeight: 600, boxShadow: "0 4px 16px rgba(0,0,0,0.1)", animation: "float 4s ease-in-out infinite 1s" },

  sectionWrap: { padding: "80px 0" },
  sectionTitle: { fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 900, letterSpacing: "-1.5px", marginBottom: 8, color: "#0a0a0b"},
  sectionSub: { fontSize: 16, color: "#888", marginBottom: 48 },
  accent: { background: "linear-gradient(135deg, #a8edea, #6b5ce7)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },

  skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20, alignItems: "stretch" },
  skillCard: { background: "#fff", borderRadius: 20, padding: "24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)", transition: "transform 0.2s, box-shadow 0.2s", height: "280px", overflowY: "auto" },
  skillCat: { fontSize: 13, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: "#6b5ce7", marginBottom: 14 },
  skillTags: { display: "flex", flexWrap: "wrap", gap: 8 },
  skillTag: { fontSize: 13, padding: "4px 12px", background: "rgba(168,237,234,0.25)", borderRadius: 20, fontWeight: 500, color: "#2a5a57" },

  timeline: { position: "relative", paddingLeft: 40, marginBottom: 40 },
  timelineLine: { position: "absolute", left: 12, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, #a8edea, #fed6e3)" },
  timelineItem: { position: "relative", marginBottom: 32 },
  timelineDot: { position: "absolute", left: -34, top: 20, width: 14, height: 14, borderRadius: "50%", background: "#a8edea", border: "3px solid #f7f5f0", boxShadow: "0 0 0 3px #a8edea44" },
  timelineCard: { background: "#fff", borderRadius: 20, padding: 28, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" },
  timelineHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  timelineRole: { fontSize: 18, fontWeight: 800, marginBottom: 4 },
  timelineOrg: { fontSize: 14, color: "#888", fontWeight: 500 },
  timelineBadge: { fontSize: 12, padding: "4px 12px", background: "linear-gradient(135deg,#a8edea,#6ee8d2)", borderRadius: 20, fontWeight: 700, color: "#1a5a57" },
  timelineDesc: { fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 16 },

  eduCard: { background: "#fff", borderRadius: 20, padding: 28, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)", display: "flex", gap: 20, alignItems: "flex-start" },
  eduIcon: { fontSize: 36, flexShrink: 0 },
  eduTitle: { fontSize: 18, fontWeight: 800, marginBottom: 4 },
  eduOrg: { fontSize: 14, color: "#888", marginBottom: 12 },
  eduMeta: { display: "flex", gap: 10, flexWrap: "wrap" },

  projectsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 },
  projectCard: { background: "#fff", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 16px rgba(0,0,0,0.04)", transition: "transform 0.3s, box-shadow 0.3s" },
  projectTop: { height: 120, display: "flex", alignItems: "center", justifyContent: "center" },
  projectEmoji: { fontSize: 52 },
  projectBody: { padding: 24 },
  projectTag: { fontSize: 12, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase", color: "#6b5ce7" },
  projectName: { fontSize: 20, fontWeight: 900, marginTop: 6, marginBottom: 10, letterSpacing: "-0.5px", cursor: "pointer", textDecoration: "none", color: "#1a1a2e" },
  projectNameLink: { fontSize: 20, fontWeight: 900, marginTop: 6, marginBottom: 10, letterSpacing: "-0.5px", cursor: "pointer", textDecoration: "none", color: "#1a1a2e", display: "block" },
  projectDesc: { fontSize: 14, color: "#666", lineHeight: 1.7, marginBottom: 16 },

  certsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  certCard: { background: "#fff", borderRadius: 18, padding: "20px 24px", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", display: "flex", gap: 16, alignItems: "center", transition: "transform 0.2s" },
  certIcon: { fontSize: 30, flexShrink: 0 },
  certTitle: { fontSize: 14, fontWeight: 700, marginBottom: 4, lineHeight: 1.4 },
  certOrg: { fontSize: 12, color: "#888", fontWeight: 500 },

  contactBox: { background: "#fff", borderRadius: 24, padding: 40, border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 32px rgba(0,0,0,0.06)" },
  contactLinks: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px,1fr))", gap: 16 },
  contactCard: { display: "flex", alignItems: "center", gap: 14, padding: "18px 20px", background: "#f7f5f0", borderRadius: 16, textDecoration: "none", color: "inherit", transition: "transform 0.2s, background 0.2s", cursor: "pointer" },
  contactIcon: { fontSize: 28, flexShrink: 0 },
  contactLabel: { fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "#888", marginBottom: 2 },
  contactVal: { fontSize: 14, fontWeight: 600, color: "#1a1a2e" },

  footer: { textAlign: "center", padding: "32px 24px", fontSize: 14, color: "#aaa", borderTop: "1px solid rgba(0,0,0,0.06)", position: "relative", zIndex: 1 },
};
