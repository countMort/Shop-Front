import { ModalProps } from "../../types/UI.types"
import { Button } from "./Button"
import Spinner from "./Spinner"

const Modal = ({
  title,
  children,
  onClose,
  isOpen,
  loading,
  onApprove,
}: ModalProps) => {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75 transition-opacity duration-300 ease-in-out ${
        !isOpen && "hidden"
      }`}
    >
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-auto">
        <h2 className="text-xl font-medium mb-4">{title}</h2>
        {children}
        <div className="flex justify-end mt-4">
          <Button
            className="mr-2 bg-gray-900 text-white hover:text-gray-900"
            onClick={onApprove}
          >
            {loading ? <Spinner /> : "Approve"}
          </Button>
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}

export default Modal
