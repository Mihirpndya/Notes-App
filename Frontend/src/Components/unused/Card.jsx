import React, { useState } from "react";
import Modal from "../Modal";

const Card = ({ title, description }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <div className="block pl-3 my-4 max-w-sm bg-white border border-gray-200 rounded-lg shadow hover:bg-yellow-300 dark:bg-yellow-200 dark:border-gray-500 hover:bg-yellow-250 mx-auto shadow-md shadow-slate-400">
      <div className="hover:bg-grey-300 pt-5 pr-3 pb-3 text-xl font-semibold ">
        {title}
      </div>
      <div className="pb-3 text-sm pr-3">{description}</div>
      {/* <button className=" my-3 px-3 py-1 rounded-md border-1 bg-sky-300 hover:bg-sky-400 border-black">
        Edit
      </button> */}
      <div className="flex justify-end">
        <button
          className="my-3 mx-3 px-6 py-1 rounded-md border-1 shadow-sm shadow-slate-200 bg-sky-300 hover:bg-sky-400 border-black"
          onClick={toggle}
        >
          {open ? "view" : "close"}
        </button>
      </div>
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          _id={_id}
          setNotes={setNotes}
          notes={notes}
          title={title}
          description={description}
        />
      )}
    </div>
  );
};

export default Card;
