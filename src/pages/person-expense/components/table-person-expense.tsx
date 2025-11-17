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
import { useDeleteExpenseMutation, useExpenseQuery } from '@/hooks/expense/useExpenseQuery'
import {
  CategoryPersonIncomeResponse,
  MonthlyPersonIncomeResponse,
  PersonIncomeResponse
} from '@/models/interface/person-income.interface'
import ModalAddPersonExpense from '@/pages/person-expense/components/modal-add-expense'
import {
  ColumnDef,
  ColumnFiltersState,
  OnChangeFn,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable
} from '@tanstack/react-table'
import { Tooltip } from 'antd'
import { debounce, isEqual } from 'lodash'
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus } from 'lucide-react'
import { memo, useCallback, useMemo, useState } from 'react'
import { VND_CURRENCY_UNIT } from '../../../configs/consts'

export default function TablePersonExpense() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10
  })
  const [filterValue, setFilterValue] = useState<string>('')
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editData, setEditData] = useState<PersonIncomeResponse | undefined>(undefined)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined)

  const { mutate: deleteExpense } = useDeleteExpenseMutation(deleteId ?? '')
  const { data: expense, total, isLoading, error } = useExpenseQuery(pagination.pageIndex + 1, pagination.pageSize)

  const handleOpenDeleteModal = useCallback((open: boolean, id?: string) => {
    setIsDeleteModalOpen(open)
    setDeleteId(open && id ? id : undefined)
  }, [])

  const handleDelete = useCallback(() => {
    if (deleteId) {
      deleteExpense()
      setIsDeleteModalOpen(false)
    }
  }, [deleteId, deleteExpense])

  const handleEdit = useCallback(
    (id: string) => {
      const selectedExpense = expense?.find((item) => isEqual(item.id, id))
      setEditData(selectedExpense)
      setIsAddModalOpen(true)
    },
    [expense]
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
          return <div className='w-72 font-medium md:w-40'>{category?.name}</div>
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
            <div className='w-36 font-medium'>
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
              <Button variant='ghost' className='p-0 w-8 h-8'>
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

  const data = useMemo(() => expense ?? [], [expense])
  const memoizedColumns = useMemo(() => columns, [columns])
  const pageCount = useMemo(() => Math.ceil(total / pagination.pageSize), [total, pagination.pageSize])

  const table = useReactTable({
    data,
    columns: memoizedColumns,
    pageCount,
    manualPagination: true,
    onSortingChange: setSorting as OnChangeFn<SortingState>,
    onColumnFiltersChange: setColumnFilters as OnChangeFn<ColumnFiltersState>,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility as OnChangeFn<VisibilityState>,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination as OnChangeFn<PaginationState>,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination
    }
  })

  const visibleColumns = useMemo(() => table.getAllColumns().filter((column) => column.getCanHide()), [table])

  // if (isLoading) return <LoadingCM />
  if (error) return <EmptyDocuments isNewVersion />

  return (
    <div className='w-full md:h-[calc(100vh-104px)] p-4 bg-white rounded-md shadow-md'>
      <h1 className='text-2xl font-bold'>Chi tiêu cá nhân</h1>
      <div className='flex flex-col gap-2 items-center py-4 md:justify-between md:flex-row'>
        <Input
          placeholder='Tìm kiếm theo mô tả...'
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value)
            debouncedSetFilter(event.target.value)
          }}
          className='w-[22rem] md:max-w-sm'
        />
        <div className='flex gap-12 items-center md:gap-4'>
          <Button
            iconLeft={<Plus />}
            onClick={() => setIsAddModalOpen(true)}
            variant='outline'
            className='ml-auto transition-all duration-300 border-primary text-primary hover:text-white hover:bg-primary transition-width hover:shadow-md hover:shadow-primary/50'
          >
            Thêm chi tiêu
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
      {isLoading ? (
        <LoadingCM />
      ) : (
        <div className='rounded-md border'>
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
      <div className='flex justify-end items-center p-4 pt-4 space-x-2 bg-white md:fixed md:bottom-6 md:right-6'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Hiển thị {pagination.pageIndex * pagination.pageSize + 1} -{' '}
          {Math.min((pagination.pageIndex + 1) * pagination.pageSize, total)} của {total} kết quả
        </div>
        <div className='flex items-center space-x-2'>
          <span className='text-sm text-muted-foreground'>
            Trang {pagination.pageIndex + 1} / {pageCount}
          </span>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Trước
          </Button>
          <Button variant='outline' size='sm' onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Sau
          </Button>
        </div>
      </div>

      {isAddModalOpen && (
        <ModalAddPersonExpense
          open={isAddModalOpen}
          onOpenChange={handleOpenAddModal}
          personExpenseData={editData}
          isEditMode={!!editData}
          id={editData ? editData.id : undefined}
        />
      )}

      {isDeleteModalOpen && (
        <ModalDeleteItem
          isOpen={isDeleteModalOpen}
          onOpenChange={(open) => handleOpenDeleteModal(open)}
          title='Xóa chi tiêu'
          description='Bạn có chắc chắn muốn xóa chi tiêu này không?'
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
