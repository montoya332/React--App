import {SETBOOK} from '../../constants/library/actionTypes';
export default function(state = {}, action) {
  switch (action.type) {
    case SETBOOK:
      return action.payload.data;
  }

  return state;
};