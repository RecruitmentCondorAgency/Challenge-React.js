import logo from '../assets/logo.png'

const Navbar = () => {
    return (
        <nav className="fixed bg-white w-screen h-[100px] shadow-lg shadow-gray-300">
            <div className="p-5 flex items-center justify-between">
                <div className="flex items-center">
                    <img src={logo} className="mx-auto h-14 px-5" alt="Logo" />
                </div>
                <div>Opciones</div>
            </div>
        </nav>
    )
}

export default Navbar
