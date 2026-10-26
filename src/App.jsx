import { useState, useEffect, useLayoutEffect } from 'react'
import { Routes, Route, NavLink, Link, useLocation, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useSpring, useMotionValue, useTransform } from 'motion/react'
import { FileText, ScanSearch, Car, IdCard, Building2, Lightbulb, Briefcase, Phone, Mail, MapPin, MessageCircle, ArrowRight, Plus, Check, Sun, Moon } from 'lucide-react'
import { business as b, serviceGroups, steps, faqs } from './data.js'

const Icons = { FileText, ScanSearch, Car, IdCard, Building2, Lightbulb, Briefcase }
const links = [['/', 'Home'], ['/services', 'Services'], ['/about', 'About'], ['/contact', 'Contact']]
const tel = p => 'tel:' + p.replace(/\s/g, '')
const wa = txt => `https://wa.me/${b.whatsapp}?text=${encodeURIComponent(txt)}`

const Reveal = ({ children, delay = 0, className = '' }) => (
  <motion.div className={className} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0 }} transition={{ duration: 0.3, delay: Math.min(delay, 0.2), ease: 'easeOut' }}>{children}</motion.div>)

const Btn = ({ to, href, variant = 'primary', children }) => {
  const cls = 'inline-flex items-center gap-2 rounded-full px-6 py-3 font-semibold transition-colors ' +
    (variant === 'primary' ? 'bg-accent text-white hover:bg-orange-600' : 'border-2 border-brand text-brand hover:bg-brand-soft')
  const m = { whileHover: { y: -2 }, whileTap: { scale: 0.97 } }
  return to ? <motion.span {...m} className="inline-block"><Link to={to} className={cls}>{children}</Link></motion.span>
    : <motion.a {...m} href={href} className={cls}>{children}</motion.a>
}

function Logo() {
  return <Link to="/" className="flex items-center gap-2" aria-label="AE Accounting Associates home">
    <span className="font-display text-3xl font-bold text-brand leading-none">A<span className="text-accent">/</span>E</span>
    <span className="text-xs font-bold uppercase leading-tight tracking-wide text-brand">AE Accounting<br />Associates</span></Link>
}

function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark')
  const toggle = () => {
    const next = !dark
    setDark(next)
    document.documentElement.dataset.theme = next ? 'dark' : 'light'
    try { localStorage.setItem('ae-theme', next ? 'dark' : 'light') } catch (e) {}
  }
  return <button type="button" onClick={toggle} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={dark}
    className="grid size-10 place-items-center rounded-full border border-neutral-300 text-brand transition-colors hover:bg-brand-soft">
    <AnimatePresence mode="wait" initial={false}>
      <motion.span key={dark ? 'moon' : 'sun'} initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }} className="grid place-items-center">
        {dark ? <Moon size={18} /> : <Sun size={18} />}
      </motion.span>
    </AnimatePresence>
  </button>
}

