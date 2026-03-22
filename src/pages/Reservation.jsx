import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useBookingStore } from '../store/booking.store'
import { LUNCH_SLOTS, DINNER_SLOTS, PARTY_SIZES } from '../constants/data'
import Btn from '../components/ui/Btn'

/* ─── Date picker helpers ───────────────────────────────── */
function getDates(n = 60) {
  const list = []
  const today = new Date()
  for (let i = 1; i <= n; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    if (d.getDay() !== 1) list.push(d) // Mon closed
  }
  return list
}

function fmtDate(d) {
  return d.toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' })
}

function fmtISO(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
}

const DATES = getDates()

/* ─── Step indicator ────────────────────────────────────── */
function Steps({ step }) {
  const items = ['選擇日期', '選擇時段', '填寫資訊', '確認完成']
  return (
    <div className="flex items-center gap-0 mb-10 md:mb-14 overflow-x-auto">
      {items.map((s, i) => (
        <div key={s} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center gap-1.5">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-all"
              style={{
                background: step > i+1 ? 'var(--ink)' : step === i+1 ? 'var(--crimson)' : 'var(--grey-100)',
                color: step >= i+1 ? 'white' : 'var(--grey-400)',
              }}>
              {step > i+1 ? '✓' : i+1}
            </div>
            <span className="sans text-[10px] tracking-wider uppercase hidden sm:block"
              style={{ color: step === i+1 ? 'var(--ink)' : 'var(--grey-400)' }}>
              {s}
            </span>
          </div>
          {i < 3 && <div className="w-8 sm:w-16 h-px mx-1"
            style={{ background: step > i+1 ? 'var(--ink)' : 'var(--grey-200)' }} />}
        </div>
      ))}
    </div>
  )
}

