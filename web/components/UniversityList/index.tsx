import UniversityCard from '../../components/UniversityCard'
import ReactPaginate from 'react-paginate';
import { useEffect, useRef, useState } from 'react'
import { Transition } from '@headlessui/react'
import { University } from '../../store/user/types'
import './UniversityList.scss'

type PropTypes = {items: University[], itemsPerPage: number, canSelect?: boolean}

const UniversityList = (props: PropTypes) => {
  const {items, itemsPerPage, canSelect} = props
  const results = useRef<any>(null)
  const [height, setHeight] = useState<string | number>('auto')
  const [marginPages, setMarginPages] = useState(4)
  const [show, setShow] = useState(true);
  const [currentItems, setCurrentItems] = useState<University[]>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setNewItems(items.slice(itemOffset, endOffset));
  }, [itemOffset, items]);

  useEffect(() => {
    setHeight('auto')
    setShow(true)
  }, [currentItems])

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth < 450) {
        setMarginPages(1)
      } else {
        setMarginPages(4)
      }
    }
    onResize()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;;
    setItemOffset(newOffset);
  };

  const setNewItems = (list: University[]) => {
    setShow(false)
    if(results) setHeight(results.current?.clientHeight)
    setTimeout(() => {
      setCurrentItems(list);
      setPageCount(Math.ceil(items.length / itemsPerPage));
    }, 200)
  }

  return (
    <>
      <div style={{minHeight: 200, height }} ref={results} className="w-full">
        <Transition
          appear={true}
          show={show}
          as="div"
          enter="transition-opacity duration-75"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          className='result-list'
        >
          {
            currentItems.map((item) => (
              <UniversityCard data={item} key={item.name} canSelect={canSelect}></UniversityCard>
            ))
          }
        </Transition>
      </div>
      {
        (items.length > itemsPerPage) && (
          <ReactPaginate
            className='search-paginator'
            breakLabel="..."
            nextLabel=">"
            onPageChange={handlePageClick}
            marginPagesDisplayed={marginPages}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={() => null}
          />
        )
      }
    </>
  )
}

export default UniversityList