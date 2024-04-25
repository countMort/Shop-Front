import { ReactNode } from "react"
import { button_variants } from "../params/index.params"

export interface ModalProps {
  title: string
  children: ReactNode
  onClose: () => void
  onApprove?: () => void
  loading?: boolean
  isOpen: boolean
}

export interface ButtonProps {
  children?: ReactNode
  variant?: keyof typeof button_variants
  onClick?: () => void
  className?: string
}
