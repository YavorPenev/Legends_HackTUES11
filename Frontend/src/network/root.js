export async function getlogin() {
    return (await fetch("http://localhost:8000/login")).json()
}