import { useEffect, useState } from "react";
import { universities } from "../../services";
import { University } from "../../store/user/types";
import { ExternalLinkIcon } from '@heroicons/react/solid';
import { StarIcon } from '@heroicons/react/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/solid';
import Card from "../Card";
import Clamp from 'react-multiline-clamp';
import { store } from "../../store";
import { fetchPostUniversities } from "../../store/user/thunks";
import useHasUniversity from "../../hooks/useHasUniversity";
import abortSignal from "../../utils/abortSiganl";
import './UniversityCard.scss'
import { setUniversity } from "../../store/user";
import useGetDescription from "../../hooks/useGetDescription";

type PropTypes = {data: University, canSelect?: boolean}


const UniversityCard = (props: PropTypes) => {
  const {data, canSelect} = props
  const hasUniversity = useHasUniversity(data)
  const [description, loading] = useGetDescription(data) 

  const handleFavorite = () => {
    if (!canSelect) {
      store.dispatch(fetchPostUniversities({...data, description}))
      .catch(error => console.error(error))
    }
  }

  const handleClick = () => {
    if (canSelect) {
      store.dispatch(setUniversity({...data, description}))
    }
  }

  return (
    <Card>
      <div className="w-full" onClick={handleClick}>
        <div className="card-header">
          <h3>{data.name}</h3>
          <div className="card-btns">
            <a href={data.web_pages[0]} target="_blank" rel="noopener noreferrer">
              <ExternalLinkIcon className='h-5 w-5'></ExternalLinkIcon>
            </a>
            {
              !hasUniversity ?
              <StarIcon
                className={`${loading? 'cursor-wait': 'cursor-pointer'} h-5 w-5`}
                onClick={() => !loading && handleFavorite()}>
              </StarIcon> :
              <StarIconSolid className='text-yellow-400 h-5 w-5 cursor-pointer' onClick={handleFavorite}></StarIconSolid>
            }
          </div>
        </div>
        <div className="card-description">
          <Clamp withTooltip lines={2}>
            <p> {loading ? 'Loading description...': description}</p>
          </Clamp>
        </div>
      </div>
    </Card>
  )
}

export default UniversityCard