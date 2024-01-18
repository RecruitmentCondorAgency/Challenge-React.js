import { University } from "../../../types/university"
import  noFilled from  '../../../assets/favorite.png'
import  Filled from  '../../../assets/star.png'
import { useEffect, useState } from 'react';
export interface UniversityCardProps extends University {
    handleClick: (data) => void,
    fav?: boolean
} 
export const UniversityCard = ({fav,alpha_two_code,country,handleClick,name,'state-province': stateProvidence, domains,web_pages}: UniversityCardProps)  => {

    const [favState, setfav] = useState(null)

    useEffect(() => {
        setfav(fav)

    },[fav])

    const handleChangeFav = (e:any, value: boolean) => {
        e.stopPropagation();
        setfav(value)

        if(value === false || value === true){
            const uni: Omit<UniversityCardProps, 'handleClick'> = {
                alpha_two_code,
                country,
                name,
                "state-province": stateProvidence,
                domains,
                web_pages,
                fav: value,
            } 
            handleClick(uni)
        }
    }

    useEffect(() => {
       
    }, [ favState])

  return (
    <div className="w-full mb-[2.5rem] rounded-sm py-[20px] bg-white h-[200px] md:h-[120px] shadow-xl  px-[25px]">
        <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between">
                <div className="flex flex-col md:flex-row  gap-8">
                    <span className="font-bold">{name}</span>
                    <span className="">{country}</span>
                </div>
                {
                     handleClick && (
                         favState ? (
                             <img onClick={(e) => {handleChangeFav(e,false)}} className="self-center cursor-pointer" width={24} height={24}  src={Filled} alt="filled-star" />
                         ) : (<img onClick={(e) => {handleChangeFav(e,true)}} className="self-center cursor-pointer" width={24} height={24}  src={noFilled} alt="non-filled-star" />)
                     )
                }
            </div>
            <span>We'd like to see a proposal to enrich this module</span>
        </div>
        <div>

        </div>
    </div>
  )
}
