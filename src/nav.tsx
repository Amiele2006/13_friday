// import { useContext } from "react"
import "./App.css"
// import { ProfileContext } from "./provider"
import { useAuth } from "./AuthProvider";


export default function Navbar() {
  // const {name} = useContext(ProfileContext)
  const { user, logout} = useAuth();

  return (
    <nav className="nav">

      <div className="nav-links">
        <a href="https://github.com" target="_blank" rel="noreferrer">Github</a>
        <a href="https://google.com" target="_blank" rel="noreferrer">Google</a>
      </div>

      <div>
        {user ? (
          <>
            <span className="span-1">Welcome, {user.name}</span>
            <button className="button button-red" onClick={logout}>Logout</button>
          </>
        ): (
          <span>Not logged in</span>
        )}
      </div>
    </nav>
  )
}