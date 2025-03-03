import { useState, useEffect } from "react";
import "./App.css";
import Home from "./Home";
import Create from "./Create";
import EditModelComponent from "./EditModelComponent";

function App() {
  const [create, setCreate] = useState(false);
  const [notes, setNotes] = useState([]);
  const [edit, setEdit] = useState(false);
  const [inputObjects, setInputObjects] = useState({
    title: "",
    description: "",
    index: null,
  });

  // Load notes from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // Function to add a new note
  const addNote = (newNote) => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Function to delete a note
  const deleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Function to start editing a note
  const editNote = (index) => {
    const note = notes[index];
    setInputObjects({
      title: note.title,
      description: note.description,
      index: index,
    });
    setEdit(true);
  };

  // Function to update an existing note
  const updateNote = (index, updatedTitle, updatedDescription) => {
    const updatedNotes = [...notes];
    updatedNotes[index] = {
      title: updatedTitle,
      description: updatedDescription,
    };
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setEdit(false); // Close the edit modal
  };

  return (
    <div>
      <div className="flex items-center justify-around">
        <div
          className={`ml-2 pr-2 w-full border-r-2 text-center cursor-pointer ${
            !create ? "font-bold" : ""
          }`}
          onClick={() => setCreate(false)}
        >
          Home
        </div>
        <div
          className={`mx-2 w-full text-center cursor-pointer ${
            create ? "font-bold" : ""
          }`}
          onClick={() => setCreate(true)}
        >
          Create
        </div>
      </div>
      <div className="flex items-center justify-center ">
        <div>
          {create ? (
            <Create
              addNote={addNote}
              inputObjects={inputObjects}
              setInputObjects={setInputObjects}
              setCreate={setCreate}
            />
          ) : (
            <Home input={notes} deleteNote={deleteNote} editNote={editNote} />
          )}
        </div>
      </div>
      <div>
        {edit && (
          <EditModelComponent
            title={inputObjects.title}
            description={inputObjects.description}
            updateNote={updateNote} // Pass update function to EditModelComponent
            index={inputObjects.index} // Pass the index of the note being edited
          />
        )}
      </div>
    </div>
  );
}

export default App;
