import { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";

const Newcard = ({ setNewNote, setNotes }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [res, setRes] = useState("");

  return (
    <div className="h-full w-full bg-white border border-gray-200 rounded-lg shadow  dark:bg-yellow-200 dark:border-gray-500 p-4">
      <div className="flex justify-end">
        <button
          onClick={() => {
            setNewNote(false);
          }}
        >
          {<X />}
        </button>
      </div>
      <div className="p-2 ">
        <textarea
          type="text"
          placeholder=" Title"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          className=" bg-brown-500 h-full w-full rounded-sm"
        />
      </div>
      <div className="p-2">
        <textarea
          type="text"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          className=" bg-brown-500 h-full w-full rounded-sm"
        />
      </div>

      <div className=" flex justify-end">
        <button
          onClick={() => {
            setNewNote(false);

            const respone = axios
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
          className="my-3 mx-3 px-6 py-1 rounded-md border-1 shadow-sm shadow-slate-200 bg-sky-300 hover:bg-sky-400 border-black"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Newcard;
