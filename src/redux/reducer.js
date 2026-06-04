import {
  FETCH_BOOKS_REQUEST,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE,
  SORT_BOOKS,
} from "./actions";

const initialState = {
  books: [],
  loading: false,
  error: null,
  sortBy: "title",
  order: "asc",
};

const sortBooksHelper = (books, sortBy, order) => {
  return [...books].sort((a, b) => {
    const first = (a[sortBy] || "").toLowerCase();
    const second = (b[sortBy] || "").toLowerCase();
    if (first < second) return order === "asc" ? -1 : 1;
    if (first > second) return order === "asc" ? 1 : -1;
    return 0;
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        loading: false,
        books: sortBooksHelper(action.payload, state.sortBy, state.order),
      };

    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SORT_BOOKS: {
      const { sortBy, order } = action.payload;
      return {
        ...state,
        books: sortBooksHelper(state.books, sortBy, order),
        sortBy,
        order,
      };
    }

    default:
      return state;
  }
};

export default reducer;
