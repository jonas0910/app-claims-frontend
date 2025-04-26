import React, { useState, useRef, useEffect } from 'react'
import { XMarkIcon } from '@heroicons/react/24/solid'
interface ModalIAProps {
  onClose: () => void
  children: React.ReactNode // Aquí se espera recibir el historial de mensajes
}

const ModalIA: React.FC<ModalIAProps> = ({ onClose, children }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 100 })
  const [offset, setOffset] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (modalRef.current) {
      const modalWidth = modalRef.current.offsetWidth || 400
      const xPos = window.innerWidth - modalWidth - 20
      setPosition({ x: xPos, y: 100 })
    }
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (modalRef.current) {
      const rect = modalRef.current.getBoundingClientRect()
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
      setIsDragging(true)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y
      })
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [handleMouseMove, isDragging, offset])

  return (
    <div
      className='fixed bg-white p-4 rounded-lg shadow-lg z-50'
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        width: '400px',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onMouseDown={handleMouseDown}
      ref={modalRef}
    >
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-xl font-semibold'>Xentrics Chat IA</h2>
        <button onClick={onClose} className='text-red-500 font-bold'>
          <XMarkIcon className='h-5 w-5 mr-2' />
        </button>
      </div>
      <div className='modal-body'>
        <h3 className='text-lg font-semibold'>Historial de Mensajes:</h3>
        <div className='max-h-100 overflow-y-auto'>{children}</div>
      </div>
    </div>
  )
}

export default ModalIA
