import styles from "../style";
import logo from "../../../../graphics/logo.png";

export default function Error404() {
    return (
        <div className={`h-full absolute flex items-center bg-red-500 justify-center   w-full`}>
            <div className='p-8 my-4 rounded-2xl border-2 shadow-lg border-rounded w-[70%] sm:w-[60%] bg-white'>
                    <img src={logo} alt="logo" className="mx-auto w-[100px] h-[100px] object-contain my-2" />
                    
                    <p className={`${styles.sectionSubText}`}>Error | 404 </p>
                    <h3 className={styles.sectionHeadText}>El recurso al que intentas acceder no existe</h3>
                    
            </div>
        </div>
    )
}
