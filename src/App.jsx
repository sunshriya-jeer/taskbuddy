import { useState } from "react"
import "./App.css"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

function AppContent() {
  const { user, loading } = useAuth()
  const [authView, setAuthView] = useState("login") // "login" | "signup"

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="empty-state">
          <div className="empty-state-illustration">
            <div className="empty-icon-circle empty-loading-circle">
              <svg
                className="loading-spinner-icon"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="12" y1="2" x2="12" y2="6"></line>
                <line x1="12" y1="18" x2="12" y2="22"></line>
                <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                <line x1="2" y1="12" x2="6" y2="12"></line>
                <line x1="18" y1="12" x2="22" y2="12"></line>
                <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
              </svg>
            </div>
          </div>
          <h3 className="empty-state-heading">Loading TaskBuddy...</h3>
          <p className="empty-state-text">Checking authentication session.</p>
        </div>
      </div>
    )
  }

  if (!user) {
    if (authView === "signup") {
      return <Signup onSwitchToLogin={() => setAuthView("login")} />
    }
    return <Login onSwitchToSignup={() => setAuthView("signup")} />
  }

  return <Dashboard />
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App