import React, { useState } from "react";

const EditModelComponent = ({
  title,
  description,
  updateNote,
  index,
  closeModal,
}) => {
  // Set initial state from props
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  // Handle the change in title
  const handleTitleChange = (e) => {
    setNewTitle(e.target.value);
  };

  // Handle the change in description
  const handleDescriptionChange = (e) => {
    setNewDescription(e.target.value);
  };

  // Save the edited values
  const handleSave = () => {
    // Call the updateNote function passed as prop with the updated values
    updateNote(index, newTitle, newDescription);
    closeModal(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 backdrop-blur-sm z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Model</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-semibold mb-2">
            Title:
          </label>
          <input
            type="text"
            id="title"
            value={newTitle}
            onChange={handleTitleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-semibold mb-2"
          >
            Description:
          </label>
          <textarea
            id="description"
            value={newDescription}
            onChange={handleDescriptionChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModelComponent;
