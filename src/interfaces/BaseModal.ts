export interface BaseModalProps {
  visible: boolean
  title: React.ReactNode
  onClose: () => void
  onSave: () => void
  saveLabel?: string
  saveLoading?: boolean
  disableSave?: boolean
  maxWidthClass?: string
  children: React.ReactNode
}