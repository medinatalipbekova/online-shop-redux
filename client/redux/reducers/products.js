const GET_PRODUCTS = '@@GET_PRODUCTS'
const ADD_TO_SELECTION = 'ADD_TO_SELECTION'
const REMOVE_FROM_SELECTION = 'REMOVE_FROM_SELECTION'
const GET_RATES = '@@GET_RATES'
const SET_BASE = 'SET_BASE'
const CURRENT_PAGE = 'CURRENT_PAGE'
const UPDATE_SORT_TYPE = 'UPDATE_SORT_TYPE'
const UPDATE_SEARCH_TYPE = 'UPDATE_SEARCH_TYPE'

const initialState = {
  list: [],
  selection: {},
  rates: {},
  base: "EUR",
  currentPage: 1,
  sortType: 'a-z',
  searchType: ''
}

export default (state= initialState, action) => {
  switch ( action.type) {
    case GET_PRODUCTS :
      return {
        ...state,
        list: action.list
      }
    case ADD_TO_SELECTION :
      return {
        ...state,
        selection: {...state.selection,[action.id]: (state.selection[action.id] || 0 )+ 1}
      }
    case REMOVE_FROM_SELECTION :{
      const newSelection = {
        ...state.selection,
        [action.id]: (state.selection[action.id] || 0) - 1
      }
      if(newSelection[action.id] <= 0){
        delete newSelection[action.id]
      }
      return {
        ...state,
        selection: newSelection
      }
    }
    case GET_RATES :
      return {
        ...state,
        rates: action.rates.rates
      }
    case SET_BASE :
      return {
        ...state,
        base: action.base
      }
    case CURRENT_PAGE :
      return {
        ...state,
        currentPage: action.page
      }
    case UPDATE_SORT_TYPE: {
      return {
        ...state,
        sortType: action.newType
      }
    }
    case UPDATE_SEARCH_TYPE: {
      return {
        searchType: action.searchType
      }
    }
    default:
      return state
  }
}

export function getProducts() {
 return(dispatch) => {
   fetch('/api/v1/products')
     .then((res) => res.json())
     .then((list) => dispatch({ type: GET_PRODUCTS, list }))
 }
}

export function addSelection(id) {
return{ type: ADD_TO_SELECTION, id}
}

export function removeSelection(id) {
  return{ type: REMOVE_FROM_SELECTION, id}
}

export function getRates() {
  return(dispatch) => {
    fetch('/api/v1/rates')
      .then((res) => res.json())
      .then((rates) => dispatch({ type: GET_RATES , rates }))
  }
}

export function setBase(base) {
  return{ type: SET_BASE, base}
}

export function setCurrentPage(page) {
  return{ type: CURRENT_PAGE , page}
}

export function setSearch(searchType) {
  return{ type: UPDATE_SEARCH_TYPE , searchType}
}