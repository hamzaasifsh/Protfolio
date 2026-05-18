import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

gsap.registerPlugin(ScrollTrigger)

const contact = {
  phone: '7507993613',
  email: 'hamzaasif41100@gmail.com',
  github: 'https://github.com/hamzaasifsh',
  linkedin: 'https://www.linkedin.com/in/hamza-asif-shaikh-3350b1232/',
}

const stats = [
  ['1+', 'Years Experience'],
  ['2+', 'Projects Completed'],
  ['10+', 'Technologies'],
  ['0', 'Happy Clients'],
]

const skills = [
  ['React.js', 95],
  ['Node.js', 90],
  ['MongoDB', 85],
  ['Express.js', 90],
  ['Tailwind CSS', 95],
  ['Framer Motion', 88],
  ['GSAP Animation', 92],
  ['AI / API Integration', 86],
]

const projects = [
  {
    name: 'AI Healthcare Chatbot',
    summary: 'AI-powered healthcare assistant for symptom guidance, patient intake, and clean chatbot flows.',
    stack: ['React', 'Node.js', 'AI API'],
  },
  {
    name: 'FunFair E-commerce',
    summary: 'Vendor and event commerce platform with booking flows, product discovery, and admin-style UI.',
    stack: ['React', 'Node.js', 'MongoDB'],
  },
  {
    name: 'Smart Savings Tracker',
    summary: 'AI-based savings dashboard to manage expenses, charts, goals, and predictive spending insights.',
    stack: ['React', 'AI', 'Charts'],
  },
]

const demoWebsites = [
  {
    name: 'FunFair Vendor',
    summary: 'Live vendor home page published on Vercel for the FunFair commerce experience.',
    url: 'https://funfair-vendor.vercel.app/',
    stack: ['Live Demo', 'Vercel', 'Vendor UI'],
  },
]

const services = [
  ['AI Startup UI', 'Cinematic landing pages with premium product storytelling'],
  ['Frontend Systems', 'Scalable React interfaces with clean component structure'],
  ['Motion Design', 'GSAP scroll reveals, hover glow, and polished transitions'],
  ['Performance', 'Fast, responsive builds without heavy 3D dependencies'],
]

const testimonials = [
  ['Premium visuals with a clean product feel.', 'Startup Founder'],
  ['The animation feels smooth and professional.', 'Product Designer'],
  ['Strong frontend structure and polished UI.', 'Developer Lead'],
]

