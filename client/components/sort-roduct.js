import React from 'react'
import { useDispatch } from 'react-redux'
import { setBase } from '../redux/reducers/products'

const SortProducts = (props) => {
  const dispatch = useDispatch()
  return (
    <div className=" flex justify-center sort mb-8 mt-8 border border-solid border-black bg-black text-white flex w-full mb-8 ">
      <div>
        <select
          className="p-3 border-none bg-black text-white mr-8 mr-64 ml-6"
          onChange={(e) => dispatch(setBase(e.target.value))}
        >
          <option value="EUR">EUR</option>
          <option value="USD">USD</option>
          <option value="CAD">CAD</option>
        </select>
      </div>
      <div className="flex ">
        <input
          value={props.search}
          onChange={props.handleSearch}
          type="text"
          placeholder="Search..."
          className="flex appearance-none bg-transparent opacity-50 text-white ml-40 mr-40"
        />
      </div>
      <div>
        <select
          className="p-3 border-none bg-black text-white mr-8"
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
