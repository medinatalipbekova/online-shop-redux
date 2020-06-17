import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router'
import Header from './header'
import { getProducts, getRates } from '../redux/reducers/products'
import Basket from './basket'
import Main from './main'
import Logs from './logs'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts())
    dispatch(getRates())
  }, [dispatch])

  return (
    <div>
      <Header />
      <div className="container mx-auto py-16 page-wrap ">
        <Route exact path="/" component={() => <Main />} />
        <Route exact path="/basket" component={() => <Basket />} />
        <Route exact path="/logs" component={() => <Logs />} />
      </div>
    </div>
  )
}

Home.propTypes = {}

export default Home
