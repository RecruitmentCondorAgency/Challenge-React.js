import { UserIcon } from '@heroicons/react/solid'
import { useCallback, useState } from 'react'
import useFirstRender from '../../hooks/useFirstRender'
import ImagePicker, { HandleImage } from '../ImagePicker'
import './AvatarSelector.scss'

const AvatarSelector = ({value, onChange}: {value: string | null | undefined, onChange: (image: string) => void}) => {
  const firstRender = useFirstRender()
  const [pickerValue, setPickerValue] = useState('')
  const pickerChange = useCallback((newValue: string) => {
    setPickerValue(newValue)
    if (!firstRender) {
      onChange(newValue)
    }
  }, [onChange])

  const updateStateAndHandle = (event: any, cb: HandleImage) => {
    if (value && !pickerValue) onChange('') 
    else cb(event)
  }
  return (
    <ImagePicker onChange={pickerChange}>
      {(handleClick) =>
        <div className='image-selector'>
          <div className="border-blue-700">
            {
              value ? <img src={value} alt="user" /> :
              <UserIcon className='text-blue-700 h-5'/>
            }
          </div>
          <button onClick={(event) => updateStateAndHandle(event, handleClick)} className='no-apperance text-blue-700'>
            {
              value ?
              'Eliminar' :
              'Escoger avatar'
            }
          </button>
        </div>
      }
    </ImagePicker>
  )
}

export default AvatarSelector