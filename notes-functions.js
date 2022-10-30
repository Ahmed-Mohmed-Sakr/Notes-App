/// read existing notes from local storage
const getSavedNotes = function () {
  const notesJSON = localStorage.getItem("notes");

  if (notesJSON !== null) {
    return JSON.parse(notesJSON);
  } else {
    return [];
  }
};

// remove a note from list
const removeNote = function (id) {
  const noteIndex = notes.findIndex(function (note) {
    return note.id === id;
  });

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};

// Save a notes to localstorage
const saveNotes = function (notes) {
  localStorage.setItem("notes", JSON.stringify(notes));
};

/// generate the DOM structure for a note
const generateNoteDOM = function (note) {
  const noteEl = document.createElement("div");
  const textEl = document.createElement("a");
  const button = document.createElement("button");

  // setup the remove button
  button.textContent = "x";
  noteEl.appendChild(button);
  button.addEventListener("click", function () {
    removeNote(note.id);
    saveNotes(notes);
    renderNotes(notes, filters);
  });

  // setup the note title
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = "Unnamed note";
  }
  textEl.setAttribute("href", `/edit.html#${note.id}`);
  noteEl.appendChild(textEl);

  return noteEl;
};

// Render application notes

const renderNotes = function (notes, filters) {
  const filtereNotes = notes.filter(function (note) {
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase());
  });

  document.querySelector("#notes").innerHTML = "";

  filtereNotes.forEach(function (note) {
    const noteEl = generateNoteDOM(note);
    document.querySelector("#notes").appendChild(noteEl);
  });
};
