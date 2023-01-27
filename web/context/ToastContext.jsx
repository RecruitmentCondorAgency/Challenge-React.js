import React from 'react'

export const ToastContext = React.createContext()

export default function ToastProvider({ children }) {
  const toast = React.useRef(null)

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  )
}