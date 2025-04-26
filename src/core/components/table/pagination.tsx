import { useQueryParams } from '@/core/hooks/utils/use-query-params'
import { PaginationState, Table } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import { useRef } from 'react'

interface PaginationProps<T> {
  table: Table<T>
  initialRowByPage: number
}

const Pagination = <T,>({ table, initialRowByPage }: PaginationProps<T>) => {
  // const { allQueryParamsToObject, genUrlWithQueryParams } = useQueryParams()
  // const router = useRouter()
  // const currentPage = useRef<number>(pagination.pageIndex + 1)

  return (
    <>
      <div className='h-2'></div>
      <div className='flex justify-end gap-2'>
        <button
          className='border rounded p-1 dark:border-gray-600'
          onClick={() => {
            table.firstPage()
            // currentPage.current = 1
            // router.push(
            //   genUrlWithQueryParams({
            //     ...allQueryParamsToObject,
            //     page: currentPage.current,
            //     pageSize: pagination.pageSize,
            //   })
            // )
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className='border rounded p-1 dark:border-gray-600'
          onClick={() => {
            table.previousPage()
            // currentPage.current -= 1
            // router.push(
            //   genUrlWithQueryParams({
            //     ...allQueryParamsToObject,
            //     page: currentPage.current,
            //     pageSize: table.getState().pagination.pageSize,
            //   })
            // )
          }}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className='border rounded p-1 dark:border-gray-600'
          onClick={() => {
            table.nextPage()
            // currentPage.current += 1
            // router.push(
            //   genUrlWithQueryParams({
            //     ...allQueryParamsToObject,
            //     page: currentPage.current,
            //     pageSize: table.getState().pagination.pageSize,
            //   })
            // )
          }}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className='border rounded p-1 dark:border-gray-600'
          onClick={() => {
            table.lastPage()
            // currentPage.current = table.getPageCount()
            // router.push(
            //   genUrlWithQueryParams({
            //     ...allQueryParamsToObject,
            //     page: currentPage.current,
            //     pageSize: table.getState().pagination.pageSize,
            //   })
            // )
          }}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className='flex items-center gap-1'>
          <div>Página</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} de{' '}
            {table.getPageCount().toString()}
          </strong>
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value))
            // router.push(
            //   genUrlWithQueryParams({
            //     ...allQueryParamsToObject,
            //     page: currentPage.current,
            //     pageSize: e.target.value,
            //   })
            // )
          }}
        >
          {[initialRowByPage, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Mostrar {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Pagination
