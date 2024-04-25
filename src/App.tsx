import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import OrdersPage from "./pages/OrdersPage"
import EditOrderPage from "./pages/EditOrderPage"
import NewOrderPage from "./pages/NewOrderPage"
import { PDFPage } from "./pages/PDFPage"
import { Bounce, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./App.css"

const App = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Router>
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/new" element={<NewOrderPage />} />
          <Route path="/:id" element={<EditOrderPage />} />
          <Route path="/pdf/:id" element={<PDFPage />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </div>
  )
}

export default App
