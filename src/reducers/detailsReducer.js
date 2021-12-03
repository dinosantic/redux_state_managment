const initialState = {
  game: {},
  screen: {},
  isLoading: true,
  section: "",
};

const detailReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_DETAIL":
      return {
        ...state,
        game: action.payload.game,
        screen: action.payload.screen,
        isLoading: false,
      };
    case "LOADING_DETAIL":
      return {
        ...state,
        isLoading: true,
        section: action.payload.section,
      };
    default:
      return { ...state };
  }
};

export default detailReducer;
