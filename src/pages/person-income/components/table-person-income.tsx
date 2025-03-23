import { LoadingCM } from '@/components'
import EmptyDocuments from '@/components/empty/empty-document'
import ModalDeleteItem from '@/components/modal/modal-delete-item'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { STANDARD_DATE_FORMAT_SLASH } from '@/configs/consts'
import { formatDate } from '@/core/helpers/date-time'
import { formatNumber } from '@/core/helpers/number'
import { useDeletePersonIncome, usePersonIncome } from '@/hooks/person-income/usePersonIncomeQuery'
import {
  CategoryPersonIncomeResponse,
  MonthlyPersonIncomeResponse,
  PersonIncomeResponse
} from '@/models/interface/person-income.interface'
import ModalAddPersonIncome from '@/pages/person-income/components/modal-add-person-income'
import PersonIncomeFilter from '@/pages/person-income/components/person-income-filter'
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Tooltip } from 'antd'
import { debounce, isEqual } from 'lodash'
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from 'lucide-react'
import { memo, useCallback, useMemo, useState } from 'react'
import { VND_CURRENCY_UNIT } from '../../../configs/consts'

export default function TablePersonIncome() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [filterValue, setFilterValue] = useState<string>('')
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editData, setEditData] = useState<PersonIncomeResponse | undefined>(undefined)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined)
  const [monthFilter, setMonthFilter] = useState<string>('')

  const search = useMemo(() => {
    let result = filterValue
    if (monthFilter) {
      result = result ? `${result} ${monthFilter}` : monthFilter
    }
    return result
  }, [filterValue, monthFilter])

  const { mutate: deletePersonIncome } = useDeletePersonIncome(deleteId ?? '')
  const { data: personIncome, isLoading, error } = usePersonIncome(search)

  const handleFilterChange = useCallback((monthName: string) => {
    setMonthFilter(monthName)
    debouncedMonthSetFilter(monthName)
  }, [])

  const debouncedMonthSetFilter = useCallback(
    debounce((value: string) => {
      setMonthFilter(value)
    }, 300),
    []
  )

  const handleOpenDeleteModal = useCallback((open: boolean, id?: string) => {
    setIsDeleteModalOpen(open)
    setDeleteId(open && id ? id : undefined)
  }, [])

  const handleDelete = useCallback(() => {
    if (deleteId) {
      deletePersonIncome()
      setIsDeleteModalOpen(false)
    }
  }, [deleteId, deletePersonIncome])

  const handleEdit = useCallback(
    (id: string) => {
      const selectedIncome = personIncome?.data.find((item) => isEqual(item.id, id))
      setEditData(selectedIncome)
      setIsAddModalOpen(true)
    },
    [personIncome?.data]
  )

  const handleOpenAddModal = useCallback((open: boolean) => {
    setIsAddModalOpen(open)
    if (!open) setEditData(undefined)
  }, [])

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
        ({ row }) => (
          <Tooltip title={row.getValue('description')}>
            <div className='w-40 text-wrapper md:w-full'>{row.getValue('description')}</div>
          </Tooltip>
        ),
        (prev, next) => isEqual(prev.row.getValue('description'), next.row.getValue('description'))
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
        (prev, next) => isEqual(prev.row.getValue('amount'), next.row.getValue('amount'))
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
        (prev, next) => isEqual(prev.row.getValue('createAt'), next.row.getValue('createAt'))
      )
    },

    {
      accessorKey: 'category',
      header: () => <div className='w-20'>Danh mục</div>,
      cell: memo(
        ({ row }) => {
          const category = row.getValue('category') as CategoryPersonIncomeResponse
          return <div className='font-medium'>{category?.name}</div>
        },
        (prev, next) => isEqual(prev.row.getValue('category'), next.row.getValue('category'))
      )
    },
    {
      accessorKey: 'monthly',
      header: () => <div>Tháng</div>,
      cell: memo(
        ({ row }) => {
          const monthly = row.getValue('monthly') as MonthlyPersonIncomeResponse
          return (
            <div className='font-medium w-36'>
              {monthly?.nameMonth} - {monthly?.yearly?.year}
            </div>
          )
        },
        (prev, next) => isEqual(prev.row.getValue('monthly'), next.row.getValue('monthly'))
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
              <DropdownMenuItem onClick={() => handleEdit(payment.id ?? '')}>Xem/Sửa</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleOpenDeleteModal(true, payment.id ?? '')}>Xóa</DropdownMenuItem>
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
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    onColumnFiltersChange: setColumnFilters as OnChangeFn<ColumnFiltersState>,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility as OnChangeFn<VisibilityState>,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  })

  const visibleColumns = useMemo(() => table.getAllColumns().filter((column) => column.getCanHide()), [table])

  if (error) return <EmptyDocuments isNewVersion />

  return (
    <div className='w-full md:h-[calc(100vh-83px)] p-4 bg-white rounded-md shadow-md'>
      <div className='flex flex-col items-center gap-2 py-4 md:justify-between md:flex-row'>
        <Input
          placeholder='Tìm kiếm theo mô tả...'
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value)
            debouncedSetFilter(event.target.value)
          }}
          className='w-[22rem] md:max-w-sm'
        />
        <div className='flex flex-col items-center gap-4 mt-2 md:mt-0 md:flex-row'>
          <PersonIncomeFilter onFilterChange={handleFilterChange} />
          <div className='flex items-center gap-12 md:gap-4'>
            <Button
              iconLeft={<Plus />}
              onClick={() => setIsAddModalOpen(true)}
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
      </div>
      {isLoading ? (
        <LoadingCM />
      ) : (
        <div className='border rounded-md md:h-[calc(100vh-238px)]'>
          {data === undefined ? (
            <EmptyDocuments isNewVersion />
          ) : (
            <Table className='w-full'>
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
          )}
        </div>
      )}

      <div className='flex items-center justify-end p-4 py-4 space-x-2 bg-white'>
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

      {isAddModalOpen && (
        <ModalAddPersonIncome
          open={isAddModalOpen}
          onOpenChange={handleOpenAddModal}
          personIncomeData={editData}
          isEditMode={!!editData}
          id={editData ? editData.id : undefined}
        />
      )}

      {isDeleteModalOpen && (
        <ModalDeleteItem
          isOpen={isDeleteModalOpen}
          onOpenChange={(open) => handleOpenDeleteModal(open)}
          title='Xóa thu nhập cá nhân'
          description='Bạn có chắc chắn muốn xóa thu nhập cá nhân này không?'
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
