import React from "react";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUserCircle } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

const BookModal = ({ book, onClose }) => {
  return (
    <div
      className="fixed bg-white top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center rounded-lg border-2"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="w-[600px] max-w-full h-[400px]bg-white rounded-xl p-4 flex flex-col relative"
      >
        <AiOutlineClose
          className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
          onClick={onClose}
        />
        <h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
          {book.publishYear}
        </h2>
        <h4 className="my-2 text-gray-500">{book._id}</h4>
        <div className="flex justify-start items-center gap-x-2">
          <PiBookOpenTextLight className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.title}</h2>
        </div>
        <div className="flex justify-start items-center gap-x-2">
          <BiUserCircle className="text-red-300 text-2xl" />
          <h2 className="my-1">{book.author}</h2>
        </div>
        <p className="p-2 text-gray-500">Book Details</p>
        <p className="p-2 text-gray-500">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores
          recusandae provident, eaque velit placeat eveniet magnam veniam magni
          qui minima aut, natus maxime dolore porro deserunt est temporibus,
          numquam mollitia! Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Consequuntur, sunt. Maiores debitis dolorem vel facere, modi
          quaerat autem quod tenetur, ratione possimus, iure natus minima.
          Laborum, reprehenderit! Qui, cum fugiat. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Inventore totam possimus neque esse
          consequuntur voluptas atque accusamus beatae. Pariatur ratione saepe
          soluta culpa, maxime ipsum eum est id qui? Deserunt.
        </p>
      </div>
    </div>
  );
};

export default BookModal;
