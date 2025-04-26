'use client'
import { ReactNode } from 'react'
import { Badge } from '../ui'
import { useModal } from '@/core/hooks/utils/use-modal'
import CloseIcon from '../icons/close-icon'
import styles from './modal.module.css'

interface ModalProps {
  children: ReactNode
  elementById: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onCancel?: (body?: any) => void
  size?: 'small' | 'medium' | 'large' | 'tiny'
}

const Modal = ({
  children,
  elementById,
  onCancel,
  size = 'medium'
}: ModalProps) => {
  const { closeModal } = useModal()

  const modalSizeClasses = {
    tiny: 'max-w-xl',
    small: 'max-w-4xl',
    medium: 'max-w-5xl',
    large: 'max-w-7xl'
  }

  return (
    <dialog id={elementById} className={`modal ${styles.bgModalDialog}`}>
      <div
        className={`bg-[url('/bg.svg')] dark:bg-[url('/bgdark.svg')] modal-box rounded ${modalSizeClasses[size]}`}
      >
        {children}
        {/* <div className='modal-action'> */}
        <div className='modal-action absolute top-[-15px] right-2'>
          {/* <form method='dialog'> */}
          {/* if there is a button in form, it will close the modal */}
          {/* <div className='absolute top-1 right-1'> */}
          <Badge
            handleClick={() => {
              closeModal({ elementById })
              if (onCancel) {
                onCancel()
              }
            }}
            variant='primary'
            className='w-12 h-12 flex items-center justify-center rounded-full cursor-pointer'
            // icon={<CloseIcon className='w-7 h-7' />}
          >
            {/* Cancelar */}
            <CloseIcon className='w-6 h-6' />
          </Badge>
          {/* </div> */}
          {/* </form> */}
        </div>
      </div>
    </dialog>
  )
}

export default Modal
