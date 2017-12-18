import axios from 'axios'

export const FETCH_PAGES = 'FETCH_PAGES';

const LOCALHOST = 'http://0.0.0.0:5003'

export function fetchPages() {
  return dispatch => {
    axios.get(LOCALHOST + '/pages')
    .then((res) => {
      dispatch({
        type: FETCH_PAGES,
        payload: res.data
      })
    })
  }
}
