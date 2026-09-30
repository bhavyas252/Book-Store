import React from "react";
import BookSingleCard from "./BookSingleCard";

const BooksCard = ({ books }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((item, index) => {
        return <BookSingleCard key={item._id} item={item} />;
      })}
    </div>
  );
};

export default BooksCard;
