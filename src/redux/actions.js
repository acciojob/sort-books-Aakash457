export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";
export const SORT_BOOKS = "SORT_BOOKS";

export const fetchBooks = () => {
  return function (dispatch) {
    dispatch({ type: FETCH_BOOKS_REQUEST });

    const API_URL =
      "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=nVE2D4emmo4ZAS5lbqY4zdSBXjT6V3Tzv7DjtAuhiPsbW9Nw";

    fetch(API_URL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        dispatch({
          type: FETCH_BOOKS_SUCCESS,
          payload: data.results.books,
        });
      })
      .catch(function (error) {
        dispatch({
          type: FETCH_BOOKS_FAILURE,
          payload: error.message,
        });
      });
  };
};

export const sortBooks = (sortBy, order) => ({
  type: SORT_BOOKS,
  payload: { sortBy, order },
});
