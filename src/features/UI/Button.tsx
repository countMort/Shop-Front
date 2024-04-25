import { button_variants } from "../../params/index.params"
import { ButtonProps } from "../../types/UI.types"

export const Button = ({
  children,
  variant = "md",
  onClick,
  className,
}: ButtonProps) => (
  <button
    type="button"
    className={`${className} ${button_variants[variant].className} hover:bg-gray-100 rounded-md focus:outline-none border-2`}
    onClick={onClick}
  >
    {children}
  </button>
)

export const DeleteButton = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-2 py-1 text-xs font-bold text-red-500 hover:bg-red-100 rounded-md"
    >
      Delete
    </button>
  )
}
