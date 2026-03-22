import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer style={{ background: 'var(--ink)', color: 'var(--grey-400)' }}>
      <div className="wrap py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 mb-12 md:mb-16">

          {/* Brand */}
          <div>
            <div className="mb-5">
              <span className="serif font-light tracking-[0.2em] block" style={{ fontSize: '24px', color: 'white' }}>SŌRA</span>
              <span className="sans text-[10px] tracking-[0.35em] uppercase" style={{ color: 'var(--grey-600)' }}>蒼穹料理</span>
            </div>
            <p className="sans text-sm leading-relaxed" style={{ color: 'var(--grey-600)' }}>
              台北市信義區松仁路100號 12F<br />
              週二至週日 12:00–14:30 · 18:00–22:00<br />
              週一公休
            </p>
          </div>

          {/* Links */}
          <div>
            <p className="sans text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--grey-600)' }}>導覽</p>
            <div className="flex flex-col gap-3">
              {[['菜單','/menu'],['訂位','/reservation'],['關於我們','/about'],['私人包廂','/reservation']].map(([label,to])=>(
                <Link key={label} to={to} className="sans text-sm transition-colors"
                  style={{ color: 'var(--grey-400)' }}
                  onMouseEnter={e=>e.currentTarget.style.color='white'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--grey-400)'}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="sans text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: 'var(--grey-600)' }}>聯絡</p>
            <div className="flex flex-col gap-3 sans text-sm" style={{ color: 'var(--grey-400)' }}>
              <span>+886 2 2345 6789</span>
              <span>reservation@sora-taipei.com</span>
              <div className="flex gap-5 mt-2">
                {['Instagram','Facebook'].map(s=>(
                  <a key={s} href="#" className="text-xs tracking-widest uppercase transition-colors"
                    style={{ color: 'var(--grey-600)' }}
                    onMouseEnter={e=>e.currentTarget.style.color='white'}
                    onMouseLeave={e=>e.currentTarget.style.color='var(--grey-600)'}>
                    {s}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-8 sans text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', color: 'var(--grey-600)' }}>
          <span>© {new Date().getFullYear()} SŌRA 蒼穹料理. All rights reserved.</span>
          <span>Designed with precision · Crafted with passion</span>
        </div>
      </div>
    </footer>
  )
}
