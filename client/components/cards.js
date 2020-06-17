import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Footer from './footer'
import Pagination from './pagination'
import { addSelection, removeSelection } from '../redux/reducers/products'
import SortProducts from './sort-roduct'

const Cards = () => {
  const [find, setFind] = useState('')
  const [search, setSearch] = useState('')
  const currentPage = useSelector((s) => s.products.currentPage)
  const list = useSelector((s) => s.products.list).slice((currentPage - 1) * 50, currentPage * 50)
  const selection = useSelector((s) => s.products.selection)
  const base = useSelector((s) => s.products.base)
  const rates = useSelector((s) => s.products.rates)
  const sortType = useSelector((s) => s.products.sortType)
  const searchType = useSelector((s) => s.products.searchType)
  const dispatch = useDispatch()
  const symbols = {
    USD: '$',
    EUR: '€',
    CAD: 'C$'
  }

  const handleFind = (str) => {
    setFind(str.toLowerCase())
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
    handleFind(search)
  }
  const filterList = list.filter((el) => el.title.toLowerCase().includes(find.toLowerCase()))
  const sortBy = (catalogList, type) => {
    if (type === 'price') {
      return catalogList.sort((a, b) => a.price - b.price)
    }
    if (type === 'search') {
      return catalogList.filter((e) => e.title.includes(searchType))
    }
    return catalogList.sort((a, b) => a.title.localeCompare(b.title))
  }
  return (
    <div className="flex flex-col">
      <div className="flex justify-center flex-no-wrap border-b border-b-8 border-black mt-24 w-full ">
        <input
          value={search}
          onChange={handleSearch}
          type="text"
          placeholder="Search..."
          className="flex appearance-none bg-transparent opacity-50 text-black text-center"
        />
      </div>
      <div>
        <SortProducts sortBy={sortBy} />
      </div>
      <div className=" flex flex-wrap justify-center -mx-8 ">
        {sortBy(filterList, sortType).map((card) => (
          <div className="w-1/4 px-8">
            <div className="  border-solid border-gray-500 p-6">
              <div className=" flex ">
                <img
                  src="https://cdn.shopify.com/s/files/1/0161/1184/products/Integer-Vitaly-SS-1_600x.jpg?v=1586462785"
                  alt={card.title}
                  className=" h-64 w-full object-contain background-black img1"
                />
              </div>
              <div className=" h-6 mb-6">
                <b>{card.title}</b>
              </div>
              <div className="text-gray-700">
                <b>
                  <i>
                    Price: {(card.price * (rates[base] || 1)).toFixed(2)}
                    {symbols[base]}{' '}
                  </i>
                </b>
              </div>
              <div className=" flex justify-center mt-4 border-b border-b-2 border-black">
                <button
                  type="button"
                  onClick={() => dispatch(removeSelection(card.id))}
                  className="border-2 mb-5 border-solid border-gray-200 px-4"
                >
                  -
                </button>
                <span className=" px-8">
                  <b>{selection[card.id] || 0}</b>
                </span>
                <button
                  type="button"
                  onClick={() => dispatch(addSelection(card.id))}
                  className="border-2 mb-5 border-solid border-gray-200 px-4"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className=" mb-16">
        <Pagination />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default Cards
