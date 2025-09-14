import { useAuth } from "./AuthProvider";

export default function Home() {
    const { user, login} = useAuth();

    const handleLogin = () => {
        //Dummy data
        login({name: "Emilie", email: "emily.@test.com"})
    }

    return(
        <div className="home">
            <h2> Home Page </h2>
            {!user ? (
                <button onClick={handleLogin} className="button button-blue">
                    Login
                </button>
            ) : (
                <p>You are logged in as {user.email}</p>
            )}
        </div>
    )
}