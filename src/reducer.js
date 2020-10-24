import { actions } from './actions';
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.saveData:
      return {
        ...state,
        data: {
          ...state.data,
          [action.name]: action.payload,
        },
      };     
      case actions.showModal:
        return {
          ...state,
          idSelected: action.payload,
          showModal: true,
        };
      case actions.toggleModal:
        return {
          ...state,
          idSelected: -1,
          showModal: false,
        };
    default:
      return state;
  }
};