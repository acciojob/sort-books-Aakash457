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
    <label htmlFor="sortBy">Sort By</label>
    <select
      id="sortBy"
      value={sortBy}
      onChange={handleSortBy}
    >
      <option value="title">Title</option>
      <option value="author">Author</option>
      <option value="publisher">Publisher</option>
    </select>

    <label htmlFor="order">Order</label>
    <select
      id="order"
      value={order}
      onChange={handleOrder}
    >
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
);

export default BooksList;