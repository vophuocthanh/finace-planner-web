import { EmptyItemTable } from '@/components/empty/empty-item'
import { EmptyCloudIcon, EmptyIcon } from '@/assets/icons'

interface EmptyDocumentsProperties {
  isNewVersion?: boolean
}

const EmptyDocuments = ({ isNewVersion }: EmptyDocumentsProperties) => {
  if (isNewVersion) {
    return (
      <EmptyItemTable
        icon={<img src={EmptyCloudIcon} width={140} height={140} alt='' />}
        content={'Hệ thống của bạn chưa ghi nhận dữ liệu nào.'}
      />
    )
  }

  return (
    <div className='flex-row w-full gap-4 empty_documents-height d-flex justify-content-center align-items-center'>
      <img src={EmptyIcon} width={140} alt='' />
      <div className='empty_documents-text'>Chưa có tài liệu</div>
    </div>
  )
}

export default EmptyDocuments
