import { useSelector } from 'react-redux'
import MainHeader from '../../components/MainHeader'
import UniversityDetail from '../../components/UniversityDetail'
import UniversityList from '../../components/UniversityList'
import { selectUniversities, selectUniversity } from '../../store/user/selects'
import './Profile.scss'


const Profile = () => {
  const items = useSelector(selectUniversities)
  const selected = useSelector(selectUniversity)
  return (
    <>
    <MainHeader></MainHeader>
    <div className='profile-container'>
      <div className='profile-universities'>
        <h2>My favorites</h2>
        <UniversityList items={items} itemsPerPage={4} canSelect={true}></UniversityList>
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