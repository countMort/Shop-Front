import { PDFViewer } from "@react-pdf/renderer"
import { PDFDocument } from "../features/Orders/PDF"
import { useEffect, useState } from "react"
import { OrdersApi } from "../api/orders.api"
import { useParams } from "react-router-dom"
import { Order } from "../types/order.types"

export const PDFPage = () => {
  const { id } = useParams()
  const [order, setOrder] = useState<Order>()
//   const [config, setConfig] = useState<any>()

  useEffect(() => {
    if (id)
      OrdersApi.READ_ONE(id)
        .then(setOrder)
        .catch((e) => console.log(e))
  }, [id])


  return (
    <>
      {order && (
        <PDFViewer width="100%" height={window.innerHeight * 0.9}>
          <PDFDocument order={order}></PDFDocument>
        </PDFViewer>
      )}
    </>
  )
}
