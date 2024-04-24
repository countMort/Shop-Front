const ProductItem = ({ product, onAddToOrder }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b border-gray-200">
      <div className="flex items-center">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-10 h-10 mr-2"
        />
        <div>{product.name}</div>
      </div>
      <div className="flex flex-col">
        <span className="text-gray-600">Price: ${product.price}</span>
        <input
          type="number"
          min="1"
          className="border border-gray-300 rounded px-2 py-1 w-20 text-right"
          placeholder="Quantity"
          onChange={(event) => onAddToOrder(product.id, event.target.value)}
        />
      </div>
    </div>
  )
}

export default ProductItem
