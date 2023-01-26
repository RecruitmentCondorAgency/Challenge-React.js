import { Button } from 'primereact/button'
import { Image } from 'primereact/image'
import { Menubar } from 'primereact/menubar'
import React from 'react'

function Navbar() {
  return (
    <nav>
      <Menubar
        start={
          <Image
            src="https://cdn1.iconfinder.com/data/icons/office-icons-17/512/ilustracoes_04-10-256.png"
            alt="logo"
            width='64px'
            height='64px'
          />
        }
        end={
          <>
            <Button label="Search" className="p-button-raised p-button-text p-button-plain mr-6" />
            <Button label="Profile" className="p-button-raised p-button-text p-button-plain mr-6" />
            <Button label="Logout" icon="pi pi-power-off" className='p-button-danger' />
          </>
        }
      />
    </nav>
  )
}

export default Navbar