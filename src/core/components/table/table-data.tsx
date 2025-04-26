import { Cell, flexRender } from '@tanstack/react-table'

interface TableDataProps<T> {
  cell: Cell<T, unknown>
}

const TableData = <T,>({ cell }: TableDataProps<T>) => {
  return (
    <td
      className='p-3 text-sm text-gray-600 dark:text-[#9fa6b4]'
      key={cell.id}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </td>
  )
}

export default TableData
