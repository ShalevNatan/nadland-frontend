import { signOut } from 'aws-amplify/auth'

export default function Navbar({ page, onNavigate }) {
  const handleSignOut = async () => {
    await signOut()
    window.location.reload()
  }

  return (
    <nav className="navbar">
      <span className="navbar-brand">nadLand</span>
      <div className="navbar-links">
        <button
          className={page === 'calculator' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => onNavigate('calculator')}
        >
          Calculator
        </button>
        <button
          className={page === 'history' ? 'nav-btn active' : 'nav-btn'}
          onClick={() => onNavigate('history')}
        >
          History
        </button>
      </div>
      <button className="signout-btn" onClick={handleSignOut}>
        Sign Out
      </button>
    </nav>
  )
}
