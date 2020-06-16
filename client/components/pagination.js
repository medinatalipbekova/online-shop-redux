import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../redux/reducers/products'

const Pagination = () => {
  const list = useSelector((s) => s.products.list)
  const pages = new Array(Math.ceil(list.length / 50)).fill(0).map((el, index) => index + 1)
  const dispatch = useDispatch()
  return (
    <ul className="pagination flex justify-center mt-24 sticky">
      {pages.map((item) => (
        <li className="mr-6">
          <button
            type="button"
            className="bg-transparent hover:bg-black text-black hover:text-white  font-semibold  py-2 px-4 "
            onClick={() => dispatch(setCurrentPage(item))}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Pagination
