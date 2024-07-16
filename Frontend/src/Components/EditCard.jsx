import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const EditCard = ({
  existingTitle,
  existingDescription,
  setOnEdit,
  _id,
  notes,
  setNotes,
  setOpen
}) => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const data = {
    _id: _id,
    title: title,
    description: description,
  };

  return (
    <div className="fixed inset-0 h-screen flex justify-center items-center backdrop-blur-sm bg-white/30 z-[10]">
      <div className="w-[60vh] h-[60vh] bg-white border border-gray-200 rounded-lg shadow dark:bg-yellow-200 dark:border-gray-500 p-4 ">
        <div className="flex justify-end">
          <div>
            <button
              onClick={() => {
                setOnEdit(false);
              }}
            >
              {<X />}
            </button>
          </div>
        </div>
        <div className="overflow-hidden pt-2">
          <div className="p-2">
            <textarea
              type="text"
              placeholder=" Title"
              defaultValue={existingTitle}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              className=" bg-brown-500 h-full w-full rounded-sm p-1"
            />
          </div>

          <div className="p-2">
            <textarea
              type="text"
              placeholder="Description"
              defaultValue={existingDescription}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              className=" bg-brown-500 h-full w-full rounded-sm p-1"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => {
              setOnEdit(false);
              if (data.description == null) {
                data.description = existingDescription;
              }
              if (data.title == null) {
                data.title = existingTitle;
              }

              const newNote = notes.map((note) => {
                if (note._id == _id) {
                  note.title = data.title;
                  note.description = data.description;
                }
                return note;
              });
              console.log(newNote);
              setNotes(newNote);

              axios
                .put("http://localhost:3000/updateNote", data)
                .then((response) => {
                  console.log("successfully updated noted");
                })
                .catch((err) => {
                  console.error(JSON.stringify(err));
                });
            }}
            className="my-3 mx-3 px-6 py-1 rounded-md border-1 shadow-sm shadow-slate-200 bg-sky-300 hover:bg-sky-400 border-black"
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditCard;
