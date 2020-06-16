// import axios from 'axios'
//
// const initialState = {
//   list: []
// }
//
// export default (state = initialState, action) => {
//   if (action.type.indexOf('@@') !==0) {
//     axios({
//       method: 'POST',
//       url: '/api/v1/logs',
//       data: action
//     })
//   }
//   return {
//     ...state,
//     list: [...state.list, action]
//   }
// }

// export function getLogs() {
// return(dispatch) => {
//   axios.get('/api/v1/logs').then(({data}) => dispatch({type: '@@SET_LOGS', list: data }))
// }
// }