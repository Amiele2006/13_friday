import { useContext } from "react"
import "./App.css"
import { ProfileContext } from "./provider"
export default function ProfileCard(
    {children}: 
{
    children?: React.ReactNode
}) {
    const {phone} = useContext(ProfileContext)
    return (
        <div className="profile">
            <Name/>
            <OtherDetail/>
            <p>{phone}</p>
            {children}
        </div>
    )
}

function Name() {
    const {name} = useContext(ProfileContext)
    return (
        <div>{name}</div>
    )
}

function OtherDetail() {
    const {email, job, age, alert} = useContext(ProfileContext)
    return(
        <div>
            <p>{email}</p>
            <p>{job}</p>
            <p>{age}</p>
            <button onClick={alert}>CLICK ME</button>
        </div>
    )
}