import { LoadingCM } from '@/components'
import EmptyDocuments from '@/components/empty/empty-document'
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
import { useGetUser } from '@/hooks/me/useGetMeQuery'
import { PersonIncomeResponse } from '@/models/interface/person-income.interface'
import { RoleResponse, UserResponse } from '@/models/interface/user.interface'
import ModalAddPersonExpense from '@/pages/person-expense/components/modal-add-expense'
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
import { ChevronDown, MoreHorizontal } from 'lucide-react'
import { memo, useCallback, useMemo, useState } from 'react'

export default function TableManagerUser() {
  const [sorting, setSorting] = useState([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  const [filterValue, setFilterValue] = useState<string>('')
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)
  const [editData, setEditData] = useState<PersonIncomeResponse | undefined>(undefined)

  const { data: user, isLoading, error } = useGetUser()

  const handleOpenAddModal = useCallback((open: boolean) => {
    setIsAddModalOpen(open)
    if (!open) setEditData(undefined)
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilter = useCallback(
    debounce((value: string) => {
      table.getColumn('name')?.setFilterValue(value)
    }, 300),
    []
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const columns: ColumnDef<UserResponse>[] = [
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
      accessorKey: 'name',
      header: 'Tên người dùng',
      cell: memo(
        ({ row }) => (
          <Tooltip title={row.getValue('name')}>
            <div className='w-40 text-wrapper md:w-full'>{row.getValue('name')}</div>
          </Tooltip>
        ),
        (prev, next) => isEqual(prev.row.getValue('name'), next.row.getValue('name'))
      )
    },
    {
      accessorKey: 'email',
      header: () => <div>Email</div>,
      cell: memo(
        ({ row }) => {
          return <div className='font-medium'>{row.getValue('email')}</div>
        },
        (prev, next) => isEqual(prev.row.getValue('email'), next.row.getValue('email'))
      )
    },
    {
      accessorKey: 'phone',
      header: () => <div>Số điện thoại</div>,
      cell: memo(
        ({ row }) => {
          return <div className='font-medium'>{row.getValue('phone')}</div>
        },
        (prev, next) => isEqual(prev.row.getValue('phone'), next.row.getValue('phone'))
      )
    },
    {
      accessorKey: 'avatar',
      header: () => <div>Ảnh đại diện</div>,
      cell: memo(
        ({ row }) => {
          const avatar = row.getValue('avatar') as string
          return <div className='lowercase'>{avatar}</div>
        },
        (prev, next) => isEqual(prev.row.getValue('avatar'), next.row.getValue('avatar'))
      )
    },

    {
      accessorKey: 'date_of_birth',
      header: () => <div className='w-20'>Ngày sinh</div>,
      cell: memo(
        ({ row }) => {
          const dateOfBirth = row.getValue('date_of_birth') as string
          return <div className='w-72 md:w-40 font-medium'>{dateOfBirth}</div>
        },
        (prev, next) => isEqual(prev.row.getValue('date_of_birth'), next.row.getValue('date_of_birth'))
      )
    },
    {
      accessorKey: 'role',
      header: () => <div>Vai trò</div>,
      cell: memo(
        ({ row }) => {
          const role = row.getValue('role') as RoleResponse
          return <div className='font-medium w-36'>{role?.name}</div>
        },
        (prev, next) => isEqual(prev.row.getValue('role'), next.row.getValue('role'))
      )
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: () => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='w-8 h-8 p-0'>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem>Xem/Sửa</DropdownMenuItem>
              <DropdownMenuItem>Xóa</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      }
    }
  ]

  const data = useMemo(() => user?.data ?? [], [user])
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

  if (isLoading) return <LoadingCM />
  if (error) return <EmptyDocuments isNewVersion />

  return (
    <div className='w-full md:h-[calc(100vh-104px)] p-4 bg-white rounded-md shadow-md'>
      <h1 className='text-2xl font-bold'>Quản lý người dùng</h1>
      <div className='flex flex-col items-center gap-2 py-4 md:justify-between md:flex-row'>
        <Input
          placeholder='Tìm kiếm theo tên người dùng...'
          value={filterValue}
          onChange={(event) => {
            setFilterValue(event.target.value)
            debouncedSetFilter(event.target.value)
          }}
          className='w-[22rem] md:max-w-sm'
        />
        <div className='flex items-center gap-12 md:gap-4'>
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
      <div className='flex items-center justify-end p-4 pt-4 space-x-2 bg-white md:fixed md:bottom-6 md:right-6'>
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
        <ModalAddPersonExpense
          open={isAddModalOpen}
          onOpenChange={handleOpenAddModal}
          personExpenseData={editData}
          isEditMode={!!editData}
          id={editData ? editData.id : undefined}
        />
      )}
    </div>
  )
}
