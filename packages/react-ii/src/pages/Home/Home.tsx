import { useEffect, useRef, useState } from "react"
import { useDebounce } from "../../hooks/useDebounce";
import useSearchUni from "./services/searchUni";
import { University } from "../../types/university";
import useGetAllUniversities from "./services/getAllUniversities";
import { UniversityCard } from "./components/UniversityCard";

export const Home = () => {

  const ref = useRef<HTMLDivElement>(null)
  const { searchUni, serachResponse } = useSearchUni()
  const {  getAll, universitiesRes } = useGetAllUniversities()
  const [selectedUni, setselectedUni] = useState<University>()
  const [searchValue, setSearchValue] = useState<string>('')
  const [universities, setuniversities] = useState<University[]>([])
  const [uniList, setUniList] = useState<University[]>([])
  const debounceRes = useDebounce(searchValue, 1000);
  const handleSearch = (e) => {
    setSearchValue(e.target.value)

  }

  const handleSelectUni = (univesity: University) => {
    ref.current.classList.add('hidden')
    setselectedUni(univesity)
    setSearchValue('')
  } 

  useEffect(() => {
    if (debounceRes) {
      searchUni(debounceRes)
    }
  }, [debounceRes]);

  useEffect(() => {
    if(!serachResponse?.loading && !serachResponse?.error && serachResponse?.data) {
      console.log(serachResponse)
      if(serachResponse.data.length > 0) {
        setuniversities(serachResponse.data.splice(0,6))
        ref.current.classList.remove('hidden')
      }
    }
  }, [serachResponse])
  
  useEffect(() => {
    if(!universitiesRes?.loading && !universitiesRes?.error && universitiesRes?.data) {
        setUniList(universitiesRes.data)
    }
  }, [universitiesRes])

  useEffect(() =>{
    getAll()
  },[])

  return (
    <div className="w-[85%] md:w-[60%] lg:w-[45%] m-auto mt-[100px]">
      <div className="flex flex-col md:flex-row gap-8 relative ">
        <input onChange={handleSearch} value={searchValue} placeholder="University Name" className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
          Button
        </button>
        <div id="dropdown" tabIndex={0} onBlur={() => {ref.current.classList.add('hidden')}} ref={ref} className="z-10 absolute top-[65px] shadow-md hidden left-0 right-0 w-[100%]   bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
              {
                universities.map(uni => (
                  <li className="cursor-pointer" onClick={() => {handleSelectUni(uni)}}>
                    <a className="block  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{uni.name}</a>
                  </li>
                ))
              }
            </ul>
        </div>
      </div>
      <div>
        {
          uniList.length > 0 ? (
            uniList.map(uni => (
             <UniversityCard  key={uni.name} {...uni} />
           ))
          ): <h3 className="text-center">LOADING...</h3>
        }
      </div>
    </div>
  )
}
