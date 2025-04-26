import { flexRender, Header } from '@tanstack/react-table'

interface TableHeadProps<T> {
  header: Header<T, unknown>
}

const TableDataHead = <T,>({ header }: TableHeadProps<T>) => {
  return (
    <th
      className='border-b border-gray-200 dark:border-[#4a515a] bg-gray-100 dark:bg-[#1a2027] p-4 text-left font-semibold text-gray-600 dark:text-gray-200 uppercase tracking-wide text-sm'
      key={header.id}
      colSpan={header.colSpan}
      style={{ position: 'relative', width: header.getSize() }}
    >
      {header.isPlaceholder
        ? null
        : flexRender(header.column.columnDef.header, header.getContext())}
      {header.column.getCanResize() && (
        <div
          onMouseDown={header.getResizeHandler()}
          onTouchStart={header.getResizeHandler()}
          className={`absolute right-0 top-0 h-full w-1 cursor-col-resize bg-transparent ${
            header.column.getIsResizing()
              ? 'bg-gray-300 dark:bg-gray-500'
              : 'hover:bg-gray-200 dark:hover:bg-gray-400'
          }`}
        ></div>
      )}
    </th>
  )
}

export default TableDataHead
