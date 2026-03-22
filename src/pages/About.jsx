import { motion } from 'motion/react'
import { Link } from 'react-router'
import { TEAM, GALLERY } from '../constants/data'
import Btn from '../components/ui/Btn'

export default function About() {
  return (
    <div className="page-enter pt-[72px]">

      {/* Hero — split layout */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[60vh] md:min-h-[80vh]">
        {/* Left: text */}
        <div className="flex flex-col justify-center px-6 sm:px-12 py-16 md:py-24 order-2 md:order-1"
          style={{ background:'var(--ink)' }}>
          <span className="block w-10 h-px mb-8" style={{ background:'var(--crimson)' }} />
          <p className="sans text-[10px] tracking-[0.4em] uppercase mb-5" style={{ color:'var(--grey-600)' }}>About SŌRA</p>
          <h1 className="serif font-light text-white leading-tight mb-6"
            style={{ fontSize:'clamp(32px,5vw,64px)', letterSpacing:'-0.02em' }}>
            蒼穹之下，<br />
            <em style={{ color:'var(--crimson)' }}>料理是一種靜默的詩</em>
          </h1>
          <p className="sans text-sm leading-relaxed mb-6" style={{ color:'var(--grey-400)' }}>
            SŌRA，日文「空」的讀音，意為天空與無限的可能。我們相信料理不只是飽足，
            而是一場完整的感官敘事——從第一口餐前酒到最後一滴甜酒，每一刻都值得被細細品味。
          </p>
          <p className="sans text-sm leading-relaxed" style={{ color:'var(--grey-400)' }}>
            2012 年，主廚 Julien 帶著在巴黎與東京累積的技藝，落腳台北信義區。
            他選擇在這座島嶼紮根，因為他相信，這裡的食材足以與任何世界料理比肩。
          </p>
        </div>

        {/* Right: image */}
        <div className="relative overflow-hidden order-1 md:order-2" style={{ minHeight:'320px' }}>
          <img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1200&q=85"
            alt="餐廳空間" className="w-full h-full object-cover absolute inset-0" />
          <div className="absolute inset-0" style={{ background:'rgba(0,0,0,.15)' }} />
        </div>
      </section>

      {/* Philosophy numbers */}
      <section className="py-14 md:py-20">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { n:'2012', label:'創立年份' },
              { n:'★★★', label:'米其林星等' },
              { n:'#1', label:'台北最佳餐廳' },
              { n:'7', label:'道式 Tasting Menu' },
            ].map(({ n, label }) => (
              <motion.div key={label} initial={{ opacity:0, y:16 }}
                whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'0px' }}>
                <p className="serif font-light mb-2" style={{ fontSize:'clamp(28px,4vw,48px)', color:'var(--crimson)' }}>
                  {n}
                </p>
                <p className="sans text-xs tracking-[0.2em] uppercase" style={{ color:'var(--grey-600)' }}>{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy editorial */}
      <section className="py-12 md:py-20" style={{ background:'var(--grey-50)' }}>
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">
            <div className="sticky top-24">
              <span className="rule mb-6 block" />
              <p className="sans text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color:'var(--crimson)' }}>
                Philosophy
              </p>
              <h2 className="serif font-light leading-tight"
                style={{ fontSize:'clamp(28px,4vw,52px)', color:'var(--ink)' }}>
                三個信念，<br />成就每一道料理
              </h2>
            </div>

            <div className="flex flex-col gap-10">
              {[
                { n:'01', t:'季節性', d:'我們不追求永恆的固定菜單。每一季，主廚與農場夥伴重新對話，讓盤中的料理忠實反映此刻土地的狀態。冬日的根莖、春日的嫩芽、夏日的果實——季節是我們最好的創作夥伴。' },
                { n:'02', t:'在地性', d:'台灣是一座資源豐厚的島嶼。宜蘭的有機蔬菜、東港的黑鮪魚、屏東的可可、嘉義的烏龍茶——SŌRA 優先使用台灣食材，以法式技法賦予他們新的生命。' },
                { n:'03', t:'精準性', d:'料理是科學也是藝術。我們對溫度、時間、比例的執著，來自對完美質地的追求。但精準不是冷漠——在每一道料理背後，都藏著廚師對食客的柔情。' },
              ].map(({ n, t, d }) => (
                <motion.div key={n} initial={{ opacity:0, y:16 }}
                  whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'0px' }}>
                  <p className="serif font-light mb-2" style={{ fontSize:'48px', color:'var(--grey-100)', lineHeight:1 }}>{n}</p>
                  <h3 className="serif font-light text-xl mb-3" style={{ color:'var(--ink)' }}>{t}</h3>
                  <p className="sans text-sm leading-relaxed" style={{ color:'var(--grey-600)' }}>{d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-14 md:py-24">
        <div className="wrap">
          <div className="mb-12 md:mb-16">
            <span className="rule mb-6 block" />
            <p className="sans text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color:'var(--crimson)' }}>Our Team</p>
            <h2 className="serif font-light" style={{ fontSize:'clamp(28px,4vw,52px)', color:'var(--ink)' }}>
              每一位都是主角
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12">
            {TEAM.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity:0, y:20 }}
                whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:'0px' }}
                transition={{ delay: i * .1 }}
                className={i === 1 ? 'sm:mt-14' : ''}>
                <div className="overflow-hidden mb-5 img-hover" style={{ aspectRatio:'3/4' }}>
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
                <span className="rule mb-3 block" style={{ width:'24px' }} />
                <h3 className="serif font-light text-xl mb-0.5" style={{ color:'var(--ink)' }}>{m.name}</h3>
                <p className="sans text-[10px] tracking-[0.2em] uppercase mb-3" style={{ color:'var(--crimson)' }}>{m.role}</p>
                <p className="sans text-sm leading-relaxed" style={{ color:'var(--grey-600)' }}>{m.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Space section */}
      <section className="py-12 md:py-20" style={{ background:'var(--grey-50)' }}>
        <div className="wrap">
          <div className="mb-10">
            <span className="rule mb-6 block" />
            <p className="sans text-[10px] tracking-[0.35em] uppercase mb-4" style={{ color:'var(--crimson)' }}>The Space</p>
            <h2 className="serif font-light" style={{ fontSize:'clamp(26px,4vw,48px)', color:'var(--ink)' }}>
              空間是料理的延伸
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY.slice(0, 6).map((img, i) => (
              <motion.div key={i} initial={{ opacity:0 }} whileInView={{ opacity:1 }}
                viewport={{ once:true, margin:'0px' }} transition={{ delay: i * .08 }}
                className={`overflow-hidden img-hover ${i === 0 ? 'col-span-2 md:col-span-1' : ''}`}
                style={{ aspectRatio: i === 0 ? '2/1' : '1/1' }}>
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 md:py-20" style={{ background:'var(--crimson)' }}>
        <div className="wrap text-center">
          <p className="sans text-[10px] tracking-[0.4em] uppercase mb-4" style={{ color:'rgba(255,255,255,0.6)' }}>
            Come Dine With Us
          </p>
          <h2 className="serif font-light text-white mb-8"
            style={{ fontSize:'clamp(26px,5vw,56px)' }}>
            一桌難忘的故事，<br />從今晚開始
          </h2>
          <Link to="/reservation">
            <Btn style={{ background:'white', color:'var(--crimson)', borderColor:'white' }} size="lg">
              立即訂位
            </Btn>
          </Link>
        </div>
      </section>
    </div>
  )
}
