import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { MENU, MENU_CATEGORIES } from '../constants/data'
import Btn from '../components/ui/Btn'

function MenuItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity:0, y:12 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'0px' }} transition={{ delay: index * .04 }}
      className="menu-item flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 py-5 px-2 sm:px-4 cursor-pointer">
      <div className="flex-1">
        <div className="flex flex-wrap items-center gap-3 mb-1">
          <h3 className="serif font-light text-base md:text-lg" style={{ color: 'var(--ink)' }}>{item.name}</h3>
          <span className="sans text-[11px] tracking-wider" style={{ color: 'var(--grey-400)' }}>{item.sub}</span>
          {item.tag && (
            <span className="sans text-[10px] tracking-[0.15em] uppercase px-2 py-0.5 border"
              style={{ color: 'var(--crimson)', borderColor: 'var(--crimson)' }}>
              {item.tag}
            </span>
          )}
        </div>
        <p className="sans text-xs leading-relaxed" style={{ color: 'var(--grey-600)' }}>{item.desc}</p>
      </div>
      <div className="flex-shrink-0 sans font-medium text-sm sm:text-base sm:ml-8" style={{ color: 'var(--ink)' }}>
        NT${item.price.toLocaleString()}
      </div>
    </motion.div>
  )
}

export default function Menu() {
  const [active, setActive] = useState('前菜')

  return (
    <div className="page-enter pt-[72px]">

      {/* Header */}
      <section className="relative overflow-hidden py-16 md:py-24"
        style={{ background: 'var(--ink)' }}>
        <div className="wrap">
          <div className="max-w-2xl">
            <span className="block w-10 h-px mb-6" style={{ background: 'var(--crimson)' }} />
            <p className="sans text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--grey-600)' }}>
              2026 春季菜單
            </p>
            <h1 className="serif font-light text-white leading-tight"
              style={{ fontSize: 'clamp(36px,7vw,88px)', letterSpacing: '-0.02em' }}>
              Menu
            </h1>
            <p className="sans text-sm mt-4" style={{ color: 'var(--grey-400)' }}>
              所有食材每日從合作農場與漁港直送，菜單每季更新。
            </p>
          </div>
        </div>
        {/* Deco number */}
        <div className="absolute right-8 bottom-4 hidden md:block"
          style={{ fontSize: '200px', lineHeight:1, color: 'rgba(255,255,255,0.03)', fontFamily:'var(--serif)', fontWeight:300 }}>
          M
        </div>
      </section>

      {/* Tasting menu banner */}
      <section className="py-8" style={{ background: 'var(--crimson)' }}>
        <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="sans text-xs tracking-[0.25em] uppercase text-white opacity-75 mb-1">主廚精選</p>
            <p className="serif font-light text-white" style={{ fontSize: 'clamp(18px,3vw,28px)' }}>
              七道式 Tasting Menu — NT$3,800 / 人
            </p>
          </div>
          <Link to="/reservation">
            <Btn style={{ background:'white', color:'var(--crimson)', borderColor:'white' }}>訂位體驗</Btn>
          </Link>
        </div>
      </section>

      {/* Category tabs */}
      <div className="sticky z-30 bg-white border-b" style={{ top:'72px', borderColor:'var(--grey-100)' }}>
        <div className="wrap">
          <div className="flex overflow-x-auto" style={{ scrollbarWidth:'none' }}>
            {MENU_CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActive(cat)}
                className="flex-shrink-0 sans text-xs tracking-[0.2em] uppercase px-5 py-4 border-b-2 transition-all cursor-pointer"
                style={{
                  borderColor: active === cat ? 'var(--crimson)' : 'transparent',
                  color: active === cat ? 'var(--crimson)' : 'var(--grey-400)',
                }}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items */}
      <section className="py-8 md:py-12">
        <div className="wrap">
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
              transition={{ duration:.2 }}>
              {MENU[active].map((item, i) => <MenuItem key={item.name} item={item} index={i} />)}
            </motion.div>
          </AnimatePresence>

          {/* Footer note */}
          <div className="mt-10 pt-8 border-t" style={{ borderColor:'var(--grey-100)' }}>
            <p className="sans text-xs leading-relaxed" style={{ color: 'var(--grey-400)' }}>
              * 所有價格均含服務費。如有食物過敏或飲食限制，請於訂位時告知。菜單內容依季節食材供應調整。
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16" style={{ background:'var(--grey-50)', borderTop:'1px solid var(--grey-100)' }}>
        <div className="wrap text-center">
          <p className="serif italic font-light text-2xl mb-6" style={{ color:'var(--ink)' }}>
            準備好了嗎？
          </p>
          <Link to="/reservation"><Btn size="lg">立即訂位</Btn></Link>
        </div>
      </section>
    </div>
  )
}
