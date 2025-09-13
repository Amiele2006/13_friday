import { useContext } from "react"
import "./App.css"
import { ThemeContext } from "./theme-provider"
export default function ThemeCard(
    {children}: 
{
    children?: React.ReactNode
}) {
    const {theme} = useContext(ThemeContext);
    return (
        <div className="profile">
            <h1>Theme Card</h1>
            <p>{theme} Mode</p>
            <ThemeSwitcher />
        </div>
    )
}

const ThemeSwitcher = () => {
    const {Light, Dark} = useContext(ThemeContext);
    return(
        <div>
            <button onClick={Light}>Light Mode</button> {' '}
            <button onClick={Dark}>Dark Mode</button>
        </div>
    )
}