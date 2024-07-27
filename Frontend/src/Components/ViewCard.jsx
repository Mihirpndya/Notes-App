import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import Modal from "./Modal";
import EditCard from "./EditCard";
import { Textarea } from "@material-tailwind/react";

const ViewCard = ({ title, description, setNewNote, setNotes, _id, notes }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [open, setOpen] = useState(false);
  const [onEdit, setOnEdit] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  return (
    <div className="h-full  w-full border-slate-600 rounded-lg shadow-lg shadow-gray-300 bg-gradient-to-b from-amber-200 to-amber-300 p-4 ">
      <div className="flex justify-end">
        <div>
          {(title && description) == null ? (
            <button
              onClick={() => {
                setNewNote(false);
              }}
            >
              {<X />}
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className={title == null ? "w-full" : "w-64 h-40 overflow-hidden"}>
        <div className="p-2 ">
          {title == null ? (
            <Textarea
              type="text"
              rows={3}
              placeholder=" Title"
              onChange={(e) => {
                setNewTitle(e.target.value);
              }}
              className="bg-gradient-to-b from-amber-200  border-none h-full w-full rounded-sm "
            />
          ) : (
            <div className="hover:bg-grey-300 pt-5 pr-3 pb-3 text-xl font-semibold ">
              {title}
            </div>
          )}
        </div>
        <div className="p-2 ">
          {description == null ? (
            <Textarea
            rows={6}
              type="text"
              placeholder="Description"
              onChange={(e) => {
                setNewDescription(e.target.value);
              }}
              className="bg-gradient-to-b from-amber-200  border-none h-full w-full"
            />
          ) : (
            <div className="pb-3 text-sm pr-3">
              {truncateText(description, 60)}
            </div>
          )}
        </div>
      </div>

      <div className=" flex justify-end">
        {(title && description) == null ? (
          <button
            onClick={() => {
              setNewNote(false);

              const response = axios
                .post("http://localhost:3000/createTodos", {
                  title: newTitle,
                  description: newDescription,
                })
                .then((response) => {
                  setNotes((notes) => [
                    ...notes,
                    {
                      title: response.data.title,
                      description: response.data.description,
                      _id: response.data._id,
                    },
                  ]);
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            className="my-3 mx-3 px-6 py-1 rounded-md border-1 shadow-md shadow-gray-400 bg-sky-300 hover:bg-sky-400 border-black"
          >
            Save
          </button>
        ) : (
          <button
            className="my-3 mx-3 px-6 py-1 rounded-md border-1 shadow-md shadow-gray-400 bg-sky-300 hover:bg-sky-400 border-black"
            onClick={() => {
              setOpen(true);
            }}
          >
            {open ? "close" : "view"}
          </button>
        )}
      </div>
      {open && (
        <Modal
          onClose={() => setOpen(false)}
          _id={_id}
          setNotes={setNotes}
          notes={notes}
          title={title}
          description={description}
          setOnEdit={setOnEdit}
        />
      )}
      {onEdit && (
        <EditCard
          existingTitle={title}
          existingDescription={description}
          setOnEdit={setOnEdit}
          _id={_id}
          notes={notes}
          setNotes={setNotes}
        />
      )}
    </div>
  );
};

export default ViewCard;

/*<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-yellow-200 dark:border-gray-500 p-4 max-w-lg w-full relative">
            <div>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={()=>{
                  setOpen(false);
                }}
              >
                {<X />}
              </button>
            </div>
            <h2 className="test-xl font-bold mb-2">{title}</h2>
            <p className="mb-2">{description}</p>
          </div>
        </div> */

//<h2 className="test-xl font-bold mb-2">{title}</h2>
//<p className="mb-2">{description}</p>

/*<button
          onClick={() => {
            setNewNote(false);

            axios
              .post("http://localhost:3000/createTodos", {
                title: title,
                description: description,
              })
              .then((response) => {
                setMessage(response.msg);

                setRes(response.data.title);
              });
            setNotes((notes) => [
              ...notes,
              {
                title: title,
                description,
              },
            ]);
          }}
          className="my-3 mx-3 px-6 py-1 rounded-md border-1 shadow-sm shadow-slate-200 bg-sky-300 hover:bg-sky-400 border-black"
        >
          Save
        </button> */

/*<button
          onClick={() => {
            setNewNote(false);
          }}
        >
          {<X />}
        </button>*/
