import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSelection, removeSelection } from '../redux/reducers/products'

const Basket = () => {
  const selection = useSelector((s) => s.products.selection)
  const list = useSelector((s) => s.products.list)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const cart = list.filter((el) => Object.keys(selection).includes(el.id))
  const dispatch = useDispatch()
  const totalPrice = cart
    .reduce(
      (acc, rec) =>
        Object.keys(selection).includes(rec.id)
          ? acc + rec.price * selection[rec.id] * (rates[base] || 1)
          : acc,
      0
    )
    .toFixed(2)
  const symbols = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }
  return (
    <div className="flex flex-col">
      <div>
        <table className="min-w-full pt-3 black bg-gray-50 my-8 mx-auto border-gray-200 px-8 border-4 ">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Items
              </th>
              <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                ADD
              </th>
              <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                DELETE
              </th>
              <th className="px-6 py-4 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                PRICE
              </th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr className="bg-gray-100">
                <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                  <b>{item.title}</b>
                </td>
                <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                  <span className=" px-8">{selection[item.id] || 0}</span>
                </td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => dispatch(addSelection(item.id))}
                    className="border-2 border-solid border-gray-200 px-4"
                  >
                    <b>+</b>
                  </button>
                </td>
                <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                  <button
                    type="button"
                    onClick={() => dispatch(removeSelection(item.id))}
                    className="border-2 border-solid border-gray-200 px-4"
                  >
                    <b>-</b>
                  </button>
                </td>
                <td className="px-6 py-3 whitespace-no-wrap border-b border-gray-200">
                  {(item.price * (rates[base] || 1)).toFixed(2)}
                  {symbols[base]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="text-center text-xl leading-4 font-medium text-gray-700 uppercase tracking-wider">
        <b>
          TOTAL PRICE:
          {totalPrice}
          {symbols[base]}
        </b>
        <div className="flex w-full justify-center">
          <select className="p-3 border-none sort text-white ">
            <option value="price">VISA</option>
            <option value="price">MASTER CARD</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Basket