export default function Reservation() {
  const { book } = useBookingStore()

  const [step, setStep]   = useState(1)
  const [done, setDone]   = useState(null)
  const [date, setDate]   = useState(null)
  const [meal, setMeal]   = useState('dinner') // lunch | dinner
  const [time, setTime]   = useState(null)
  const [party, setParty] = useState(2)
  const [form, setForm]   = useState({ name:'', phone:'', email:'', note:'' })
  const [errors, setErrors] = useState({})

  const slots = meal === 'lunch' ? LUNCH_SLOTS : DINNER_SLOTS

  const validateForm = () => {
    const e = {}
    if (!form.name)  e.name  = '請填寫姓名'
    if (!form.phone) e.phone = '請填寫電話'
    if (!form.email) e.email = '請填寫 Email'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleConfirm = () => {
    if (!validateForm()) return
    const res = book({ date: fmtISO(date), time, party, meal, ...form })
    setDone(res)
    setStep(4)
    window.scrollTo(0, 0)
  }

  // Step 4 — Confirmation
  if (step === 4 && done) return (
    <div className="page-enter pt-[72px]">
      <div className="wrap py-16 md:py-28 max-w-xl mx-auto text-center">
        <motion.div initial={{ scale:.7, opacity:0 }} animate={{ scale:1, opacity:1 }}
          transition={{ type:'spring', stiffness:180 }}
          className="w-16 h-16 rounded-full mx-auto mb-8 flex items-center justify-center text-2xl"
          style={{ background:'var(--crimson-lt)', color:'var(--crimson)' }}>
          ✓
        </motion.div>
        <p className="sans text-[10px] tracking-[0.35em] uppercase mb-3" style={{ color:'var(--crimson)' }}>訂位成功</p>
        <h1 className="serif font-light mb-3" style={{ fontSize:'clamp(28px,5vw,52px)', color:'var(--ink)' }}>
          期待與您相見
        </h1>
        <p className="sans text-sm mb-8" style={{ color:'var(--grey-600)' }}>
          確認信已寄至 {form.email}
        </p>

        {/* Booking card */}
        <div className="text-left p-6 mb-8 border" style={{ borderColor:'var(--grey-100)' }}>
          <p className="sans text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color:'var(--grey-400)' }}>
            訂位明細 · {done.id}
          </p>
          {[
            ['姓名', form.name],
            ['日期', fmtDate(date)],
            ['時段', `${meal === 'lunch' ? '午餐' : '晚餐'} ${time}`],
            ['人數', `${party} 位`],
            ['電話', form.phone],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between py-3 border-b" style={{ borderColor:'var(--grey-50)' }}>
              <span className="sans text-xs uppercase tracking-wider" style={{ color:'var(--grey-400)' }}>{k}</span>
              <span className="sans text-sm font-medium" style={{ color:'var(--ink)' }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Btn onClick={() => { setStep(1); setDone(null); setDate(null); setTime(null) }}>再次訂位</Btn>
          <Btn variant="outline" onClick={() => window.location.href='/'}>回到首頁</Btn>
        </div>
      </div>
    </div>
  )

  return (
    <div className="page-enter pt-[72px]">

      {/* Header */}
      <section className="py-12 md:py-20" style={{ background:'var(--ink)' }}>
        <div className="wrap">
          <span className="block w-10 h-px mb-6" style={{ background:'var(--crimson)' }} />
          <p className="sans text-[10px] tracking-[0.4em] uppercase mb-3" style={{ color:'var(--grey-600)' }}>Reserve a Table</p>
          <h1 className="serif font-light text-white" style={{ fontSize:'clamp(36px,7vw,80px)', letterSpacing:'-0.02em' }}>
            訂位
          </h1>
          <p className="sans text-sm mt-3" style={{ color:'var(--grey-400)' }}>
            週二至週日開放訂位 · 週一公休 · 建議至少提前 3 天預約
          </p>
        </div>
      </section>

      {/* Form body */}
      <section className="py-10 md:py-16">
        <div className="wrap max-w-3xl mx-auto">
          <Steps step={step} />

          <AnimatePresence mode="wait">

            {/* ── Step 1: Date ── */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
                <h2 className="serif font-light text-2xl mb-1" style={{ color:'var(--ink)' }}>選擇日期</h2>
                <p className="sans text-xs mb-8" style={{ color:'var(--grey-400)' }}>週一公休，顯示未來 60 天可選日期</p>

                {/* Party size */}
                <div className="mb-8">
                  <p className="sans text-xs tracking-[0.2em] uppercase mb-4" style={{ color:'var(--grey-600)' }}>用餐人數</p>
                  <div className="flex flex-wrap gap-2">
                    {PARTY_SIZES.map(n => (
                      <button key={n} onClick={() => setParty(n)}
                        className="w-11 h-11 sans text-sm font-medium transition-all border cursor-pointer"
                        style={{
                          background: party === n ? 'var(--crimson)' : 'white',
                          color:      party === n ? 'white' : 'var(--ink)',
                          borderColor: party === n ? 'var(--crimson)' : 'var(--grey-200)',
                        }}>
                        {n}
                      </button>
                    ))}
                    <span className="flex items-center sans text-xs pl-2" style={{ color:'var(--grey-400)' }}>位</span>
                  </div>
                </div>

                {/* Date grid */}
                <div className="mb-8">
                  <p className="sans text-xs tracking-[0.2em] uppercase mb-4" style={{ color:'var(--grey-600)' }}>選擇日期</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-2">
                    {DATES.slice(0, 28).map(d => {
                      const sel = date && fmtISO(d) === fmtISO(date)
                      const wd = d.toLocaleDateString('zh-TW', { weekday:'short' })
                      return (
                        <button key={d.toISOString()} onClick={() => setDate(d)}
                          className="flex flex-col items-center py-3 border text-center transition-all cursor-pointer"
                          style={{
                            background: sel ? 'var(--crimson)' : 'white',
                            borderColor: sel ? 'var(--crimson)' : 'var(--grey-200)',
                            color: sel ? 'white' : 'var(--ink)',
                          }}>
                          <span className="sans text-[10px]" style={{ opacity: sel ? 1 : 0.5 }}>{wd}</span>
                          <span className="sans text-lg font-medium leading-tight">{d.getDate()}</span>
                          <span className="sans text-[10px]" style={{ opacity: sel ? 1 : 0.5 }}>
                            {d.toLocaleDateString('zh-TW', { month:'short' })}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                <Btn size="lg" disabled={!date} onClick={() => setStep(2)}>
                  下一步 →
                </Btn>
              </motion.div>
            )}

            {/* ── Step 2: Time ── */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
                <h2 className="serif font-light text-2xl mb-1" style={{ color:'var(--ink)' }}>選擇時段</h2>
                <p className="sans text-xs mb-8" style={{ color:'var(--grey-400)' }}>{fmtDate(date)} · {party} 位</p>

                {/* Meal type toggle */}
                <div className="flex gap-2 mb-8">
                  {[['lunch','午餐'],['dinner','晚餐']].map(([k,label])=>(
                    <button key={k} onClick={() => { setMeal(k); setTime(null) }}
                      className="flex-1 py-3 sans text-sm font-medium uppercase tracking-widest border transition-all cursor-pointer"
                      style={{
                        background: meal===k ? 'var(--ink)' : 'white',
                        color: meal===k ? 'white' : 'var(--grey-600)',
                        borderColor: meal===k ? 'var(--ink)' : 'var(--grey-200)',
                      }}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Time slots */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                  {slots.map(t => (
                    <button key={t} onClick={() => setTime(t)}
                      className="py-3.5 sans text-sm border transition-all cursor-pointer"
                      style={{
                        background: time===t ? 'var(--crimson)' : 'white',
                        color: time===t ? 'white' : 'var(--ink)',
                        borderColor: time===t ? 'var(--crimson)' : 'var(--grey-200)',
                      }}>
                      {t}
                    </button>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Btn variant="ghost" onClick={() => setStep(1)}>← 返回</Btn>
                  <Btn size="lg" disabled={!time} onClick={() => setStep(3)}>下一步 →</Btn>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Form ── */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}>
                <h2 className="serif font-light text-2xl mb-1" style={{ color:'var(--ink)' }}>填寫資訊</h2>
                <p className="sans text-xs mb-8" style={{ color:'var(--grey-400)' }}>
                  {fmtDate(date)} · {meal==='lunch'?'午餐':'晚餐'} {time} · {party} 位
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {[
                    { k:'name',  label:'姓名', type:'text',  ph:'王小明' },
                    { k:'phone', label:'電話', type:'tel',   ph:'0912-345-678' },
                  ].map(({k,label,type,ph}) => (
                    <div key={k}>
                      <label className="sans text-xs tracking-wider uppercase block mb-2" style={{ color:'var(--grey-600)' }}>{label}</label>
                      <input type={type} placeholder={ph} className="field" value={form[k]}
                        onChange={e => setForm(p=>({...p,[k]:e.target.value}))} />
                      {errors[k] && <p className="sans text-xs mt-1" style={{ color:'var(--crimson)' }}>{errors[k]}</p>}
                    </div>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="sans text-xs tracking-wider uppercase block mb-2" style={{ color:'var(--grey-600)' }}>Email</label>
                  <input type="email" placeholder="you@example.com" className="field" value={form.email}
                    onChange={e => setForm(p=>({...p,email:e.target.value}))} />
                  {errors.email && <p className="sans text-xs mt-1" style={{ color:'var(--crimson)' }}>{errors.email}</p>}
                </div>

                <div className="mb-8">
                  <label className="sans text-xs tracking-wider uppercase block mb-2" style={{ color:'var(--grey-600)' }}>
                    特殊需求 / 備注（選填）
                  </label>
                  <textarea rows="3" placeholder="過敏原、特殊場合、包廂需求…" className="field resize-none"
                    value={form.note} onChange={e => setForm(p=>({...p,note:e.target.value}))} />
                </div>

                {/* Summary */}
                <div className="p-5 mb-8 border" style={{ borderColor:'var(--grey-100)', background:'var(--grey-50)' }}>
                  <p className="sans text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color:'var(--grey-400)' }}>訂位摘要</p>
                  {[
                    ['日期', fmtDate(date)],
                    ['時段', `${meal==='lunch'?'午餐':'晚餐'} ${time}`],
                    ['人數', `${party} 位`],
                  ].map(([k,v]) => (
                    <div key={k} className="flex justify-between py-2 border-b" style={{ borderColor:'var(--grey-100)' }}>
                      <span className="sans text-xs uppercase tracking-wider" style={{ color:'var(--grey-400)' }}>{k}</span>
                      <span className="sans text-sm" style={{ color:'var(--ink)' }}>{v}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Btn variant="ghost" onClick={() => setStep(2)}>← 返回</Btn>
                  <Btn size="lg" onClick={handleConfirm}>確認訂位</Btn>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Info strip */}
      <section className="py-10" style={{ background:'var(--grey-50)', borderTop:'1px solid var(--grey-100)' }}>
        <div className="wrap">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { icon:'📅', t:'取消政策', d:'訂位 24 小時前免費取消，逾時收取訂金' },
              { icon:'🍷', t:'酒水政策', d:'自帶酒水收取開瓶費 NT$500 / 瓶' },
              { icon:'🎂', t:'特殊場合', d:'生日或週年紀念請於備注欄告知' },
            ].map(({icon,t,d})=>(
              <div key={t}>
                <span className="text-2xl block mb-2">{icon}</span>
                <p className="sans text-sm font-medium mb-1" style={{ color:'var(--ink)' }}>{t}</p>
                <p className="sans text-xs" style={{ color:'var(--grey-600)' }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
