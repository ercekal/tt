import { FETCH_PAGES } from '../actions/index'

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_PAGES:
    return {...state, titles: action.payload.titles };
  }
  return state;
}
