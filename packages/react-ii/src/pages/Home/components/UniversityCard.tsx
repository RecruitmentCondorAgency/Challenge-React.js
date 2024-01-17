import { University } from "../../../types/university"

export const UniversityCard = (university: University)  => {
  return (
    <div className="w-full my-[2.5rem] rounded-sm py-[20px] bg-white h-[200px] md:h-[120px] shadow-xl  px-[25px]">
        <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col md:flex-row  gap-8">
                <span className="font-bold">{university.name}</span>
                <span className="">{university.country}</span>
            </div>
            <span>We'd like to see a proposal to enrich this module</span>
        </div>
    </div>
  )
}
