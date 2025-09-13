import { createContext, useContext, useState } from 'react'

interface ThemeContextProps {
    theme:string;
    Light: () => void
    Dark: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

export function ThemeProvider({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState("light")

    const Light = () => setTheme("light")
    const Dark = () => setTheme("dark")
    return(
        <ThemeContext.Provider value={{theme,Light,Dark}}>
            {children}
        </ThemeContext.Provider>
    )
}