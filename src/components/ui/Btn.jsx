const V = {
  primary: { bg: 'var(--crimson)',    color: '#fff',           border: 'var(--crimson)',    hbg: 'var(--crimson-dk)' },
  outline: { bg: 'transparent',       color: 'var(--crimson)',  border: 'var(--crimson)',    hbg: 'var(--crimson-lt)' },
  dark:    { bg: 'var(--ink)',         color: '#fff',           border: 'var(--ink)',        hbg: 'var(--ink-soft)' },
  ghost:   { bg: 'transparent',       color: 'var(--grey-600)', border: 'transparent',       hbg: 'var(--grey-50)' },
  light:   { bg: 'var(--grey-50)',    color: 'var(--ink)',      border: 'var(--grey-100)',   hbg: 'var(--grey-100)' },
}
const S = {
  sm: 'px-4 py-2 text-xs tracking-widest',
  md: 'px-6 py-3 text-xs tracking-widest',
  lg: 'px-8 py-4 text-sm tracking-widest',
  xl: 'px-10 py-5 text-sm tracking-widest',
}
export default function Btn({ variant = 'primary', size = 'md', className = '', children, ...p }) {
  const v = V[variant]
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 font-sans font-medium uppercase transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${S[size]} ${className}`}
      style={{ background: v.bg, color: v.color, border: `1px solid ${v.border}` }}
      onMouseEnter={e => { e.currentTarget.style.background = v.hbg }}
      onMouseLeave={e => { e.currentTarget.style.background = v.bg }}
      {...p}
    >
      {children}
    </button>
  )
}
