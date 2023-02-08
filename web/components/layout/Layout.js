import Header from "../UI/Header";

export default function Layout({ children }) {
    return (
        <>
            <Header/>
            {children}
        </>
    )
}