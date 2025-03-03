import React from "react";

const Home = ({ input, deleteNote, editNote }) => {
  return (
    <div className="container mx-auto px-4 py-8 ">
      <h1 className="text-2xl font-bold mb-6 text-center">My Notes</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center ">
        {input && input.length > 0 ? (
          input.map((note, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden relative"
            >
              <button
                onClick={() => deleteNote(index)}
                className="absolute top-2 right-1 w-8 h-8 mr-1 mt-1 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors"
                aria-label="Delete note"
              >
                ×
              </button>
              <div className="p-5">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 pr-6">
                  {note.title}
                </h2>
                <p className="text-gray-600">{note.description}</p>
              </div>
              <div>
                <button
                  className="ml-4 mb-4 text-white bg-sky-500 cursor-pointer font-xl border px-2 py-1 rounded-md"
                  onClick={() => editNote(index)}
                >
                  edit
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No notes available
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
