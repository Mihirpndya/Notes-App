import React, { useState } from "react";

const Create = ({ inputObjects, addNote, setInputObjects, setCreate }) => {
  function handleChange(e) {
    const { name, value } = e.target;
    setInputObjects({ ...inputObjects, [name]: value });
  }

  function handleClick(e) {
    // Check if title and description are not empty
    if (
      inputObjects.title.trim() === "" ||
      inputObjects.description.trim() === ""
    ) {
      alert("Please fill in both title and description");
      return;
    }

    // Add the new note using the function from props
    addNote(inputObjects);

    // Reset form
    setInputObjects({
      title: "",
      description: "",
    });

    setCreate(false);
  }

  return (
    <div>
      <div className="relative mb-3 m-6 p-5 border-2 md:w-100 w-80 rounded-md border-gray-400 flex flex-col items-center justify-center">
        <div className="w-full mb-2">
          <label
            htmlFor="title"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400 "
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="text-gray-dark border peer block w-full appearance-none rounded-lg border-gray-400 px-0 py-[14px] pl-2.5 text-sm focus:border-blue-500 focus:outline-none focus:ring-0 mb-2"
            placeholder="Title.."
            required
            value={inputObjects.title}
            onChange={handleChange}
          />
        </div>

        <div className="w-full mb-2">
          <label
            htmlFor="description"
            className="block mb-1 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="4"
            className="p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:outline-none border-gray-400 focus:border-blue-500 dark:border-gray-400 dark:placeholder-gray-400 dark:focus:ring-blue-500 "
            placeholder="Your Description..."
            value={inputObjects.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="m-3 mt-8">
          <button
            className="middle none center mr-4 rounded-lg bg-blue-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={handleClick}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
