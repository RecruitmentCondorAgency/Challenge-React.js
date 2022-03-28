import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../../components/Card'
import MainHeader from '../../components/MainHeader'
import UniversityDetail from '../../components/UniversityDetail'
import UniversityList from '../../components/UniversityList'
import useFirstRender from '../../hooks/useFirstRender'
import { selectUniversities, selectUniversity } from '../../store/user/selects'
import { SelectedUniversity } from '../../store/user/types'
import './Profile.scss'


const Profile = () => {
  const items = useSelector(selectUniversities)
  const selected = useSelector(selectUniversity)
  const first = useFirstRender()
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (window.innerWidth <= 650 && !first) {
      setOpen(true)
    }
  }, [selected])

  return (
    <>
    <MainHeader></MainHeader>
    <div className='profile-container justify-center'>
      <div className='profile-universities'>
        <h2>My favorites</h2>
        {
          (items && items.length) ?
          <UniversityList items={items} itemsPerPage={4} canSelect={true}></UniversityList> :
          <span className='no-data'>No data available</span>
        }
      </div>
      <div className='profile-data hidden sm:block'>
        {
          selected && (
            <>
              <h2>Selected university</h2>
              <Card>
                <UniversityDetail item={selected}></UniversityDetail>
              </Card>
            </>
          )
        }
      </div>
      {selected && <DetailModal isOpen={open} setIsOpen={setOpen} university={selected}></DetailModal>}
    </div>
  </>
  )
}

export default Profile


const DetailModal = ({isOpen, setIsOpen, university}: {isOpen: boolean, setIsOpen: Function, university: SelectedUniversity}) => {

  const closeModal = () => {
    setIsOpen(false)
  }

  const openModal = () => {
    setIsOpen(true)
  }

  return (
    <>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-blue-500"
                >
                  Selected university
                </Dialog.Title>
                <div className="mt-2">
                  <UniversityDetail item={university}></UniversityDetail>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    Got it, thanks!
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}