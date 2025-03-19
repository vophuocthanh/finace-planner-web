import { LoadingCM } from '@/components'
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
import { usePersonIncome } from '@/hooks/person-income/usePersonIncome'
import {
  CategoryPersonIncomeResponse,
  MonthlyPersonIncomeResponse,
  PersonIncomeResponse
} from '@/models/interface/person-income.interface'
import ModalAddPersonIncome from '@/pages/person-income/components/modal-add-person-income'
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
import { VND_CURRENCY_UNIT } from '../../../configs/consts'

export default function TablePersonIncome() {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [filterValue, setFilterValue] = useState<string>('')
  const [openModalAddPersonIncome, setOpenModalAddPersonIncome] = useState<boolean>(false)
  const [editPersonIncomeData, setEditPersonIncomeData] = useState<PersonIncomeResponse | undefined>(undefined)

  const handleEditPersonIncome = (paymentId: string) => {
    const selectedIncome = personIncome?.data.find((item) => item.id === paymentId)
    setEditPersonIncomeData(selectedIncome)
    setOpenModalAddPersonIncome(true)
  }

  const handleOpenModalAddPersonIncome = (open: boolean) => {
    setOpenModalAddPersonIncome(open)

    if (!open) {
      setEditPersonIncomeData(undefined)
    }
  }

  const handleAddButtonClick = () => {
    setEditPersonIncomeData(undefined)
    setOpenModalAddPersonIncome(true)
  }

  const { data: personIncome, isLoading, error } = usePersonIncome()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilter = useCallback(
    debounce((value: string) => {
      table.getColumn('description')?.setFilterValue(value)
    }, 300),
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns: ColumnDef<PersonIncomeResponse>[] = [
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
      header: 'Mô tả',
      cell: memo(
        ({ row }) => <div className='capitalize'>{row.getValue('description')}</div>,
        (prev, next) => prev.row.getValue('description') === next.row.getValue('description')
      )
    },
    {
      accessorKey: 'amount',
      header: () => <div>Tiền</div>,
      cell: memo(
        ({ row }) => {
          const amount = parseFloat(row.getValue('amount'))
          return (
            <div className='font-medium'>
              {formatNumber(amount)} {VND_CURRENCY_UNIT}
            </div>
          )
        },
        (prev, next) => prev.row.getValue('amount') === next.row.getValue('amount')
      )
    },
    {
      accessorKey: 'createAt',
      header: ({ column }) => (
        <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Ngày viết
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
      accessorKey: 'category',
      header: () => <div>Danh mục</div>,
      cell: memo(
        ({ row }) => {
          const category = row.getValue('category') as CategoryPersonIncomeResponse
          return <div className='font-medium'>{category?.name}</div>
        },
        (prev, next) => prev.row.getValue('category') === next.row.getValue('category')
      )
    },
    {
      accessorKey: 'monthly',
      header: () => <div>Tháng</div>,
      cell: memo(
        ({ row }) => {
          const monthly = row.getValue('monthly') as MonthlyPersonIncomeResponse
          return (
            <div className='font-medium'>
              {monthly?.nameMonth} - {monthly?.yearly?.year}
            </div>
          )
        },
        (prev, next) => prev.row.getValue('monthly') === next.row.getValue('monthly')
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
              <DropdownMenuItem onClick={() => handleEditPersonIncome(payment.id ?? '')}>Sửa thu nhập</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const data = useMemo(() => personIncome?.data ?? [], [personIncome?.data])
  const memoizedColumns = useMemo(() => columns, [columns])

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

  if (isLoading) return <LoadingCM />
  if (error) return <div className='flex items-center justify-center h-screen'>Error: {error.message}</div>

  return (
    <div className='w-full p-4 bg-white rounded-md shadow-md'>
      <div className='flex items-center justify-between gap-2 py-4'>
        <Input
          placeholder='Tìm kiếm theo mô tả...'
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
            onClick={handleAddButtonClick}
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
                Cột <ChevronDown />
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

      {openModalAddPersonIncome && (
        <ModalAddPersonIncome
          open={openModalAddPersonIncome}
          onOpenChange={handleOpenModalAddPersonIncome}
          personIncomeData={editPersonIncomeData}
          isEditMode={!!editPersonIncomeData}
          id={editPersonIncomeData ? editPersonIncomeData.id : undefined}
        />
      )}
    </div>
  )
}
