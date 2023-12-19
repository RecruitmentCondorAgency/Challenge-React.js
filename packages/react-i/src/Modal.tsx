function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null
  return (
    <>
      <div id="popup1" className="overlay">
        <div className="popup" onClick={(e) => e.stopPropagation()}>
          <a className="close" href={void 0} onClick={onClose}>
            &times;
          </a>
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