function Nav() {
  const { pathname } = useLocation()
  const { scrollYProgress } = useScroll()
  const sx = useSpring(scrollYProgress, { stiffness: 120, damping: 25 })
  const [sc, setSc] = useState(false)
  useEffect(() => {
    const f = () => setSc(window.scrollY > 8)
    f()
    window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return <header className={`sticky top-0 z-40 bg-white/95 backdrop-blur transition-shadow ${sc ? 'shadow-md' : 'border-b border-neutral-200'}`}>
    <motion.div style={{ scaleX: sx }} className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-accent" />
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
      <Logo />
      <nav className="hidden gap-1 md:flex" aria-label="Main">
        {links.map(([to, l]) => <NavLink key={to} to={to} end className="relative px-4 py-2 text-sm font-medium text-brand-dark">
          {({ isActive }) => <>{l}{isActive && <motion.span layoutId="nav-ind" className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded bg-accent" />}</>}
        </NavLink>)}
      </nav>
      <div className="flex items-center gap-3"><ThemeToggle /><div className="hidden md:block"><Btn to="/contact">Enquire</Btn></div></div>
    </div>
    <nav aria-label="Mobile" className="border-t border-neutral-200 md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-4">
        {links.map(([to, l]) => <NavLink key={to} to={to} end className={`relative py-3 text-center text-sm font-medium ${pathname === to ? 'text-brand' : 'text-brand-dark/70'}`}>
          {({ isActive }) => <>{l}{isActive && <motion.span layoutId="nav-ind-mobile" className="absolute inset-x-3 bottom-0 h-0.5 rounded bg-accent" />}</>}
        </NavLink>)}
      </div>
    </nav>
  </header>
}

function Footer() {
  return <footer className="bg-footer text-white pb-14 md:pb-0"><div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-3">
    <div><p className="font-display text-2xl font-bold">AE Accounting Associates</p><p className="mt-2 text-sm text-white/80">Tax, registration and business consultancy.</p></div>
    <div><p className="mb-2 font-semibold">Explore</p>{links.map(([to, l]) => <Link key={to} to={to} className="block py-1 text-sm text-white/80 hover:text-white">{l}</Link>)}</div>
    <div className="space-y-2 text-sm text-white/80"><p className="font-semibold text-white">Contact</p>
      <p className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" />{b.address}</p>
      <a className="flex gap-2 hover:text-white" href={`mailto:${b.email}`}><Mail size={16} className="mt-0.5 shrink-0" />{b.email}</a>
      {b.phones.map(p => <a key={p} className="flex gap-2 hover:text-white" href={tel(p)}><Phone size={16} className="mt-0.5" />{p}</a>)}</div>
  </div><p className="border-t border-white/10 py-4 text-center text-xs text-white/60">© {new Date().getFullYear()} AE Accounting Associates</p></footer>
}

const Section = ({ children, tint, id }) => <section id={id} className={tint ? 'bg-brand-soft' : ''}><div className="mx-auto max-w-6xl px-5 py-14 md:py-28">{children}</div></section>
const Head = ({ eyebrow, title, sub }) => <Reveal className="mb-10 max-w-2xl">
  <p className="text-sm font-bold uppercase tracking-widest text-accent">{eyebrow}</p>
  <h2 className="mt-2 font-display text-3xl font-bold text-brand-dark md:text-4xl">{title}</h2>{sub && <p className="mt-3 text-neutral-600">{sub}</p>}</Reveal>

function ServiceCards() {
  return <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">{serviceGroups.map((s, i) => {
    const Icon = Icons[s.icon] || Icons.Briefcase
    return <Reveal key={s.title} delay={i * 0.05}><motion.article whileHover={{ y: -6 }} tabIndex={0}
      className="h-full rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg focus-visible:shadow-lg">
      <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand"><Icon /></span>
      <h3 className="mt-4 text-lg font-bold text-brand-dark">{s.title}</h3><p className="mt-2 text-sm text-neutral-600">{s.blurb}</p>
      <ul className="mt-4 flex flex-wrap gap-2">{s.items.map(t => <li key={t} className="rounded-full bg-brand-soft px-3 py-1 text-xs font-medium text-brand">{t}</li>)}</ul>
      <Link to={`/contact?service=${encodeURIComponent(s.title)}`} className="group mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand hover:text-accent">Enquire <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
    </motion.article></Reveal>})}</div>
}

function Faq() {
  const [o, setO] = useState(0)
  return <div className="divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">{faqs.map(([q, a], i) =>
    <div key={q}><h3><button className="flex w-full items-center justify-between gap-4 p-5 text-left font-semibold text-brand-dark" aria-expanded={o === i} onClick={() => setO(o === i ? -1 : i)}>
      {q}<motion.span animate={{ rotate: o === i ? 45 : 0 }} className="text-accent"><Plus /></motion.span></button></h3>
      <AnimatePresence initial={false}>{o === i && <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
        <p className="px-5 pb-5 text-neutral-600">{a}</p></motion.div>}</AnimatePresence></div>)}</div>
}

function CtaBand() {
  return <section className="bg-brand text-white"><div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
    <div><h2 className="font-display text-3xl font-bold">Need help with your taxes or registration?</h2><p className="mt-2 text-white/80">Call or message us to discuss what you need.</p></div>
    <Btn to="/contact">Contact us <ArrowRight size={18} /></Btn></div></section>
}

function Tilt() {
  const x = useMotionValue(0), y = useMotionValue(0)
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 })
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 })
  const mv = e => { const r = e.currentTarget.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5) }
  return <div style={{ perspective: 800 }} onPointerMove={mv} onPointerLeave={() => { x.set(0); y.set(0) }} className="p-6">
    <motion.div style={{ rotateX: rx, rotateY: ry }} whileTap={{ scale: 0.96 }} className="grid aspect-square w-40 place-items-center rounded-[2rem] border-4 border-accent/70 bg-brand text-white shadow-xl md:w-56">
      <span className="font-display text-6xl font-bold md:text-7xl">A<span className="text-accent">/</span>E</span></motion.div></div>
}

