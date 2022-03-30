import { Dialog, Transition } from "@headlessui/react"
import { Fragment, useState } from "react"
import { SearchIcon } from '@heroicons/react/solid'
import './Search.scss'
import SearchInput from "./SearchInput"

type PropsModal = {isOpen: boolean, setOpen: (value: boolean) => void}

const Search = () => {
  const [modalState, setModalState] = useState(false)

  const openModal = () => {
    setModalState(true)
  }

  return (
    <>
      <div className="search-container hidden sm:flex">
        <SearchInput />
      </div>
      <button className="floating-btn appearence-none flex sm:hidden rounded-full text-blue-900 bg-blue-100" type="button" onClick={openModal}>
        <SearchIcon className="w-7 h-7"></SearchIcon>
      </button>
      <SearchModal isOpen={modalState} setOpen={setModalState}/>
    </>
  )
}

const SearchModal = (props: PropsModal) => {
  const {isOpen, setOpen} = props

  const closeModal = () => {
    setOpen(false)
  }

  return (
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
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Search universities
              </Dialog.Title>
              <div className="mt-2">
                <SearchInput onSearch={closeModal}/>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Search