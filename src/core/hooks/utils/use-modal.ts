export const useModal = () => {
    const openModal = ({ elementById }: { elementById: string }) => {
      const modal = document.getElementById(elementById) as HTMLDialogElement
      if (modal) {
        modal.show()
      }
    }
  
    const closeModal = ({ elementById }: { elementById: string }) => {
      const modal = document.getElementById(elementById) as HTMLDialogElement
      if (modal) {
        modal.close()
      }
    }
  
    return { openModal, closeModal }
  }
  