import { createContext, useContext, useState } from "react"

interface ProfileContextProps {
    name: string,
    email: string, 
    job: string, 
    phone: string,
    age?: number,
    alert?: () => void
}

export const ProfileContext = createContext<ProfileContextProps>({} as ProfileContextProps);

export function ProfileProvider({children, initial}: {children: React.ReactNode, initial: ProfileContextProps}) {
    const [state, setState] = useState(initial)
    const alertUser = () => {alert("ALERT!")}
    return(
        <ProfileContext.Provider value={{...state, alert: alertUser}}>
            {children}
        </ProfileContext.Provider>
    )
}