function Home() {
  return <>
    <section className="relative overflow-hidden bg-brand-soft/50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-5 md:py-28">
        <div className="md:col-span-3"><motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm font-bold uppercase tracking-widest text-accent">Accounting & business consultancy</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-3 font-display text-4xl font-bold leading-tight text-brand-dark md:text-6xl">Tax, registration and business support, handled properly.</motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="mt-5 max-w-xl text-lg text-neutral-600">AE Accounting Associates helps individuals and businesses file tax returns, obtain a TIN, register businesses, transfer motor vehicles and more.</motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }} className="mt-8 flex flex-wrap gap-3">
            <Btn to="/contact">Make an enquiry</Btn><Btn to="/services" variant="outline">Explore services</Btn></motion.div></div>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="grid place-items-center md:col-span-2">
          <Tilt /></motion.div>
      </div></section>
    <Section><Head eyebrow="What we do" title="Services built around Ugandan compliance" sub="From routine returns to registrations and consultancy." /><ServiceCards />
      <div className="mt-8"><Btn to="/services" variant="outline">See all services <ArrowRight size={18} /></Btn></div></Section>
    <Section tint><Head eyebrow="Our approach" title="Clear, careful and on time" />
      <div className="grid gap-5 md:grid-cols-3">{[['Detail-oriented','Returns and documents are prepared carefully.'],['Plain communication','We explain what is needed and why.'],['Local focus','Based in Lubaga, serving clients in Uganda.']].map(([t, d], i) =>
        <Reveal key={t} delay={i * 0.08}><div className="rounded-2xl bg-white p-6 shadow-sm"><Check className="text-accent" /><h3 className="mt-3 font-bold text-brand-dark">{t}</h3><p className="mt-1 text-sm text-neutral-600">{d}</p></div></Reveal>)}</div></Section>
    <Section><Head eyebrow="How we help" title="A simple process" />
      <ol className="grid gap-5 md:grid-cols-4">{steps.map(([t, d], i) => <Reveal key={t} delay={i * 0.08}><li className="list-none">
        <span className="grid size-10 place-items-center rounded-full bg-brand font-bold text-white">{i + 1}</span><h3 className="mt-3 font-bold text-brand-dark">{t}</h3><p className="text-sm text-neutral-600">{d}</p></li></Reveal>)}</ol></Section>
    <Section tint><Head eyebrow="FAQ" title="Common questions" /><Faq /></Section>
    <CtaBand /></>
}

const Services = () => <><Section><Head eyebrow="Services" title="What AE Accounting Associates offers" sub="Services listed here are those shown on our flyer. Contact us if yours is not listed." /><ServiceCards />
  <div className="mt-10"><Btn to="/contact">Enquire about a service</Btn></div></Section><CtaBand /></>

const About = () => <><Section><Head eyebrow="About" title="About AE Accounting Associates" />
  <Reveal><p className="max-w-2xl text-neutral-600">AE Accounting Associates is an accounting and business consultancy based in Lubaga, Uganda. We support clients with tax filing, TIN acquisition, EFRIS analysis, motor vehicle transfers, business registration and documentation, and wider business consultancy.</p></Reveal>
  </Section><CtaBand /></>

