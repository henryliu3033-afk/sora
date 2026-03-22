import { BrowserRouter, Routes, Route, useLocation } from 'react-router'
import { AnimatePresence } from 'motion/react'
import Navbar      from './components/layout/Navbar'
import Footer      from './components/layout/Footer'
import Home        from './pages/Home'
import Menu        from './pages/Menu'
import Reservation from './pages/Reservation'
import About       from './pages/About'

function AppRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"            element={<Home />} />
        <Route path="/menu"        element={<Menu />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/about"       element={<About />} />
        <Route path="*"            element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </BrowserRouter>
  )
}
