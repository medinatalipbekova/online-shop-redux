import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHistory, faShoppingBag } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
  const selection = useSelector((s) => s.products.selection)
  const totalQuantity = Object.keys(selection).reduce((acc, rec) => {
    return acc + selection[rec]
  }, 0)
  return (
    <div className="flex justify-between header bg-black items-baseline ">
      <div>
        <Link
          to="/logs"
          className="bg-transparent hover:bg-white text-white font-semibold hover:text-black py-2 px-4 "
        >
          <FontAwesomeIcon icon={faHistory} />
        </Link>
        <Link
          to="/"
          className="bg-transparent hover:bg-white text-white font-semibold hover:text-black py-2 px-4 "
        >
          SHOP
        </Link>
      </div>
      <div>
        <img
          className="w-32 "
          src="https://cdn.shopify.com/s/files/1/0161/1184/files/vitaly_logotype_white_92fc0004-599e-4a88-94b6-226023c42f58_110x.png?v=1573676155"
          alt="hh"
        />
      </div>
      <div>
        <Link
          to="/basket"
          className="bg-transparent hover:bg-white text-white font-semibold hover:text-black py-2 px-4 "
        >
          <FontAwesomeIcon className="mr-2" icon={faShoppingBag} />
          CART( {totalQuantity})
        </Link>
      </div>
    </div>
  )
}

export default Header
