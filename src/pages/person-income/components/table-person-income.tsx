import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { STANDARD_DATE_FORMAT_SLASH } from '@/configs/consts'
import { formatDate } from '@/core/helpers/date-time'
import { formatNumber } from '@/core/helpers/number'
import { PersonIncomeResponse } from '@/models/interface/person-income.interface'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { debounce } from 'lodash'
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from 'lucide-react'
import { memo, useCallback, useMemo, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const columns: ColumnDef<PersonIncomeResponse>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: memo(
      ({ row }) => <div className='capitalize'>{row.getValue('description')}</div>,
      (prev, next) => prev.row.getValue('description') === next.row.getValue('description')
    )
  },
  {
    accessorKey: 'amount',
    header: () => <div>Amount</div>,
    cell: memo(
      ({ row }) => {
        const amount = parseFloat(row.getValue('amount'))
        return <div className='font-medium'>{formatNumber(amount)}</div>
      },
      (prev, next) => prev.row.getValue('amount') === next.row.getValue('amount')
    )
  },
  {
    accessorKey: 'createAt',
    header: ({ column }) => (
      <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        CreateAt
        <ArrowUpDown />
      </Button>
    ),
    cell: memo(
      ({ row }) => {
        const createAt = row.getValue('createAt') as string | Date
        return <div className='lowercase'>{formatDate(createAt, STANDARD_DATE_FORMAT_SLASH)}</div>
      },
      (prev, next) => prev.row.getValue('createAt') === next.row.getValue('createAt')
    )
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='w-8 h-8 p-0'>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(payment.id ?? '')}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]

export default function TablePersonIncome() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [filterValue, setFilterValue] = useState<string>('')

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilter = useCallback(
    debounce((value: string) => {
      table.getColumn('description')?.setFilterValue(value)
    }, 300),
    []
  )

  const data = useMemo(() => [], [])
  const memoizedColumns = useMemo(() => columns, [])

  const table = useReactTable({
    data,
    columns: memoizedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const visibleColumns = useMemo(() => table.getAllColumns().filter((column) => column.getCanHide()), [table])

  return (
    <div className='w-full p-4 bg-white rounded-md shadow-md'>
      <div className='flex items-center justify-between gap-2 py-4'>
        <Input
          placeholder='Filter description...'
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value)
            debouncedSetFilter(event.target.value)
          }}
          className='max-w-sm'
        />
        <div className='flex items-center gap-2'>
          <Button
            iconLeft={<Plus />}
            variant='outline'
            className='ml-auto transition-all duration-300 border-primary text-primary hover:text-white hover:bg-primary transition-width hover:shadow-md hover:shadow-primary/50'
          >
            Thêm thu nhập cá nhân
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant='outline'
                className='ml-auto border-primary text-primary hover:text-white hover:bg-primary'
              >
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              {visibleColumns.map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className='h-24 text-center'>
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4 space-x-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s)
          selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
