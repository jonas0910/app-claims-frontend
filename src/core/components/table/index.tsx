import { DataResponse } from '@/core/types/data-response'
import { Paginate } from '@/core/types/paginate'
import {
  ColumnDef,
  createColumnHelper,
  getCoreRowModel,
  PaginationState,
  Row,
  RowSelectionState,
  useReactTable
} from '@tanstack/react-table'
import React, {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState
} from 'react'
import Pagination from './pagination'
import TableData from './table-data'
import TableDataHead from './table-data-head'
import { keepPreviousData, useQuery } from '@tanstack/react-query'

export const MAX_ROWS_BY_PAGE = 10

interface TableProps<T> {
  columns: any
  fetchData: (
    filters: any
  ) => Promise<Paginate<T[]> | DataResponse<T[] | undefined>>
  queryKey?: string
  externalfilters?: { [key: string]: any }
  paginated?: boolean
  foot?: ReactNode
  onRowSelection?: (rows: any) => void
  extraActions?: (rows: any) => ReactNode
  onRowDisabled?: (row: Row<T>) => void
}

export const FetchTable = <T,>({
  columns,
  fetchData,
  paginated = true,
  queryKey,
  externalfilters,
  foot,
  onRowSelection,
  extraActions,
  onRowDisabled
}: TableProps<T>) => {
  const [filters, setFilters] = useState<{ [key: string]: any } | undefined>(
    externalfilters
  )

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: MAX_ROWS_BY_PAGE
  })

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  // for avoid pagination configuration when paginated is false
  const { data, isPending } = useQuery({
    queryKey: [
      `table-data-${queryKey}`,
      pagination.pageIndex,
      pagination.pageSize,
      filters
    ],
    queryFn: () =>
      fetchData({
        ...filters,
        page: pagination.pageIndex + 1,
        pageSize: pagination.pageSize
      }),
    placeholderData: keepPreviousData
    // staleTime: 5000
  })

  const getPaginateConfiguration = useCallback(
    (data: Paginate<T[]>) => ({
      manualPagination: true, // for server side pagination
      rowCount: data?.meta?.total,
      onPaginationChange: setPagination
    }),
    []
  )

  const getRowSelectionConfiguration = useCallback(
    () => ({
      // para row selection
      enableRowSelection: (row: Row<T>) => {
        return onRowDisabled ? onRowDisabled(row) : false
      },
      onRowSelectionChange: setRowSelection
    }),
    [onRowDisabled]
  )

  const paginatedConfig = useMemo(
    () =>
      paginated && data ? getPaginateConfiguration(data as Paginate<T[]>) : {},
    [data, getPaginateConfiguration, paginated]
  )

  const rowSelectConfig = useMemo(
    () => (onRowSelection !== undefined ? getRowSelectionConfiguration() : {}),
    [getRowSelectionConfiguration, onRowSelection]
  )

  const defaultData = useMemo(() => [], [])

  const columnHelper = createColumnHelper<T>()

  const firstColumn: ColumnDef<T>[] = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => (
          <input
            type='checkbox'
            checked={table.getIsAllRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        ),
        cell: ({ row }) => (
          <input
            type='checkbox'
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
          />
        ),
        size: 0
      })
    ],
    [columnHelper]
  )

  const newColumns =
    onRowSelection !== undefined ? [...firstColumn, ...columns] : columns

  const table = useReactTable({
    columns: newColumns,
    data: data?.data ?? defaultData,
    getCoreRowModel: getCoreRowModel(),
    debugTable: true,
    state: {
      pagination,
      rowSelection
    },
    ...paginatedConfig,
    ...rowSelectConfig
  })

  useEffect(() => {
    if (externalfilters && externalfilters !== filters) {
      setFilters(externalfilters)
    }
  }, [externalfilters, filters])

  useEffect(() => {
    if (onRowSelection) {
      onRowSelection(
        table.getSelectedRowModel().rows.map((row) => row.original)
      )
    }
  }, [rowSelection, onRowSelection, table, data])



  return (
    <Fragment>
      <div className='p-2 bg-white dark:bg-gray-700/30 shadow rounded-lg max-w-full overflow-x-auto'>
        <table className='w-full border-collapse'>
          <thead className='bg-gray-100 dark:bg-[#2c333a] border-b dark:border-[#3a414a]'>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableDataHead<T> key={header.id} header={header} />
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, idx) => (
              <tr
                key={row.id}
                className={`border-b dark:border-[#3a414a] last:border-none ${
                  idx % 2 === 0
                    ? 'bg-gray-50 dark:bg-[#2c333a]'
                    : 'bg-white dark:bg-[#1d232a]'
                }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableData<T> key={cell.id} cell={cell} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {foot}
        {paginated && (
          <Pagination<T> table={table} initialRowByPage={MAX_ROWS_BY_PAGE} />
        )}
        {onRowSelection &&
          table.getSelectedRowModel().flatRows.length > 0 &&
          extraActions &&
          extraActions(
            table.getSelectedRowModel().rows.map((row) => row.original)
          )}
      </div>
    </Fragment>
  )
}
