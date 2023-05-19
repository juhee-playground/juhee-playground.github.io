const initialState = {
  pointColor: '#009688',
};

interface ActionType {
  type: string;
  payload: string | number;
}

const pointColor = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case 'CHANGE_POINT_COLOR':
      return {
        ...state,
        pointColor: action.payload,
      };
    default:
      return state;
  }
};

export default pointColor;
