import { useSelector } from 'react-redux'
import Card from '../../components/Card'
import MainHeader from '../../components/MainHeader'
import UniversityDetail from '../../components/UniversityDetail'
import UniversityList from '../../components/UniversityList'
import { store } from '../../store'
import { setUniversity } from '../../store/user'
import { selectUniversities, selectUniversity } from '../../store/user/selects'
import { University } from '../../store/user/types'
import './Profile.scss'


const Profile = () => {
  const items = useSelector(selectUniversities)
  const selected = useSelector(selectUniversity)
  const selectNewUniversity = (university: University) => {
    store.dispatch(setUniversity(university))
  }
  return (
    <>
    <MainHeader></MainHeader>
    <div className='profile-container'>
      <div className='profile-universities'>
        <h2>My favorites</h2>
        <UniversityList items={items} onItemClick={selectNewUniversity} itemsPerPage={4}></UniversityList>
      </div>
      <div className='profile-data'>
        {
          selected && (
            <>
              <h2>Selected university</h2>
              <UniversityDetail item={selected}></UniversityDetail>
            </>
          )
        }
      </div>
    </div>
  </>
  )
}

export default Profile