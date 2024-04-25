import { StyleSheet } from "@react-pdf/renderer"

export const PDFStyles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 15,
  },
  caption: {
    fontSize: 13,
  },
  customerInfo: {
    marginTop: 20,
    display: 'flex',
    rowGap: 4
  },
  label: {
    fontWeight: "bold",
  },
  itemsTitle: {
    fontSize: 15,
    marginBottom: 5,
  },
  itemsTable: {
    borderCollapse: "collapse",
    width: "100%",
    fontSize: 10,
  },
  tableHeader: {
    flexDirection: "row",
  },
  tableHeaderCell: {
    padding: 5,
    borderBottom: "1px solid gray",
    fontWeight: "bold",
    width: "25%",
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    padding: 5,
    borderBottom: "1px solid gray",
    width: "25%",
  },
})
