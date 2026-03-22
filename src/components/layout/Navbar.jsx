import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { AnimatePresence, motion } from 'motion/react'

const LINKS = [
  { to: '/menu',        label: '菜單' },
  { to: '/reservation', label: '訂位' },
  { to: '/about',       label: '關於' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  const floatStyle = isHome && !scrolled
    ? { background: 'transparent', borderColor: 'transparent' }
    : { background: 'rgba(255,255,255,0.97)', borderColor: 'var(--grey-100)', boxShadow: '0 1px 16px rgba(0,0,0,.05)' }

  const textColor = isHome && !scrolled ? 'white' : 'var(--ink)'
  const logoColor = isHome && !scrolled ? 'white' : 'var(--crimson)'

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-400 border-b"
        style={floatStyle}>
        <div className="wrap flex items-center justify-between" style={{ height: '72px' }}>

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="serif font-light tracking-[0.2em]"
              style={{ fontSize: '22px', color: logoColor, transition: 'color .4s' }}>
              SŌRA
            </span>
            <span className="sans text-[9px] tracking-[0.35em] uppercase mt-0.5"
              style={{ color: isHome && !scrolled ? 'rgba(255,255,255,0.6)' : 'var(--grey-400)', transition: 'color .4s' }}>
              蒼穹料理
            </span>
          </Link>

          {/* Center nav — desktop */}
          <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
            {LINKS.map(({ to, label }) => {
              const active = location.pathname.startsWith(to)
              return (
                <Link key={to} to={to}
                  className="sans text-xs tracking-[0.2em] uppercase transition-colors relative"
                  style={{ color: active ? 'var(--crimson)' : textColor, transition: 'color .4s' }}>
                  {label}
                  {active && <span className="absolute -bottom-1 left-0 right-0 h-px block" style={{ background: 'var(--crimson)' }} />}
                </Link>
              )
            })}
          </nav>

          {/* Right — CTA + hamburger */}
          <div className="flex items-center gap-4">
            <Link to="/reservation"
              className="hidden md:inline-flex items-center gap-2 sans text-xs tracking-[0.2em] uppercase border px-5 py-2.5 transition-all duration-200"
              style={{ borderColor: isHome && !scrolled ? 'rgba(255,255,255,0.5)' : 'var(--crimson)', color: isHome && !scrolled ? 'white' : 'var(--crimson)', transition: 'all .4s' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'var(--crimson)'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'var(--crimson)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = isHome && !scrolled ? 'white' : 'var(--crimson)'; e.currentTarget.style.borderColor = isHome && !scrolled ? 'rgba(255,255,255,0.5)' : 'var(--crimson)' }}>
              立即訂位
            </Link>

            {/* Hamburger */}
            <button className="md:hidden w-8 h-8 flex flex-col justify-center items-center gap-[5px] cursor-pointer"
              onClick={() => setMenuOpen(v => !v)} aria-label="Menu">
              {[0, 1, 2].map(i => (
                <span key={i} className="block h-[1px] transition-all duration-200 origin-center"
                  style={{
                    width: i === 1 ? '14px' : '20px',
                    background: textColor,
                    opacity: i === 1 && menuOpen ? 0 : 1,
                    transform: i === 0 && menuOpen ? 'rotate(45deg) translate(4.5px,4.5px)' : i === 2 && menuOpen ? 'rotate(-45deg) translate(4.5px,-4.5px)' : 'none',
                    transition: 'color .4s, transform .2s, opacity .2s',
                  }} />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="fixed top-[72px] left-0 right-0 z-40 md:hidden overflow-hidden border-b"
            style={{ background: 'white', borderColor: 'var(--grey-100)' }}>
            <div className="wrap py-6 flex flex-col gap-1">
              {[...LINKS, { to: '/reservation', label: '立即訂位' }].map(({ to, label }) => (
                <Link key={to} to={to}
                  className="py-3.5 px-2 sans text-sm tracking-[0.15em] uppercase border-b"
                  style={{ color: 'var(--ink)', borderColor: 'var(--grey-50)' }}>
                  {label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
