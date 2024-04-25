import { Document, Page, Text, View } from "@react-pdf/renderer"
import { PDFStyles } from "../../params/pdf.params"
import { Order } from "../../types/order.types"

export const PDFDocument = ({
  order,
  config,
}: {
  order: Order
  config?: any
}) => {
  return (
    <Document>
      <Page size="A4" style={config}>
        <View style={PDFStyles.container}>
          <Text style={PDFStyles.title}>Order Details</Text>
          <Text style={PDFStyles.subtitle}>(ID: {order.id})</Text>
          <Text style={PDFStyles.itemsTitle}>Items Ordered</Text>
          <View style={PDFStyles.itemsTable}>
            <View style={PDFStyles.tableHeader}>
              <Text style={PDFStyles.tableHeaderCell}>ID</Text>
              <Text style={PDFStyles.tableHeaderCell}>Name</Text>
              <Text style={PDFStyles.tableHeaderCell}>Quantity</Text>
              <Text style={PDFStyles.tableHeaderCell}>Price</Text>
            </View>
            {order.items.map((item) => (
              <View style={PDFStyles.tableRow} key={item.id}>
                <Text style={PDFStyles.tableCell}>
                  {item.id.slice(0, 20)}...
                </Text>
                <Text style={PDFStyles.tableCell}>{item.name}</Text>
                <Text style={PDFStyles.tableCell}>{item.quantity}</Text>
                <Text style={PDFStyles.tableCell}>{item.price}</Text>
              </View>
            ))}
          </View>
          <View style={PDFStyles.customerInfo}>
            <Text style={PDFStyles.label}>
              Customer Name: {order.customer_name}
            </Text>
            <Text style={PDFStyles.caption}>
              Customer Address: {order.customer_address}
            </Text>
            <Text style={PDFStyles.caption}>
              Total: {order.total}$
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}
