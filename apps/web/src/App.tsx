import { useState } from 'react'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Listings from './pages/Listings'
import SellerFlow from './pages/SellerFlow'
import Ledger from './pages/Ledger'
import BundleFill from './pages/BundleFill'
import Streak from './pages/Streak'
import Profile from './pages/Profile'
import Help from './pages/Help'
import Explorer from './pages/Explorer'
import Nav from './components/Nav'

export type Page =
  | 'landing'
  | 'dashboard'
  | 'listings'
  | 'seller'
  | 'ledger'
  | 'bundle'
  | 'streak'
  | 'profile'
  | 'help'
  | 'explorer'

export default function App() {
  const [page, setPage] = useState<Page>('landing')

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const showNav = page !== 'landing'

  return (
    <div className="texture-overlay min-h-screen" style={{ background: 'var(--background)' }}>
      {showNav && <Nav current={page} navigate={navigate} />}
      {page === 'landing' && <Landing navigate={navigate} />}
      {page === 'dashboard' && <Dashboard navigate={navigate} />}
      {page === 'listings' && <Listings navigate={navigate} />}
      {page === 'seller' && <SellerFlow navigate={navigate} />}
      {page === 'ledger' && <Ledger navigate={navigate} />}
      {page === 'bundle' && <BundleFill navigate={navigate} />}
      {page === 'streak' && <Streak navigate={navigate} />}
      {page === 'profile' && <Profile navigate={navigate} />}
      {page === 'help' && <Help navigate={navigate} />}
      {page === 'explorer' && <Explorer navigate={navigate} />}
    </div>
  )
}