function App() {
  const rootRef = useRef(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const root = rootRef.current

    const handleAnchorClick = (event) => {
      const link = event.target.closest('a[href^="#"]')

      if (!link || !root?.contains(link)) {
        return
      }

      const targetId = link.getAttribute('href')
      const target = targetId && document.querySelector(targetId)

      if (!target) {
        return
      }

      event.preventDefault()

      const offset = 24
      const targetTop = target.getBoundingClientRect().top + window.scrollY - offset

      window.scrollTo({
        top: Math.max(targetTop, 0),
        behavior: reduceMotion ? 'auto' : 'smooth',
      })

      window.history.pushState(null, '', targetId)
    }

    root?.addEventListener('click', handleAnchorClick)

    return () => root?.removeEventListener('click', handleAnchorClick)
  }, [])

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const context = gsap.context(() => {
      if (reduceMotion) {
        gsap.set('.reveal, .floating-card, .metric-card, .project-card, .service-card, .timeline-item, .cinematic-card, .about-copy-card, .about-visual, .about-chip', {
          opacity: 1,
          y: 0,
          scale: 1,
          clearProps: 'transform',
        })
        return undefined
      }

      gsap
        .timeline({ defaults: { ease: 'power3.out' } })
        .from('.hero-badge', { y: 14, opacity: 0, duration: 0.55 }, '-=0.35')
        .from('.hero-title span', { y: 42, opacity: 0, duration: 0.8, stagger: 0.08 }, '-=0.25')
        .from('.hero-copy, .hero-actions, .social-row', { y: 22, opacity: 0, duration: 0.65, stagger: 0.1 }, '-=0.3')
        .from('.hero-visual-wrap', { x: 46, opacity: 0, duration: 0.85 }, '-=0.65')
        .from('.floating-card, .data-panel', { scale: 0.84, opacity: 0, duration: 0.55, stagger: 0.07 }, '-=0.35')

      gsap.to('.floating-card', {
        y: -14,
        duration: 3.4,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        stagger: 0.22,
      })

      gsap.utils.toArray('.reveal, .metric-card, .project-card, .service-card, .timeline-item').forEach((element) => {
        gsap.from(element, {
          scrollTrigger: {
            trigger: element,
            start: 'top 84%',
          },
          y: 38,
          opacity: 0,
          duration: 0.75,
          ease: 'power3.out',
        })
      })

      gsap.from('.cinematic-card', {
        scrollTrigger: {
          trigger: '.cinematic-showcase',
          start: 'top 78%',
        },
        y: 54,
        scale: 0.92,
        opacity: 0,
        duration: 0.95,
        ease: 'back.out(1.45)',
      })

      gsap
        .timeline({
          scrollTrigger: {
            trigger: '.about-panel',
            start: 'top 78%',
          },
          defaults: { ease: 'power3.out' },
        })
        .from('.about-copy-card', { x: -42, opacity: 0, duration: 0.8 })
        .from('.about-name, .about-role, .about-text, .about-actions', { y: 24, opacity: 0, duration: 0.62, stagger: 0.08 }, '-=0.5')
        .from('.about-chip', { y: 18, opacity: 0, scale: 0.9, duration: 0.42, stagger: 0.06 }, '-=0.35')
        .from('.about-visual', { x: 42, opacity: 0, scale: 0.94, rotation: 1.4, duration: 0.82 }, '-=0.75')
        .from('.about-photo-caption', { y: 28, opacity: 0, duration: 0.58 }, '-=0.42')

      gsap.from('.skill-fill', {
        scrollTrigger: {
          trigger: '.skills-panel',
          start: 'top 80%',
        },
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        stagger: 0.08,
        ease: 'power3.out',
      })
      return undefined
    }, rootRef)

    return () => context.revert()
  }, [])

  useEffect(() => {
    const videos = Array.from(document.querySelectorAll('.cinematic-video'))

    if (!('IntersectionObserver' in window)) {
      videos.forEach((video) => video.play().catch(() => undefined))
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target

          if (entry.isIntersecting) {
            video.play().catch(() => undefined)
            return
          }

          video.pause()
        })
      },
      { rootMargin: '160px 0px', threshold: 0.2 },
    )

    videos.forEach((video) => observer.observe(video))

    return () => observer.disconnect()
  }, [])

  return (
    <main ref={rootRef} className="portfolio-shell">
      <section id="home" className="hero-section">
        <div className="scroll-note">Scroll Down</div>
        <div className="hero-panel">
          <div className="hero-copy-block">
            <p className="hero-badge">Portfolio 2026</p>
            <h1 className="hero-title">
              <span>Hamza</span>
              <span>Shaikh</span>
            </h1>
            <p className="hero-copy">
              Engineer by education, designer by instinct, and MERN developer building AI products, SaaS interfaces,
              and cinematic web experiences with a strong visual impact.
            </p>
            <div className="hero-actions">
              <a className="primary-button" href="#projects">
                View My Work
              </a>
              <a className="ghost-button" href="#contact">
                Hire Me
              </a>
            </div>
            <div className="social-block">
              <span>Connect with me</span>
              <div className="social-row">
                <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">GH</a>
                <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">in</a>
                <a href={`tel:${contact.phone}`} aria-label="Call Hamza">Call</a>
                <a href={`mailto:${contact.email}`} aria-label="Email Hamza">Mail</a>
              </div>
            </div>
          </div>

          <div className="hero-visual-wrap">
            <div className="hero-video-frame">
              <video className="hero-video" src="/hero-video.mp4" autoPlay muted loop playsInline />
              <div className="video-glass-overlay" aria-hidden="true" />
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-panel reveal" aria-label="Portfolio metrics">
        {stats.map(([value, label]) => (
          <div className="metric-card" key={label}>
            <strong>{value}</strong>
            <span>{label}</span>
          </div>
        ))}
      </section>

      <section id="demos" className="demo-section reveal">
        <div className="section-heading editorial-heading">
          <p className="section-kicker">Demo Websites</p>
          <h2>Live websites you can open and experience directly.</h2>
        </div>
        <div className="demo-card-grid">
          {demoWebsites.map((demo) => (
            <article className="demo-card" key={demo.name}>
              <div className="demo-preview">
                <span>Live Preview</span>
              </div>
              <div className="demo-card-copy">
                <h3>{demo.name}</h3>
                <p>{demo.summary}</p>
                <div className="project-tags">
                  {(demo.stack ?? []).map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <a className="demo-link" href={demo.url} target="_blank" rel="noreferrer">
                Click Me
              </a>
            </article>
          ))}
        </div>
      </section>

      <section id="projects" className="projects-section reveal">
        <div className="section-heading editorial-heading">
          <p className="section-kicker">Selected Works</p>
          <h2>Clean product builds with strong engineering and visual direction.</h2>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <article className="project-row project-card" key={project.name}>
              <span className="project-index">{String(index + 1).padStart(2, '0')}</span>
              <div className="project-row-main">
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="project-tags">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
              <a href="#contact" aria-label={`Discuss ${project.name}`}>Discuss</a>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className="about-panel reveal">
        <div className="about-copy-card">
          <p className="section-kicker">About Me</p>
          <h2 className="about-name">Hamza Shaikh</h2>
          <strong className="about-role">Engineer by education, creator by instinct.</strong>
          <p className="about-text">
            I&apos;m an engineer by education, and my talent is making things look designed, polished, and awesome.
            I enjoy transforming ideas into scalable products, from AI healthcare platforms to multi-vendor
            e-commerce systems and SaaS solutions.
          </p>
          <p className="about-text">
            My goal is to combine design, technology, and innovation to build products that not only work well but
            also leave a strong visual impact.
          </p>
          <div className="about-chip-row" aria-label="About Hamza highlights">
            <span className="about-chip">AI Products</span>
            <span className="about-chip">MERN Stack</span>
            <span className="about-chip">SaaS UI</span>
            <span className="about-chip">Cinematic Design</span>
          </div>
          <div className="about-actions">
            <a className="mini-button" href="#contact">More About Me</a>
          </div>
        </div>
        <div className="about-visual">
          <div className="about-frame-label">Profile</div>
          <img src="/hamza-shaikh-profile.jpeg" alt="Hamza Shaikh" />
          <div className="about-photo-caption">
            <strong>Hamza Shaikh</strong>
            <span>MERN Stack Developer &amp; AI Enthusiast</span>
          </div>
        </div>
      </section>

      <section id="skills" className="skills-panel reveal">
        <div className="section-heading">
          <p className="section-kicker">Skills</p>
          <h2>Modern frontend stack with cinematic interaction design.</h2>
        </div>
        <div className="skill-list">
          {skills.map(([skill, value]) => (
            <div className="skill-item" key={skill}>
              <div>
                <span>{skill}</span>
                <strong>{value}%</strong>
              </div>
              <i>
                <b className="skill-fill" style={{ width: `${value}%` }} />
              </i>
            </div>
          ))}
        </div>
      </section>

      <section className="cinematic-showcase reveal" aria-label="Cinematic website video showcase">
        <article className="cinematic-card">
          <video
            className="cinematic-video"
            src="/cinematic-headphones.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Floating headphones cinematic product visual"
          />
          <div className="cinematic-shade" aria-hidden="true" />
          <div className="cinematic-copy">
            <span>Cinematic Product Visuals</span>
            <h2>Product-style cinematic videos can become premium website sections.</h2>
            <p>
              Large visual stories, fade-in motion, and silent looping video moments for portfolios, startups,
              and product storytelling.
            </p>
          </div>
        </article>
        <article className="cinematic-card cinematic-card-food">
          <video
            className="cinematic-video"
            src="/cinematic-food.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Tea product cinematic particle visual"
          />
          <div className="cinematic-shade" aria-hidden="true" />
          <div className="cinematic-copy">
            <span>Food Product Cinematics</span>
            <h2>Premium cinematic websites can be created for food products.</h2>
            <p>
              Elegant ingredient reveals, product motion, and silent looping visuals for tea, coffee, snacks,
              restaurants, and modern food brands.
            </p>
          </div>
        </article>
        <article className="cinematic-card cinematic-card-ai">
          <video
            className="cinematic-video"
            src="/cinematic-ai-car.mp4"
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="AI cinematic car regeneration visual"
          />
          <div className="cinematic-shade" aria-hidden="true" />
          <div className="cinematic-copy">
            <span>AI Cinematic Websites</span>
            <h2>Reach me out and we can make cool AI based cinematic websites
              With highe Qulatiy AI videous and nice UI/UX that will attract your Customers.</h2>
            <p>
              Futuristic motion, product reveals, animated storytelling, and premium website sections that make
              brands feel sharp, modern, and memorable.
            </p>
            <a className="cinematic-link" href="#contact">Reach Me Out</a>
          </div>
        </article>
      </section>

      <section id="services" className="service-strip">
        {services.map(([title, detail]) => (
          <article className="service-card" key={title}>
            <strong>{title}</strong>
            <span>{detail}</span>
          </article>
        ))}
      </section>

      <section id="experience" className="timeline-section reveal">
        <div className="section-heading">
          <p className="section-kicker">Experience Timeline</p>
          <h2>Focused on premium frontend systems, AI products, and reliable delivery.</h2>
        </div>
        <div className="timeline-list">
          <article className="timeline-item">
            <span>2026</span>
            <strong>MERN + AI Portfolio Systems</strong>
            <p>Building cinematic interfaces, AI product dashboards, and animated web experiences.</p>
          </article>
          <article className="timeline-item">
            <span>2025</span>
            <strong>Full Stack Project Development</strong>
            <p>Created healthcare chatbot, vendor commerce flows, dashboards, and API-backed UI screens.</p>
          </article>
          <article className="timeline-item">
            <span>2024</span>
            <strong>Computer Engineering Foundation</strong>
            <p>Built strong fundamentals in web development, databases, security, and problem solving.</p>
          </article>
        </div>
      </section>

      <section className="testimonials-section reveal">
        <div className="section-heading">
          <p className="section-kicker">Testimonials</p>
          <h2>Professional, clean, and built with a product mindset.</h2>
        </div>
        <div className="testimonial-grid">
          {testimonials.map(([quote, role]) => (
            <article className="testimonial-card" key={role}>
              <p>{quote}</p>
              <span>{role}</span>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className="contact-section reveal">
        <div>
          <p className="section-kicker">Contact</p>
          <h2>Let&apos;s build a premium portfolio or AI startup website.</h2>
          <div className="contact-grid">
            <a href={`tel:${contact.phone}`}>Phone: {contact.phone}</a>
            <a href={`mailto:${contact.email}`}>Email: {contact.email}</a>
            <a href={contact.github} target="_blank" rel="noreferrer">GitHub Link</a>
            <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn Link</a>
          </div>
        </div>
        <form className="contact-form">
          <input aria-label="Name" placeholder="Your name" />
          <input aria-label="Email" placeholder="Your email" />
          <textarea aria-label="Message" placeholder="Tell me about your project" />
          <button type="button">Send Message</button>
        </form>
      </section>

      <footer className="site-footer">
        <div>
          <strong>HAMZA.</strong>
          <span>MERN Stack Developer &amp; AI Enthusiast</span>
        </div>
        <div>
          <a href={`tel:${contact.phone}`}>{contact.phone}</a>
          <a href={`mailto:${contact.email}`}>{contact.email}</a>
          <a href={contact.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={contact.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        </div>
      </footer>
    </main>
  )
}

export default App
