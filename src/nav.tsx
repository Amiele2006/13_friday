import { useContext } from "react"
import "./App.css"
import { ProfileContext } from "./provider"


export default function Navbar() {
  const {name} = useContext(ProfileContext)
  return (
    <div className="nav">
      <p>Welcome, {name}</p>

      <div className="nav-links">
        <a href="https://github.com" target="_blank" rel="noreferrer">Github</a>
        <a href="https://google.com" target="_blank" rel="noreferrer">Google</a>
      </div>
    </div>
  )
}