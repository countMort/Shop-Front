import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import OrdersPage from "./pages/OrdersPage"
import OrderPage from "./pages/OrderPage"
import NewOrderPage from "./pages/NewOrderPage"
// import EditOrder from "./pages/EditOrder"
import "./App.css"

const App = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Router>
        <Routes>
          <Route path="/" element={<OrdersPage />} />
          <Route path="/new" element={<NewOrderPage />} />
          <Route path="/:id" element={<OrderPage />} />
          {/* <Route path="/orders/:orderId/edit" element={<EditOrder />} /> */}
        </Routes>
      </Router>
    </div>
  )
}

export default App
