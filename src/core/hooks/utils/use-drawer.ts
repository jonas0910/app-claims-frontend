import { useState } from 'react'

export const useDrawer = () => {
  const [isVisibleDrawer, setIsVisibleDrawer] = useState(false)

  const openDrawer = () => {
    setIsVisibleDrawer(true)
  }

  const onClose = () => {
    setIsVisibleDrawer(false)
  }

  return { isVisibleDrawer, openDrawer, onClose }
}
