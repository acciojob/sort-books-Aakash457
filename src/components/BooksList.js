import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, sortBooks } from "../redux/actions";

const BooksList = () => {
  const dispatch = useDispatch();

  const { books, loading, error } = useSelector(
    (state) => state
  );

  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState("asc");

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleSortBy = (e) => {
    const value = e.target.value;
    setSortBy(value);
    dispatch(sortBooks(value, order));
  };

  const handleOrder = (e) => {
    const value = e.target.value;
    setOrder(value);
    dispatch(sortBooks(sortBy, value));
  };

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <select value={sortBy} onChange={handleSortBy}>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>

      <select value={order} onChange={handleOrder}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      <table border="1">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book.primary_isbn13}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;