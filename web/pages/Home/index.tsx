import { useSelector } from 'react-redux'
import MainHeader from '../../components/MainHeader'
import Search from '../../components/Search'
import UniversityList from '../../components/UniversityList'
import { selectResult } from '../../store/search/selects'
import './Home.scss'

const Home = () => {
  const items = useSelector(selectResult)

  return (
    <div className='w-full sm:pb-0 pb-11'>
      <MainHeader></MainHeader>
      <div className='py-5 home-container'>
        <Search></Search>
        <UniversityList items={items} itemsPerPage={5}></UniversityList>
      </div>
    </div>
  )
}

export default Home