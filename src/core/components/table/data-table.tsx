/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import React, { useMemo } from 'react'
import TableDataHead from './table-data-head'
import TableData from './table-data'

interface DataTableProps<T> {
  columns: any
  dataSource: T[] | undefined
}

const DataTable = <T,>({ columns, dataSource }: DataTableProps<T>) => {
  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    columns,
    data: dataSource ?? defaultData,
    getCoreRowModel: getCoreRowModel()
  })
  return (
    <div className='block max-w-full overflow-x-scroll overflow-y-hidden'>
      <table className='w-full'>
        <thead className='bg-[#FAFAFA]'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className=''>
              {headerGroup.headers.map((header) => (
                <TableDataHead<T> key={header.id} header={header} />
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='border-y border-slate-100'>
              {row.getVisibleCells().map((cell) => (
                <TableData<T> key={cell.id} cell={cell} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default DataTable
