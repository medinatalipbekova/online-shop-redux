import React from 'react'
import { useDispatch } from 'react-redux'
import { setBase } from '../redux/reducers/products'

const SortProducts = () => {
  const dispatch = useDispatch()
  return (
    <div className="flex justify-around mb-16">
      <div className="flex w-full">
        <select
          className="p-3 border-none sort text-white mr-64 "
          onChange={(e) => dispatch(setBase(e.target.value))}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
        </select>
      </div>
      <div className="flex w-full justify-end">
        <select
          className="p-3 border-none sort text-white "
          onChange={(e) => dispatch({ type: 'UPDATE_SORT_TYPE', newType: e.target.value })}
        >
          <option selected="selected" value="a-z">
            {' '}
            Alphabetically, A-Z
          </option>
          <option value="price">Price, low to high</option>
        </select>
      </div>
    </div>
  )
}

export default SortProducts
