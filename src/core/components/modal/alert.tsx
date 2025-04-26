import { ReactNode } from 'react'
import { Button } from '../ui'
import { useModal } from '@/core/hooks/utils/use-modal'


interface ModalProps {
  elementById: string
  messageContent: string
  actions: () => void
  title?: string
  actionButtons?: ReactNode
}

const AlertModal = ({
  elementById,
  actions,
  title,
  messageContent,
  actionButtons
}: ModalProps) => {
  const { closeModal } = useModal()

  const defaultActionButtons = (
    <div className='flex items-end gap-2 mt-4'>
      <Button onClick={() => closeModal({ elementById })}>Cancelar</Button>
      <Button
        onClick={() => {
          actions()
        }}
      >
        Confirmar
      </Button>
    </div>
  )

  return (
    <dialog id={elementById} className='modal'>
      <div className={`bg-slate-50 p-7 rounded`}>
        {title && <h3 className='mb-2'>{title}</h3>}
        <span className=''>{messageContent}</span>
        {actionButtons ? actionButtons : defaultActionButtons}
      </div>
    </dialog>
  )
}

export default AlertModal
