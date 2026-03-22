import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router'
import { motion, useScroll, useTransform } from 'motion/react'
import { GALLERY, TEAM } from '../constants/data'
import Btn from '../components/ui/Btn'

/* ─── Animated stat counter ─────────────────────────────── */
function StatCount({ target, suffix = '' }) {
  const [val, setVal] = useState(0)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const step = Math.ceil(target / 60)
        const id = setInterval(() => {
          start += step
          if (start >= target) { setVal(target); clearInterval(id) }
          else setVal(start)
        }, 20)
      }
    }, { threshold: 0.3 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>
}

/* ─── Drag-scroll horizontal gallery ─────────────────────── */
function HorizGallery() {
  const ref = useRef(null)
  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const onDown  = e => { setDragging(true); setStartX(e.pageX - ref.current.offsetLeft); setScrollLeft(ref.current.scrollLeft) }
  const onUp    = () => setDragging(false)
  const onMove  = e => {
    if (!dragging) return
    e.preventDefault()
    const x = e.pageX - ref.current.offsetLeft
    ref.current.scrollLeft = scrollLeft - (x - startX) * 1.5
  }

  return (
    <div className="relative">
      {/* Drag hint */}
      <p className="wrap sans text-xs tracking-[0.25em] uppercase mb-4" style={{ color: 'var(--grey-400)' }}>
        ← 拖曳瀏覽 →
      </p>
      <div
        ref={ref}
        className="flex gap-3 overflow-x-auto select-none"
        style={{ cursor: dragging ? 'grabbing' : 'grab', scrollbarWidth: 'none', paddingLeft: 'clamp(1.25rem, 5rem, 5rem)', paddingRight: 'clamp(1.25rem, 5rem, 5rem)' }}
        onMouseDown={onDown} onMouseUp={onUp} onMouseLeave={onUp} onMouseMove={onMove}
      >
        {GALLERY.map((img, i) => (
          <div key={i} className="flex-shrink-0 overflow-hidden"
            style={{ width: 'clamp(240px, 35vw, 480px)', aspectRatio: i % 3 === 1 ? '3/4' : '4/3' }}>
            <img src={img.src} alt={img.alt} className="w-full h-full object-cover pointer-events-none"
              style={{ transform: 'scale(1)', transition: 'transform .5s' }}
              onMouseEnter={e => e.target.style.transform='scale(1.03)'}
              onMouseLeave={e => e.target.style.transform='scale(1)'} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0,1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0,1], ['0%', '40%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <div className="page-enter">

      {/* ── Hero — fullscreen parallax ── */}
      <section ref={heroRef} className="relative overflow-hidden" style={{ height: '100svh', minHeight: '600px' }}>
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=90"
            alt="SŌRA 餐廳" className="w-full h-full object-cover"
            style={{ transform: 'scale(1.15)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,.45) 0%, rgba(0,0,0,.25) 50%, rgba(0,0,0,.6) 100%)' }} />
        </motion.div>

        <motion.div style={{ y: textY, opacity }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.8, delay:.3 }}
            className="sans text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6" style={{ color: 'rgba(255,255,255,0.7)' }}>
            台北 · 信義區
          </motion.p>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:1, delay:.5 }}
            className="serif font-light text-white leading-[0.9]"
            style={{ fontSize: 'clamp(64px, 12vw, 160px)', letterSpacing: '-0.02em' }}>
            SŌRA
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:.8, delay:1.2 }}
            className="serif italic font-light mt-3 mb-10" style={{ fontSize: 'clamp(16px,2.5vw,26px)', color: 'rgba(255,255,255,0.8)' }}>
            蒼穹料理 — 現代法式料理
          </motion.p>
          <motion.div initial={{ opacity:0, y:12 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6, delay:1.5 }}
            className="flex flex-col sm:flex-row gap-3">
            <Link to="/reservation">
              <Btn size="lg" style={{ background: 'white', color: 'var(--ink)', borderColor: 'white' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='var(--crimson)'; e.currentTarget.style.color='white'; e.currentTarget.style.borderColor='var(--crimson)' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='white'; e.currentTarget.style.color='var(--ink)'; e.currentTarget.style.borderColor='white' }}>
                立即訂位
              </Btn>
            </Link>
            <Link to="/menu">
              <Btn size="lg" variant="outline"
                style={{ borderColor: 'rgba(255,255,255,0.5)', color: 'white', background: 'transparent' }}
                onMouseEnter={e=>{ e.currentTarget.style.background='rgba(255,255,255,0.15)' }}
                onMouseLeave={e=>{ e.currentTarget.style.background='transparent' }}>
                瀏覽菜單
              </Btn>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll hint */}
        <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2, duration:1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="sans text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.5)' }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-8" style={{ background: 'rgba(255,255,255,0.4)' }} />
        </motion.div>
      </section>

      {/* ── Stat strip (replaces ticker) ── */}
      <section className="stat-strip" style={{ background: 'var(--off-white)' }}>
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { n: 12,  suf: '+',   label: '年經驗' },
              { n: 3,   suf: '★',   label: '米其林星' },
              { n: 98,  suf: '%',   label: '顧客回訪率' },
              { n: 400, suf: '+',   label: '精選酒款' },
            ].map(({ n, suf, label }, i) => (
              <div key={label} className="py-8 md:py-10 text-center"
                style={{ borderRight: i < 3 ? '1px solid var(--grey-100)' : 'none', borderBottom: i < 2 ? '1px solid var(--grey-100)' : 'none' }}>
                <p className="serif font-light" style={{ fontSize: 'clamp(36px,5vw,56px)', color: 'var(--crimson)', lineHeight: 1 }}>
                  <StatCount target={n} suffix={suf} />
                </p>
                <p className="sans text-xs tracking-[0.2em] uppercase mt-2" style={{ color: 'var(--grey-600)' }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial split: story ── */}
      <section className="py-16 md:py-28">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
            {/* Text — left */}
            <motion.div initial={{ opacity:0, x:-24 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, margin:'0px' }} transition={{ duration:.7 }}>
              <span className="rule mb-6 block" />
              <p className="sans text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color: 'var(--crimson)' }}>
                Our Story
              </p>
              <h2 className="serif font-light leading-[1.1] mb-6"
                style={{ fontSize: 'clamp(32px,5vw,58px)', color: 'var(--ink)' }}>
                料理，是<br />
                <em>對土地最深的<br />愛意</em>
              </h2>
              <p className="sans text-sm leading-relaxed mb-4" style={{ color: 'var(--grey-600)' }}>
                SŌRA 的每一道料理，都是主廚 Julien 與台灣食材的深度對話。
                他以法式工藝為語言，以在地食材為靈魂，
                每季重新詮釋「何謂完美的一餐」。
              </p>
              <p className="sans text-sm leading-relaxed mb-8" style={{ color: 'var(--grey-600)' }}>
                從宜蘭的有機蔬菜到東港的黑鮪魚，
                每一個選擇都源自對這片土地的敬重。
              </p>
              <Link to="/about"><Btn variant="outline">認識我們</Btn></Link>
            </motion.div>

            {/* Image — right, bleed effect */}
            <motion.div initial={{ opacity:0, x:24 }} whileInView={{ opacity:1, x:0 }}
              viewport={{ once:true, margin:'0px' }} transition={{ duration:.7, delay:.15 }}
              className="relative overflow-hidden img-hover">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=900&q=85"
                alt="料理" className="w-full object-cover" style={{ aspectRatio:'4/5' }} />
              {/* Floating label */}
              <div className="absolute bottom-6 left-6 bg-white px-4 py-3">
                <p className="serif text-sm italic" style={{ color: 'var(--ink)' }}>"Cuisine is the most beautiful form of love"</p>
                <p className="sans text-[10px] tracking-widest uppercase mt-1" style={{ color: 'var(--grey-400)' }}>— Julien Mercier</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Full-bleed image with text overlay ── */}
      <section className="relative overflow-hidden" style={{ height: 'clamp(320px, 55vw, 620px)' }}>
        <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1800&q=85"
          alt="餐廳空間" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6"
          style={{ background: 'rgba(0,0,0,.5)' }}>
          <div>
            <p className="sans text-[10px] tracking-[0.4em] uppercase mb-4 text-white opacity-70">
              Tasting Menu
            </p>
            <h2 className="serif font-light text-white"
              style={{ fontSize: 'clamp(28px,6vw,72px)', lineHeight: 1, letterSpacing: '-0.01em' }}>
              每季全新的<br />七道式饗宴
            </h2>
            <p className="sans text-sm mt-5 mb-8" style={{ color: 'rgba(255,255,255,0.75)' }}>
              NT$3,800 / 人 · 含餐前酒與茶點
            </p>
            <Link to="/menu"><Btn style={{ background:'white', color:'var(--ink)', borderColor:'white' }}>查看本季菜單</Btn></Link>
          </div>
        </div>
      </section>

      {/* ── Drag-scroll photo gallery ── */}
      <section className="py-16 md:py-24 overflow-hidden">
        <div className="mb-10">
          <div className="wrap">
            <span className="rule mb-5 block" />
            <p className="sans text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--crimson)' }}>Gallery</p>
            <h2 className="serif font-light" style={{ fontSize: 'clamp(26px,4vw,48px)', color: 'var(--ink)' }}>
              空間 · 料理 · 時刻
            </h2>
          </div>
        </div>
        <HorizGallery />
      </section>

      {/* ── Team asymmetric ── */}
      <section className="py-16 md:py-24" style={{ background: 'var(--grey-50)' }}>
        <div className="wrap">
          <div className="mb-10 md:mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="rule mb-5 block" />
              <p className="sans text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--crimson)' }}>The Team</p>
              <h2 className="serif font-light" style={{ fontSize: 'clamp(26px,4vw,48px)', color: 'var(--ink)' }}>
                成就每一道料理<br />的靈魂
              </h2>
            </div>
            <Link to="/about"><Btn variant="ghost" size="sm">認識團隊</Btn></Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'0px' }}
                transition={{ delay: i * .12 }}
                className={i === 1 ? 'sm:mt-10' : ''}>
                <div className="overflow-hidden mb-4 img-hover" style={{ aspectRatio: '3/4' }}>
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <span className="rule mb-3 block" style={{ width: '24px' }} />
                <h3 className="serif font-light text-lg" style={{ color: 'var(--ink)' }}>{m.name}</h3>
                <p className="sans text-[10px] tracking-[0.2em] uppercase mb-2" style={{ color: 'var(--crimson)' }}>{m.role}</p>
                <p className="sans text-xs leading-relaxed" style={{ color: 'var(--grey-600)' }}>{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA reservation ── */}
      <section className="py-16 md:py-24" style={{ background: 'var(--ink)' }}>
        <div className="wrap text-center">
          <p className="sans text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color: 'var(--grey-600)' }}>
            Reserve a Table
          </p>
          <h2 className="serif font-light text-white mb-4"
            style={{ fontSize: 'clamp(30px,5vw,64px)', lineHeight: 1.1 }}>
            為你的下一次<br />
            <em style={{ color: 'var(--crimson)' }}>難忘的一餐</em>
          </h2>
          <p className="sans text-sm mb-10" style={{ color: 'var(--grey-400)' }}>
            週二至週日 · 午餐 12:00–14:30 · 晚餐 18:00–22:00
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/reservation"><Btn variant="primary" size="lg">線上訂位</Btn></Link>
            <a href="tel:+886223456789">
              <Btn size="lg" style={{ background:'transparent', color:'white', borderColor:'rgba(255,255,255,0.25)' }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='white'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='rgba(255,255,255,0.25)'}>
                電話訂位
              </Btn>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
