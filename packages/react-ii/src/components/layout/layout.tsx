import { Fragment } from 'react'

import Header from '../header/header'


export interface LayoutProps { 
	children: React.ReactNode
 }

export default function Layout(props: LayoutProps) {
  return (
    <>
      <div className="min-h-full">
        <Header />

        <main style={{backgroundColor:'#f7f9fc'}}>
          <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">{props.children}</div>
        </main>
      </div>
    </>
  )
}
