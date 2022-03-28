import { Dialog, Transition, Combobox } from "@headlessui/react"
import { FormEvent, Fragment, useEffect, useLayoutEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { store } from "../../store"
import { setResult, updateSearch } from "../../store/search"
import { selectSearch } from "../../store/search/selects"
import { CheckIcon, SearchIcon, SelectorIcon } from '@heroicons/react/solid'
import './Search.scss'
import useUniversitiesList from "../../hooks/useUniversitiesList"
import { University } from "../../store/user/types"

type PropsModal = {isOpen: boolean, closeModal: () => void}
const initialBatch = 20

const Search = () => {
  const query = useSelector(selectSearch)
  const [selected, setSelected] = useState({name: ''})
  const [batchLength, setBatchLength] = useState(initialBatch)
  const [universities, fullList] = useUniversitiesList(query, batchLength)
  const [modalState, setModalState] = useState(false)

  const openModal = () => {
    setModalState(true)
  }

  const closeModal = () => {
    setModalState(false)
  }

  const updateQuery = (value: string) => {
    store.dispatch(updateSearch(value))
  }

  const handleScroll = (event: any) => {
    const {
      scrollTop,
      scrollHeight,
      offsetHeight
    } = event.target
    if (scrollHeight - scrollTop === offsetHeight) {
      const newBatch = batchLength + initialBatch
      if (newBatch > fullList.length) {
        setBatchLength(fullList.length)
      } else {
        setBatchLength(newBatch)
      }
    }
  }

  const updateResult = () => {
    store.dispatch(setResult([...fullList]))
  }

  const handleCombo = (value: University) => {
    setSelected(value)
    updateQuery(value.name)
  }

  return (
    <>
      <div className="search-container">
        <form className="search-form">
          <div className="search-input">
            <Combobox value={selected} onChange={handleCombo}>
              <div className="relative h-full">
                <div className="relative h-full pt-1 w-full text-left bg-white rounded-md shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-blue-300 focus-visible:ring-offset-2 sm:text-sm overflow-hidden">
                  <Combobox.Input
                    className="w-full border-none focus:ring-0 py-2 pl-3 pr-10 text-sm leading-5 text-gray-900"
                    displayValue={(item: University) => query || ''}
                    onChange={event => updateQuery(event.target.value)}
                  />
                  <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                    <SelectorIcon
                      className="w-5 h-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Combobox.Options
                    onScroll={handleScroll}
                    className="optionsRef absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {universities.length === 0 && query !== '' ? (
                      <div className="cursor-default select-none relative py-2 px-4 text-gray-700">
                        Nothing found.
                      </div>
                    ) : (
                      universities.map((item: University, i) => (
                        <Combobox.Option
                          key={item.name}
                          className={({ active }) =>
                            `cursor-pointer select-none relative py-2 pl-10 pr-4 ${
                              active ? 'text-white bg-blue-400' : 'text-gray-900'
                            }`
                          }
                          value={item}
                        >
                          {({ active }) => (
                            <>
                              <span
                                className={`block truncate ${
                                  selected.name === item.name ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {item.name}
                              </span>
                              {selected.name === item.name ? (
                                <span
                                  className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                    active ? 'text-white' : 'text-blue-600'
                                  }`}
                                >
                                  <CheckIcon className="w-5 h-5" aria-hidden="true" />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Combobox.Option>
                      ))
                    )}
                  </Combobox.Options>
                </Transition>
              </div>
            </Combobox>
          </div>
          <button onClick={updateResult} type="button" className='rounded-md text-blue-900 bg-blue-100 border border-transparent hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500'>
            <SearchIcon></SearchIcon>
          </button>
        </form>
      </div>
    </>
  )
}

const SearchModal = (props: PropsModal) => {
  const {isOpen, closeModal} = props

  const [search, setSearch] = useState('')

  const closeModalAndDispatch = () => {
    closeModal()
    store.dispatch(updateSearch(search))
  }

  const handdleInput = (event: FormEvent<HTMLInputElement>) => {
    setSearch(event.currentTarget.value)
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
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Busca una publicación
              </Dialog.Title>
              <div className="mt-2">
              <input type="text" placeholder="Usuario o mensaje" id="search"
                className="appearance-none w-full shadow-sm bg-gray-100 block rounded border-slate focus:border-blue-700"
                onInput={handdleInput} value={search}>
              </input>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModalAndDispatch}
                >
                  Buscar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Search