function Contact() {
  const [f, setF] = useState({ name: '', contact: '', message: '' })
  const [err, setErr] = useState({})
  const [sent, setSent] = useState('')
  const [sp] = useSearchParams()
  const [topics, setTopics] = useState(sp.get('service') ? [sp.get('service')] : [])
  const toggle = t => setTopics(topics.includes(t) ? topics.filter(x => x !== t) : [...topics, t])
  const set = k => e => setF({ ...f, [k]: e.target.value })
  const validate = () => {
    const e = {}
    if (!f.name.trim()) e.name = 'Please enter your name.'
    if (!f.contact.trim()) e.contact = 'Please enter a phone number or email.'
    if (f.message.trim().length < 10 && !topics.length) e.message = 'Please write a short message or pick a topic.'
    setErr(e)
    return !Object.keys(e).length
  }
  const text = `Hello AE Accounting Associates, I am ${f.name} (${f.contact}). ${topics.length ? 'Topics: ' + topics.join(', ') + '. ' : ''}${f.message}`
  const go = kind => {
    if (!validate()) return
    setSent(kind)
    if (kind === 'email') window.location.href = `mailto:${b.email}?subject=${encodeURIComponent('Website enquiry')}&body=${encodeURIComponent(text)}`
    else window.open(wa(text), '_blank', 'noopener')
  }
  const field = (k, label, props = {}) => <div><label htmlFor={k} className="block text-sm font-semibold text-brand-dark">{label}</label>
    {props.area ? <textarea id={k} rows={5} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} className="mt-1 w-full rounded-xl border border-neutral-300 p-3 transition focus:border-brand" />
      : <input id={k} value={f[k]} onChange={set(k)} aria-invalid={!!err[k]} className="mt-1 w-full rounded-xl border border-neutral-300 p-3 transition focus:border-brand" />}
    {err[k] && <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} role="alert" className="mt-1 text-sm text-red-700">{err[k]}</motion.p>}</div>
  return <Section><Head eyebrow="Contact" title="Talk to AE Accounting Associates" />
    <div className="grid gap-10 md:grid-cols-2">
      <Reveal><div className="space-y-4">
        <p className="flex gap-3"><MapPin className="text-accent" />{b.address}</p>
        <a className="flex gap-3 hover:text-brand" href={`mailto:${b.email}`}><Mail className="text-accent" />{b.email}</a>
        {b.phones.map(p => <a key={p} className="flex gap-3 hover:text-brand" href={tel(p)}><Phone className="text-accent" />{p}</a>)}
        <Btn href={wa('Hello AE Accounting Associates, I would like to make an enquiry.')}><MessageCircle size={18} />WhatsApp us</Btn></div></Reveal>
      <Reveal delay={0.1}><div className="space-y-4 rounded-2xl border border-neutral-200 p-6 shadow-sm">
        <p className="text-sm text-neutral-600">This form does not send data to a server. It prepares your message in your email app or WhatsApp, and you press send there. Please do not include confidential financial records.</p>
        {field('name', 'Your name')}{field('contact', 'Phone or email')}
        <div><p className="text-sm font-semibold text-brand-dark">I'm interested in</p><div className="mt-2 flex flex-wrap gap-2">{serviceGroups.map(g => { const on = topics.includes(g.title); return <motion.button key={g.title} type="button" whileTap={{ scale: 0.95 }} aria-pressed={on} onClick={() => toggle(g.title)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${on ? 'border-brand bg-brand text-white' : 'border-neutral-300 text-brand hover:bg-brand-soft'}`}>{g.title}</motion.button> })}</div></div>
        {field('message', 'Your enquiry', { area: true })}
        <div className="flex flex-wrap gap-3"><motion.button whileTap={{ scale: 0.97 }} onClick={() => go('email')} className="rounded-full bg-accent px-5 py-3 font-semibold text-white hover:bg-orange-600">Open in email</motion.button>
          <motion.button whileTap={{ scale: 0.97 }} onClick={() => go('wa')} className="rounded-full border-2 border-brand px-5 py-3 font-semibold text-brand hover:bg-brand-soft">Open in WhatsApp</motion.button></div>
        {sent && <p role="status" className="text-sm text-brand">Your message was opened in {sent === 'email' ? 'your email app' : 'WhatsApp'}. It is only sent once you press send there.</p>}</div></Reveal>
    </div></Section>
}

function MobileBar() {
  return <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-neutral-200 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
    <a href={tel(b.phones[0])} className="flex items-center justify-center gap-2 py-3 text-sm font-semibold text-brand"><Phone size={18} />Call</a>
    <a href={wa('Hello AE Accounting Associates, I would like to make an enquiry.')} className="flex items-center justify-center gap-2 bg-accent py-3 text-sm font-semibold text-white"><MessageCircle size={18} />WhatsApp</a></div>
}

export default function App() {
  const { pathname } = useLocation()
  useLayoutEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return <div className="flex min-h-screen flex-col"><Nav />
    <main className="flex-1">
      <div key={pathname}>
        <Routes><Route path="/" element={<Home />} /><Route path="/services" element={<Services />} /><Route path="/about" element={<About />} /><Route path="/contact" element={<Contact />} /><Route path="*" element={<Home />} /></Routes>
      </div>
    </main><Footer /><MobileBar /></div>
}