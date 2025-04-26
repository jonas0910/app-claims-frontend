/* eslint-disable @typescript-eslint/no-explicit-any */
import xlsx from 'json-as-xlsx'
import { Button } from '../ui'
import { ElementType, ReactNode } from 'react'

interface DownloadExcelProps {
  content: any
  columns: any
  filename?: string
  icon?: ReactNode
  as?: ElementType
  variant?: string
}

const DownloadExcel = ({
  content,
  columns,
  filename = 'Reporte',
  icon,
  as: Component = Button,
  variant = 'downloadExcel'
}: DownloadExcelProps) => {
  const data = [
    {
      sheet: 'Reporte',
      columns,
      content
    }
  ]

  const settings = {
    fileName: filename,
    extraLength: 3
  }

  return (
    <Component
      variant={variant}
      // onClick={() => xlsx(data, settings)}
      // handleClick={() => xlsx(data, settings)}
      {...(Component === Button
        ? { onClick: () => xlsx(data, settings) }
        : { handleClick: () => xlsx(data, settings) })}
    >
      {icon ? icon : 'Descargar Excel'}
    </Component>
  )
}

export default DownloadExcel
