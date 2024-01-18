import { useEffect } from "react"
import { validateFavUni } from "../../shared/helpers"
import { useUserData } from "../../store/Auth.store"
import useUniversityStore from "../../store/University.store"
import { UniversityCard, UniversityCardProps } from "../Home/components/UniversityCard"
import useChangeFavUni from "../Home/services/changeFavUni"
import useGetCountryByCode from "./services/getCountry.service"
import { Country } from "../../types/country"
import { University } from '../../types/university';

export const Profile = () => {

  const {data: userdata, set:setUserData} = useUserData()
  const {changeFavUni} = useChangeFavUni()
  const { getContry, countryResponse } = useGetCountryByCode()
  const {data:universityData, setData:setUniData} = useUniversityStore()

  const handleFavClick = (data: UniversityCardProps) => {
    if(!userdata?.id) return 
    let newUnis = []
    let deletedOnes = []
    if(data.fav) {
      const obj = {...data}
      delete obj.fav
      newUnis.push(obj)
    } else {
      deletedOnes = userdata.universities.filter(el => el.name !== data.name)
    }
    newUnis = newUnis.concat(deletedOnes)
    setUserData({...userdata,universities:newUnis})
    changeFavUni({...userdata,universities:newUnis})
  }

  useEffect(() => {
    setUniData(localStorage.getItem('selectedUniversity') ? JSON.parse(localStorage.getItem('selectedUniversity'))  : universityData.selectedUniversity )
    const parsed = JSON.parse(localStorage.getItem('selectedUniversity')) as University
    if(parsed?.alpha_two_code) getContry(parsed.alpha_two_code)
  }, [])


  return (
    <div className="w-full grid grid-cols-1 gap-10 lg:grid-cols-2 px-6">
        <div className="">
            <p className="font-bold text-[#2991e0] text-4xl mb-[15px] mt-[6rem]">My favorites</p>
            {
              userdata?.universities?.length > 0 ? (

                userdata.universities.map(uni => (
                  <UniversityCard key={uni.name} handleClick={handleFavClick} fav={validateFavUni(uni, userdata.universities)} {...uni} />
                ))
              ): (<></>)
            }
        </div>
        <div className="">
            <h2 className="font-bold text-4xl mb-[15px] text-[#2991e0] mt-[6rem]">Selected University</h2>
            <div className="w-full mb-[2.5rem] rounded-sm py-[20px] bg-white shadow-xl  px-[25px]">
                <b className="text-[#2c3038]">{universityData?.selectedUniversity?.name  }</b>
                <br />
                {
                  countryResponse.data && !countryResponse.loading ? (
                    <>
<p>Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis eum ea sequi aliquam voluptates, error facere, beatae, unde natus quibusdam odit excepturi inventore eligendi ipsam accusantium laborum optio. In, quas! Lorem ipsum dolor sit amet consectetur adipisicing elit.  <br /> <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur vero recusandae tempore officiis eum quidem id inventore delectus. Magni fugit alias reiciendis consectetur minima voluptas impedit architecto ea aperiam neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium non quisquam vero. Optio consectetur illo, quibusdam repellat officia odit quam eaque nisi, possimus pariatur dignissimos corporis adipisci fugiat asperiores eveniet. ipsum dolor sit amet consectetur adipisicing elit. Laborum expedita dolores odio! Officia velit consectetur ea corrupti voluptatum re ullam, similique asperiores ad!</p>                      <p>Website: {universityData?.selectedUniversity?.web_pages?.toString()}</p><br />
                      <p>Location: {countryResponse?.data[0]?.name.official}</p><br />
                      <p>Country's Capital: {countryResponse?.data[0]?.capital.toString()}</p><br />
                      {Object.keys(countryResponse?.data[0]?.currencies).map((currencyCode) => (
                        <p key={currencyCode}>
                         Currency: {currencyCode} {countryResponse?.data[0]?.currencies[currencyCode].name} ({countryResponse?.data[0]?.currencies[currencyCode].symbol})
                        <br /></p>
                      ))}
                      <p>Languages: {Object.keys(countryResponse?.data[0]?.languages).map(el => countryResponse?.data[0]?.languages[el]).toString()}</p>
                      <br /><p>Population: {Intl.NumberFormat('en-US',{maximumSignificantDigits:3}).format(Number(countryResponse?.data[0]?.population))}</p><br />
                    </>
                  ): <h3 className="text-4xl text-[grey] text-center py-[10rem]">Select a University</h3>
                }
            </div>
        </div>
    </div>
  )
}
