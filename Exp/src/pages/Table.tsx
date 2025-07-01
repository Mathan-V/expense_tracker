import React from "react"

interface Product {
  name: string
  color: string
  category: string
  accessories: string
  available: string
  price: string
  weight: string
}

interface ProductTableProps {
  products: Product[]
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                />
                <label htmlFor="checkbox-all" className="sr-only">checkbox</label>
              </div>
            </th>
            <th className="px-6 py-3">Product name</th>
            <th className="px-6 py-3">Color</th>
            <th className="px-6 py-3">Category</th>
            <th className="px-6 py-3">Accessories</th>
            <th className="px-6 py-3">Available</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Weight</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr
              key={i}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-${i}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600"
                  />
                  <label htmlFor={`checkbox-${i}`} className="sr-only">checkbox</label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {p.name}
              </th>
              <td className="px-6 py-4">{p.color}</td>
              <td className="px-6 py-4">{p.category}</td>
              <td className="px-6 py-4">{p.accessories}</td>
              <td className="px-6 py-4">{p.available}</td>
              <td className="px-6 py-4">{p.price}</td>
              <td className="px-6 py-4">{p.weight}</td>
              <td className="flex items-center px-6 py-4">
                <button className="text-blue-600 dark:text-blue-500 hover:underline">Edit</button>
                <button className="text-red-600 dark:text-red-500 hover:underline ml-3">Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ProductTable
